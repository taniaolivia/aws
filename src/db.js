const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.RDS_DATABASE, 
  process.env.RDS_USERNAME, 
  process.env.RDS_PASSWORD, 
  { 
    host: process.env.RDS_HOSTNAME,
    dialect: 'mysql' 
  }
);

db.authenticate().then(() => {
  console.log('Connexion avec succès.');
}).catch((error) => {
  console.error('Impossible de se connecter à la base de données : ', error);
});

module.exports = db;