import {
  creerUsager,
  trouverUsagerParIdentifiants,
  regenererCleAPI
} from '../models/utilisateur.model.js';

export async function inscrireUsager(req, res) {
  try {
    const { nom, prenom, courriel, motDePasse } = req.body;

    if (!nom || !prenom || !courriel || !motDePasse) {
      return res.status(400).json({ erreur: 'Tous les champs sont requis.' });
    }

    const cleAPI = await creerUsager({ nom, prenom, courriel, motDePasse });
    res.status(201).json({ cle_api: cleAPI });

  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de l’inscription.' });
  }
}

export async function obtenirOuRegenererCle(req, res) {
  try {
    const { courriel, motDePasse, regenerer } = req.body;

    if (!courriel || !motDePasse) {
      return res.status(400).json({ erreur: 'Courriel et mot de passe requis.' });
    }

    const usager = await trouverUsagerParIdentifiants(courriel, motDePasse);
    if (!usager) {
      return res.status(401).json({ erreur: 'Identifiants invalides.' });
    }

    if (regenerer) {
      const nouvelleCle = await regenererCleAPI(usager.id);
      return res.json({ cle_api: nouvelleCle });
    }

    res.json({ cle_api: usager.cle_api });

  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la récupération de la clé API.' });
  }
}
