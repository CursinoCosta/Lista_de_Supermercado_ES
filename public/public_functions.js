console.log("Arquivo public_functions.js carregado.");

// Função para logout
function realizarLogout() {
    // Seta a tag 'usuarioCadastrado' como false no localStorage
    localStorage.setItem('usuarioCadastrado', 'false');

    // Redireciona para a página de login
    window.location.href = 'login.html';
}

// Associa a função ao botão de logout quando o DOM for carregado
document.addEventListener('DOMContentLoaded', function () {
    const botaoLogout = document.getElementById('exit');
    if (botaoLogout) {
        botaoLogout.addEventListener('click', realizarLogout);
    }
});