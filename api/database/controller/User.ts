import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';
var bcrypt = require('bcryptjs');

const aaSqlite = require('aa-sqlite');

async function getToken(user: any) {
    const tokenExists = await aaSqlite.get(`SELECT * FROM Tokens WHERE idUsuario = ${user.id} AND created > date("now", "-30 days")`);

    if(tokenExists) return tokenExists.token;
    
    const token = bcrypt.hashSync(user.email + Date.now().toString(), 5);

    await aaSqlite.push(`INSERT INTO Tokens (idUsuario, email, token) VALUES (${user.id}, '${user.email}', '${token}')`);

    return token;
}

class User {
    async getUsers(req: Request, res: Response) {
        return res.json(await aaSqlite.get_all("SELECT * FROM Users"));
    }

    async signIn(req: Request, res: Response) {
        const { email, senha } = req.body;

        try {
            const userExists = await aaSqlite.get(`SELECT * FROM Users WHERE email = '${email}'`);

            if(userExists && bcrypt.compareSync(senha, userExists.senha)) {
                return res.json({
                    logado: true,
                    nivel: userExists.nivel,
                    token: await getToken(userExists)
                });
            }

            return res.json({ logado: false });
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async signUp(req: Request, res: Response) {
        const { email, senha, secret } = req.body;
        const nivel = secret == "adminX" ? 2 : 1;

        try {
            const userExists = await aaSqlite.get(`SELECT * FROM Users WHERE email = '${email}'`);

            if(userExists) return res.status(400).json({
                status: 1,
                message: "Usuário já cadastrado."
            });

            var hash = bcrypt.hashSync(senha, 5);

            await aaSqlite.push(`INSERT INTO Users (email, senha, nivel) VALUES ('${email}', '${hash}', ${nivel})`);

            return res.json({
                status: 0,
                message: "Usuário cadastrado com sucesso."
            });
        } catch (error) {
            return res.status(500).json({
                error: "Erro no servidor.",
                message: error
            });
        }
    }

    async verify(req: Request, res: Response) {
        const token = req.body.token;

        const queryToken = await aaSqlite.get(`SELECT u.nivel FROM Users u INNER JOIN Tokens t ON t.idUsuario = u.id WHERE t.token = '${token}'`);

        if(queryToken) return res.json({ "token": queryToken.nivel});

        return res.json({ "token": 0});
    }
}

export default new User;