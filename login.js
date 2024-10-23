<script>
  function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "monIdentifiant" && password === "monMotDePasse") {
      window.location.href = 'homepage.html'; // Redirection vers la page d'accueil
    } else {
      alert("Identifiant ou mot de passe incorrect");
    }
  }
</script>

<form>
    <input type="text" id="username" placeholder="Identifiant">
    <input type="password" id="password" placeholder="Mot de passe">
    <button type="button" onclick="login()">Se connecter</button>
</form>
