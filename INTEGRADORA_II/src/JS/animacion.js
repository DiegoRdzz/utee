document.addEventListener("DOMContentLoaded", function() {
    const botonSesion = document.getElementById("boton_sesi");
    const botonRegistro = document.getElementById("boton_regis");
    const formularioLogin = document.getElementById("login");
    const formularioRegister = document.getElementById("register");

    botonSesion.addEventListener("click", function() {
        // Cambiar la clase active al botón de inicio de sesión
        botonSesion.classList.add("active");
        botonRegistro.classList.remove("active");

        // Mostrar el formulario de inicio de sesión y ocultar el de registro
        formularioLogin.classList.add("active");
        formularioRegister.classList.remove("active");
    });

    botonRegistro.addEventListener("click", function() {
        // Cambiar la clase active al botón de registro
        botonRegistro.classList.add("active");
        botonSesion.classList.remove("active");

        // Mostrar el formulario de registro y ocultar el de inicio de sesión
        formularioRegister.classList.add("active");
        formularioLogin.classList.remove("active");
    });
});