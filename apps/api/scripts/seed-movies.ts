import "dotenv/config";
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";

import { translate } from "google-translate-api-x";

import type { Movie } from "../src/types/movie.types.js";
import type { OMDBMovie, OMDBResponse } from "../src/types/omdb.types.js";

import {
    MOVIES_LIST,
    MOVIES_WITH_YEAR
} from "../src/data/constants/movies.list.js";
import { GENRE_MAP } from "../src/data/constants/genres.map.js";
import { TITLE_MAP } from "../src/data/constants/titles.map.js";

// Configuración
const API_KEY = process.env.OMDBAPI_API_KEY;

if (!API_KEY) throw new Error("API Key no configurada.");

// Tipos derivados de las constantes
type EnglishGenre = keyof typeof GENRE_MAP;
type EnglishTitle = keyof typeof TITLE_MAP;

// Función para limpiar y dividir géneros
const parseGenres = (genreString: string): string[] => {
    if (!genreString || genreString === "N/A") return [];
    return genreString.split(",").map(g => g.trim());
};

// Función para traducir géneros
const translateGenres = (genres: string[]): string[] => {
    return genres.map(genre => GENRE_MAP[genre as EnglishGenre] || genre);
};

// Función para traducir título
const translateTitle = (title: string): string =>
    TITLE_MAP[title as EnglishTitle] || title;

// Función para limpiar y dividir actores
const parseActors = (actorsString: string): string[] => {
    if (!actorsString || actorsString === "N/A") return [];
    return actorsString.split(",").map(actor => actor.trim());
};

// Función para obtener rating numérico
const getNumericRating = (ratingString: string): number | null => {
    if (!ratingString || ratingString === "N/A") return null;

    // Patrón regex para números enteros o decimales
    const NUMBER_PATTERN = /\d+(?:\.\d+)?/;
    const match = ratingString.match(NUMBER_PATTERN);

    return match ? parseFloat(match[0]) : null;
};

// Función principal para obtener y transformar datos
async function fetchAndTransformMovies(): Promise<Movie[]> {
    const transformedMovies: Movie[] = [];
    const omdbapiUrl = "http://www.omdbapi.com/";

    console.log(
        `Iniciando obtención y traducción de ${MOVIES_LIST.length} películas...`
    );

    for (const [index, title] of MOVIES_LIST.entries()) {
        try {
            console.log(
                `[${index + 1}/${MOVIES_LIST.length}] Obteniendo: ${title}`
            );

            const params = new URLSearchParams({
                apikey: API_KEY!,
                t: title,
                plot: "short"
            });
            // Verificar si la película necesita año
            const year = MOVIES_WITH_YEAR[title];
            if (year) {
                params.append("y", year.toString());
            }

            const fullUrl = `${omdbapiUrl}?${params.toString()}`;

            // Hacer la petición a la API
            const response = await fetch(fullUrl);

            if (!response.ok) {
                throw new Error(
                    `Error HTTP: ${response.status} ${response.statusText}`
                );
            }

            const data = (await response.json()) as OMDBResponse;

            if (data.Response === "False") {
                throw new Error(
                    data.Error ||
                        `Película con el título "${title}" no encontrada`
                );
            }

            const movie = data;

            const englishPlot =
                movie.Plot !== "N/A" ? movie.Plot : "No description available";
            let spanishPlot = "Sin descripción disponible";

            // Lógica de traducción
            if (movie.Plot !== "N/A") {
                try {
                    const translation = await translate(englishPlot, {
                        to: "es"
                    });
                    spanishPlot = translation.text;
                } catch (error) {
                    console.warn(
                        `  ⚠️ Falló traducción de "${title}", usando original.`
                    );
                    spanishPlot = englishPlot;
                }
            }

            // Transformar los datos
            const originalGenres = parseGenres(movie.Genre);
            const spanishTitle = translateTitle(title);

            const transformedMovie: Movie = {
                id: randomUUID(),
                imdb_id: movie.imdbID,
                year: parseInt(movie.Year) || null,
                director: movie.Director !== "N/A" ? movie.Director : null,
                duration: movie.Runtime !== "N/A" ? movie.Runtime : null,
                actors: parseActors(movie.Actors !== "N/A" ? movie.Actors : ""),
                poster: movie.Poster !== "N/A" ? movie.Poster : null,
                rate: getNumericRating(movie.imdbRating),
                translations: {
                    en: {
                        title: movie.Title,
                        plot: englishPlot,
                        genre: originalGenres
                    },
                    es: {
                        title: spanishTitle,
                        plot: spanishPlot,
                        genre: translateGenres(originalGenres)
                    }
                }
            };

            transformedMovies.push(transformedMovie);
            console.log(`  ✅ Procesada: ${title}`);

            // Pequeña pausa para no sobrecargar la API
            await new Promise(resolve => setTimeout(resolve, 300));
        } catch (error) {
            console.error(
                `  ❌ Error procesando "${title}":`,
                error instanceof Error ? error.message : String(error)
            );
        }
    }

    return transformedMovies;
}

// Función para guardar los datos en un archivo JSON
function saveMoviesToFile(movies: Movie[], filename = "movies.json"): void {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const outputFile = join(__dirname, "..", "src", "data", filename);
    const outputDir = dirname(outputFile);

    // Crear directorio si no existe
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
        console.log(`📁 Directorio creado: ${outputDir}`);
    }

    const data = JSON.stringify(movies, null, 2);
    writeFileSync(outputFile, data, "utf8");
    console.log(`\n ✅ Datos guardados en ${outputFile}`);
    console.log(`• Total de películas procesadas: ${movies.length}`);
}

// Función principal
async function main() {
    try {
        const transformedMovies = await fetchAndTransformMovies();

        if (transformedMovies.length > 0) {
            saveMoviesToFile(transformedMovies);

            // Mostrar un ejemplo del resultado
            console.log("\n• Ejemplo de película transformada:");
            console.log(JSON.stringify(transformedMovies[0], null, 2));
        } else {
            console.log("❌ No se pudieron obtener películas.");
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Error desconocido";
        console.error("❌ Error en el proceso principal:", errorMessage);
        process.exit(1);
    }
}

// Ejecutar el script
main().catch(err => {
    console.error("❌ Error no controlado: ", err);
    process.exit(1);
});
