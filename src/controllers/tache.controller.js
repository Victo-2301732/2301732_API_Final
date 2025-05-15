import * as modele from '../models/tache.model.js';

export async function listerTaches(req, res) {
  try {
    const inclureTerminees = req.query.toutes === 'true';
    const taches = await modele.obtenirTaches(req.usager.id, inclureTerminees);
    res.json(taches);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des tâches.' });
  }
}

export async function detailsTache(req, res) {
  try {
    const tache = await modele.obtenirTacheParId(req.params.id, req.usager.id);
    if (!tache) return res.status(404).json({ erreur: 'Tâche non trouvée.' });
    res.json(tache);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la récupération de la tâche.' });
  }
}

export async function ajouterTache(req, res) {
  try {
    const id = await modele.creerTache(req.usager.id, req.body);
    res.status(201).json({ id });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la création de la tâche.' });
  }
}

export async function modifierTache(req, res) {
  try {
    await modele.modifierTache(req.params.id, req.usager.id, req.body);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la modification de la tâche.' });
  }
}

export async function changerStatutTache(req, res) {
  try {
    await modele.modifierStatutTache(req.params.id, req.usager.id, req.body.statut);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors du changement de statut de la tâche.' });
  }
}

export async function supprimerTache(req, res) {
  try {
    await modele.supprimerTache(req.params.id, req.usager.id);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la suppression de la tâche.' });
  }
}

export async function ajouterSousTache(req, res) {
  try {
    const id = await modele.ajouterSousTache(req.params.id, req.body.titre);
    res.status(201).json({ id });
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de l’ajout de la sous-tâche.' });
  }
}

export async function modifierSousTache(req, res) {
  try {
    await modele.modifierSousTache(req.params.id, req.params.idSousTache, req.body.titre);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la modification de la sous-tâche.' });
  }
}

export async function changerStatutSousTache(req, res) {
  try {
    await modele.modifierStatutSousTache(req.params.id, req.params.idSousTache, req.body.statut);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors du changement de statut de la sous-tâche.' });
  }
}

export async function supprimerSousTache(req, res) {
  try {
    await modele.supprimerSousTache(req.params.id, req.params.idSousTache);
    res.sendStatus(204);
  } catch (erreur) {
    console.error(erreur);
    res.status(500).json({ erreur: 'Erreur lors de la suppression de la sous-tâche.' });
  }
}
