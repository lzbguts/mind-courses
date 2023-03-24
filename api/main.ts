import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("mind.sqlite3");
const app = express();

dotenv.config();
app.use(express.json());
app.use(routes);

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY, nome TEXT NOT NULL, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, nivel INTEGER NOT NULL);");
    db.run("CREATE TABLE IF NOT EXISTS Tokens( id INTEGER PRIMARY KEY, idUsuario INTEGER NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, FOREIGN KEY (idUsuario) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE NO ACTION);");
    db.run("CREATE TABLE IF NOT EXISTS Cursos( id INTEGER PRIMARY KEY, nome TEXT NOT NULL, professor TEXT NOT NULL, categoria TEXT NOT NULL, descricao TEXT NOT NULL, imagem TEXT NOT NULL);");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});