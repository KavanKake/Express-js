const express = require('express');
const app = express();
const database = require('./dbconnector.js'); // Bruk MariaDB-tilkoblingen
const bodyParser = require('body-parser');
const cors = require('cors');
const crypto = require('crypto');

// Aktiver CORS for alle ruter
app.use(cors());

// Middleware for å parse JSON-innhold
app.use(bodyParser.json()); // For å håndtere JSON-data

const port = 3000;

function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Route for å hente ut all brukerdata
app.get('/userdata', async (req, res) => {
  const query = 'SELECT * FROM Accounts';
    try {
    const kunder = await database.query(query); // Kjør SQL-spørringen
    res.send(kunder); // Send dataen tilbake til klienten
    } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).send('Error executing query');
    }
});

app.get('/username', async (req, res) => {
    const query = 'SELECT username FROM Accounts';
      try {
      const kunder = await database.query(query); // Kjør SQL-spørringen
      res.send(kunder); // Send dataen tilbake til klienten
      } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      }
  });

  app.get('/passord', async (req, res) => {
    const query = 'SELECT passord FROM Accounts';
      try {
      const kunder = await database.query(query); // Kjør SQL-spørringen
      res.send(kunder); // Send dataen tilbake til klienten
      } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      }
  });

// Route for å håndtere sign-up
app.post('/signup', async (req, res) => {
    const { fornavn, etternavn, username, epost, telefonnummer, passord } = req.body;

    const hashedPassord = hashPassword(passord);

    const query = `INSERT INTO Accounts (fornavn, etternavn, username, epost, telefonnummer, passord)       
                VALUES (?, ?, ?, ?, ?, ?)`;

    try {
    // Bruk parameterisert spørring for å sette inn data
    const result = await database.query(query, [fornavn, etternavn, username, epost, telefonnummer, hashedPassord]);
    res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
    console.error('Error inserting user into database:', error);
    res.status(500).json({ message: 'Error registering user.' });
    }
});

// Start serveren
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});