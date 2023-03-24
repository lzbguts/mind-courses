import { Request, Response } from 'express';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database("mind.sqlite3");

class User {
    async getUsers(req: Request, res: Response) {
        db.all("SELECT * FROM Users", (err, rows) => {
            return res.json(rows);
        })
    }

    async signIn(req: Request, res: Response) {
        const { email, senha } = req.body;

        db.all(`SELECT * FROM Users WHERE email = '${email}' AND senha = '${senha}'`, (err, rows: any) => {
            if(rows.length > 0) return res.json({ logado: true, nivel: rows[0].nivel });
            
            return res.json({ logado: false });
        })
    }
}

export default new User;