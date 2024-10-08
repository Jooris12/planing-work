const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Hôte de la base de données
  user: 'root', // Nom d'utilisateur MySQL
  password: '', // Mot de passe MySQL (laissez vide si vous n'en avez pas défini un)
  database: 'Gestion_de_taches' // Remplacez par le nom de votre base de données
});

connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données:', error);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

module.exports = connection;
