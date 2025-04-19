// let btn_open = document.querySelector(".btn_open");
// let btn_close = document.querySelector(".close");

// function abrirModal() {
//     document.getElementById("meuModal").style.display = "block";
// }

// function fecharModal() {
//     document.getElementById("meuModal").style.display = "none";
// }

// // Fecha o modal se o usuário clicar fora do conteúdo
// window.onclick = function(event) {
//     const modal = document.getElementById("meuModal");
//     if (event.target === modal) {
//       fecharModal();
//     }
// }

// btn_open.addEventListener("click", abrirModal);
// btn_close.addEventListener("click", fecharModal);

// // Função para direcionar cadastros (Temporaria)
// function verificarCadastro() {
//     const estaCadastrado = localStorage.getItem('usuarioCadastrado');

//     if (estaCadastrado === 'true') {
//         // Redireciona para o perfil
//         window.location.href = 'perfil.html';
//     } else {
//         // Redireciona para o cadastro
//         window.location.href = 'cadastro.html';
//     }
// }

// Seleciona todos os botões de abrir
const openButtons = document.querySelectorAll(".btn_open");

// Seleciona todos os botões de fechar (ícones ×)
const closeButtons = document.querySelectorAll(".close");

// Abre o modal correspondente ao botão clicado
openButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modalId = button.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    });
});

// Fecha o modal correspondente
closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener("click", () => {
        const modal = closeBtn.closest(".modal");
        modal.style.display = "none";
    });
});

// Fecha o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
    }
}
