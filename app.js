document.addEventListener('DOMContentLoaded', function () {
    // Oculta la imagen, título y aviso al cargar la página
    document.querySelector('.resultado').style.display = 'none';
    document.querySelector('.boton-copiar').style.display = 'none';
});

// Selecciona el campo de texto de entrada y salida en el HTML
const campo_texto = document.querySelector("#texto-encriptar");
const campo_respuesta = document.querySelector("#campo-mensaje");

document.getElementById('texto-encriptar').addEventListener('input', function () {
    var inputValue = this.value;

    if (inputValue.trim() === '') {
        // Texto está vacío, muestra elementos en la caja costado
        document.querySelector('.imagen-muñeco').style.display = 'block';
        document.querySelector('.titulo-faltatexto').style.display = 'block';
        document.querySelector('.aviso-faltatexto').style.display = 'block';
        document.querySelector('.resultado').style.display = 'none';
        document.querySelector('.boton-copiar').style.display = 'none';
    } else {
        // Texto está presente, muestra el textarea de respuesta y el botón
        document.querySelector('.imagen-muñeco').style.display = 'none';
        document.querySelector('.titulo-faltatexto').style.display = 'none';
        document.querySelector('.aviso-faltatexto').style.display = 'none';
        document.querySelector('.resultado').style.display = 'block';
        document.querySelector('.boton-copiar').style.display = 'block';
    }
});

// Matriz de código para la encriptación y desencriptación
const matriz_code = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"],
];

document.getElementById('texto-encriptar').addEventListener('input', function () {
    var inputValue = this.value;

    if (/^[a-z\s]+$/.test(inputValue)) {
        // El texto ingresado es válido (solo minúsculas y espacios)
        console.log('Texto válido:', inputValue);
    } else {
        this.value = '';
    }
});


// Resto del código sigue igual
function btnEncriptar() {
    // Obtiene el texto encriptado y lo muestra en el campo de respuesta
    const texto = encriptar(campo_texto.value);
    campo_respuesta.value = texto;
}

function encriptar(fraseEncriptada) {
    for (let i = 0; i < matriz_code.length; i++) {
        if (fraseEncriptada.includes(matriz_code[i][0])) {
            fraseEncriptada = fraseEncriptada.replaceAll(
                matriz_code[i][0],
                matriz_code[i][1]
            );
        }
    }
    return fraseEncriptada;
}

function btnDesencriptar() {
    const texto = desencriptar(campo_texto.value);
    campo_respuesta.value = texto;
}

function desencriptar(fraseDesencriptada) {
    for (let i = 0; i < matriz_code.length; i++) {
        if (fraseDesencriptada.includes(matriz_code[i][1])) {
            fraseDesencriptada = fraseDesencriptada.replaceAll(
                matriz_code[i][1],
                matriz_code[i][0]
            );
        }
    }
    return fraseDesencriptada;
}

function btnCopiar() {
    const botonCopiar = document.getElementById('boton-copiar');
    const textoACopiar = document.getElementById('campo-mensaje').value;

    navigator.clipboard.writeText(textoACopiar)
        .then(() => {
            botonCopiar.style.backgroundColor = 'green';
            botonCopiar.style.color = 'white';
            setTimeout(() => {
                botonCopiar.style.backgroundColor = '';
                botonCopiar.style.color = '';
            }, 1500);
        })
        .catch((error) => {
            botonCopiar.style.backgroundColor = 'red';
            botonCopiar.style.color = 'white';
            setTimeout(() => {
                botonCopiar.style.backgroundColor = '';
                botonCopiar.style.color = '';
            }, 1500);
            console.error("Error al copiar al portapapeles: ", error);
        });
}

function borrarPlaceholder() {
    const campo_texto = document.getElementById('texto-encriptar');
    campo_texto.placeholder = '';
}
