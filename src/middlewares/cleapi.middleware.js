import { trouverUsagerParCle } from '../models/utilisateur.model.js';

export async function validerCleAPI(req, res, next) {
  const cle = req.header('x-api-key');
  if (!cle) return res.status(401).json({ erreur: 'Clé API manquante' });

  const usager = await trouverUsagerParCle(cle);
  if (!usager) return res.status(403).json({ erreur: 'Clé API invalide' });

  req.usager = usager;
  next();
}
