// Inicializa saldo y carrito desde localStorage
let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;

class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para actualizar el saldo en la interfaz
function actualizarSaldo() {
    $('#saldo').text(`Tu saldo actual es: $${saldo}`);
}

// Función para mostrar productos en la interfaz
function mostrarProductos() {
    const $lista = $('#productos-section .card-container');
    const $template = $('#producto-template').contents();

    $lista.empty();
    productos.forEach(producto => {
        const $card = $template.clone();
        $card.find('img').attr('src', producto.imagen).attr('alt', `Imagen de ${producto.nombre}`);
        $card.find('h3').text(producto.nombre);
        $card.find('p').text(`Precio: $${producto.precio}`);
        $card.find('.agregar-carrito').on('click', () => agregarAlCarrito(producto.id));
        $lista.append($card);
    });
}

// Función para guardar datos en localStorage
function guardarDatos() {
    localStorage.setItem('saldo', saldo);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar productos desde un archivo JSON
function cargarProductos() {
    $.getJSON('./productos.json') // Cambia la ruta si es necesario
        .done(data => {
            productos.length = 0; // Limpiar productos actuales
            data.forEach(productoData => {
                productos.push(new Producto(productoData.id, productoData.nombre, productoData.precio, productoData.imagen));
            });
            mostrarProductos(); // Actualizar la vista con los nuevos productos
        })
        .fail(error => console.error('Error cargando productos:', error));
}

// Función para crear la interfaz inicial
function crearInterface() {
    mostrarProductos();
    actualizarSaldo();

    $('#depositar').on('click', depositar);
    $('#retirar').on('click', retirar);
    $('#vaciar-carrito').on('click', vaciarCarrito);
    $('#comprar-carrito').on('click', comprarCarrito);
    actualizarCarrito();
    cargarProductos();

    // Manejo del evento para eliminar productos del carrito
    $('#lista-carrito').on('click', '.eliminar-carrito', function() {
        const index = $(this).data('index');
        eliminarDelCarrito(index);
    });
}

// Función para manejar el depósito de saldo
function depositar() {
    const monto = parseFloat($('#monto').val());
    if (isNaN(monto) || monto <= 0) {
        mostrarMensajeError('Por favor ingrese un monto válido para depositar.');
        return;
    }
    saldo += monto;
    actualizarSaldo();
    guardarDatos();
}

// Función para manejar el retiro de saldo
function retirar() {
    const monto = parseFloat($('#monto').val());
    if (isNaN(monto) || monto <= 0) {
        mostrarMensajeError('Por favor ingrese un monto válido para retirar.');
        return;
    }
    if (monto > saldo) {
        mostrarMensajeError('No tienes suficiente saldo para retirar esta cantidad.');
        return;
    }
    saldo -= monto;
    actualizarSaldo();
    guardarDatos();
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
    }
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarMensajeError('El carrito ya está vacío.'); // Mostrar mensaje si el carrito ya está vacío
        return;
    }

    carrito = [];
    actualizarCarrito();
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const $listaCarrito = $('#lista-carrito');
    const $totalCarrito = $('#total-carrito');
    $listaCarrito.empty();
    let total = 0;

    if (carrito.length === 0) {
        $listaCarrito.append('<p>Carrito vacío</p>'); // Mensaje si el carrito está vacío
    } else {
        carrito.forEach((item, index) => {
            const $li = $(`
                <li>
                    ${item.nombre} - $${item.precio} 
                    <button class="eliminar-carrito" data-index="${index}">Eliminar</button>
                </li>
            `);
            $listaCarrito.append($li);
            total += item.precio;
        });
    }

    $totalCarrito.text(`Total: $${total}`);
    guardarDatos();
}

// Función para mostrar mensajes de error
function mostrarMensajeError(mensaje) {
    const $resultado = $('#resultado');
    $resultado.text(mensaje).css('color', 'red');
    setTimeout(() => $resultado.text(''), 3000); // Limpiar mensaje después de 3 segundos
}

// Función para mostrar mensajes de éxito
function mostrarMensajeExito(mensaje) {
    const $resultado = $('#resultado');
    $resultado.text(mensaje).css('color', 'green');
    setTimeout(() => $resultado.text(''), 5000); // Limpiar mensaje después de 5 segundos
}

// Función para manejar la compra del carrito
function comprarCarrito() {
    if (carrito.length === 0) {
        mostrarMensajeError('El carrito está vacío. Añade productos al carrito antes de comprar.');
        return;
    }

    const totalCarrito = carrito.reduce((acc, item) => acc + item.precio, 0);

    if (totalCarrito > saldo) {
        mostrarMensajeError('No tienes suficiente saldo para completar la compra.');
        return;
    }

    saldo -= totalCarrito;
    carrito = [];
    actualizarSaldo();
    actualizarCarrito();
    guardarDatos();
    mostrarMensajeExito('¡Gracias por tu compra!'); // Mostrar mensaje de agradecimiento
}

// Inicia la interfaz cuando el DOM esté cargado
$(document).ready(crearInterface);
