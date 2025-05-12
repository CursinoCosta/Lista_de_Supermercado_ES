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

    const dados = {
        nomeUsuario: user_name.value,
        senha: password.value
    };

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        console.log(res);  
        if (!res.ok) {
            return res.json().then(data => {
                throw new Error(data.mensagem || 'Erro ao fazer login');
            });
        }
        return res.json();
    })
    .then(data => {
        console.log(data);  
        alert(data.mensagem);

        // Armazena informações do usuário no localStorage
        localStorage.setItem('usuarioCadastrado', 'true');
        localStorage.setItem('nomeUsuario', data.usuario.nomeUsuario);     // username
        localStorage.setItem('nomeCompleto', data.usuario.nomeCompleto);   // nome completo
        localStorage.setItem('email', data.usuario.email);                 // e-mail
        localStorage.setItem('senha', data.usuario.senha);

        window.location.href = "perfil.html";
    })
    .catch(err => {
        console.log(err);  
        alert("Erro: " + err.message);
    });
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

    const dados = {
        email: email_signup.value,
        nomeCompleto: name_signup.value,
        nomeUsuario: username_signup.value,
        senha: password_signup.value
    };

    fetch('http://localhost:3000/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(data => {
                throw new Error(data.mensagem || 'Erro ao cadastrar');
            });
        }
        return res.json();
    })
    .then(data => {
        alert(data.mensagem);
        localStorage.setItem('usuarioCadastrado', 'true');
        localStorage.setItem('nomeUsuario', username_signup.value); // Guarda o nome de usuário
        localStorage.setItem('nomeCompleto', name_signup.value); // Guarda o nome completo
        localStorage.setItem('email', email_signup.value); // Guarda o e-mail
        localStorage.setItem('senha', password_signup.value);
        window.location.href = "perfil.html"; // ou login.html, dependendo do fluxo
    })
    .catch(err => {
        alert("Erro: " + err.message);
    });

    //alert("Cadastro realizado com sucesso")
}

if(btn_login) {
    btn_login.addEventListener('click', login);
} else if(btn_signup) {
    btn_signup.addEventListener('click', cadastro);
}