import express from 'express';
import {
  listerTaches, 
  detailsTache, 
  ajouterTache, 
  modifierTache,
  changerCompleteTache,     
  supprimerTache,
  ajouterSousTache, 
  modifierSousTache, 
  changerCompleteSousTache, 
  supprimerSousTache
} from '../controllers/tache.controller.js';

import authentification from '../middlewares/authentification.middleware.js';

const routeur = express.Router();
routeur.use(authentification);

// Routes protégées
routeur.get('/', listerTaches);
routeur.get('/:id', detailsTache);
routeur.post('/', ajouterTache);
routeur.put('/:id', modifierTache);
routeur.patch('/:id/complete', changerCompleteTache);                    
routeur.delete('/:id', supprimerTache);

routeur.post('/:id/sous-taches', ajouterSousTache);
routeur.put('/:id/sous-taches/:idSousTache', modifierSousTache);
routeur.patch('/:id/sous-taches/:idSousTache/complete', changerCompleteSousTache); 
routeur.delete('/:id/sous-taches/:idSousTache', supprimerSousTache);

export default routeur;
