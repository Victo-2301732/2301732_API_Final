import * as modele from '../models/tache.model.js';

export async function listerTaches(req, res) {
  try {
    const inclureCompletes = req.query.toutes === 'true';
    const taches = await modele.obtenirTaches(req.usager.id, inclureCompletes);
    res.json(taches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la récupération des tâches.' });
  }
}

export async function detailsTache(req, res) {
  try {
    const tache = await modele.obtenirTacheParId(req.params.id, req.usager.id);
    if (!tache) return res.status(404).json({ erreur: 'Tâche non trouvée.' });
    res.json(tache);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la récupération de la tâche.' });
  }
}

export async function ajouterTache(req, res) {
  try {
    const id = await modele.creerTache(req.usager.id, req.body);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la création de la tâche.' });
  }
}

export async function modifierTache(req, res) {
  try {
    await modele.modifierTache(req.params.id, req.usager.id, req.body);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la modification de la tâche.' });
  }
}

export async function changerCompleteTache(req, res) {
  try {
    await modele.modifierCompleteTache(req.params.id, req.usager.id, req.body.complete);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la mise à jour du statut de la tâche.' });
  }
}

export async function supprimerTache(req, res) {
  try {
    await modele.supprimerTache(req.params.id, req.usager.id);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la suppression de la tâche.' });
  }
}

export async function ajouterSousTache(req, res) {
  try {
    const id = await modele.ajouterSousTache(req.params.id, req.body.titre);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de l’ajout de la sous-tâche.' });
  }
}

export async function modifierSousTache(req, res) {
  try {
    await modele.modifierSousTache(req.params.id, req.params.idSousTache, req.body.titre);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la modification de la sous-tâche.' });
  }
}

export async function changerCompleteSousTache(req, res) {
  try {
    await modele.modifierCompleteSousTache(req.params.id, req.params.idSousTache, req.body.complete);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors du changement de statut de la sous-tâche.' });
  }
}

export async function supprimerSousTache(req, res) {
  try {
    await modele.supprimerSousTache(req.params.id, req.params.idSousTache);
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erreur: 'Erreur lors de la suppression de la sous-tâche.' });
  }
}
