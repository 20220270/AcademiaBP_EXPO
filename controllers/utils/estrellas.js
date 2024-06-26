//Almacenamos todos los objetos que tienen la clase star
const stars = document.querySelectorAll('.star');

//Aquí irá la variable para almacenar la cantidad de estrellas seleccionadas
const ratingText = document.getElementById('calificacion');

//Función para pintar y despintar las estrellas a las que se les de click
stars.forEach(function(star, index){
    star.addEventListener('click', function(){
        //Aquí las pinta dependiendo el index de la estrella
        for(let i = 0; i<=index; i++)
        {
            stars[i].classList.add('checked');
        }
        //Aquí las despinta dependiendo el index de la estrella
        for(let i = index + 1; i< stars.length; i++)
        {
            stars[i].classList.remove('checked');
        }
        //Se almacena la cantidad de estrellas seleccionadas
        ratingText.value = (index + 1).toString();
    })
});


