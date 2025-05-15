import pool from '../config/db_pg.js';

export async function obtenirTaches(idUsager, inclureTerminees = false) {
  const requete = inclureTerminees
    ? 'SELECT * FROM taches WHERE id_usager = $1'
    : 'SELECT * FROM taches WHERE id_usager = $1 AND statut = $2';

  const valeurs = inclureTerminees ? [idUsager] : [idUsager, 'en cours'];
  const resultat = await pool.query(requete, valeurs);
  return resultat.rows;
}

export async function obtenirTacheParId(idTache, idUsager) {
  const tacheRes = await pool.query('SELECT * FROM taches WHERE id = $1 AND id_usager = $2', [idTache, idUsager]);
  const tache = tacheRes.rows[0];
  if (!tache) return null;

  const sousTachesRes = await pool.query('SELECT * FROM sous_taches WHERE id_tache = $1', [idTache]);
  tache.sous_taches = sousTachesRes.rows;

  return tache;
}

export async function creerTache(idUsager, tache) {
  const { titre, description, date_debut, date_echeance, statut } = tache;
  const resultat = await pool.query(
    `INSERT INTO taches (id_usager, titre, description, date_debut, date_echeance, statut)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [idUsager, titre, description, date_debut, date_echeance, statut || 'en cours']
  );
  return resultat.rows[0].id;
}

export async function modifierTache(idTache, idUsager, donnees) {
  const { titre, description, date_debut, date_echeance } = donnees;
  await pool.query(
    `UPDATE taches
     SET titre = $1, description = $2, date_debut = $3, date_echeance = $4
     WHERE id = $5 AND id_usager = $6`,
    [titre, description, date_debut, date_echeance, idTache, idUsager]
  );
}

export async function modifierStatutTache(idTache, idUsager, statut) {
  await pool.query('UPDATE taches SET statut = $1 WHERE id = $2 AND id_usager = $3', [statut, idTache, idUsager]);
}

export async function supprimerTache(idTache, idUsager) {
  await pool.query('DELETE FROM sous_taches WHERE id_tache = $1', [idTache]);
  await pool.query('DELETE FROM taches WHERE id = $1 AND id_usager = $2', [idTache, idUsager]);
}

export async function ajouterSousTache(idTache, titre) {
  const resultat = await pool.query(
    `INSERT INTO sous_taches (id_tache, titre, statut)
     VALUES ($1, $2, 'en cours') RETURNING id`,
    [idTache, titre]
  );
  return resultat.rows[0].id;
}

export async function modifierSousTache(idTache, idSousTache, titre) {
  await pool.query('UPDATE sous_taches SET titre = $1 WHERE id = $2 AND id_tache = $3', [titre, idSousTache, idTache]);
}

export async function modifierStatutSousTache(idTache, idSousTache, statut) {
  await pool.query('UPDATE sous_taches SET statut = $1 WHERE id = $2 AND id_tache = $3', [statut, idSousTache, idTache]);
}

export async function supprimerSousTache(idTache, idSousTache) {
  await pool.query('DELETE FROM sous_taches WHERE id = $1 AND id_tache = $2', [idSousTache, idTache]);
}
