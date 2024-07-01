//? primera consigna

function calcularPrecioConDescuento(precioOriginal, porcentajeDescuento) {
    if (precioOriginal < 0 || porcentajeDescuento < 0 || porcentajeDescuento > 100) {
        return "Error: Ingresa valores válidos.";
    }
    
    let descuento = precioOriginal * (porcentajeDescuento / 100);
    let precioFinal = precioOriginal - descuento;
    return `El precio final de $${precioOriginal} con ${porcentajeDescuento}% de descuento es: $${precioFinal}`;
}

let precioOriginal = parseFloat(prompt("Ingresa el precio original del producto: "));
let porcentajeDescuento = parseFloat(prompt("Ingresa el porcentaje de descuento: "));

console.log(calcularPrecioConDescuento(precioOriginal, porcentajeDescuento));

//? segunda consigna

let saldo = 1000000;

function consultarSaldo() {
    return `Tu saldo actual es de $${saldo}`;
}

function depositarCantidad(cantidad) {
    saldo += cantidad;
    return `Se depositaron en la cuenta $${cantidad}. Tu saldo actual es de $${saldo}`;
}

function extraerCantidad(cantidad) {
    if (cantidad > saldo) {
        return `Saldo insuficiente en la cuenta`;
    } else {
        saldo -= cantidad;
        return `Retiraste $${cantidad}. Tu saldo actual es de: $${saldo}`;
    }
}

while (true) {
    let mensaje = "Bienvenido al cajero automático\n1. Consultar saldo\n2. Depositar dinero\n3. Retirar dinero\n4. Salir";
    let opcion = parseInt(prompt(mensaje + "\nSelecciona una opción: "));


    switch (opcion) {
        case 1:
            console.log(consultarSaldo());
            break;
        case 2:
            let cantidadDepositar = parseFloat(prompt("Ingresa la cantidad a depositar: "));
            console.log(depositarCantidad(cantidadDepositar));
            break;
        case 3:
            let cantidadRetirar = parseFloat(prompt("Ingresa la cantidad a retirar: "));
            console.log(extraerCantidad(cantidadRetirar));
            break;
        case 4:
            console.log("Gracias por utilizar el cajero automático.");
            break;
        default:
            console.log("Opción no válida. Por favor, selecciona una opción válida.");
            break;
    }

    if (opcion === 4) {
        break;
    }
}
