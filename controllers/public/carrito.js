//funcion para el spinner de aumentar o disminuir cantidad de productos

document.addEventListener('DOMContentLoaded', function () {
    const incrementBtns = document.querySelectorAll('.incrementBtn');
    const decrementBtns = document.querySelectorAll('.decrementBtn');
    const cantidadProductos = document.querySelectorAll('.cantidadProducto');
    const preciosProductos = document.querySelectorAll('.precioProducto');
    const descuentosProductos = document.querySelectorAll('.descuentoP');
    const subtotalElement = document.getElementById('subtotal');
    const descuentoElement = document.getElementById('descuento');
    const totalElement = document.getElementById('total');

    incrementBtns.forEach((incrementBtn, index) => {
        incrementBtn.addEventListener('click', function () {
            const cantidadProducto = cantidadProductos[index];
            const precioProducto = parseFloat(preciosProductos[index].textContent.replace('$', ''));
            const valorActual = parseInt(cantidadProducto.value);
            cantidadProducto.value = valorActual + 1;
            preciosProductos[index].textContent = '$' + calcularPrecioProducto(precioProducto, cantidadProducto.value, descuentosProductos[index]);
            calcularSubtotal();
            calcularDescuento();
            calcularTotal();
        });
    });

    decrementBtns.forEach((decrementBtn, index) => {
        decrementBtn.addEventListener('click', function () {
            const cantidadProducto = cantidadProductos[index];
            const precioProducto = parseFloat(preciosProductos[index].textContent.replace('$', ''));
            const valorActual = parseInt(cantidadProducto.value);
            if (valorActual > 1) {
                cantidadProducto.value = valorActual - 1;
                preciosProductos[index].textContent = '$' + calcularPrecioProducto(precioProducto, cantidadProducto.value, descuentosProductos[index]);
                calcularSubtotal();
                calcularDescuento();
                calcularTotal();
            }
        });
    });

   function calcularPrecioProducto(precioUnitario, cantidad) {
    return (precioUnitario * cantidad).toFixed(2);
}


    function calcularSubtotal() {
        let subtotal = 0;
        preciosProductos.forEach(precioProducto => {
            subtotal += parseFloat(precioProducto.textContent.replace('$', ''));
        });
        subtotalElement.textContent = '$' + subtotal.toFixed(2);
    }

    function calcularDescuento() {
        let descuentoTotal = 0;
        descuentosProductos.forEach(descuentoProducto => {
            descuentoTotal += parseFloat(descuentoProducto.textContent.replace('$', ''));
        });
        descuentoElement.textContent = '$' + descuentoTotal.toFixed(2);
    }

    function calcularTotal() {
        const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
        const descuento = parseFloat(descuentoElement.textContent.replace('$', ''));
        const total = subtotal - descuento;
        totalElement.textContent = '$' + total.toFixed(2);
    }

    // Calculamos el subtotal, descuento y total al cargar la página
    calcularSubtotal();
    calcularDescuento();
    calcularTotal();

});


document.addEventListener('DOMContentLoaded', function () {
    // Seleccionar todos los elementos con la clase 'precioProducto'
    const preciosProductos = document.querySelectorAll('.precioProducto');
    const descuentosProductos = document.querySelectorAll('.descuentoP');

    // Seleccionar el elemento con el ID 'subtotal'
    const subtotalElement = document.getElementById('subtotal');
    // Seleccionar el elemento con el ID 'descuento'
    const descuentoElement = document.getElementById('descuento');
    // Seleccionar el elemento con el ID 'total'
    const totalElement = document.getElementById('total');

    // Función para calcular el subtotal
    function calcularSubtotal() {
        let subtotal = 0;
        // Iterar sobre los elementos y sumar los valores numéricos
        preciosProductos.forEach(precioProducto => {
            // Obtener el valor numérico ignorando el signo de dólar
            const valorNumerico = parseFloat(precioProducto.textContent.replace('$', ''));
            // Sumar al subtotal
            subtotal += valorNumerico;
        });
        // Mostrar el subtotal en el elemento con el ID 'subtotal'
        document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2); // Agregar el signo de dólar nuevamente
    }

    // Función para calcular el descuento aplicado
    function calcularDescuento() {
        let descuentoTotal = 0;
        // Iterar sobre los elementos y sumar los valores numéricos
        descuentosProductos.forEach(descuentoProducto => {
            // Obtener el valor numérico ignorando el signo de dólar
            const valorNumerico = parseFloat(descuentoProducto.textContent.replace('$', ''));
            // Sumar al descuento total
            descuentoTotal += valorNumerico;
        });
        // Mostrar el descuento total en el elemento con el ID 'descuento'
        document.getElementById('descuento').textContent = '$' + descuentoTotal.toFixed(2); // Agregar el signo de dólar nuevamente
    }

    function calcularTotal() {
        // Obtener los valores numéricos de subtotal y descuento
        const subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
        const descuento = parseFloat(descuentoElement.textContent.replace('$', ''));

        // Calcular el total restando el descuento al subtotal
        const total = subtotal - descuento;

        // Mostrar el total en el elemento con el ID 'total'
        totalElement.textContent = '$' + total.toFixed(2); // Agregar el signo de dólar nuevamente
    }

    // Realizar todos los calculos al cargar la página
    calcularSubtotal();
    calcularDescuento();
    calcularTotal();
});


//Funcion para re calcular el total a pagar cuando un producto es quitado del carrito
document.addEventListener('DOMContentLoaded', function () {
    // Selección de todos los botones con la clase 'botonQuitarProducto'
    const botonesQuitarProducto = document.querySelectorAll('.botonQuitarProducto');

    // Agregar un evento clic a cada botón
    botonesQuitarProducto.forEach(boton => {
        boton.addEventListener('click', () => {
            // Encontrar el elemento padre (la tarjeta) del botón
            const tarjeta = boton.closest('.card');
            if (tarjeta) {
                // Obtener el precio del producto y el descuento de la tarjeta
                const precioProducto = parseFloat(tarjeta.querySelector('.precioProducto').textContent.replace('$', ''));
                const descuentoTarjeta = parseFloat(tarjeta.querySelector('.descuentoP').textContent.replace('$', ''));

                // Obtener el subtotal actual
                const subtotalActual = parseFloat(document.getElementById('subtotal').textContent.replace('$', ''));

                // Obtener el descuento total actual
                const descuentoTotalActual = parseFloat(document.getElementById('descuento').textContent.replace('$', ''));

                // Restar el precio del producto eliminado del subtotal actual
                const nuevoSubtotal = subtotalActual - precioProducto;

                // Restar el descuento de la tarjeta eliminada del descuento total actual
                const nuevoDescuentoTotal = descuentoTotalActual - descuentoTarjeta;

                // Actualizar el subtotal y el descuento total en la página
                document.getElementById('subtotal').textContent = '$' + nuevoSubtotal.toFixed(2);
                document.getElementById('descuento').textContent = '$' + nuevoDescuentoTotal.toFixed(2);

                // Calcular el nuevo total a pagar
                const nuevoTotal = nuevoSubtotal - nuevoDescuentoTotal;
                document.getElementById('total').textContent = '$' + nuevoTotal.toFixed(2);

                // Ocultar la tarjeta estableciendo su estilo de visualización a 'none'
                tarjeta.style.display = 'none';
            }
        });
    });
});