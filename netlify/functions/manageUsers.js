const fs = require('fs');
const path = require('path');

// Chemin vers le fichier JSON des utilisateurs
const usersFilePath = path.resolve(__dirname, '../../data/users.json');

// Fonction pour gérer les utilisateurs (GET pour lire, POST pour ajouter des utilisateurs)
exports.handler = async (event) => {
  const method = event.httpMethod;

  if (method === 'GET') {
    // Lire le fichier users.json
    const usersData = fs.readFileSync(usersFilePath);
    return {
      statusCode: 200,
      body: usersData,
    };
  }

  if (method === 'POST') {
    // Ajouter un nouvel utilisateur
    const { username, password, accreditation } = JSON.parse(event.body);

    if (!username || !password || !accreditation) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Tous les champs sont requis.' }),
      };
    }

    // Lire les utilisateurs actuels
    const usersData = fs.readFileSync(usersFilePath);
    const users = JSON.parse(usersData);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Cet utilisateur existe déjà.' }),
      };
    }

    // Ajouter le nouvel utilisateur
    const newUser = { username, password, accreditation };
    users.push(newUser);

    // Écrire le nouveau fichier users.json
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Utilisateur ajouté avec succès.' }),
    };
  }

  return {
    statusCode: 405,
    body: 'Méthode non autorisée.',
  };
};
