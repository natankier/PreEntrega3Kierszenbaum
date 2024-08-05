let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;

class Producto {
    constructor(id, nombre, precio) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

const productos = JSON.parse(localStorage.getItem('productos')) || [
    new Producto(1, 'Iphone 13 Pro Max', 999),
    new Producto(2, 'Iphone 14 Pro Max', 1199),
    new Producto(3, 'Iphone 15 Pro Max', 1399)
];

function actualizarSaldo() {
    document.getElementById('saldo').innerText = `Tu saldo actual es: $${saldo}`;
}

function mostrarProductos() {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    productos.forEach(producto => {
        const item = document.createElement('li');
        item.textContent = `${producto.nombre} - $${producto.precio}`;
        lista.appendChild(item);
    });
}

function guardarDatos() {
    localStorage.setItem('saldo', saldo);
    localStorage.setItem('productos', JSON.stringify(productos));
}

function crearInterface() {
    const app = document.getElementById('app');
    const template = `
        <h1>Cajero y Tienda Virtual</h1>
        <div class="container" id="saldo-section">
            <h2>Saldo</h2>
            <p id="saldo">Tu saldo actual es: $${saldo}</p>
        </div>
        <div class="container" id="acciones-bancarias">
            <h2>Acciones Bancarias</h2>
            <input type="number" id="monto" placeholder="Monto">
            <button id="depositar">Depositar</button>
            <button id="retirar">Retirar</button>
        </div>
        <div class="container" id="productos-section">
            <h2>Productos</h2>
            <ul id="lista-productos"></ul>
            <input type="text" id="nombreProducto" placeholder="Buscar producto por nombre">
            <button id="buscarProducto">Buscar Producto</button>
            <button id="comprarProducto">Comprar Producto</button>
        </div>
        <div id="resultado"></div>
        <div id="mensaje-agradecimiento"></div>
    `;
    app.innerHTML = template;
    mostrarProductos();
    actualizarSaldo();

    document.getElementById('depositar').addEventListener('click', depositar);
    document.getElementById('retirar').addEventListener('click', retirar);
    document.getElementById('buscarProducto').addEventListener('click', buscarProducto);
    document.getElementById('comprarProducto').addEventListener('click', comprarProducto);
}

function depositar() {
    const monto = parseFloat(document.getElementById('monto').value);
    const resultado = document.getElementById('resultado');
    if (!isNaN(monto) && monto > 0) {
        saldo += monto;
        actualizarSaldo();
        resultado.innerText = `Se depositaron $${monto}. Tu saldo actual es de $${saldo}.`;
        guardarDatos();
    } else {
        resultado.innerText = 'Por favor, ingresa un monto válido.';
    }
}

function retirar() {
    const monto = parseFloat(document.getElementById('monto').value);
    const resultado = document.getElementById('resultado');
    if (!isNaN(monto) && monto > 0 && monto <= saldo) {
        saldo -= monto;
        actualizarSaldo();
        resultado.innerText = `Has retirado $${monto}. Tu saldo actual es de $${saldo}.`;
        guardarDatos();
    } else {
        resultado.innerText = 'Por favor, ingresa un monto válido o verifica tu saldo.';
    }
}

function buscarProducto() {
    const nombre = document.getElementById('nombreProducto').value.toLowerCase();
    const resultado = document.getElementById('resultado');
    const producto = productos.find(p => p.nombre.toLowerCase().includes(nombre));
    resultado.innerText = producto
        ? `Producto encontrado: ${producto.nombre} - $${producto.precio}`
        : 'Producto no encontrado.';
}

function comprarProducto() {
    const nombre = document.getElementById('nombreProducto').value.toLowerCase();
    const resultado = document.getElementById('resultado');
    const mensajeAgradecimiento = document.getElementById('mensaje-agradecimiento');
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre);
    if (producto) {
        if (saldo >= producto.precio) {
            saldo -= producto.precio;
            actualizarSaldo();
            resultado.innerText = `Has comprado ${producto.nombre} por $${producto.precio}.`;
            mensajeAgradecimiento.innerText = 'Gracias por comprar con nosotros.';
            guardarDatos();
        } else {
            resultado.innerText = 'Saldo insuficiente para comprar este producto.';
            mensajeAgradecimiento.innerText = '';
        }
    } else {
        resultado.innerText = 'Producto no encontrado.';
        mensajeAgradecimiento.innerText = '';
    }
}

document.addEventListener('DOMContentLoaded', crearInterface);
