import {
  creerUtilisateur,
  trouverUtilisateurParIdentifiants,
  regenererCleAPI
} from '../models/utilisateur.model.js';

// Inscriptuion nouveau user
export async function inscrireUtilisateur(req, res) {
  try {
    const { nom, prenom, courriel, motDePasse } = req.body;

    if (!nom || !prenom || !courriel || !motDePasse) {
      return res.status(400).json({ erreur: 'Tous les champs sont requis.' });
    }

    // Crée user et génère clé api
    const cleAPI = await creerUtilisateur({ nom, prenom, courriel, motDePasse });
    // Retourne clé api au user
    res.status(201).json({ cle_api: cleAPI });

  } catch (erreur) {
    console.error('Erreur dans inscrireUtilisateur :', erreur);
    res.status(500).json({ erreur: erreur.message || 'Erreur lors de l’inscription.' });
  }
}

// Obtenir clé assosié ou regénérer
export async function obtenirOuRegenererCle(req, res) {
  try {
    const { courriel, motDePasse, regenerer } = req.body;

    if (!courriel || !motDePasse) {
      return res.status(400).json({ erreur: 'Courriel et mot de passe requis.' });
    }

    const utilisateur = await trouverUtilisateurParIdentifiants(courriel, motDePasse);
    if (!utilisateur) {
      return res.status(401).json({ erreur: 'Identifiants invalides.' });
    }

    // Si demande nouvelle clé
    if (regenerer) {
      const nouvelleCle = await regenererCleAPI(utilisateur.id);
      return res.json({ cle_api: nouvelleCle });
    }

    // Retourne clé assosié
    res.json({ cle_api: utilisateur.cle_api });

  } catch (erreur) {
    console.error('Erreur dans obtenirOuRegenererCle :', erreur);
    res.status(500).json({ erreur: 'Erreur lors de la récupération de la clé API.' });
  }
}
