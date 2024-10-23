// Précharger les utilisateurs par défaut si localStorage ne contient pas encore de 'users'
if (!localStorage.getItem('users')) {
    const defaultUsers = [
        { username: 'admin', password: 'adminpass', accreditation: 'admin' },
        { username: 'user1', password: 'user1pass', accreditation: '1' },
        { username: 'user2', password: 'user2pass', accreditation: '2' }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

// Fonction de connexion
function login() {
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        // Connexion réussie
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = 'homepage.html'; // Rediriger après connexion réussie
    } else {
        // Erreur de connexion
        alert('Identifiant ou mot de passe incorrect');
    }
}

// Fonction de déconnexion
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html'; // Rediriger vers la page de connexion
}

// Vérifier si un utilisateur est connecté
function checkIfLoggedIn() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        // Si aucun utilisateur n'est connecté, rediriger vers la page de connexion
        window.location.href = 'index.html';
    }
}

