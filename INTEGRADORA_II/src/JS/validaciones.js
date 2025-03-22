document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login form");
    const registerForm = document.querySelector("#register form");

    if (loginForm) {
        loginForm.addEventListener("submit", validarLogin);
    }
    if (registerForm) {
        registerForm.addEventListener("submit", validarRegistro);
    }

    function validarLogin(event) {
        event.preventDefault(); // Evita el envío si hay errores
    
        const emailInput = loginForm.querySelector("input[type='email']");
        const passwordInput = loginForm.querySelector("input[type='password']");
    
        limpiarError(emailInput);
        limpiarError(passwordInput);
    
        let valido = true;
    
        if (!validarEmail(emailInput.value)) {
            mostrarError(emailInput, "Por favor, ingresa un correo válido.");
            valido = false;
        }
    
        if (passwordInput.value.length < 6) {
            mostrarError(passwordInput, "La contraseña debe tener al menos 6 caracteres.");
            valido = false;
        }
    
        /*if (valido) {
            alert("Inicio de sesión exitoso.");
            setTimeout(() => {
                loginForm.submit();
            }, 2000); // Espera 2 segundos antes de enviar el formulario
        }*/
    }
    

    function validarRegistro(event) {
        event.preventDefault(); 

        const nombreInput = registerForm.querySelector("input[type='text']");
        const emailInput = registerForm.querySelector("input[type='email']");
        const passwordInput = registerForm.querySelector("input[type='password']");

        limpiarError(nombreInput);
        limpiarError(emailInput);
        limpiarError(passwordInput);

        let valido = true;

        if (nombreInput.value.trim().length < 3) {
            mostrarError(nombreInput, "El nombre debe tener al menos 4 caracteres.");
            valido = false;
        }

        if (!validarEmail(emailInput.value)) {
            mostrarError(emailInput, "Por favor, ingresa un correo válido.");
            valido = false;
        }

        if (!validarPassword(passwordInput.value)) {
            mostrarError(passwordInput, "La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, un número y un carácter especial.");
            valido = false;
        }

        /*if (valido) {
            alert("Registro exitoso.");
            registerForm.submit();
        }*/
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validarPassword(password) {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
        return regex.test(password);
    }

    function mostrarError(input, mensaje) {
        input.classList.add("input-error");

        let mensajeError = input.nextElementSibling;
        if (!mensajeError || !mensajeError.classList.contains("mensaje-error")) {
            mensajeError = document.createElement("div");
            mensajeError.classList.add("mensaje-error");
            input.parentNode.insertBefore(mensajeError, input.nextSibling);
        }
        
        mensajeError.textContent = mensaje;
        mensajeError.classList.add("visible");

        // ❗ Elimina el mensaje después de 4 segundos
        setTimeout(() => {
            limpiarError(input);
        }, 4000);
    }

    function limpiarError(input) {
        input.classList.remove("input-error");

        let mensajeError = input.nextElementSibling;
        if (mensajeError && mensajeError.classList.contains("mensaje-error")) {
            mensajeError.classList.remove("visible");
            mensajeError.textContent = "";
        }
    }
});
