# Test de Disruptive Studio

Este proyecto es un monorepo que contiene dos servicios: una API en Express (`ds_api`) y una aplicación de React utilizando Refine Framework (`ds_ui`). 

## Estructura del Proyecto

```
/monorepo
│
├── ds_api          # API de Express
│   ├── .env.example # Archivo de ejemplo para variables de entorno
│   └── ...
│
└── ds_ui           # Aplicación React con Refine
    ├── .env.example # Archivo de ejemplo para variables de entorno
    └── ...
```

## Requisitos Previos

Antes de empezar, asegúrate de tener [FNM](https://github.com/Schniz/fnm) instalado para manejar las versiones de Node.js. 

### Instalación de FNM

1. **Instalar FNM**: Puedes instalar FNM usando `curl` o `wget`:
   ```bash
   curl -fsSL https://fnm.vercel.app/install | bash
   ```
   o
   ```bash
   wget -qO- https://fnm.vercel.app/install | bash
   ```

2. **Configura tu terminal**: Añade la siguiente línea a tu archivo de configuración de shell (como `~/.bashrc`, `~/.zshrc` o `~/.bash_profile`):
   ```bash
   eval "$(fnm env)"
   ```

3. **Reinicia tu terminal** o ejecuta `source ~/.bashrc` (o el archivo correspondiente) para aplicar los cambios.

### Configuración de Node.js

1. **Instalar Node.js versión 20**:
   ```bash
   fnm install 20
   fnm use 20
   ```

## Instalación de Dependencias

### Para la API (`ds_api`)

1. Navega a la carpeta de la API:
   ```bash
   cd ds_api
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` a partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```


## Recursos de Postman

En la carpeta `postman`, encontrarás los recursos necesarios para importar los requests y el environment necesario para probar la API. 

1. **Importar la Colección de Requests**:
   - Abre Postman.
   - Haz clic en "Import" y selecciona el archivo `requests.json`.

2. **Importar el Environment**:
   - Haz clic en "Import" y selecciona el archivo `environment.json`.

### Para la Aplicación React (`ds_ui`)

1. Navega a la carpeta de la aplicación:
   ```bash
   cd ../ds_ui
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` a partir de `.env.example`:
   ```bash
   cp .env.example .env
   ```

## Ejecutar los Proyectos

### Ejecutar la API

Desde la carpeta `ds_api`, puedes iniciar la API con:
```bash
npm start
```

### Ejecutar la Aplicación React

Desde la carpeta `ds_ui`, puedes iniciar la aplicación con:
```bash
npm start
```
