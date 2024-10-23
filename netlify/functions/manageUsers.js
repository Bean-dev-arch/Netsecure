const fs = require('fs');
const path = require('path');

// Définition du chemin vers le fichier JSON des utilisateurs
const usersFilePath = path.resolve(__dirname, 'users.json');

exports.handler = async (event) => {
    const method = event.httpMethod;
    console.log("Méthode de requête reçue :", method);

    if (method === 'GET') {
        try {
            console.log("Tentative de lecture du fichier users.json...");
            if (!fs.existsSync(usersFilePath)) {
                console.error('Le fichier users.json n\'existe pas.');
                return {
                    statusCode: 500,
                    body: JSON.stringify({ message: 'Le fichier users.json est introuvable.' }),
                };
            }
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            console.log("Fichier users.json lu avec succès.");
            return {
                statusCode: 200,
                body: usersData,
            };
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier users.json:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erreur lors de la lecture des utilisateurs.' }),
            };
        }
    }

    if (method === 'POST') {
        try {
            console.log("Données reçues dans la requête POST :", event.body);
            const { username, password, accreditation } = JSON.parse(event.body);

            if (!username || !password || !accreditation) {
                console.error("Données invalides fournies :", { username, password, accreditation });
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Tous les champs sont requis.' }),
                };
            }

            console.log("Lecture des utilisateurs existants...");
            const usersData = fs.readFileSync(usersFilePath, 'utf-8');
            const users = JSON.parse(usersData);
            users.push({ username, password, accreditation });

            console.log("Écriture des utilisateurs dans users.json...");
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
            console.log("Utilisateur ajouté avec succès.");

            return {
                statusCode: 201,
                body: JSON.stringify({ message: `Utilisateur ${username} ajouté avec succès.` }),
            };
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
            return {
                statusCode: 500,
                body: JSON.stringify({ message: 'Erreur interne du serveur.' }),
            };
        }
    }

    return {
        statusCode: 405,
        body: 'Méthode non autorisée.',
    };
};
