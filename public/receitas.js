document.addEventListener('DOMContentLoaded', () => {
    const emailDoUsuario = localStorage.getItem('email');
    const areaRecipesElement = document.querySelector('.area_recipes');
    const categoriaSelect = document.querySelector('.categories');
    let todasAsReceitas = [];

    function exibirReceitas(receitas) {
        areaRecipesElement.innerHTML = '';
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
                    exibirDetalhesReceita(receita.ReceitaID, receita.NomeReceita);
                });
            });
        } else {
            const mensagemNenhumaReceita = document.createElement('p');
            mensagemNenhumaReceita.textContent = 'Nenhuma receita encontrada para esta categoria.';
            areaRecipesElement.appendChild(mensagemNenhumaReceita);
        }
    }

    function filtrarReceitasPorCategoria(categoria) {
        let receitasFiltradas;
        if (categoria === '') {
            receitasFiltradas = todasAsReceitas;
        } else {
            receitasFiltradas = todasAsReceitas.filter(receita => receita.Categoria.trim().toLowerCase() === categoria.trim().toLowerCase());
        }
        exibirReceitas(receitasFiltradas);
    }

    function adicionarCategoriasNoSeletor(receitas) {
        const categoriasExistentes = new Set();
        // Adiciona a opção padrão
        categoriasExistentes.add('');
        categoriaSelect.innerHTML = '<option value="" selected disabled hidden>Selecione a categoria da receita</option>';

        receitas.forEach(receita => {
            const categoriaFormatada = receita.Categoria.trim().toLowerCase();
            if (!categoriasExistentes.has(categoriaFormatada)) {
                categoriasExistentes.add(categoriaFormatada);
                const novaOpcao = document.createElement('option');
                novaOpcao.value = categoriaFormatada;
                novaOpcao.textContent = receita.Categoria; // Exibe a categoria original (com a formatação do banco)
                categoriaSelect.appendChild(novaOpcao);
            }
        });
    }

    function exibirDetalhesReceita(receitaId, nomeReceita) {
        fetch(`http://localhost:3000/receita/${receitaId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(detalhes => {
                console.log('Detalhes da receita:', detalhes);
                exibirModalDetalhes(nomeReceita, detalhes);
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

    // Carregar todas as receitas inicialmente
    if (emailDoUsuario && areaRecipesElement && categoriaSelect) {
        fetch(`http://localhost:3000/receitas/${emailDoUsuario}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(receitas => {
                todasAsReceitas = receitas;
                adicionarCategoriasNoSeletor(todasAsReceitas); // Adiciona as categorias ao seletor
                exibirReceitas(todasAsReceitas);
            })
            .catch(error => {
                console.error('Erro ao buscar as receitas:', error);
                areaRecipesElement.innerHTML = '<p>Erro ao carregar as receitas.</p>';
            });

        categoriaSelect.addEventListener('change', (event) => {
            const categoriaSelecionada = event.target.value;
            filtrarReceitasPorCategoria(categoriaSelecionada);
        });
    } else {
        console.log('Usuário não logado ou elementos não encontrados.');
    }
});