document.addEventListener("DOMContentLoaded", () => {
  inicializarPerfil();
  configurarEdicaoDadosPerfil(); // apenas campos editáveis
  configurarMudancaSenha();
});

function inicializarPerfil() {
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
}

function configurarEdicaoDadosPerfil() {
  const senhaArmazenada = localStorage.getItem("senha");
  // const senhaArmazenada = 123

  // Seleciona apenas os botões de editar que tenham um span com classe 'info-value' (evita o botão de mudar senha)
  const editarBtns = document.querySelectorAll(".info-item .editar-btn");

  editarBtns.forEach((btn) => {
    const valueSpan = btn.parentElement.querySelector(".info-value");
    if (!valueSpan) return; // Ignora se não for um campo de edição de dado (ex: mudar senha)

    btn.addEventListener("click", async () => {
      const parent = btn.parentElement;

      if (btn.textContent === "Salvar") {
        const input = parent.querySelector("input[type='text']");
        const senhaInput = parent.querySelector("input[type='password']");
        const newValue = input.value;
        const senhaInserida = senhaInput.value;

        if (senhaInserida !== senhaArmazenada) {
          alert("Senha incorreta. As alterações não foram salvas.");
          return;
        }

        let emailUsuario = localStorage.getItem("email")
        let nomeCompleto = localStorage.getItem("nomeCompleto")
        let nomeUsuario = localStorage.getItem("nomeUsuario")
        const senhaUsuario = localStorage.getItem("senha")


        // Atualiza o valor no localStorage e variaveis locais
        if (valueSpan.id === "nomeCompleto") {
          localStorage.setItem("nomeCompleto", newValue);
          nomeCompleto = newValue;
        } else if (valueSpan.id === "nomeUsuario") {
          localStorage.setItem("nomeUsuario", newValue);
          nomeUsuario = newValue;
        } else if (valueSpan.id === "emailUsuario") {
          localStorage.setItem("email", newValue);
          emailUsuario = newValue;
        }

        // Atualiza a interface
        valueSpan.textContent = newValue;
        valueSpan.style.display = "inline";
        input.remove();
        senhaInput.remove();
        btn.textContent = "Editar";

        // Atualizar DB
        const dados = {
            email: emailUsuario,
            nomeCompleto: nomeCompleto,
            nomeUsuario: nomeUsuario,
            senha: senhaUsuario
        };

        fetch('http://localhost:3000/perfil/:alterdados', {
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
        })
        .catch(err => {
            alert("Erro: " + err.message);
        });

      } else {
        // Modo edição
        const currentValue = valueSpan.textContent;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentValue;
        input.className = "edit-input";

        const senhaInput = document.createElement("input");
        senhaInput.type = "password";
        senhaInput.placeholder = "Digite sua senha";
        senhaInput.className = "senha-input";

        valueSpan.style.display = "none";
        parent.insertBefore(input, btn);
        parent.insertBefore(senhaInput, btn);
        btn.textContent = "Salvar";
      }
    });
  });
}

function configurarMudancaSenha() {
  const mudarSenhaBtn = document.getElementById("mudarSenhaBtn");

  mudarSenhaBtn.addEventListener("click", () => {
    const parent = mudarSenhaBtn.parentElement;
    const senhaArmazenada = localStorage.getItem("senha");
    // const senhaArmazenada = 123

    if (mudarSenhaBtn.textContent === "Salvar") {
      const senhaAntigaInput = parent.querySelector(".senha-antiga-input");
      const novaSenhaInput = parent.querySelector(".nova-senha-input");
      const confirmarSenhaInput = parent.querySelector(".confirmar-senha-input");

      const senhaAntiga = senhaAntigaInput.value;
      const novaSenha = novaSenhaInput.value;
      const confirmarSenha = confirmarSenhaInput.value;

      if (senhaAntiga !== senhaArmazenada) {
        alert("Senha antiga incorreta.");
        return;
      }

      if (!novaSenha || novaSenha.length < 4) {
        alert("A nova senha deve ter pelo menos 4 caracteres.");
        return;
      }

      if (novaSenha !== confirmarSenha) {
        alert("As novas senhas não coincidem.");
        return;
      }

      // Atualiza senha
      localStorage.setItem("senha", novaSenha);
      alert("Senha alterada com sucesso!");

      // Atualizar DB

        const emailUsuario = localStorage.getItem("email")
        const nomeCompleto = localStorage.getItem("nomeCompleto")
        const nomeUsuario = localStorage.getItem("nomeUsuario")

        const dados = {
            email: emailUsuario,
            nomeCompleto: nomeCompleto,
            nomeUsuario: nomeUsuario,
            senha: novaSenha
        };

        fetch('http://localhost:3000/perfil/:altersenha', {
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
        })
        .catch(err => {
            alert("Erro: " + err.message);
        });

      // Limpa campos
      senhaAntigaInput.remove();
      novaSenhaInput.remove();
      confirmarSenhaInput.remove();
      mudarSenhaBtn.textContent = "Mudar Senha";
    } else {
      // Cria inputs
      const senhaAntigaInput = document.createElement("input");
      senhaAntigaInput.type = "password";
      senhaAntigaInput.placeholder = "Senha atual";
      senhaAntigaInput.className = "senha-antiga-input";

      const novaSenhaInput = document.createElement("input");
      novaSenhaInput.type = "password";
      novaSenhaInput.placeholder = "Nova senha";
      novaSenhaInput.className = "nova-senha-input";

      const confirmarSenhaInput = document.createElement("input");
      confirmarSenhaInput.type = "password";
      confirmarSenhaInput.placeholder = "Confirmar nova senha";
      confirmarSenhaInput.className = "confirmar-senha-input";

      parent.insertBefore(senhaAntigaInput, mudarSenhaBtn);
      parent.insertBefore(novaSenhaInput, mudarSenhaBtn);
      parent.insertBefore(confirmarSenhaInput, mudarSenhaBtn);
      mudarSenhaBtn.textContent = "Salvar";
    }
  });
}
