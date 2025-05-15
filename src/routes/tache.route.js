import express from 'express';
import {
  listerTaches,
  detailsTache,
  ajouterTache,
  modifierTache,
  changerStatutTache,
  supprimerTache,
  ajouterSousTache,
  modifierSousTache,
  changerStatutSousTache,
  supprimerSousTache
} from '../controllers/tache.controller.js';

import { validerCleAPI } from '../middlewares/cleapi.middleware.js';

const routeur = express.Router();
routeur.use(validerCleAPI);

routeur.get('/', listerTaches);
routeur.get('/:id', detailsTache);
routeur.post('/', ajouterTache);
routeur.put('/:id', modifierTache);
routeur.patch('/:id/statut', changerStatutTache);
routeur.delete('/:id', supprimerTache);

routeur.post('/:id/sous-taches', ajouterSousTache);
routeur.put('/:id/sous-taches/:idSousTache', modifierSousTache);
routeur.patch('/:id/sous-taches/:idSousTache/statut', changerStatutSousTache);
routeur.delete('/:id/sous-taches/:idSousTache', supprimerSousTache);

export default routeur;
