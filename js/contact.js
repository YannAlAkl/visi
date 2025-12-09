const ContactView = () => `
<div class="two-col section-gap">
  <div class="card">
    <h1 id="page-title">Contactez-Nous</h1>
    <p class="paragraphe">Vous avez des questions sur l'adhésion, les cours ou nos installations? Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.</p>

    <form id="formContact" class="form-section">
      <label for="nom">Nom Complet</label>
      <input id="nom" name="nom" type="text" placeholder="Jean Dupont" required>

      <label for="email">Adresse Email</label>
      <input id="email" name="email" type="email" placeholder="jean@exemple.com" required>

      <label for="message">Message</label>
      <textarea id="message" name="message" placeholder="Dites-nous comment nous pouvons vous aider..." required></textarea>

      <button class="btn btn-primary" type="submit">Envoyer le Message 📧</button>
    </form>
  </div>

  <div>
    <div class="card">
      <img src="/img/image12.png" class="img-small">
      <h2>Visitez-Nous</h2>
      <p class="paragraphe"><strong>FitLife Gym</strong><br>123 Avenue du Fitness, Suite 100<br>Montréal, QC H3B 2E5</p>

      <h3>Heures d'Ouverture</h3>
      <p class="paragraphe">Lundi - Vendredi: 5h00 - 23h00<br>Samedi: 6h00 - 22h00<br>Dimanche: 7h00 - 21h00</p>

      <h3>Coordonnées</h3>
      <p class="paragraphe">📞 (555) 123-4567<br>📧 info@fitlifegym.com<br>💬 (555) 123-4568</p>
    </div>

    <div class="card section-gap">
      <h3>Suivez-Nous</h3>
      <p class="paragraphe">Restez connecté pour des conseils d'entraînement, des histoires de réussite et des offres spéciales!</p>
      <div class="socials">
        <span class="badge">Instagram</span>
        <span class="badge">Facebook</span>
        <span class="badge">Twitter</span>
      </div>
    </div>
  </div>
</div>
`;
