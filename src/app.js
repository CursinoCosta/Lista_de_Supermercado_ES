import cors from 'cors'; 
import {openDb} from './configDb.js'
import * as dbFunctions from '../Controler/dbFunctions.js';


import express from 'express';    
const app = express();



app.use(express.json());

app.use(cors());            
app.use(cors({ origin: 'http://127.0.0.1:5500' }));


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

app.post('/cadastro', (req, res) => {
    const dados = req.body;

    if (!dados.email || !dados.nomeCompleto || !dados.nomeUsuario || !dados.senha) {
        return res.status(400).json({ mensagem: "Erro. Preencha todos os campos1." });
    }

    dbFunctions.insertUsuario(dados)
        .then(() => {
            res.status(200).json({ mensagem: "Cadastro realizado com sucesso!" });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
        });
});

app.post('/login', async (req, res) => {
    const { nomeUsuario, senha } = req.body;
  
    if (!nomeUsuario || !senha) {
      return res.status(400).json({ mensagem: 'Erro. Preencha usuário e senha.' });
    }
  
    try {
      const db = await openDb();
      const user = await db.get(
        'SELECT * FROM Usuarios WHERE nomeUsuario = ? AND senha = ?',
        [nomeUsuario, senha]
      );
  
      if (user) {
        return res.json({
          mensagem: 'Login bem-sucedido!',
          usuario: { id: user.UsuarioID, nomeUsuario: user.nomeUsuario }
        });
      } else {
        return res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
      }
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
  });


app.listen(3000, ()=>console.log("rodando"))