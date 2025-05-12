

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

    console.log("entrei print_list  ");
    const email = localStorage.getItem('email');

    fetch(`/lista?parametro=${email}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(listaRetorno => {
            // console.log(listaRetorno)
            console.log("Tipo de listaRetorno:", typeof listaRetorno);
            console.log("Valor de listaRetorno:", listaRetorno);
            listaRetorno = Object.values(listaRetorno);
            // //for loop que itera sobre cada linha
            console.log(listaRetorno)
            for(const i of listaRetorno){       
                let item_name = i.item;// atribui o valor da célula da coluna "Item" da tabela
                let qntd = i.Quantidade; // atribui o valor da célula da coluna "Quantidade" da tabela
                let unid = i.UnidadeMedida; // atribui o valor da célula da coluna "UnidadeMedida" da tabela
                let prio = i.Prioridade; // atribui o valor da célula da coluna "Prioridade" da tabela
                //console.log("aaaa",item_name,qntd,unid,prio)
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
        })
        .catch(error => {
            console.error('Erro:', error);
        });
            

    
}

async function get_new_item(form) {
    console.log("click new item")
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
    const itemName = item.value;
    const quantityNum = quantity.value;
    const unitType = unit.value;
    const email = localStorage.getItem("email")
    console.log("email é :",email)
    try {
        const response = await fetch('http://localhost:3000/add_item_lista', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                Item : itemName,
                Quantidade : quantityNum,
                UnidadeMedida : unitType,
                Prioridade : urg
            }),
        });
        const result = await response.json();
        console.log(result)
        alert(result.mensagem);
    } catch (error) {
        console.error(error);
        alert("Erro ao salvar receita.");
    }
    
    _form.reset();
    print_list();
}

btn_add.addEventListener('click', get_new_item);
window.addEventListener('load', print_list);