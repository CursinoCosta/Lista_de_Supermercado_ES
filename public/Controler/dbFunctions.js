import { openDb } from "./configDb.js";

export async function createTable(){
    openDb().then(db => {
        db.exec('CREATE TABLE IF NOT EXISTS Usuarios (UsuarioID INTEGER, email TEXT PRIMARY KEY, nomeCompleto TEXT, nomeUsuario TEXT, senha TEXT)')
        
        db.exec('CREATE TABLE IF NOT EXISTS Receitas (ReceitaID INTEGER, UsuarioID INTEGER PRIMARY KEY,	NomeReceita TEXT PRIMARY KEY, Categoria TEXT, Favorito BINARY, FOREIGN KEY (UsuarioID) REFERENCES Usuario(UsuarioID) )')
        db.exec('CREATE TABLE IF NOT EXISTS IngredientesReceitas (ReceitaID INTEGER PRIMARY KEY, Ingrediente TEXT PRIMARY KEY, Quantidade INTEGER, UnidadeMedida TEXT, FOREIGN KEY (ReceitaID) REFERENCES Receitas(ReceitaID) )')
        db.exec('CREATE TABLE IF NOT EXISTS InstrucaoReceitas (ReceitaID INTEGER PRIMARY KEY, Instrucao TEXT, FOREIGN KEY (ReceitaID) REFERENCES Receitas(ReceitaID) )')
        
        db.exec('CREATE TABLE IF NOT EXISTS Lista (UsuarioID INTEGER PRIMARY KEY, Item TEXT PRIMARY KEY, Quantidade INTEGER, UnidadeMedida TEXT, Prioridade INTEGER,FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID) )')

    })
}

//Usuarios DB

export async function insertUsuario(userData){
    openDb().then(db => {
        db.run('INSERT INTO Usuarios (email, nomeCompleto, nomeUsuario, senha) VALUES (?, ?, ?, ?)',[userData.email, userData.nomeCompleto, userData.nomeUsuario, userData.senha])
    })
}

export async function updateUsuario(email) {
    openDb().then(db => {
        db.run('UPDATE Usuarios SET email=?, nomeCompleto=?, nomeUsuario=?, senha=? WHERE email=?', [User.email, User.nomeCompleto, User.nomeUsuario, User.senha, email]);
    });
}

export async function deleteUsuario(email) {
    openDb().then(db => {
        db.run('DELETE FROM Usuarios WHERE emaisl=?', [email]);
    });
}

export async function getUsuario(email) {
    try {
      const row = await new Promise((resolve, reject) => {
        openDb.get("SELECT * FROM Usuario WHERE email = ?", [email], (err, row) => {
          if (err) {
            console.error("Erro ao executar a consulta:", err.message);
            reject(err);
            return;
          }
          resolve(row);
        });
      });
  
      if (!row) {
        return null; // Retorna null se não encontrar o usuário
      }
  
      // Cria objeto para retornar
      const usuario = {
        UsuarioID: parseInt(row.UsuarioID),
        email: row.email,
        nomeCompleto: row.nomeCompleto,
        nomeUsuario: row.nomeUsuario,
        senha: row.senha,
      };
      return usuario;
    } catch (error) {
      throw error;
    }
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

export async function updateReceita(NomeReceita, UserID, newReceita) {
    openDb().then(db => {
        db.run('UPDATE Receitas SET NomeReceita=?, Categoria=?, Favorito=? WHERE NomeReceita=? AND UsuarioID=?', [newReceita.NomeReceita, newReceita.Categoria, newReceita.Favorito, NomeReceita, UserID]);
    });
}

export async function deleteReceita(NomeReceita, UserID) {
    //Delete receita
    openDb().then(db => {
        db.run('DELETE FROM Receitas WHERE NomeReceita=? AND UsuarioID=? ', [NomeReceita, UserID]);
    });

    //Delete instrucao
    openDb().then(db => {
        db.run('DELETE FROM InstrucaoReceitas WHERE ReceitaID=(SELECT ReceitaID FROM Receitas WHERE NomeReceita=? AND UsuarioID=?)', [NomeReceita, UserID]);
    });

    //Delete todos os ingredientes
    openDb().then(db => {
        db.run('DELETE FROM IngredientesReceitas WHERE ReceitaID=(SELECT ReceitaID FROM Receitas WHERE NomeReceita=? AND UsuarioID=?)', [NomeReceita, UserID]);
    });
}

export async function getIngredientesReceita(NomeReceita, UserID) {
    return new Promise((resolve, reject) => {
      openDb.all("SELECT * FROM Ingrediente WHERE ReceitaID=(SELECT ReceitaID FROM Receitas WHERE NomeReceita=? AND UsuarioID=?)", [NomeReceita, UserID], (err, rows) => {
        if (err) {
          console.error("Erro ao executar a query:", err.message);
          reject(err);
          return;
        }
        //ReceitaID, Ingrediente, Quantidade, UnidadeMedida
        const lista = rows.map(row => ({
          ReceitaID: parseInt(row.ReceitaID),
          Ingrediente: row.Ingrediente,
          Quantidade: parseInt(row.Quantidade),
          UnidadeMedida: row.UnidadeMedida,
        }));
        resolve(lista);
      });
    });
  }

export async function getInstrucaoReceita(NomeReceita, UserID) {
try {
    const rows = await new Promise((resolve, reject) => {
    openDb.all(
        "SELECT Instrucao FROM InstrucaoReceitas WHERE ReceitaID = (SELECT ReceitaID FROM Receitas WHERE NomeReceita = ? AND UsuarioID = ?)",
        [NomeReceita, UserID],
        (err, rows) => {
        if (err) {
            console.error("Erro ao executar a consulta:", err.message);
            reject(err);
            return;
        }
        resolve(rows);
        }
    );
    });

    if (!rows || rows.length === 0) {
    return null; // Retorna null se não houver instruções
    }

    return rows[0].Instrucao; // Retorna a instrução diretamente
} catch (error) {
    throw error;
}
}

// Lista DB


export async function insertItem(Item){
    openDb().then(db => {
        db.run('INSERT INTO Lista (UsuarioID, Item, Quantidade, UnidadeMedida, Prioridade) VALUES (?, ?, ?, ?, ?)',[Item.UserID, Item.Item, Item.Quantidade, Item.UnidadeMedida, Item.Prioridade])
    })
} 


export async function deleteItem(UserID, Item){
    openDb().then(db => {
        db.run('DELETE FROM InstrucaoReceitas WHERE UsuarioID=? AND Item=?', [UserID,Item]);
    })
} 

export async function updateItem(UserID,Item, newItem) {
    openDb().then(db => {
        db.run('UPDATE Lista SET UsuarioID=?, Item=?, Quantidade=?, UnidadeMedida=?, Prioridade=? WHERE UsuarioID=? AND Item=?', [UserID, newItem.Item, newItem.Quantidade, newItem.UnidadeMedida, newItem.Prioridade, UserID, Item]);
    });
}

export async function getItens(UserID) {
    return new Promise((resolve, reject) => {
      openDb.all("SELECT * FROM Lista WHERE UsuarioID = ?", [UserID], (err, rows) => {
        if (err) {
          console.error("Erro ao executar a query:", err.message);
          reject(err);
          return;
        }
        const lista = rows.map(row => ({
          UsuarioID: parseInt(row.UsuarioID),
          Item: row.Item,
          Quantidade: parseInt(row.Quantidade),
          UnidadeMedida: row.UnidadeMedida,
          Prioridade: parseInt(row.Prioridade)
        }));
        resolve(lista);
      });
    });
  }