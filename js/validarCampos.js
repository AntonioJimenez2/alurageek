//funcion validar datos del producto

function validarNombre(nombre, imagen, precio) {
  const parrafoNombre = document.querySelector(".parrafo-nombre");
  const parrafoImagen = document.querySelector(".parrafo-imagen");
  const parrafoPrecio = document.querySelector(".parrafo-precio");
  const regexNombre = /^[a-zA-Z\s']+$/;
  const regexImagen = /\.(jpeg|jpg|png|bmp|svg)$/i;
  const regexPrecio = /^\d+(\.\d{2})?$/;

  parrafoNombre.innerText = "";
  parrafoImagen.innerText = "";
  parrafoPrecio.innerText = "";
  let nombreValido = true;
  let imagenValida = true;
  let precioValido = true;

  if (nombre.length < 3 || !regexNombre.test(nombre)) {
    parrafoNombre.innerText = "Introduzca un nombre válido.";
    nombreValido = false;
  }
  if (!regexImagen.test(imagen)) {
    parrafoImagen.innerText = "Introduzca una url válida.";
    imagenValida = false;
  }

  if (!regexPrecio.test(precio)) {
    parrafoPrecio.innerText = "Introduzca un precio válido.";
    precioValido = false;
  }

  return nombreValido && imagenValida && precioValido;
}

export const validarCampos = {
  validarNombre
};
