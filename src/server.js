
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { email } = require('@mui/icons-material');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 4000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});
function generateAccessToken(user) {
  // Générer un access token en utilisant jwt.sign()
  return jwt.sign(user, 'e58poU@RTU8977', { expiresIn: '1h' }); // Définir une expiration pour l'access token
}
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erreur interne du serveur' });
    } else if (result.length > 0) {
      const user = { email: result[0].email };
      const accessToken = generateAccessToken(user);
      res.json({accessToken});
    } else {
      res.status(401).json({ error: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  });
});
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
