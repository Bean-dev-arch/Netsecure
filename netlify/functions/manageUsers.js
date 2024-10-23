const fs = require('fs');
const path = require('path');

// Définition du chemin vers le fichier JSON des utilisateurs, à partir du dossier des fonctions Netlify
const usersFilePath = path.resolve(__dirname, 'users.json'); // Chemin vers users.json dans le dossier /netlify/functions

exports.handler = async (event) => {
    const method = event.httpMethod;

    if (method === 'GET') {
        try {
            // Lire le fichier users.json pour récupérer la liste des utilisateurs
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            return {
                statusCode: 200,
                body: usersData, // Retourner les utilisateurs en JSON
            };
        } catch (error) {
            // Gérer les erreurs lors de la lecture du fichier
            console.error('Erreur lors de la lecture du fichier users.json:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erreur lors de la lecture des utilisateurs.' }),
            };
        }
    }

    if (method === 'POST') {
        try {
            // Récupérer les données du corps de la requête POST
            const { username, password, accreditation } = JSON.parse(event.body);

            // Vérification que tous les champs sont fournis
            if (!username || !password || !accreditation) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Tous les champs sont requis.' }),
                };
            }

            // Lire les utilisateurs existants
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            const users = JSON.parse(usersData);

            // Ajouter le nouvel utilisateur
            users.push({ username, password, accreditation });

            // Écrire les modifications dans users.json
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

            return {
                statusCode: 201,
                body: JSON.stringify({ message: `Utilisateur ${username} ajouté avec succès.` }),
            };
        } catch (error) {
            // Gérer les erreurs lors de l'ajout d'un utilisateur
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erreur interne du serveur.' }),
            };
        }
    }

    // Méthode non autorisée
    return {
        statusCode: 405,
        body: 'Méthode non autorisée.',
    };
};

