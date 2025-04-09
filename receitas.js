let btn_open = document.querySelector("#btn_open");
let btn_close = document.querySelector(".close");

function abrirModal() {
    document.getElementById("meuModal").style.display = "block";
}

function fecharModal() {
    document.getElementById("meuModal").style.display = "none";
}

// Fecha o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById("meuModal");
    if (event.target === modal) {
      fecharModal();
    }
}

btn_open.addEventListener("click", abrirModal);
btn_close.addEventListener("click", fecharModal);