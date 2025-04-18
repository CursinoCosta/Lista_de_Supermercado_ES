import { openDb } from "../src/configDb.js";

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY, email TEXT, nomeCompleto TEXT, nomeUsuario TEXT, senha TEXT)')
    })
}

export async function insertUsuario(User){
    openDb().then(db => {
        db.run('INSERT INTO Usuario (email, nomeCompleto, nomeUsuario, senha) VALUES (?, ?, ?, ?)',[User.email, User.nomeCompleto, User.nomeUsuario, User.senha])
    })
}