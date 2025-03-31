# CheckList
- O sistema proposto consiste em um software cuja principal função é registrar a lista de mercado do usuário, bem como receitas que ele deseja salvar. 
Dessa forma, temos como objetivo desenvolver uma plataforma de uso simples e rápido, onde os usuários consigam achar a lista de mercado de maneira fácil durante a correria do dia a dia, sem ter que se preocupar em não perder o pedaço de papel com a lista. As principais features que buscam implementar são: uma aba onde o usuário pode visualizar os itens inseridos na lista de compras (além disso, também deve ser capaz de deletá-los quando convém), além de poder inserir mais itens; deve haver outra aba para registrar receitas, podendo, também, favoritá-las e filtrá-las de acordo com a categoria da receita. Dessa forma, ao implementar tais features, iremos desenvolver um sistema completo e útil para o dia a dia das pessoas.

# Membros da Equipe e seus respectivos papéis
Cecília Junqueira V. M. Pereira --> FULL <br />
Henrique Matos --> FULL <br />
Lucas Junqueira --> FULL <br />
Mateus Cursino --> FULL <br />

# Detalhamento
O FrontEnd do projeto será feito usando ReactJS em conjunto com CSS e HTML. <br />
O BackEnd será feito em JavaScript e os bancos de dados serão trabalhados usando SQLite. <br />

# Backlog do Produto
1. Usuário deve ser capaz de registrar a sua lista de supermercado (quais alimentos quer comprar e a quantidade).
2. Usuário deve ser capaz de registrar receitas que ele deseja fazer e, ao anotá-la, registra os ingredientes necessários (e as quantidades), que são salvos na sua lista de mercado.
3. Ao montar sua lista de mercado, o sistema deve dar uma estimativa de preço da compra (leva em base o preço médio de cada produto no momento).
4. O usuário deve ser capaz de avaliar receitas.
5. O usuário deve ser capaz de ver as receitas mais bem avaliadas.
6. O usuário deve ser capaz de salvar suas receitas favoritas.
7. Usuário deve ser capaz de adicionar valores nutricionais de alimentos 
8. Usuário deve ser de publicar receitas, para outros usuários terem acesso
9. O sistema deve contabilizar os valores nutricionais de uma receita a partir de seus ingredientes
10. O usuário deve ser capaz de filtrar receitas por categoria
11. O usuário deve ser capaz de criar itens recorrentes em sua lista de compras


# Backlog do Sprint
## História #1:
  * Implementar o cadastro de novos usuários e o login.
  * Implementar a versão inicial da página principal do sistema, que mostrará quais os itens foram inseridos na lista de mercado daquele usuário.
  * Implementar a opção do usuário deletar cada elemento da lista.
  * Implementar a aba onde adiciona mais alimentos à lista.

## História #2:
  * Implementar, na aba onde adiciona receitas, o campo onde registra os ingredientes e as quantidades e o campo onde escreve o modo de preparo.
  * Implementar a opção de deletar receitas.
  * Integrar os ingredientes inseridos na receita com a lista de mercado (adicionar os alimentos na lista).


##  História #6:
* Implementar a funcionalidade onde o usuário deve ser capaz de sinalizar que uma receita registrada no sistema é classificada como favorita.
* Deve implementar também a possibilidade de remover uma receita dos favoritos.

## História #11:
  * Implementar o atributo "categoria" para receitas no banco de dados.
  * Adicionar campo de categoria ao cadastrar uma receita (ex.: receita do tipo saudável, favorita, de festa, natal, etc).
  * Criar interface para escolher a categoria desejada e exibir apenas as receitas filtradas na tela.
  * Implementar a opção de criar categoria ao criar ou editar uma receita.

