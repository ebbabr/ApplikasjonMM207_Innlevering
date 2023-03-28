const express = require('express');
const pg = require('pg');
const { Client } = pg;
const crypto = require('crypto');
const createHmac = crypto.createHmac;
const usersRoute = express.Router();

// fjern postgress link før levering
const db = process.env.DATABASE_URL || "postgres://waexqbcrgulwst:c28aad2349a51663876cfd2013be1f0ee81868a556742f1bc50f0088714a7d37@ec2-52-215-68-14.eu-west-1.compute.amazonaws.com:5432/ddlonen5voojj7"; // dette er linken med database informasjon
const credentials = {
    connectionString: db,
    ssl: {
        rejectUnauthorized: false //for å gi tilgang til å gjøre endringer i en utrygg setting
    }
}


usersRoute.post('/register', async (req, res) => {
    const client = new Client(credentials);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();
        const query = 'INSERT INTO users("username", "password") VALUES ($1, $2)';
        const values = [req.body.username, hash];
        results = await client.query(query, values);
        res.json({ success: true }); // send a success response back
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false }); // send an error response back
    } finally {
        await client.end();
    }
});



usersRoute.post('/login', async (req, res) => {
    const client = new Client(credentials);
    let results = null;
    try {
        const hash = createHmac('sha256', req.body.password).digest('hex');
        await client.connect();

        const query = 'SELECT * FROM users WHERE username=$1 AND password=$2';
        const values = [req.body.username, hash];
        results = await client.query(query, values);

        if (results.rowCount > 0) {
            res.send({ id: results.rows[0].id, "Login": "Log in successfull"});
        } else {
            res.status(401).send({ "Error": "Invalid username or password" })
        }

    } catch (error) {
        console.log(error);
        res.status(500);
    } finally {
        await client.end();
    }
});


module.exports = usersRoute; 