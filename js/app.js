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

    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML();
    })

}


//Fuciones
function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
        
    }
}

//Elimina un curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo de articulo carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iterar sobre el carrito y mostrar su HTML
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
        
        //Revisar si un elemento ya existe en el carrito
        const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
        if (existe){
            //actualizamos la cantidad
            const curso = articulosCarrito.map( curso => {
                if(curso.id===infoCurso.id){

                curso.cantidad++;
                return curso; //retorna el objeto actualizado
                }  else {
                return curso; //retorna los objetos que no son los duplicados
         }

        });

         articulosCarrito = [...curso];
        } else {
            //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        }

        

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