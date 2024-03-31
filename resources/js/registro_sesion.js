const container = document.getElementById('container');

const registrarBtn = document.getElementById('registrarse');

const iniciarBtn = document.getElementById('iniciar_sesion');

registrarBtn.addEventListener('click', () => {
    container.classList.add("active");
});

iniciarBtn.addEventListener('click', () => {
    container.classList.remove("active");
});