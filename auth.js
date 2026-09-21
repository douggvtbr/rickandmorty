document.addEventListener("DOMContentLoaded", () => {
    let msg = document.getElementById("msg-box");
    let user = document.getElementById("user");
    let password = document.getElementById("password");
    let registro = document.getElementById("registro"); 
    let login = document.getElementById("login");

    console.log("auth.js cargado correctamente");
    if (registro) {
        registro.addEventListener("submit", (e) => {
            e.preventDefault(); 

            let regexUser = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
            let regexPassword = /^[A-Z](?=.*[._\-*@#$%/])[A-Za-z0-9._\-*@#$%/]{6,}$/;
            let errors = [];

            if (!regexUser.test(user.value)) {
                msg.classList.remove("hidden");
                msg.classList.add("border-red-500", "bg-red-500", "text-white");
                errors.push("El usuario debe contener solo letras y no puede estar vacío.");
            }

            if (!regexPassword.test(password.value)) {
                msg.classList.remove("hidden");
                msg.classList.add("border-red-500", "bg-red-500", "text-white");
                errors.push("La contraseña debe comenzar con Mayúscula, contener un carácter especial y 7+ caracteres.");
            }

            if (errors.length > 0) {
                msg.innerHTML = errors.join("<br>");
                return; 
            }
                   
            let users = JSON.parse(localStorage.getItem("users")) || [];

            let usuarioExiste = users.some(u => u.username.toLowerCase() === user.value.toLowerCase());

            if (usuarioExiste) {
                msg.classList.remove("hidden");
                msg.classList.add("border-red-500", "bg-red-500", "text-white");
                msg.innerHTML = "El usuario ya existe. Intenta con otro nombre.";
                return;
            }

            // se crea el objeto con sus datos y se inicializan los arreglos de favoritos y ratings
            let nuevoUsuario = {
                username: user.value.trim(),
                password: password.value.trim(),
                favorites: [],
                ratings: {}
            };

            // Guardamos el objeto dentro del arreglo
            users.push(nuevoUsuario);

            // Convertimos el arreglo completo a texto JSON y lo guardamos
            localStorage.setItem("users", JSON.stringify(users));

            // Mensaje de éxito 
            msg.classList.remove("hidden", "border-red-500", "bg-red-500", "text-white");
            msg.classList.add("border-green-500", "bg-green-500", "text-black");
            msg.innerHTML = "¡Registro exitoso! Redirigiendo a Iniciar Sesión...";

            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        });
    }

    if (login) {
        console.log("Login form detected");
        login.addEventListener("submit", (e) => {
        e.preventDefault();

        const msg = document.getElementById("msg-box");
        const loginUser = document.getElementById("login-user").value.trim();
        const loginPassword = document.getElementById("login-password").value.trim();

        // Obtenemos la lista de los usuario registrados en el localstorage o un array vacio
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Buscamos que coincida con su usuario y contraseña
        const usuarioEncontrado = users.find(
        (u) => u.username.toLowerCase() === loginUser.toLowerCase() && u.password === loginPassword
        );
        // mensaje de error en caso de no encontrar coincidencia
        if (!usuarioEncontrado) {
        msg.classList.remove("hidden");
        msg.className = "text-[9px] p-3 mb-4 border-2 border-red-500 bg-red-500 text-white";
        msg.innerHTML = "Usuario o contraseña incorrectos.";
        return;
        }

        // Creamos la sesion
        localStorage.setItem("currentUser", JSON.stringify({ username: usuarioEncontrado.username }));

        // Mensaje de exito 
        msg.classList.remove("hidden");
        msg.className = "text-[9px] p-3 mb-4 border-2 border-green-500 bg-green-500 text-black";
        msg.innerHTML = "¡Acceso concedido! Entrando...";

        setTimeout(() => {
        window.location.href = "index.html";
        }, 1200);
    });
    }
});