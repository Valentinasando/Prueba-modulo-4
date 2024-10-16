//Codigo para mi arrays de productos
const productosElement = document.querySelectorAll('.producto');

const productos = [];

productosElement.forEach((producto) => {
    const imagen = producto.querySelector('img').src;
    const titulo = producto.querySelector('.card-title').textContent;
    const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
    productos.push({
        imagen,
        titulo,
        precio,
    });
});


//const para seleccionar el boton de añadir en mis cards
const botonesAgregar = document.querySelectorAll('.boton-agregar');

//Array para el carro
const carrito = [];

//Evento en el boton para que cada vez que se pinche en el html se agregue un producto
const carritoComprasElement = document.getElementById('carrito-compras');

botonesAgregar.forEach((boton, indice) => {
    boton.addEventListener('click', () => {
      const producto = productos[indice];
      const existeEnCarrito = carrito.find((productoEnCarrito) => productoEnCarrito.titulo === producto.titulo);
  
      if (existeEnCarrito) {
        if (existeEnCarrito.cantidad < 10) {
          existeEnCarrito.cantidad++;
        } else {
          alert('No hay más stock de este producto');
        }
      } else {
        carrito.push({ ...producto, cantidad: 1 });
      }
  
      actualizarCarrito();
    });
  });
  
  //Carrito de compras desde js

    function actualizarCarrito() {
        carritoComprasElement.innerHTML = '';
        carrito.forEach((producto, indice) => {
          const productoHTML = ` 
            <div class="producto-carrito d-flex align-items-center ">
              <div class="d-inline ms-3 me-3">
                <img src="${producto.imagen}" alt="${producto.titulo}" width="60" class="rounded float-start">
              </div>
              <div class="d-block me-5">
                <h6>${producto.titulo}</h6>
                <p>Precio: $${producto.precio}</p>
                <p>Subtotal: $${producto.precio * producto.cantidad}</p>
              </div>
              <div class="d-flex justify-content-end ms-5">
                <button class="boton-restar btn btn-dark me-3" data-indice="${indice}">-</button>
                <h4 class="me-2">${producto.cantidad}</h4>
                <button class="boton-sumar btn btn-dark ms-2 me-2" data-indice="${indice}">+</button>
                <button class="boton-eliminar btn btn-dark me-2" data-indice="${indice}">Eliminar</button>
              </div>
            </div>
          `;
          carritoComprasElement.insertAdjacentHTML('beforeend', productoHTML);
        });
      
        const total = carrito.reduce((acumulador, producto) => {
          return acumulador + (producto.precio * producto.cantidad);
        }, 0);
      
        const totalHTML = ` 
          <h5>Total: $${total}</h5> 
          <button id="boton-pagar" class="btn btn-dark ms-3">Pagar</button> 
        `;
        carritoComprasElement.insertAdjacentHTML('beforeend', totalHTML);
      
        agregarEventos();
      }
      
      //Eventos para los botones de agregar, restar y eliminar
      function agregarEventos() {
        const botonesRestar = document.querySelectorAll('.boton-restar');
        const botonesSumar = document.querySelectorAll('.boton-sumar');
        const botonesEliminar = document.querySelectorAll('.boton-eliminar');
      
        botonesRestar.forEach((boton) => {
          boton.addEventListener('click', (event) => {
            event.stopPropagation();
            const indice = parseInt(boton.dataset.indice);
            const producto = carrito[indice];
            if (producto.cantidad > 1) {
              producto.cantidad--;
              actualizarCarrito();
            }
          });
        });
      
        botonesSumar.forEach((boton) => {
            boton.addEventListener('click', (event) => {
              event.stopPropagation();
              const indice = parseInt(boton.dataset.indice);
              const producto = carrito[indice];
          
              if (producto.cantidad < 10) {
                producto.cantidad++;
              } else {
                alert('No hay más stock de este producto');
              }
          
              actualizarCarrito();
            });
          });
          
        botonesEliminar.forEach((boton) => {
          boton.addEventListener('click', (event) => {
            event.stopPropagation();
            const indice = parseInt(boton.dataset.indice);
            carrito.splice(indice, 1);
            actualizarCarrito();
          });
        });
      
        //alerta para cerrar el boton

        document.getElementById('boton-pagar').addEventListener('click', (event) => {
            event.stopPropagation();
            const total = carrito.reduce((acumulador, producto) => {
              return acumulador + (producto.precio * producto.cantidad);
            }, 0);
          
            if (total === 0) {
              alert('No puedes realizar una compra por $0. Agrega algunos gatitos al carrito!');
            } else {
              const confirmacion = confirm('¿Estás seguro de que no deseas seguir agregando gatitos?');
              if (confirmacion) {
                alert('Gracias por tu compra!');
              }
            }
          });
        }
          
          
      


  
