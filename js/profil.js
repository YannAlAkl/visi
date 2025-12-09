
/** @param {User} user */
const ProfilView = (user) => /*html*/`
    <div class="card">
        <img src="/img/image14.png" alt="Profil" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
        <h1 id='page-title'>Profil Membre 👤</h1>
        <p class="paragraphe">Bon retour, <strong style="color: var(--accent);">${user.nom}</strong>!</p>
    </div>

    <div class="two-col" style="margin-top: 20px;">
        <div class="card">
            <h2>Informations du Compte</h2>
            <form id="formProfil" action="" method="get" style="margin-top: 15px;">
                <label for="nom">Nom Complet</label>
                <input id="nom" name="nom" type="text" value="${user.nom}" disabled>
                
                <label for="email">Adresse Email</label>
                <input id="email" name="email" type="email" value="${user.email}" disabled>
                
                <label for="role">Type de Compte</label>
                <input id="role" name="role" type="text" value="${user.role}" disabled>
                
                <label for="abonnement">Plan d'Adhésion</label>
                <input id="abonnement" name="abonnement" type="text" value="${user.abonnement}" disabled>
            </form>
        </div>

        <div>
            <div class="card">
                <h3>Statut d'Adhésion</h3>
                <div style="margin-top: 15px; padding: 15px; background: rgba(255,107,53,0.1); border-radius: 8px; border: 1px solid var(--accent);">
                    <p style="margin: 0; color: var(--accent); font-weight: 600;">✓ Membre Actif</p>
                    <p style="margin: 10px 0 0 0; font-size: 13px; color: var(--muted);">Plan: ${user.abonnement}</p>
                </div>
                <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=200&fit=crop" alt="Fitness" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-top: 15px;">
            </div>

            <div class="card" style="margin-top: 20px;">
                <h3>Statistiques Rapides</h3>
                <div style="display: grid; gap: 10px; margin-top: 15px;">
                    <div style="padding: 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                        <p style="margin: 0; font-size: 12px; color: var(--muted);">Entraînements ce Mois</p>
                        <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 700; color: var(--accent);">12</p>
                    </div>
                    <div style="padding: 12px; background: rgba(255,255,255,0.03); border-radius: 6px;">
                        <p style="margin: 0; font-size: 12px; color: var(--muted);">Cours Assistés</p>
                        <p style="margin: 5px 0 0 0; font-size: 24px; font-weight: 700; color: var(--accent);">8</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
