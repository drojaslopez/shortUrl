# Balanceador de Carga (Load Balancer)

Este proyecto implementa un balanceador de carga simple utilizando Node.js, Express y TypeScript. Su función principal es distribuir las solicitudes entrantes entre varios servidores backend para mejorar la disponibilidad y la escalabilidad de las aplicaciones.

## Tecnologías Utilizadas

*   **Node.js**: Entorno de ejecución para JavaScript.
*   **TypeScript**: Superset de JavaScript que añade tipado estático.
*   **Express**: Framework web para Node.js, utilizado para crear el servidor principal.
*   **http-proxy**: Librería para implementar el proxy reverso que redirige el tráfico.

## Instalación

1.  Clona este repositorio en tu máquina local.
    ```bash
    git clone <url-del-repositorio>
    cd Meli/LoadBalancer
    ```

2.  Instala las dependencias del proyecto.
    ```bash
    npm install
    ```

## Configuración

Antes de iniciar la aplicación, necesitas configurar los servidores de destino a los que el balanceador de carga redirigirá el tráfico.

Crea o modifica un archivo de configuración (por ejemplo, `src/config.ts`) para definir tu lista de servidores.

**Ejemplo de configuración:**

```typescript
// src/config.ts
export const SERVERS = [
  { host: 'localhost', port: 3001 },
  { host: 'localhost', port: 3002 },
  { host: 'localhost', port: 3003 },
];

export const PORT = 3000; // Puerto en el que correrá el balanceador
```

## Uso

Para ejecutar el balanceador de carga, puedes utilizar los siguientes scripts de npm. Te sugiero añadirlos a tu archivo `package.json`.

**Scripts sugeridos para `package.json`:**
```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "ts-node src/index.ts"
}
```

*   **Ejecutar en modo de desarrollo:** `npm run dev`
*   **Compilar para producción:** `npm run build`
*   **Iniciar en modo producción:** `npm start`

El balanceador de carga comenzará a escuchar en el puerto configurado y distribuirá las solicitudes entrantes a los servidores de destino.

## Diagrama
[Diseño](https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Diagrama%20sin%20t%C3%ADtulo.drawio&dark=auto#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1ksR2uoI1SwThYxY6wRBqbKJstUQnXwqA%26export%3Ddownload).