import pool from '../config/db_pg.js';

// Récupère toute les tâche d'un user
export async function obtenirTaches(utilisateur_id, inclureCompletes = false) {
  const requete = inclureCompletes
    ? 'SELECT * FROM taches WHERE utilisateur_id = $1'
    : 'SELECT * FROM taches WHERE utilisateur_id = $1 AND complete = 0';

  const resultat = await pool.query(requete, [utilisateur_id]);
  return resultat.rows;
}

// Récupère une tâche selon le id spécifié
export async function obtenirTacheParId(tache_id, utilisateur_id) {
  const tacheRes = await pool.query(
    'SELECT * FROM taches WHERE id = $1 AND utilisateur_id = $2',
    [tache_id, utilisateur_id]
  );
  const tache = tacheRes.rows[0];
  if (!tache) return null;

    // Récupère sous-tâche assossié
  const sousTachesRes = await pool.query(
    'SELECT * FROM sous_taches WHERE tache_id = $1',
    [tache_id]
  );
  tache.sous_taches = sousTachesRes.rows;
  return tache;
}

// Crée nouvelle tâche
export async function creerTache(utilisateur_id, donnees) {
  const { titre, description, date_debut, date_echeance, complete } = donnees;
  const resultat = await pool.query(
    `INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [utilisateur_id, titre, description, date_debut, date_echeance, complete || 0]
  );
  return resultat.rows[0].id;
}

// Modifie tâche selon id
export async function modifierTache(tache_id, utilisateur_id, donnees) {
  const { titre, description, date_debut, date_echeance } = donnees;
  await pool.query(
    `UPDATE taches
     SET titre = $1, description = $2, date_debut = $3, date_echeance = $4
     WHERE id = $5 AND utilisateur_id = $6`,
    [titre, description, date_debut, date_echeance, tache_id, utilisateur_id]
  );
}

// Modifie statut tâche -> complete
export async function modifierCompleteTache(tache_id, utilisateur_id, complete) {
  await pool.query(
    'UPDATE taches SET complete = $1 WHERE id = $2 AND utilisateur_id = $3',
    [complete, tache_id, utilisateur_id]
  );
}

// Supprime tâche et leur sous-tâches
export async function supprimerTache(tache_id, utilisateur_id) {
  await pool.query('DELETE FROM sous_taches WHERE tache_id = $1', [tache_id]);
  await pool.query('DELETE FROM taches WHERE id = $1 AND utilisateur_id = $2', [tache_id, utilisateur_id]);
}

// Créer une sous-tâche pour une tâche avec tâche id
export async function ajouterSousTache(tache_id, titre) {
  const resultat = await pool.query(
    `INSERT INTO sous_taches (tache_id, titre, complete)
     VALUES ($1, $2, 0) RETURNING id`,
    [tache_id, titre]
  );
  return resultat.rows[0].id;
}

// Modifie une sous-tâche selon id
export async function modifierSousTache(tache_id, sous_tache_id, titre) {
  await pool.query(
    `UPDATE sous_taches
     SET titre = $1
     WHERE id = $2 AND tache_id = $3`,
    [titre, sous_tache_id, tache_id]
  );
}

// Modifie statut complete
export async function modifierCompleteSousTache(tache_id, sous_tache_id, complete) {
  await pool.query(
    `UPDATE sous_taches
     SET complete = $1
     WHERE id = $2 AND tache_id = $3`,
    [complete, sous_tache_id, tache_id]
  );
}

// Supprime sous-tâche selon son id et id tâche
export async function supprimerSousTache(tache_id, sous_tache_id) {
  await pool.query(
    'DELETE FROM sous_taches WHERE id = $1 AND tache_id = $2',
    [sous_tache_id, tache_id]
  );
}
