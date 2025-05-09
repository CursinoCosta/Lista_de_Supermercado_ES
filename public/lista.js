

let item = document.querySelector("#item");
let quantity = document.querySelector("#quantity");
let unit = document.querySelector("#unit");
let urgency_high = document.querySelector("#high");
let urgency_medium = document.querySelector("#medium");
let urgency_low = document.querySelector("#low");
let btn_add = document.querySelector("#btn_add");
let sect_add = document.querySelector("#list");
let div_high = document.querySelector("#div_high");
let div_medium = document.querySelector("#div_medium");
let div_low = document.querySelector("#div_low");
let _form = document.querySelector('form')

//import * as dbFunctions from './Controler/dbFunctions.js'; isso nao é aqui

// declarações das variáveis já presentes no arquivo 

function print_list() {
    let to_add = '';
    // aqui deve adicionar o código que obtém a tabela das linhas referentes ao usuário logado no sistema

    //for loop que itera sobre cada linha
    //let dbout = dbFunctions.getItens(1); nao é aqui
    
    for(const i of dbout){       
        let item_name = i.item;// atribui o valor da célula da coluna "Item" da tabela
        let qntd = i.Quantidade; // atribui o valor da célula da coluna "Quantidade" da tabela
        let unid = i.UnidadeMedida; // atribui o valor da célula da coluna "UnidadeMedida" da tabela
        let prio = i.Prioridade; // atribui o valor da célula da coluna "Prioridade" da tabela
        
        let item = (item_name.value).charAt(0).toUpperCase() + (item_name.value).slice(1)

            if(quantity.value != "") {
                qntd = quantity.value;
            }
            if(unit.value != "select") {
                if(qntd >= 2) {
                    unid = " " + unit.value + "s";
                } else {
                    unid = " " + unit.value;
                }
            }
            else {unid = "";}
        
        if(prio == 0) {
                to_add = `
                <div>
                        <li class="item_list">${item} (${qntd}${unid}) <i id="important_high" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
                </div>`;

                div_high.innerHTML += to_add;
            } else if(prio == 1) {
                to_add = `
                    <div>
                    <li class="item_list">${item} (${qntd}${unid}) <i id="important_medium" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
                    </div>`;

                div_medium.innerHTML += to_add;
            } else {
                to_add = `
                <div>
                    <li class="item_list">${item} (${qntd}${unid}) <i id="important_low" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
                </div>`;

                div_low.innerHTML += to_add;
            }
        }

    //end for loop
}

function get_new_item(form) {
    form.preventDefault();
    // salva item.value, quantity.value, unit.value no banco de dados
    // checa:
    let urg;
    if(urgency_high.checked) {
	urg = 0;
    } else if(urgency_medium.checked) {
	urg = 1;
    } else {
	urg = 2;
    }

    // adiciona urg ao banco de dados
    _form.reset();
    print_list();
}

btn_add.addEventListener('click', get_new_item);
window.addEventListener('load', print_list);