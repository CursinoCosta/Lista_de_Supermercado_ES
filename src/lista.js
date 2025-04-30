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

// window.onload = () => {
//     /* quando a janela carregar, todos os items devem ser impressos na tela */
// }

function f(form) {
    form.preventDefault();
    let to_add = '';
    let qntd;
    let unid;
    if(item.value == "") {
        alert("Você deve preencher o campo que indica o nome do alimento a ser comprado");
        return;
    }

    let item_name = (item.value).charAt(0).toUpperCase() + (item.value).slice(1)

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

    if(urgency_high.checked) {
        to_add = `
        <div>
            <li class="item_list">${item_name} (${qntd}${unid}) <i id="important_high" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
        </div>`;

        div_high.innerHTML += to_add;
    } else if(urgency_medium.checked) {
        to_add = `
        <div>
            <li class="item_list">${item_name} (${qntd}${unid}) <i id="important_medium" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
        </div>`;

        div_medium.innerHTML += to_add;
    } else {
        to_add = `
        <div>
            <li class="item_list">${item_name} (${qntd}${unid}) <i id="important_low" class="fa-solid fa-circle-exclamation"></i> <button id="delete_btn"><i class="fa-regular fa-trash-can"></i></button></li>
        </div>`;

        div_low.innerHTML += to_add;
    }

    // sect_add.innerHTML += to_add;

    _form.reset();
}

btn_add.addEventListener('click', f);