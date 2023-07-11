function load(){
    cambiarTema();
    mostrarHora();
    latitudLongitud();
    validarform();
    validarLogin();
    ready();
    aumentar();
    disminuir();
}

//funcion para cambiar a modo oscuro
const cambiarTema = () => {
    var element = document.body;
    element.dataset.bsTheme =
    element.dataset.bsTheme == "dark" ? "light" : "dark";
}

//Funcion Para ver la Hora
function mostrarHora() {
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    var time = h + ":" + m + ":" + s;
    document.getElementById("miReloj").innerText = time;
    document.getElementById("miReloj").textContent = time;

    setTimeout(mostrarHora, 1000);
}

mostrarHora();


//API CLIMA

function latitudLongitud(posicion) {
    const latitud = posicion.coords.latitude;
    const longitud = posicion.coords.longitude;
    const appiKey = "be464cbb53e1e91ac8514a4b17b5cd72";
    const unidadMedida = "metric";
    const comunaHtml = document.getElementById("comuna");
    const tiempo = document.querySelector(".tiempo");

    fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitud}&longitude=${longitud}&localityLanguage=es`
    )
        .then((response) => response.json())
        .then((data) => {
            const comuna = data.locality;
            comunaHtml.innerHTML += comuna;
        });

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${appiKey}&units=${unidadMedida}`
    )
        .then((response) => response.json())
        .then((data) => {
            const iconoTiempo = document.createElement("img");
            console.log(tiempo);
            const iconoTiempoUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            iconoTiempo.src = iconoTiempoUrl;
            tiempo.appendChild(iconoTiempo);
            comunaHtml.innerHTML += " " + Math.round(data.main.temp) + "°C";
        });
}

navigator.geolocation.getCurrentPosition(latitudLongitud);


//Funcion para validar formularios
function validarform() {
    var datosCorrectos = true;
    var error = "";
    nombre = document.getElementById("txtNombre").value;
    apellido = document.getElementById("txtApellido").value;
    correo = document.getElementById("txtEmail").value;
    contraseña = document.getElementById("txtContraseña").value;


    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //datos del usuario
    if (nombre == "" && apellido == "" && correo == "" && contraseña == "") {
        document.getElementById("txtNombre").style.borderColor = "red";
        document.getElementById("txtApellido").style.borderColor = "red";
        document.getElementById("txtEmail").style.borderColor = "red";
        document.getElementById("txtContraseña").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Esta vacio el formulario";
    }

    else if (nombre == "") {
        document.getElementById("txtNombre").focus();
        document.getElementById("txtNombre").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo nombre";
    }


    else if (apellido == "") {
        document.getElementById("txtApellido").focus();
        document.getElementById("txtApellido").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo apellido";
    }

    else if (correo == "") {
        document.getElementById("txtEmail").focus();
        document.getElementById("txtEmail").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo correo";
    }

    else if (!exp.test(document.getElementById("txtEmail").value)) {
        document.getElementById("txtEmail").focus();
        document.getElementById("txtEmail").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Email Invalido";
    }

    else if (contraseña == "") {
        document.getElementById("txtContraseña").focus();
        document.getElementById("txtContraseña").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo contraseña";
    }

    else if (contraseña.length < 8) {
        document.getElementById("txtContraseña").focus();
        document.getElementById("txtContraseña").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n El campo contraseña debe de tener mas de 8 caracteres ";
    }

    //Aqui manda el mensaje diciendo el error
    if (error != '') {
        alert('El formulario dice:' + error);
    } else {
        return true;
    }
}

//funcion para validar login
function validarLogin() {
    var datosCorrectos = true;
    var error = "";
    email = document.getElementById("txtUser").value;
    password = document.getElementById("txtPass").value;

    var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //datos del usuario
    if (email == "" && password == "") {
        document.getElementById("txtUser").style.borderColor = "red";
        document.getElementById("txtPass").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Los campos estan vacios";
    }
    else if (email == "") {
        document.getElementById("txtUser").focus();
        document.getElementById("txtUser").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo correo";
    }

    else if (!exp.test(document.getElementById("txtUser").value)) {
        document.getElementById("txtUser").focus();
        document.getElementById("txtUser").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Email Invalido";
    }

    else if (password == "") {
        document.getElementById("txtPass").focus();
        document.getElementById("txtPass").style.borderColor = "red";
        datosCorrectos = false;
        error = "\n Llene el campo contraseña";
    }

    if (error != '') {
        alert('El formulario dice:' + error);
    } else {
        return true;
    }
}


//funcion para aumentar o disminuir la cantidad de productos

// Obtener referencias a los elementos HTML
const botonesSumar = document.querySelectorAll('[data-accion="sumar"]');
const botonesRestar = document.querySelectorAll('[data-accion="restar"]');
const inputsResultado = document.querySelectorAll('.input-resultado');

// Establecer los valores iniciales de los inputs
inputsResultado.forEach(function (input) {
    input.value = 0;
});

// Función para sumar 1 al input correspondiente
function sumarUno(event) {
    const boton = event.target;
    const inputId = boton.getAttribute('data-target');
    const input = document.getElementById(inputId);
    let valorActual = parseInt(input.value);
    if (valorActual < 0) {
        // Si el valor es negativo, establecerlo en 0
        input.value = 0;
    } else {
        input.value = valorActual + 1;
    }
}

// Función para restar 1 al input correspondiente
function restarUno(event) {
    const boton = event.target;
    const inputId = boton.getAttribute('data-target');
    const input = document.getElementById(inputId);
    let valorActual = parseInt(input.value);
    if (valorActual > 0) {
        input.value = valorActual - 1;
    }
}

// Agregar eventos de clic a los botones de suma
botonesSumar.forEach(function (boton) {
    boton.addEventListener('click', sumarUno);
});

// Agregar eventos de clic a los botones de resta
botonesRestar.forEach(function (boton) {
    boton.addEventListener('click', restarUno);
});


/* Funcion para ocultar contraseña */

function password(){
    let input = document.getElementById("txtPass");

    if (input.type == "password") {
        input.type = "text";
        document.getElementById("ocultar").style.display = "inline";
        document.getElementById("mostrar").style.display = "none";
    }else{
        input.type = "password";
        document.getElementById("ocultar").style.display = "none";
        document.getElementById("mostrar").style.display = "inline";
    }
}