

function calcularPrecioConDescuento(precioOriginal, porcentajeDescuento) {
    if (precioOriginal < 0 || porcentajeDescuento < 0 || porcentajeDescuento > 100  ||  isNaN(cantidad)) {
        return "Error: Ingresa valores válidos.";
    }
    
    let descuento = precioOriginal * (porcentajeDescuento / 100);
    let precioFinal = precioOriginal - descuento;
    return `El precio final de $${precioOriginal} con ${porcentajeDescuento}% de descuento es: $${precioFinal}`;
}

let precioOriginal = parseFloat(prompt("Ingresa el precio original del producto: "));
let porcentajeDescuento = parseFloat(prompt("Ingresa el porcentaje de descuento: "));

console.log(calcularPrecioConDescuento(precioOriginal, porcentajeDescuento));



let saldo = 1000000;

// Función para consultar saldo
function consultarSaldo() {
    return `Tu saldo actual es de $${saldo}`;
}

// Función para depositar cantidad
function depositarCantidad(cantidad) {
    if (isNaN(cantidad) || cantidad <= 0) {
        return "Error: Ingresa una cantidad válida para depositar.";
    }
    saldo += cantidad;
    return `Se depositaron en la cuenta $${cantidad}. Tu saldo actual es de $${saldo}`;
}

// Función para extraer cantidad
function extraerCantidad(cantidad) {
    if (isNaN(cantidad) || cantidad <= 0) {
        return "Error: Ingresa una cantidad válida para retirar.";
    }
    if (cantidad > saldo) {
        return `Saldo insuficiente en la cuenta`;
    } else {
        saldo -= cantidad;
        return `Retiraste $${cantidad}. Tu saldo actual es de: $${saldo}`;
    }
}

// Array de objetos para almacenar información del simulador (ejemplo: productos)
let productos = [
    { id: 1, nombre: 'Iphone 13 Pro Max', precio: 999 },
    { id: 2, nombre: 'Iphone 14 Pro Max', precio: 1199 },
    { id: 3, nombre: 'Iphone 15 Pro Max', precio: 1399 }
];

// Función para mostrar productos
function mostrarProductos() {
    let mensaje = 'Productos disponibles:\n';
    productos.forEach(producto => {
        mensaje += `${producto.id}. ${producto.nombre} - $${producto.precio}\n`;
    });
    return mensaje;
}

// Función para buscar producto por nombre
function buscarProducto(nombre) {
    let productoEncontrado = productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    return productoEncontrado ? `Producto encontrado: ${productoEncontrado.nombre} - $${productoEncontrado.precio}` : 'Producto no encontrado';
}

// Función principal del cajero automático
function cajeroAutomatico() {
    while (true) {
        let mensaje = "Bienvenido al cajero automático\n1. Consultar saldo\n2. Depositar dinero\n3. Retirar dinero\n4. Ver productos\n5. Buscar producto\n6. Salir";
        let opcion = parseInt(prompt(mensaje + "\nSelecciona una opción: "));

        if (isNaN(opcion) || opcion < 1 || opcion > 6) {
            alert("Opción no válida. Por favor, selecciona una opción válida.");
            continue;
        }

        switch (opcion) {
            case 1:
                alert(consultarSaldo());
                break;
            case 2:
                let cantidadDepositar = parseFloat(prompt("Ingresa la cantidad a depositar: "));
                alert(depositarCantidad(cantidadDepositar));
                break;
            case 3:
                let cantidadRetirar = parseFloat(prompt("Ingresa la cantidad a retirar: "));
                alert(extraerCantidad(cantidadRetirar));
                break;
            case 4:
                alert(mostrarProductos());
                break;
            case 5:
                let nombreProducto = prompt("Ingresa el nombre del producto a buscar: ");
                alert(buscarProducto(nombreProducto));
                break;
            case 6:
                alert("Gracias por utilizar el cajero automático.");
                return;
        }
    }
}

// Iniciar el cajero automático
cajeroAutomatico();