import { Request, Response } from "express";
import dotenv from 'dotenv';
import sqlite3 from "sqlite3";

const sql = new sqlite3.Database("mind.sqlite3");

const aaSqlite = require('aa-sqlite');
dotenv.config();

class Curso {
    async getOneCurso(req: Request, res: Response) {
        const { token } = req.body;
        const id = req.params.id;

        try {
            const user = await Curso.verify(token);

            if(user.token < 1) { 
                return res.status(400).json({
                    error: "Falha.",
                    message: "Não autorizado."
                });
            }

            var data;

            if(user.token == 2) {
                data = await aaSqlite.get_all(`SELECT * FROM Cursos WHERE id = ${id}`);
            }
            else {
                data = await aaSqlite.get_all(`SELECT * FROM Cursos WHERE idUsuario = ${user.id} and id = ${id}`);
            }

            return res.json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async getCursos(req: Request, res: Response) {
        const { token } = req.body;

        try {
            const user = await Curso.verify(token);

            if(user.token < 1) { 
                return res.status(400).json({
                    error: "Falha.",
                    message: "Não autorizado."
                });
            }

            const data = await aaSqlite.get_all(`SELECT * FROM Cursos WHERE idUsuario = ${user.id} AND situacao = 1`);

            return res.json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async getAllCursos(req: Request, res: Response) {
        const { token, pesquisa } = req.body;

        try {
            const user = await Curso.verify(token);

            if(user.token < 2) { 
                return res.status(400).json({
                    error: "Falha.",
                    message: "Não autorizado."
                });
            }

            const data = await aaSqlite.get_all(`SELECT * FROM Cursos WHERE nome LIKE '%${pesquisa}%'`);

            return res.json(data);
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async createCurso(req: Request, res: Response) {
        const { token, nome, professor, categoria, descricao, imagem } = req.body;

        try {
            const user = await Curso.verify(token);

            if(user.token < 1) { 
                return res.status(400).json({
                    status: 2,
                    message: "Não autorizado."
                });
            }

            const courseExists = await aaSqlite.get(`SELECT * FROM Cursos WHERE nome = '${nome}' AND professor = '${professor}'`);

            if(courseExists) return res.status(400).json({
                status: 1,
                message: "Curso já cadastrado."
            });

            await aaSqlite.push(`INSERT INTO Cursos (idUsuario, nome, professor, categoria, descricao) VALUES (${user.id}, '${nome}', '${professor}', '${categoria}', '${descricao}')`);
            const last = await aaSqlite.get("SELECT max(id) from Cursos");

            return res.json({
                status: 0,
                message: "Curso cadastrado com sucesso.",
                id: last["max(id)"] || 1
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async updateCurso(req: Request, res: Response) {
        const { token, id, nome, professor, categoria, descricao, imagem, situacao } = req.body;

        try {
            const user = await Curso.verify(token);

            if(user.token < 1) return res.status(400).json({
                error: "Falha.",
                message: "Não autorizado."
            });

            const courseExists = await aaSqlite.get(`SELECT * FROM Cursos WHERE id = ${id}`);

            if(!courseExists) return res.status(400).json({
                error: "Falha.",
                message: "Curso não existe."
            });

            if((user.id != courseExists.idUsuario && user.token < 2)) return res.status(400).json({
                error: "Falha.",
                message: "Não autorizado."
            });

            await aaSqlite.push(`UPDATE Cursos SET nome = '${nome}', professor = '${professor}', categoria = '${categoria}', descricao = '${descricao}', situacao = ${situacao} WHERE id = ${id}`);

            return res.json({ message: "Curso atualizado com sucesso." });
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async deleteCurso(req: Request, res: Response) {
        const { token, id } = req.body;

        try {
            const user = await Curso.verify(token);

            if(user.token < 1) { 
                return res.status(400).json({
                    status: 2,
                    message: "Não autorizado."
                });
            }

            const courseExists = await aaSqlite.get(`SELECT * FROM Cursos WHERE id = ${id}`);

            if(!courseExists) return res.status(400).json({
                status: 1,
                message: "Curso não existe."
            });

            if((user.id != courseExists.idUsuario && user.token < 2)) return res.status(400).json({
                status: 2,
                message: "Não autorizado."
            });

            await aaSqlite.push(`DELETE FROM Cursos WHERE id = ${id}`);

            return res.status(400).json({
                status: 0,
                message: "Curso excluído com sucesso."
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    static async verify(token: any) {
        const queryToken = await aaSqlite.get(`SELECT u.nivel, u.id FROM Users u INNER JOIN Tokens t ON t.idUsuario = u.id WHERE t.token = '${token}'`);

        if(queryToken) return ({ "token": queryToken.nivel, "id": queryToken.id });

        return ({ "token": 0});
    }
}

export default new Curso;