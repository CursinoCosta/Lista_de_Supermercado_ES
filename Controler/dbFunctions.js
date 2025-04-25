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

//Usuarios DB

export async function insertUsuario(userData){
    openDb().then(db => {
        db.run('INSERT INTO Usuarios (email, nomeCompleto, nomeUsuario, senha) VALUES (?, ?, ?, ?)',[userData.email, userData.nomeCompleto, userData.nomeUsuario, userData.senha])
    })
}

export async function updateUsuario(id, User) {
    openDb().then(db => {
        db.run('UPDATE Usuarios SET email=?, nomeCompleto=?, nomeUsuario=?, senha=? WHERE UsuarioID=?', [User.email, User.nomeCompleto, User.nomeUsuario, User.senha, id]);
    });
}

export async function deleteUsuario(id) {
    openDb().then(db => {
        db.run('DELETE FROM Usuarios WHERE UsuarioID=?', [id]);
    });
}

// IngredientesReceitas DB

export async function insertIngrediente(Ingrediente){
    openDb().then(db => {
        db.run('INSERT INTO IngredientesReceitas (ReceitaID, Ingrediente, Quantidade, UnidadeMedida) VALUES (?, ?, ?, ?)',[Ingrediente.ReceitaID, Ingrediente.Ingrediente, Ingrediente.Quantidade, Ingrediente.UnidadeMedida])
    })
} 

export async function updateIngrediente(Receitaid, oldIngrediente, newIngrediente) {
    openDb().then(db => {
        db.run('UPDATE IngredientesReceitas SET ReceitaID=?, Ingrediente=?, Quantidade=?, UnidadeMedida=? WHERE ReceitaID=? AND Ingrediente=?', [newIngrediente.ReceitaID, newIngrediente.Ingrediente, newIngrediente.Quantidade, newIngrediente.UnidadeMedida, Receitaid, oldIngrediente]);
    });
}

export async function deleteIngrediente(Receitaid, oldIngrediente) {
    openDb().then(db => {
        db.run('DELETE FROM IngredientesReceitas WHERE ReceitaID=? AND Ingrediente=?', [Receitaid,oldIngrediente]);
    });
}

// InstrucaoReceitas DB

export async function insertInstrucao(Instrucao){
    openDb().then(db => {
        db.run('INSERT INTO InstrucaoReceitas (ReceitaID, Instrucao) VALUES (?, ?)',[Instrucao.ReceitaID, Instrucao.Instrucao])
    })
} 

export async function updateInstrucao(Receitaid, newInstrucao) {
    openDb().then(db => {
        db.run('UPDATE InstrucaoReceitas SET ReceitaID=?, Instrucao=? WHERE ReceitaID=?', [newInstrucao.ReceitaID, newInstrucao.Instrucao, Receitaid]);
    });
}

export async function deleteInstrucao(Receitaid) {
    openDb().then(db => {
        db.run('DELETE FROM InstrucaoReceitas WHERE ReceitaID=?', [Receitaid]);
    });
}

// Receitas DB

export async function insertReceita(Receita){
    openDb().then(db => {
        db.run('INSERT INTO Receitas (ReceitaID, UsuarioID, NomeReceita, Categoria, Favorito) VALUES (?, ?, ?, ?, ?)',[Receita.ReceitaID, Receita.UsuarioID, Receita.NomeReceita, Receita.Categoria, Receita.Favorito])
    })
} 

export async function updateReceita(Receitaid, newReceita) {
    openDb().then(db => {
        db.run('UPDATE Receitas SET ReceitaID=?, UsuarioID=?, NomeReceita=?, Categoria=?, Favorito=? WHERE ReceitaID=?', [newReceita.ReceitaID, newReceita.UsuarioID, newReceita.NomeReceita, newReceita.Categoria, newReceita.Favorito, Receitaid]);
    });
}

export async function deleteReceita(Receitaid) {
    //Delete receita
    openDb().then(db => {
        db.run('DELETE FROM Receitas WHERE ReceitaID=? ', [Receitaid]);
    });

    //Delete instrucao
    openDb().then(db => {
        db.run('DELETE FROM InstrucaoReceitas WHERE ReceitaID=?', [Receitaid]);
    });

    //Delete todos os ingredientes
    openDb().then(db => {
        db.run('DELETE FROM IngredientesReceitas WHERE ReceitaID=?', [Receitaid]);
    });
}
