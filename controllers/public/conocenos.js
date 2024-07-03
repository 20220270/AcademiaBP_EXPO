const VALORES_API = 'services/admin/valores.php';
const ALIADOS_API = 'services/admin/aliados.php';
const STAFF_API = 'services/admin/staff.php';
const ENTRENAMIENTO_API = 'services/admin/entrenamiento.php';
const NIVELES_ENTRENAMIENTO_API = 'services/admin/nivelesentrenamiento.php';
const CATEGORIA_ALUMNO_API = 'services/admin/categoriasalumnos.php';

const TITULO_SECCION1 = document.getElementById('sectionTitle');
const TITULO_SECCION2 = document.getElementById('sectionTitle2');
const TITULO_SECCION3 = document.getElementById('sectionTitle3');
const TITULO_SECCION4 = document.getElementById('sectionTitle4');
const TITULO_SECCION5 = document.getElementById('sectionTitle5');
const TITULO_SECCION6 = document.getElementById('sectionTitle6');

CARD_VALORES = document.getElementById('cardValores');
CARD_ALIADOS = document.getElementById('cardAliados');
CARD_STAFF = document.getElementById('cardStaff');
CARD_LUGARESHORARIOS = document.getElementById('cardLugaresHorarios');
CARD_NIVELES_ENTRENAMIENTO = document.getElementById('cardImgsNiveles');
CARD_NIVELES_ENTRENAMIENTO2 = document.getElementById('cardImgsNiveles2');

document.addEventListener("DOMContentLoaded", async () => {
    loadTemplate();
    await loadValoresData();
    await loadAliadosData();
    await loadStaffData();
    await loadLugaresHorariosData();
    await loadCategoriasFormativo();
    await loadCategoriasCompetitivo();
});

//Funcion para traer los valores
async function loadValoresData() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION1.textContent = 'Nuestros valores';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(VALORES_API, 'readAll');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_VALORES.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Crea la estructura de cada tarjeta de valor
                let card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 mb-4 mx-auto">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/valores/${row.imagen_valor}" class="card-img-top rounded-4" alt="${row.nombre_valor}">
                            <div class="card-body">
                                <h5 class="card-title">${row.nombre_valor}</h5>
                                <p class="card-text">${row.descripcion_valor}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 3 || index === DATA.dataset.length - 1) {
                    CARD_VALORES.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

//Funcion para traer los aliados
async function loadAliadosData() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION2.textContent = 'Nuestros aliados';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(ALIADOS_API, 'readAll');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_ALIADOS.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Crea la estructura de cada tarjeta de valor
                let card = `
                     <div class="col-sm-6 col-md-3 col-lg-2 mb-4 mx-auto text-center">
                        <div class="custom-card h-100 ">
                            <img src="${SERVER_URL}images/aliados/${row.imagen_aliado}" class="card-img-top rounded-circle border border-dark border-4" alt="${row.nombre_aliado}" height="220px">
                            <div class="card-body">
                                <h5 class="card-title">${row.nombre_aliado}</h5>
                            </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 4 || index === DATA.dataset.length - 1) {
                    CARD_ALIADOS.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

//Funcion para traer los miembros del staff
async function loadStaffData() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION3.textContent = 'Nuestros staff';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(STAFF_API, 'readAll');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_STAFF.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Crea la estructura de cada tarjeta de valor
                let card = `
                     <div class="col-sm-6 col-md-3 col-lg-3 mb-4 mx-auto text-center">
                        <div class="card h-100 ">
                            <img src="${SERVER_URL}images/staff/${row.imagen_staff}" class="card-img-top rounded-4" alt="${row.nombre_completo}"  height="350px">
                            <div class="card-body">
                                <h5 class="card-title">${row.nombre_completo}</h5>
                                <p>${row.descripcion_extra}</p>
                            </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 4 || index === DATA.dataset.length - 1) {
                    CARD_STAFF.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

//Funcion para traer los lugares y horarios de entrenamiento
async function loadLugaresHorariosData() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION4.textContent = 'Nuestros entrenamientos';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(ENTRENAMIENTO_API, 'readAllHorariosLugares');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_LUGARESHORARIOS.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Divide los horarios en una lista y los envuelve en <li> elementos
                let horariosList = row.horarios.split('\n').map(horario => `<li>${horario}</li>`).join('');

                // Crea la estructura de cada tarjeta de valor
                let card = `
                    <div class="col-lg-4 col-md-6 col-sm-12 mb-4 text-center">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/lugares_entreno/${row.imagen_lugar}" class="card-img-top" alt="${row.nombre_lugar}" height="300px">
                            <div class="card-body d-flex flex-column mb-3">
                                <h4 class="card-title">${row.nombre_lugar}</h4>
                                <p class="card-text flex-grow-1">
                                    <span class="d-block text-start mx-3">Horarios de entrenamiento:</span>
                                    <ul class="text-start fw-bold mt-2">${horariosList}</ul>
                                </p>
                                <div class="container text-center mt-4">
                                    <div class="row align-items-center">
                                        <div class="col text-end">
                                            <span>¿Cómo llegar?</span>
                                        </div>
                                        <div class="col text-start">
                                            <a href="${row.URL_lugar}">
                                                <img src="../../resources/images/llegar.png" alt="..." width="25px" height="25px">
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 4 || index === DATA.dataset.length - 1) {
                    CARD_LUGARESHORARIOS.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

async function loadCategoriasFormativo() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION5.textContent = 'Nuestros niveles formativos';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'readAllAlumnosFormativo');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_NIVELES_ENTRENAMIENTO.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Crea la estructura de cada tarjeta de valor
                let card = `
                     <div class="col-sm-6 col-md-3 col-lg-3 mb-4 mx-auto text-center">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/alumnos_categorias/${row.imagen_categoria}" class="card-img-top rounded-4" alt="${row.categoria}"  height="350px">
                            <div class="carousel-caption d-none d-md-block">
                            <div class="carousel-caption-text">
                                <h5>${row.categoria}</h5>
                                
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 4 || index === DATA.dataset.length - 1) {
                    CARD_NIVELES_ENTRENAMIENTO.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            MAIN_TITLE.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}

