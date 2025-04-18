//import {openDb} from './configDb.js'
import { createTable, insertUsuario } from '../Controler/usuario.js';


import express from 'express';
const app = express();

//openDb();
createTable();

app.get('/', function(req, res){
    res.send("teste");
})

app.listen(3000, ()=>console.log("rodando"))