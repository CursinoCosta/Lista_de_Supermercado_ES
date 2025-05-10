import cors from 'cors'; 
import {openDb} from '../public/Controler/configDb.js'
import * as dbFunctions from '../public/Controler/dbFunctions.js';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // Importa utilitário do Node.js
import { dirname } from 'path';
 
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());

app.use(cors());            
app.use(cors({ origin: 'http://127.0.0.1:5500' }));


dbFunctions.createTable();

app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota para a página de login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.post('/dev',function(req,res){
    //console.log(req.body)
    dbFunctions.insertItem(req.body);
    res.json({
        "statuscode" : 300
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
          usuario: { id: user.UsuarioID, nomeUsuario: user.nomeUsuario, nomeCompleto: user.nomeCompleto, email: user.email }
        });
      } else {
        return res.status(401).json({ mensagem: 'Usuário ou senha incorretos.' });
      }
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ mensagem: 'Erro interno no servidor.' });
    }
  });

  app.post('/receita', async (req, res) => {
    try {
        const dados = req.body;

        const receitaObj = {
            ReceitaID: null,
            UsuarioID: dados.usuarioID || 1,
            NomeReceita: dados.nome,
            Categoria: dados.categoria,
            Favorito: 0
        };
        await dbFunctions.insertReceita(receitaObj);

        const db = await openDb();
        const ultimaReceita = await db.get('SELECT MAX(ReceitaID) as id FROM Receitas');
        const receitaID = ultimaReceita.id;

        
        for (const item of dados.ingredientes) {
            const partes = item.split(' - ');
            const ingrediente = partes[0];
            const quantidadeUnidade = partes[1]?.split(' ') || [];

            const ingredienteObj = {
                ReceitaID: receitaID,
                Ingrediente: ingrediente,
                Quantidade: parseFloat(quantidadeUnidade[0]) || 1,
                UnidadeMedida: quantidadeUnidade.slice(1).join(' ') || ''
            };
            await dbFunctions.insertIngrediente(ingredienteObj);
        }

        const instrucaoObj = {
            ReceitaID: receitaID,
            Instrucao: dados.modoPreparo
        };
        await dbFunctions.insertInstrucao(instrucaoObj);

        res.status(200).json({ mensagem: "Receita salva com sucesso!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao salvar receita." });
    }
});



app.listen(3000, ()=>console.log("rodando"))