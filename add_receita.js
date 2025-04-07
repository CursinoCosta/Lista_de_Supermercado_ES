let name_recipe = document.querySelector("#recipe_name");
let btn_name = document.querySelector("#btn_name");
let hold_name = document.querySelector("#name");
let div_add = document.querySelector("#input_ingred");
let input_ingred = document.querySelector("#ingr");
let input_qntd = document.querySelector("#qntd");
let input_unit = document.querySelector("#unit");
let div_shows = document.querySelector("#list_ingred");
let btn_add = document.querySelector("#btn_add");
let btn_save = document.querySelector("#btn_save");
let _form = document.querySelector('form');
let prepare = document.querySelector("#prepare");
let modo_preparo = document.querySelector("#modo_preparo");
let txtarea = document.querySelector('textarea');
let input_category = document.querySelector("#category");
let selectCategory = document.querySelector("#category");

function recipe_name(form) {
    form.preventDefault();

    if(name_recipe.value == "") {
        alert("Erro! Você deve preencher o campo referente ao Nome da Receita.")
        return;
    }

    if(input_category.value == "") {
        alert("Erro! Você deve selecionar uma Categoria para a Receita.");
        return;
    }

    let formatted_name = (name_recipe.value).charAt(0).toUpperCase() + (name_recipe.value).slice(1);
    let formatted_cat = (input_category.value).charAt(0).toUpperCase() + (input_category.value).slice(1);

    hold_name.innerHTML += `<strong>${formatted_name}</strong> <span style="color: gray;">(${formatted_cat})</span>`;
    name_recipe.value = "";
    input_category.value = "";
}

function get_ingr(form) {
    if(input_ingred.value == "" || input_unit.value == "" || input_qntd.value == "") {
        alert("Erro! Você deve preencher todos os campo referentes aos Ingredientes.")
        return;
    }
    form.preventDefault();

    let item_name = (input_ingred.value).charAt(0).toUpperCase() + (input_ingred.value).slice(1);
    let unit = input_unit.value;
    if(input_qntd.value >= 2) {
        if(input_unit.value == "xícara de chá") {
            unit = "xícaras de chá";
        }
        else if(input_unit.value == "colher de chá") {
            unit = "colheres de chá";
        }
        else if(input_unit.value == "colher de sopa") {
            unit = "colheres de sopa";
        } else {
            unit = input_unit.value + "s";
        }
    }
    let new_ingr = `
    <div id="new_item">
        <li id="item">${item_name} - ${input_qntd.value} ${unit}</li>
        <button id="edit_ingr"><i class="fa-solid fa-pen-to-square"></i></button>
    </div>`;

    div_shows.innerHTML += new_ingr;
    _form.reset();
}

function get_recipe(form) {
    form.preventDefault();
    if(prepare.value == "") {
        alert("Erro! Você deve preencher campo referente ao Modo de Preparo.")
        return;
    }
    modo_preparo.innerHTML = prepare.value;
    txtarea.value = "";
}

btn_name.addEventListener("click", recipe_name);
btn_add.addEventListener("click", get_ingr);
btn_save.addEventListener("click", get_recipe);
selectCategory.addEventListener("change", function () {
    if (selectCategory.value === "nova") {
        let novaCategoria = prompt("Digite o nome da nova categoria:");

        if (novaCategoria) {
            novaCategoria = novaCategoria.charAt(0).toUpperCase() + novaCategoria.slice(1).toLowerCase();
            let option = document.createElement("option");
            option.value = novaCategoria.toLowerCase();
            option.textContent = novaCategoria;
            selectCategory.insertBefore(option, selectCategory.lastElementChild);
            selectCategory.value = novaCategoria.toLowerCase();
        } else {
            selectCategory.value = "";
        }
    }
});