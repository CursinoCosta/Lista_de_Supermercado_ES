//import {openDb} from './configDb.js'
import * as dbFunctions from '../Controler/dbFunctions.js';


import express from 'express';
const app = express();

app.use(express.json());

//openDb();
dbFunctions.createTable();

app.get('/', function(req, res){
    res.send("teste");
})

app.post('/usuario',function(req,res){
    //console.log(req.body)
    dbFunctions.insertUsuario(req.body)
    res.json({
        "statuscode" : 200
    })
})

app.listen(3000, ()=>console.log("rodando"))