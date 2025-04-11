const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("teste");
})

app.listen(3000, ()=>console.log("rodando"))