# Backend: API REST de películas

API construida con arquitectura basada en REST, la cual proporciona información de películas como su director, rating y año de lanzamiento.

## ️⚒️ Stack: Express y Node junto a MySQL para persistencia en BD

## 📐 Patrón de arquitectura y diseño: MVC junto al principio de inyección de dependencias

La API sigue el patrón arquitectónico **MVC (Modelo-Vista-Controlador)**:

- **Models**: lógica de negocio
- **Controllers**: manejo de solicitudes HTTP y lógica de la aplicación
- **Views**: respuestas JSON estructuradas que sirve la API

También utiliza el principio de inyección de dependencias como patrón de diseño para facilitar la escalabilidad del proyecto

## ⚙️ Ejecución

Para probar el código y ver su resultado, ejecuta este comando en tu terminal:

```bash
 # Forma corta
pnpm dev
# Forma larga
pnpn run dev 
# Ambos funcionan perfectamente
```