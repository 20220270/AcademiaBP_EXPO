//funcion para el spinner de aumentar o disminuir cantidad de productos

document.addEventListener('DOMContentLoaded', function () {
    const incrementBtn = document.getElementById('incrementBtn'); //boton de incrementar el valor
    const decrementBtn = document.getElementById('decrementBtn'); //boton de disminuir el valor
    const cantidadProducto = document.querySelector('.cantidadProducto'); //texto de la cantidad dentro del input

    incrementBtn.addEventListener('click', function () {
        //cuando se de clic en el boton para aumentar el valor, 
        //el valor de la cantidad aumentará en una unidad
        cantidadProducto.value = parseInt(cantidadProducto.value) + 1; 

    });

    decrementBtn.addEventListener('click', function () {
        //cuando se de clic en el boton para disminuir el valor,
        //el valor será reducido en una unidad
        const value = parseInt(cantidadProducto.value) - 1; 
        //En el caso en que el valor del input sea 1 y se vuelva a dar clic, es decir se intente colocar un 0 o un numero negativo
        //el input mostrará siempre un 1
        cantidadProducto.value = value > 0 ? value : 1;
    });

    // Obtenemos todos los botones con la clase botonQuitarProducto
    const botonesQuitarProducto = document.querySelectorAll('.botonQuitarProducto');

    // Agregamos un evento clic a cada botón
    botonesQuitarProducto.forEach(boton => {
        boton.addEventListener('click', () => {
            // Obtenemos el modal asociado al botón
            const modal = boton.closest('.modal');
            // Ocultamos el modal
            if (modal) {
                const modalBootstrap = new bootstrap.Modal(modal);
                modalBootstrap.hide();
            }
        });
    });
});
