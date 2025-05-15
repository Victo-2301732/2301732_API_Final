import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';

import routeTaches from './src/routes/tache.route.js';
import routeUtilisateurs from './src/routes/utilisateur.route.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use('/api/taches', routeTaches);
app.use('/api/utilisateurs', routeUtilisateurs);
app.use('/api/docs', express.static('docs'));

app.use((req, res) => res.status(404).json({ erreur: 'Route non trouvée' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré : ${PORT}`));
