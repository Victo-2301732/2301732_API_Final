import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import routeTaches from './src/routes/tache.route.js';
import routeUtilisateurs from './src/routes/utilisateur.route.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan('dev'));

// Swagger note de cours https://services-web-victo.github.io/notes_de_cours/api/documentation/#installation
const swaggerDocument = JSON.parse(fs.readFileSync('./src/config/documentation.json', 'utf8'));
const swaggerOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API de gestion de tâches'
};
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use('/api/taches', routeTaches);
app.use('/api/utilisateurs', routeUtilisateurs);

app.use((req, res) => res.status(404).json({ erreur: 'Route non trouvée' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré : ${PORT}`));
