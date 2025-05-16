import express from 'express';
import { inscrireUtilisateur, obtenirOuRegenererCle } from '../controllers/utilisateur.controller.js';

const routeur = express.Router();
routeur.post('/inscription', inscrireUtilisateur);
routeur.post('/cle', obtenirOuRegenererCle);

export default routeur;
