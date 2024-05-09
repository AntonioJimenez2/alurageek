<style>
    body {
        background-color: black;
        color: white;
    }
</style>

# Desafío Alurageek

Este desafío es uno de los desafíos propuestos en la formación Front-end del programa Alura ONE (Oracle Next Education) y consiste en una página web (Alurageek) que muestra productos obtenidos de un servidor mediante fetch GET. También permite agregar un nuevo producto mediante fetch POST y eliminar productos de la lista con fetch DELETE.

## Funcionalidades

- Visualización de productos desde un servidor ya sea local implemetado con json-server o un servidor en linea en este caso proporcionado por firebase de Google..
- Agregado de nuevos productos a la lista.
- Eliminación de productos existentes.

## Instalación

1. Clona este repositorio en tu máquina local.
2. Abre una terminal en la raíz del proyecto.
3. Instalación de Node.js:

- Ve al sitio web oficial de Node.js:

<https://www.nodejs.org>

- Descarga la versión recomendada para tu sistema operativo.
- Ejecuta el instalador descargado y sigue las instrucciones del instalador.
- Marca la opción "Instalar herramientas de línea de comandos de Node.js" para utilizar Node.js desde la terminal.

4. Instalación de json-server:

- Abre una terminal.
- Instala json-server globalmente utilizando npm (Node Package Manager):

      npm install -g json-server

5. Iniciar el servidor JSON:

- En la misma terminal, navega al directorio donde clonaste el repositorio.
- Ejecuta el siguiente comando para iniciar el servidor en el puerto 3001:

      npx json-server --watch db.json --port 3001

6. Accede a la página:

- Una vez que el servidor esté en funcionamiento, puedes acceder a la página a través del archivo index.html en la carpeta del repositorio o si quieres puedes acceder directamente a los datos del servidor a través de la url generada automáticamente por json-server. Por ejemplo,

<http://localhost:3001/productos>

7. Si todo a ido bien deberías ver una página como esta con los productos ya mostrandose:

![Página Alurageek](./alurageek.jpg)
