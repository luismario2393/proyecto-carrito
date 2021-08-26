// variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const cursos = document.querySelector('#cursos');

let articulosCarrito = [];

document.addEventListener('DOMContentLoaded', () => {

  cursos.addEventListener('click', agregarCurso);

  carrito.addEventListener('click', eliminarCurso)

  vaciarCarrito.addEventListener('click', () => {
    
    articulosCarrito = [];

    limpiarHTML();
  })
});



function agregarCurso(e) {
  e.preventDefault()

  if(e.target.classList.contains('ponlo')) {
    const selectedCourse = e.target.parentElement.parentElement;
    leerInfoCurso(selectedCourse);
  }
}

function leerInfoCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('.main-img img').src,
    nombre: curso.querySelector('h3').textContent,
    precio: curso.querySelector('.promo').textContent,
    id: curso.querySelector('button').getAttribute('data-id'),
    cantidad: 1
  }
  
  
  const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
  if(existe) {
    
    const cursos = articulosCarrito.map( curso => {
      if(curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; 
      } else {
        return curso; 
      }

    });

    articulosCarrito = [...cursos];

  } else {
    
    articulosCarrito = [...articulosCarrito, infoCurso];
  }


  insertarHTML();
}

function eliminarCurso(e) {

  if(e.target.classList.contains('borrar')) {
    
    const cursoId = e.target.getAttribute('data-id');
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    insertarHTML();
  }


}

function insertarHTML() {

  limpiarHTML();

  articulosCarrito.forEach( curso => {
    
    const {imagen, nombre, precio, cantidad, id} = curso;

    const row = document.createElement('tr');
    row.classList.add('orden')
    row.innerHTML = `
      <td>
        <img src="${imagen}" width="100">
      </td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td>
        <a href="#" class="borrar" data-id="${id}" > X </a>
      </td>
    
    `;

    contenedorCarrito.appendChild(row)

  })
}

function limpiarHTML() {
  while(contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}