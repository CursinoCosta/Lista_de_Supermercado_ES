import * as dbFunctions from '../Controler/dbFunctions.js';

let div_add = document.querySelector(".area_recipes");

window.onload = () => {
    //for loop das linhas selecionadas a tabela
    let dbout = dbFunctions.getIngredientesReceita();
    let instrucao = dbFunctions.getInstrucaoReceita();
    for(const item in dbout){
        let card = `
            <div>
            <p>Ingredientes</p>
            <br>
            // for loop que itera sobre as linhas de IngredientesReceitas
                <p>${item.Ingrediente} - ${item.Quantidade} ${item.UnidadeMedia}
            // end for loop
            <p>${instrucao}</p>
            </div>
        `
        div_add.innerHTML += card
	}
    //end for loop
}