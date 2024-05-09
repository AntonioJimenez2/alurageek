import { conexionAPI } from "./conexionAPI.js";
import { validarCampos } from "./validarCampos.js";


let urlApi = "http://localhost:3001/productos/";
let urlApiBorrar = "http://localhost:3001/productos/";

//constantes

const contenedorProductos = document.querySelector(".contenedor-productos");
const parrafoEnviar = document.querySelector(".parrafo-enviar");
const botonLimpiar = document.querySelector(".input-limpiar");
const formulario = document.querySelector("[data-formulario]");
const parrafoNombre = document.querySelector(".parrafo-nombre");
const parrafoImagen = document.querySelector(".parrafo-imagen");
const parrafoPrecio = document.querySelector(".parrafo-precio");


//seleccionar servidor local u online

let activarServerOnline = confirm("¿Desea usar el servidor online?");
if (activarServerOnline) {
  urlApi = "https://alurageek-c323e-default-rtdb.firebaseio.com/productos.json";
  urlApiBorrar = "https://alurageek-c323e-default-rtdb.firebaseio.com/productos/";
}

botonLimpiar.addEventListener("click", () => {
  parrafoEnviar.style.display = "none";
  parrafoNombre.innerText=""
  parrafoImagen.innerText=""
  parrafoPrecio.innerText=""
});


//crear tarjeta de producto

function crearCard(nombre, imagen, precio, id) {
  const cardProducto = `<div class="card-producto" data-index="${id}">
            <figure>
              <div class="contenedor-imagen"><img class="imagen-producto" src="${imagen}" alt="${nombre}"/></div>
              <figcaption class="nombre-producto">${nombre}</figcaption>
            </figure>
            <span class="contenedor-precio">
              <p>$ ${precio}</p>
              <img class="trash-icon" src="./imagenes/trash.png"/>
            </span>
          </div>`;
  return cardProducto;
}


//mostrar los productos en la página

mostrarProductos();
async function mostrarProductos() {
  try {
    const productos = await conexionAPI.listarProductos(urlApi);

    if (productos === null) {
      throw new Error("Error de conexión");
    }

    console.log(productos);
    if (activarServerOnline) {
      // Obtener las claves numéricas como un array
      const identificadores = Object.keys(productos);
      // Iterar sobre las claves y acceder a los valores
      identificadores.forEach(id => {
        const producto = productos[id];
        console.log(producto);
        console.log(id);
        contenedorProductos.innerHTML += crearCard(
          producto.nombre,
          producto.imagen,
          producto.precio,
          id
        );
      });
    } else {
      productos.forEach(producto => {
        contenedorProductos.innerHTML += crearCard(
          producto.nombre,
          producto.imagen,
          producto.precio,
          producto.id
        );
      });
    }
    return;
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    contenedorProductos.innerHTML = `<p class="parrafo-error-contenedor">Error con la conexión.</p>`;

    return null;
  }
}


//validar campos
formulario.addEventListener("submit", evento => {
  evento.preventDefault();
  const nombre = document.querySelector("[data-nombre-producto]").value;
  const imagen = document.querySelector("[data-imagen-producto]").value;
  const precio = document.querySelector("[data-precio-producto]").value;
  if(validarCampos.validarNombre(nombre, imagen, precio)){
    agregarProducto(nombre, imagen, precio)
  }
  });

//agregar producto

async function agregarProducto(nombre, imagen, precio) {
  try {
    const nuevoProducto = await conexionAPI.enviarProducto(
      nombre,
      imagen,
      precio,
      urlApi
    );
    if (nuevoProducto === null) {
      throw new Error("Ocurrió un error al intentar agregar el producto");
    }
    console.log(`producto agregado: ${nuevoProducto}`);
    //mensaje agregado en parrafo
    parrafoEnviar.innerText = "Producto agregado con éxito";
    parrafoEnviar.style.color = "green";
    parrafoEnviar.style.display = "block";
    //vaciar contenedor y volverlo a cargar con el producto agregado
    contenedorProductos.innerHTML = "";
    mostrarProductos();
    return;
  } catch (error) {
    console.log(`Error al agregar el producto: ${error}`);
    parrafoEnviar.innerText = "Error al intentar agregar el producto";
    parrafoEnviar.style.color = "red";
    parrafoEnviar.style.display = "block";
  }
}



// eliminar tarjeta de producto

contenedorProductos.addEventListener("click", evento =>
  eliminarProductos(evento)
);

async function eliminarProductos(evento) {
  if (evento.target.classList.contains("trash-icon")) {
    // buscar el elemento abuelo "card-producto" y obtener su data-index
    const elementoPadre = evento.target.parentElement;
    const elementoAbuelo = elementoPadre.parentElement;
    let idProducto = elementoAbuelo.getAttribute("data-index");
    console.log(`id de producto a eliminar ${idProducto}`);
    if (activarServerOnline) {
      idProducto = `${idProducto}.json`;
    }

    try {
      const productoEliminar = await conexionAPI.eliminarProducto(
        idProducto,
        urlApiBorrar
      );
      if (productoEliminar === null) {
        throw new Error("Error al intentar eliminar el producto");
      }
      alert("Producto eliminado con éxito");
      elementoAbuelo.remove();
      return;
    } catch (error) {
      alert(`Ocurrió un error al intentar eliminar el producto.`);
      return null;
    }
  }
}


