import {openDb} from './configDb.js'


import express from 'express';
const app = express();

openDb();

app.get('/', function(req, res){
    res.send("teste");
})

app.listen(3000, ()=>console.log("rodando"))