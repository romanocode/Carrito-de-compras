// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners () {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

}


//Fuciones
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
}

//Lee el contenido del HTML al que le dimos clicl y extrae la informacion del curso
function leerDatosCurso(curso){
   // console.log(curso);

        //crea un objeto con el contenido del curso
        const infoCurso={
            imagen: curso.querySelector('img').src,
            titulo: curso.querySelector('h4').textContent,
            precio: curso.querySelector('.precio span').textContent,
            id : curso.querySelector ('a').getAttribute('data-id'),
            cantidad : 1,
        }
        

        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

        console.log(articulosCarrito);

        carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //limpiar el HTML

    limpiarHTML();

    //RECORRE EL CARRITO Y GENERA EL HTML
    articulosCarrito.forEach(curso =>{
        const row = document.createElement('tr');
        row.innerHTML=`

            <td>
               <img src ="${curso.imagen}" width="100">
            </td>    
            <td>${curso.titulo}</td>   
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td> 
            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>
                
            </td>     
                
             
        `;

        //Agrega el HTML del carrito en el Tbody
        contenedorCarrito.appendChild(row);

        
    });

  
}

//Elimina los cursos del tbody
        function limpiarHTML(){
            //forma lenta
        contenedorCarrito.innerHTML= '';

           // while(contenedorCarrito.firstChild) {
             //   contenedorCarrito.removeChild(contenedorCarrito.firstChild)
           // }
        }  