let user_name = document.querySelector("#input_user_name");
let password = document.querySelector("#input_password");
let btn_login = document.querySelector("#btn_login");

let btn_signup = document.querySelector("#btn_signup");
let name_signup = document.querySelector("#name");
let email_signup = document.querySelector("#email");
let username_signup = document.querySelector("#user_name");
let password_signup = document.querySelector("#password");
let confirm_password_signup = document.querySelector("#confirm_password");

function login(form) {
    form.preventDefault();
    console.log("Funcionou");

    window.location.href = "./lista.html"
}

function cadastro(form) {
    form.preventDefault();
    console.log("cadastro");

    if(name_signup.value == "" || email_signup.value == "" || username_signup.value == "" || password_signup.value == "" || confirm_password_signup.value == "") {
        alert("Erro. Preencha todos os campos.");
        return;
    }

    /* Se o e-mail registrado já foi usado (checar no BD se já tem um campo com esse e-mail), impedir um novo cadastro e emitir um alerta */
    /* Se o username registrado já foi usado (checar no BD se já tem um campo com esse username), impedir um novo cadastro e emitir um alerta */
    

    if(password_signup.value != confirm_password_signup.value) {
        alert("Erro. As senhas devem ser iguais");
        return;
    }

    alert("Cadastro realizado com sucesso")
}

if(btn_login) {
    btn_login.addEventListener('click', login);
} else if(btn_signup) {
    btn_signup.addEventListener('click', cadastro);
}