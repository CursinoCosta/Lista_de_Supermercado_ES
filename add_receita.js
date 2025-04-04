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


function get_ingr(form) {
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
    console.log(prepare.value);
    modo_preparo.innerHTML = prepare.value;
    txtarea.value = "";
}

btn_add.addEventListener("click", get_ingr);
btn_save.addEventListener("click", get_recipe);