const express = require('express');
const db = require('./db'); // Importer la connexion à la base de données
const app = express();

app.use(express.json());

// Route pour obtenir toutes les tâches
app.get('/api/taches', (req, res) => {
    db.query('SELECT * FROM taches', (error, results) => {
        if (error) {
            console.error('Erreur lors de la récupération des tâches:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
        }
        res.json(results);
    });
});
app.post('/api/taches', (req, res) => {
    const { name, description, dueDate, section } = req.body;
    
    const query = `INSERT INTO taches (titre, description, date_echeance, statut) VALUES (?, ?, ?, ?)`;
    db.query(query, [name, description, dueDate, section], (error, result) => {
        if (error) {
            console.error('Erreur lors de l\'ajout de la tâche:', error);
            res.status(500).json({ error: 'Erreur lors de l\'ajout de la tâche' });
        } else {
            res.status(201).json({ message: 'Tâche ajoutée avec succès', taskId: result.insertId });
        }
    });
});


// Lancer le serveur
const port = 4000;
app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
