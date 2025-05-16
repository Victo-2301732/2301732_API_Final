import { ValidationCle } from "../models/utilisateur.model.js";

const authentification = (req, res, next) => {
  // Vérifier clé API présente dans l'entête
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Vous devez fournir une clé api" });
  }

  const cleApi = req.headers.authorization.split(' ')[1];

  // Vérifier clé API valide
  ValidationCle(cleApi)
    .then(resultat => {
      if (!resultat) {
        return res.status(401).json({ message: "Clé API invalide" });
      } else {
        // Clé API est valide
        req.usager = resultat; 
        next();
      }
    })
    .catch(erreur => {
      return res.status(500).json({ message: "Erreur lors de la validation de la clé api" });
    });
};

export default authentification;
