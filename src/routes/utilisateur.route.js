import express from 'express';
import { inscrireUsager, obtenirOuRegenererCle } from '../controllers/utilisateur.controller.js';

const routeur = express.Router();
routeur.post('/inscription', inscrireUsager);
routeur.post('/cle', obtenirOuRegenererCle);

export default routeur;
