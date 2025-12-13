# 🎬 Moviedeller ~ App Full Stack con API REST y cliente web SPA

> **Proyecto en desarrollo**. Sus funcionalidades básicas están siendo implementadas

Moviedeller es una aplicación web full stack de información de películas, construida con una arquitectura de **monorepo** para una gestión de código eficiente y separación clara del código.

## ⚒️ Stack:

### Frontend: React + Typescript
### Backend: Node/Express + Typescript + MySQL (con mysql2)

## 🧱 Arquitectura y patrones:
- **Monorepo** gestionado con pnpm workspaces
- **Backend**: Patrón MVC + Inyección de Dependencias
- **Frontend**: React con TypeScript + Custom Hooks
- **Base de datos**: MySQL con mysql2 como driver cliente

## 🚀 Instalación y Ejecución

Para levantar el proyecto en tu entorno de desarrollo, sigue estos pasos:

1.  **Clonar el repositorio:**

```bash
git clone https://github.com/codebyhilde/moviedeller.git
cd moviedeller
```

2.  **Instalar dependencias y arrancar los servicios:**

Como se utiliza un monorepo, un solo comando iniciará tanto la API como el Frontend:

```bash
pnpm install
pnpm run dev
```
