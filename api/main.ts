import express from 'express';
import routes from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const aaSqlite = require('aa-sqlite');
const DBSOURCE = './mind.sqlite3';

const app = express();

dotenv.config();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use(routes);

async function execDB() {
    await aaSqlite.open(DBSOURCE);

    await aaSqlite.push("CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, senha TEXT NOT NULL, nivel INTEGER NOT NULL);");
    await aaSqlite.push("CREATE TABLE IF NOT EXISTS Tokens( id INTEGER PRIMARY KEY, idUsuario INTEGER NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL, created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (idUsuario) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE NO ACTION);");
    await aaSqlite.push("CREATE TABLE IF NOT EXISTS Cursos( id INTEGER PRIMARY KEY, idUsuario INTEGER NOT NULL, nome TEXT NOT NULL, professor TEXT NOT NULL, categoria TEXT NOT NULL, descricao TEXT NOT NULL, situacao INTEGER DEFAULT 1, FOREIGN KEY (idUsuario) REFERENCES Users (id) ON DELETE CASCADE ON UPDATE NO ACTION);");
}
execDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});