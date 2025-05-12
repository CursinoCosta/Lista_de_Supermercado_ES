document.addEventListener('DOMContentLoaded', () => {
    const emailDoUsuario = localStorage.getItem('email');
    const areaRecipesElement = document.querySelector('.area_recipes');

    if (emailDoUsuario && areaRecipesElement) {
        fetch(`http://localhost:3000/receitas/${emailDoUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(receitas => {
                if (receitas && receitas.length > 0) {
                    receitas.forEach(receita => {
                        const receitaDiv = document.createElement('div');
                        receitaDiv.classList.add('recipe-card');
                        receitaDiv.dataset.receitaId = receita.ReceitaID;
                        receitaDiv.style.cursor = 'pointer';

                        const nomeReceitaH3 = document.createElement('h3');
                        nomeReceitaH3.textContent = receita.NomeReceita;

                        const categoriaSpan = document.createElement('span');
                        categoriaSpan.textContent = `Categoria: ${receita.Categoria}`;

                        receitaDiv.appendChild(nomeReceitaH3);
                        receitaDiv.appendChild(categoriaSpan);

                        areaRecipesElement.appendChild(receitaDiv);

                        receitaDiv.addEventListener('click', () => {
                            exibirDetalhesReceita(receita.ReceitaID, receita.NomeReceita); // Passa o nome da receita
                        });
                    });
                } else {
                    const mensagemNenhumaReceita = document.createElement('p');
                    mensagemNenhumaReceita.textContent = 'Nenhuma receita encontrada.';
                    areaRecipesElement.appendChild(mensagemNenhumaReceita);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar as receitas:', error);
                const mensagemErro = document.createElement('p');
                mensagemErro.textContent = 'Erro ao carregar as receitas.';
                areaRecipesElement.appendChild(mensagemErro);
            });
    } else {
        console.log('Usuário não logado ou elemento de área de receitas não encontrado.');
    }

    function exibirDetalhesReceita(receitaId, nomeReceita) { // Recebe o nome da receita
        fetch(`http://localhost:3000/receita/${receitaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(detalhes => {
                console.log('Detalhes da receita:', detalhes);
                exibirModalDetalhes(nomeReceita, detalhes); // Passa o nome da receita para exibirModalDetalhes
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes da receita:', error);
            });
    }

    function exibirModalDetalhes(nomeReceita, detalhes) {
        const modal = document.createElement('div');
        modal.classList.add('recipe-modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-button');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        const receitaNomeTitulo = document.createElement('h2');
        receitaNomeTitulo.textContent = nomeReceita;

        const ingredientesTitulo = document.createElement('h4');
        ingredientesTitulo.textContent = 'Ingredientes:';

        const listaIngredientes = document.createElement('ul');
        detalhes.ingredientes.forEach(ingrediente => {
            const itemLista = document.createElement('li');
            itemLista.textContent = `${ingrediente.Ingrediente} - ${ingrediente.Quantidade} ${ingrediente.UnidadeMedida}`;
            listaIngredientes.appendChild(itemLista);
        });

        const modoPreparoTitulo = document.createElement('h4');
        modoPreparoTitulo.textContent = 'Modo de Preparo:';

        const modoPreparoParagrafo = document.createElement('p');
        modoPreparoParagrafo.textContent = detalhes.instrucao;

        modalContent.appendChild(closeButton);
        modalContent.appendChild(receitaNomeTitulo);
        modalContent.appendChild(ingredientesTitulo);
        modalContent.appendChild(listaIngredientes);
        modalContent.appendChild(modoPreparoTitulo);
        modalContent.appendChild(modoPreparoParagrafo);

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Fechar o modal ao clicar fora dele
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
});