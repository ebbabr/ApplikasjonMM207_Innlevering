import express from "express";
import * as pg from 'pg';
const { Client } = pg.default;
const { createHmac } = await import('node:crypto');
const usersRoute = express.Router();

const db = process.env.DATABASE_URL; // dette er linken med database informasjon
const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false //for å gi tilgang til å gjøre endringer i en utrygg setting
    }
}


usersRoute.post('/register', async (req, res) =>[
    const Client = new Client(credentials)
])


export default usersRoute;