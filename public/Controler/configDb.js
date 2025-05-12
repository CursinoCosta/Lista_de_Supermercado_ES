import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function openDb() {
  try {
    // Abre o banco de dados
    const db = await open({
      filename: './databases/database.db',
      driver: sqlite3.Database
    });
    console.log('Banco de dados aberto com sucesso!');
    return db;
  } catch (error) {
    console.error('Erro ao abrir o banco de dados:', error);
    throw error;
  }
}