const LoginView = () => `
<div class="card max-width">
  <img src="/img/image13.png" class="img-medium">
  <h1 id="page-title" class="text-center">Connexion Membre 🔐</h1>
  <p class="paragraphe text-center">Accédez à votre compte FitLife pour consulter votre profil, suivre vos entraînements et gérer votre adhésion.</p>

  <form id="formLogin" class="form-section">
    <label for="email">Adresse Email</label>
    <input id="email" name="email" type="email" placeholder="votre.email@exemple.com" required>

    <label for="password">Mot de Passe</label>
    <input id="password" name="password" type="password" placeholder="Entrez votre mot de passe" required>

    <button class="btn btn-primary" type="submit">Se Connecter</button>
  </form>

  <div class="text-center section-gap">
    <p class="small-muted">Pas encore de compte? <span class="accent-text cursor-pointer">Inscrivez-vous pour un essai gratuit</span></p>
  </div>

  <div class="card section-gap">
    <p class="small-muted"><strong>Comptes de démo:</strong><br>
    alice@ex.com / pass1 (Membre Premium)<br>
    bob@ex.com / pass2 (Coach)<br>
    caro@ex.com / pass3 (Membre Standard)</p>
  </div>
</div>
`;
