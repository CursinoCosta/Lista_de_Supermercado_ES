// server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'usuarios.json');

app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Para entender JSON no corpo das requisições

app.post('/cadastro', (req, res) => {
    const { email, nomeCompleto, nomeUsuario, senha } = req.body;

    // Lê dados já salvos
    let usuarios = [];
    if (fs.existsSync(dbPath)) {
        usuarios = JSON.parse(fs.readFileSync(dbPath));
    }

    // Verifica duplicatas
    const emailExistente = usuarios.find(u => u.email === email);
    const usuarioExistente = usuarios.find(u => u.nomeUsuario === nomeUsuario);

    if (emailExistente) {
        return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    if (usuarioExistente) {
        return res.status(400).json({ mensagem: 'Nome de usuário já está em uso.' });
    }

    // Cria novo usuário
    const novoUsuario = {
        email,
        nomeCompleto,
        nomeUsuario,
        senha // opcional: você pode usar bcrypt pra criptografar
    };

    usuarios.push(novoUsuario);
    fs.writeFileSync(dbPath, JSON.stringify(usuarios, null, 2));

    res.json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

app.post('/login', (req, res) => {
    const { nomeUsuario, senha } = req.body;

    if (!fs.existsSync(dbPath)) {
        return res.status(400).json({ mensagem: "Nenhum usuário cadastrado." });
    }

    const usuarios = JSON.parse(fs.readFileSync(dbPath));
    const usuario = usuarios.find(u => u.nomeUsuario === nomeUsuario);

    if (!usuario) {
        return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }

    if (usuario.senha !== senha) {
        return res.status(400).json({ mensagem: "Senha incorreta." });
    }

    res.json({ mensagem: "Login bem-sucedido!" });
});
