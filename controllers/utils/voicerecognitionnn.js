//Reconocimiento de voz para una tercera barra de busqueda dentro de una pantalla


// Verifica si el navegador soporta la API de reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Configura el idioma según tus necesidades

    const micButton = document.getElementById('microphone-button3'); //llamamos al ícono del micrófono
    const searchInput = document.getElementById('Buscador3'); //Llamamos a la barra de búsuqeda

    micButton.addEventListener('click', () => {
        recognition.start(); //Aquí se inicializa el metodo de reconocimiento de voz
    });

    //La función por defecto nos devuelve el texto dicho en letras mayúsuculas, por lo que debemos convertirlas a letras minúsculas
    //También la función agrega un punto cuando hemos terminado de hablar, por lo que también debemos removerlo
    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript.toLowerCase(); // Convertir a minúsculas
        transcript = transcript.replace(/\.$/, ''); // Eliminar el punto al final si existe
        searchInput.value = transcript; //Se asigna al input el valor que hemos dicho
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
        console.log('Speech recognition service disconnected');
    };
} else {
    console.error('Speech recognition not supported in this browser');
}
