import pool from '../config/db_pg.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

export async function creerUsager({ nom, prenom, courriel, motDePasse }) {
  const motDePasseHache = await bcrypt.hash(motDePasse, 10);
  const cleAPI = crypto.randomBytes(16).toString('hex');

  await pool.query(
    `INSERT INTO usagers (nom, prenom, courriel, password, cle_api)
     VALUES ($1, $2, $3, $4, $5)`,
    [nom, prenom, courriel, motDePasseHache, cleAPI]
  );

  return cleAPI;
}

export async function trouverUsagerParIdentifiants(courriel, motDePasse) {
  const resultat = await pool.query('SELECT * FROM usagers WHERE courriel = $1', [courriel]);
  const usager = resultat.rows[0];
  if (!usager) return null;

  const estValide = await bcrypt.compare(motDePasse, usager.motdepasse);
  return estValide ? usager : null;
}

export async function trouverUsagerParCle(cleAPI) {
  const resultat = await pool.query('SELECT * FROM usagers WHERE cle_api = $1', [cleAPI]);
  return resultat.rows[0] || null;
}

export async function ValidationCle(cleApi) {
  const resultat = await pool.query('SELECT * FROM usagers WHERE cle_api = $1', [cleApi]);
  return resultat.rows[0] || null;
}

export async function regenererCleAPI(idUsager) {
  const nouvelleCle = crypto.randomBytes(16).toString('hex');
  await pool.query('UPDATE usagers SET cle_api = $1 WHERE id = $2', [nouvelleCle, idUsager]);
  return nouvelleCle;
}
