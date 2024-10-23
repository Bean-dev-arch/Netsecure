// Définition des identifiants valides (à ne pas utiliser en production)
const validUsername = "monIdentifiant";
const validPassword = "monMotDePasse";

// Fonction pour gérer la connexion
function handleLogin(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    // Récupère les valeurs saisies par l'utilisateur
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Vérifie si les identifiants sont corrects
    if (username === validUsername && password === validPassword) {
        // Redirige vers la page d'accueil protégée si les identifiants sont corrects
        window.location.href = '/homepage.html';
    } else {
        // Affiche un message d'erreur si les identifiants sont incorrects
        document.getElementById("error-message").style.display = 'block';
    }
}

// Ajoute un écouteur d'événements au formulaire pour gérer la soumission
document.getElementById("login-form").addEventListener("submit", handleLogin);