async function loadCategoriasCompetitivo() {
    try {
        // Cambia el título de la sección
        TITULO_SECCION6.textContent = 'Nuestros niveles competitivos';

        // Realiza la petición para obtener los valores
        const DATA = await fetchData(CATEGORIA_ALUMNO_API, 'readAllAlumnosCompetitivo');

        // Verifica si la respuesta es satisfactoria
        if (DATA.status) {
            // Inicializa el contenedor de valores
            CARD_NIVELES_ENTRENAMIENTO2.innerHTML = '';

            // Variables para controlar el carrusel
            let isActive = 'active';
            let rowContent = '';
            let counter = 0;

            // Itera sobre cada valor en el conjunto de datos
            DATA.dataset.forEach((row, index) => {
                // Crea la estructura de cada tarjeta de valor
                let card = `
                     <div class="col-sm-6 col-md-3 col-lg-4 mb-4 mx-auto text-center">
                        <div class="card h-100">
                            <img src="${SERVER_URL}images/alumnos_categorias/${row.imagen_categoria}" class="card-img-top rounded-4" alt="${row.categoria}"  height="350px">
                            <div class="carousel-caption d-none d-md-block">
                            <div class="carousel-caption-text">
                                <h5>${row.categoria}</h5>
                                
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>
                `;

                // Agrega la tarjeta al contenido de la fila actual
                rowContent += card;
                counter++;

                // Cada 4 tarjetas, crea un nuevo item del carrusel
                if (counter === 3 || index === DATA.dataset.length - 1) {
                    CARD_NIVELES_ENTRENAMIENTO2.innerHTML += `
                        <div class="carousel-item ${isActive}">
                            <div class="row">
                                ${rowContent}
                            </div>
                        </div>
                    `;
                    // Reinicia las variables para la próxima fila
                    rowContent = '';
                    counter = 0;
                    isActive = ''; // Solo el primer item debe tener la clase "active"
                }
            });
        } else {
            // Si no hay datos, muestra un mensaje de error en el título principal
            TITULO_SECCION6.textContent = DATA.error;
        }
    } catch (error) {
        console.error('Error al cargar los valores:', error);
    }
}




