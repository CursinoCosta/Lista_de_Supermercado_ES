// import { getUsuario } from './dbFunctions.js';

// document.addEventListener('DOMContentLoaded', async () => {
//     const emailSalvo = localStorage.getItem('usuarioEmail');

//     if (!emailSalvo) {
//         alert('Usuário não está logado.');
//         window.location.href = 'login.html';
//         return;
//     }

//     try {
//         const usuario = await getUsuario(emailSalvo);

//         if (!usuario) {
//             alert('Usuário não encontrado.');
//             return;
//         }

//         // Preenche os campos com os dados do usuário
//         document.getElementById('nomeCompleto').textContent = usuario.nomeCompleto;
//         document.getElementById('nomeUsuario').textContent = usuario.nomeUsuario;
//         document.getElementById('emailUsuario').textContent = usuario.email;

//         // Adiciona eventos de edição
//         document.querySelectorAll('.editar-btn').forEach(button => {
//             button.addEventListener('click', () => {
//                 const infoItem = button.parentElement;
//                 const span = infoItem.querySelector('.info-value');
//                 const valorAtual = span.textContent;

//                 if (button.textContent === 'Editar') {
//                     const input = document.createElement('input');
//                     input.type = 'text';
//                     input.value = valorAtual;
//                     input.className = 'input-editar';
//                     infoItem.replaceChild(input, span);
//                     button.textContent = 'Salvar';
//                 } else {
//                     const input = infoItem.querySelector('input');
//                     const novoValor = input.value;
//                     const novoSpan = document.createElement('span');
//                     novoSpan.className = 'info-value';
//                     novoSpan.textContent = novoValor;
//                     infoItem.replaceChild(novoSpan, input);
//                     button.textContent = 'Editar';
//                 }
//             });
//         });

//     } catch (erro) {
//         console.error('Erro ao carregar dados do usuário:', erro);
//         alert('Erro ao carregar dados do perfil.');
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
  const nomeCompleto = localStorage.getItem("nomeCompleto");
  const nomeUsuario = localStorage.getItem("nomeUsuario");
  const email = localStorage.getItem("email");

  if (!email || !nomeCompleto || !nomeUsuario) {
    alert("Usuário não autenticado.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("nomeCompleto").textContent = nomeCompleto;
  document.getElementById("nomeUsuario").textContent = nomeUsuario;
  document.getElementById("emailUsuario").textContent = email;
});

