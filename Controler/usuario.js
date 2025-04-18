import { openDb } from "../src/configDb.js";

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuarios (UsuarioID INTEGER PRIMARY KEY, email TEXT, nomeCompleto TEXT, nomeUsuario TEXT, senha TEXT)')
        
        db.exec('CREATE TABLE IF NOT EXISTS Receitas (ReceitaID INTEGER PRIMARY KEY, UsuarioID INTEGER,	NomeReceita TEXT, Categoria TEXT, Favorito BINARY, FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID) )')
        db.exec('CREATE TABLE IF NOT EXISTS IngredientesReceitas (ReceitaID INTEGER, Ingrediente TEXT,	NomeReceita TEXT, Quantidade INTEGER, UnidadeMedida TEXT, FOREIGN KEY (ReceitaID) REFERENCES Receitas(ReceitaID) )')
        db.exec('CREATE TABLE IF NOT EXISTS InstrucaoReceitas (ReceitaID INTEGER, Instrucao TEXT, FOREIGN KEY (ReceitaID) REFERENCES Receitas(ReceitaID) )')
        
        db.exec('CREATE TABLE IF NOT EXISTS Lista (Item TEXT, Quantidade INTEGER, UnidadeMedida TEXT, Prioridade INTEGER )')

    })
}

export async function insertUsuario(User){
    openDb().then(db => {
        db.run('INSERT INTO Usuario (email, nomeCompleto, nomeUsuario, senha) VALUES (?, ?, ?, ?)',[User.email, User.nomeCompleto, User.nomeUsuario, User.senha])
    })
}

export async function updateUsuario(id, User) {
    openDb().then(db => {
        db.run('UPDATE Usuario SET email=?, nomeCompleto=?, nomeUsuario=?, senha=? WHERE id=?', [User.email, User.nomeCompleto, User.nomeUsuario, User.senha, id]);
    });
}

export async function deleteUsuario(id) {
    openDb().then(db => {
        db.run('DELETE FROM Usuario WHERE id=?', [id]);
    });
}