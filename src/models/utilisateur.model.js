import pool from '../config/db_pg.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function creerUtilisateur({ nom, prenom, courriel, motDePasse }) {
  const motDePasseHache = await bcrypt.hash(motDePasse, 10);
  const cleAPI = crypto.randomBytes(16).toString('hex');

  await pool.query(
    `INSERT INTO utilisateur (nom, prenom, courriel, cle_api, password)
     VALUES ($1, $2, $3, $4, $5)`,
    [nom, prenom, courriel, cleAPI, motDePasseHache]
  );

  return cleAPI;
}

export async function trouverUtilisateurParIdentifiants(courriel, motDePasse) {
  const resultat = await pool.query('SELECT * FROM utilisateur WHERE courriel = $1', [courriel]);
  const utilisateur = resultat.rows[0];
  if (!utilisateur) return null;

  const estValide = await bcrypt.compare(motDePasse, utilisateur.password);
  return estValide ? utilisateur : null;
}

export async function trouverUtilisateurParCle(cleAPI) {
  const resultat = await pool.query('SELECT * FROM utilisateur WHERE cle_api = $1', [cleAPI]);
  return resultat.rows[0] || null;
}

export async function ValidationCle(cleApi) {
  const resultat = await pool.query('SELECT * FROM utilisateur WHERE cle_api = $1', [cleApi]);
  return resultat.rows[0] || null;
}

export async function regenererCleAPI(idUtilisateur) {
  const nouvelleCle = crypto.randomBytes(16).toString('hex');
  await pool.query('UPDATE utilisateur SET cle_api = $1 WHERE id = $2', [nouvelleCle, idUtilisateur]);
  return nouvelleCle;
}
