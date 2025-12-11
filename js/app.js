(() => {
    let main = "";
    let currentUser = null; // utilisateur connecté (vient du serveur)

    // ------------------------------
    // NAVIGATION
    // ------------------------------
    function gererNavigation(e) {
        let valeur = e.target.value;

        switch (valeur) {
            case 1:
                main.innerHTML = AccueilView();
                break;

            case 2:
                main.innerHTML = AProposView();
                break;

            case 3:
                main.innerHTML = ContactView();
                break;

            case 4:
                    afficherActivites();
                break;

            case 5:
                // PROFIL : on utilise currentUser, pas users.isLogged
                if (!currentUser) {
                    alert("Vous devez vous connecter pour afficher votre profil!");
                    return;
                }
                main.innerHTML = ProfilView(currentUser);
                break;

            case 6:
                main.innerHTML = LoginView();
                break;

            case 7:
                currentUser = null;
                localStorage.removeItem("currentUser"); // on efface le user mémorisé

                users.forEach(user => user.isLogged = false);
                const btnLogin = document.getElementById("btn-login");
                btnLogin.innerText = "Login";
                btnLogin.value = 6;
                alert(`Déconnexion réussie!`);
                main.innerHTML = AccueilView();
                break;
        }
    }

    function initNavigation() {
        const navElements = document.querySelectorAll(".nav-element");
        navElements.forEach(function (navElem) {
            navElem.addEventListener("click", gererNavigation);
        });
    }
   
    
    async function afficherActivites(){
        const  reponse = await fetch('/items');
        const json = await reponse.json();
        console.log(json);
       const data = json;
       main.innerHTML = ItemsView(data);
    }

    // ------------------------------
    // GESTION DES FORMULAIRES
    // ------------------------------
    function gererSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const formId = form.id;

        // LOGIN
        if (formId === "formLogin") {
            const email = form.email.value;
            const password = form.password.value;
            authentification(email, password);
        }

        // PROFIL
        if (formId === "formProfil") {
            const nom = form.nom.value;
            const abonnement = form.abonnement.value;
            mettreAJourProfil(nom, abonnement);
        }
    }

    function initFormulaires() {
        window.addEventListener("submit", gererSubmit);
    }

    // ------------------------------
    // LOGIN
    // ------------------------------
    async function authentification(email, password) {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.success === true) {
            // on garde l'utilisateur connecté
            currentUser = data.user;
            // DEBUG pour Yann : voir l'utilisateur dans la console
            console.log("Utilisateur connecté :", currentUser);
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            const btnLogin = document.getElementById("btn-login");
            if (btnLogin) {
                btnLogin.innerText = "Logout";
                btnLogin.value = 7;
            }

            alert("Connexion réussie pour " + data.user.nom + "!");
            main.innerHTML = AccueilView();
        } else {
            alert("Mauvais usager ou mot de passe entré");
        }
    }

    // ------------------------------
    // PROFIL : mise à jour
    // ------------------------------
    async function mettreAJourProfil(nom, abonnement) {
        // sécurité : si jamais currentUser est null
        if (!currentUser) {
            alert("Vous devez être connecté pour modifier le profil");
            return;
        }

        // DEBUG : vérifier ce qu'on envoie
        console.log("Mise à jour profil pour id =", currentUser.id);

        const response = await fetch('/profil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: currentUser.id,
                nom: nom,
                abonnement: abonnement
            })
        });

        const data = await response.json();

        if (data.success === true) {
            // on met à jour currentUser avec les nouvelles infos
            currentUser = data.user;
            alert("Profil mis à jour !");
            main.innerHTML = ProfilView(currentUser);
        } else {
            alert("Erreur lors de la mise à jour du profil");
        }
    }

    // ------------------------------
    // INIT
    // ------------------------------
    function init() {
        main = document.getElementById("main-content");
            // essayer de récupérer un utilisateur déjà connecté
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            // mettre à jour le bouton Login -> Logout
            const btnLogin = document.getElementById("btn-login");
            if (btnLogin) {
                btnLogin.innerText = "Logout";
                btnLogin.value = 7;
            }
        }
        initNavigation();
        initFormulaires();
        initClick();
        main.innerHTML = AccueilView();
    }
    function initClick(){
        window.addEventListener('click',(e)=>{
            const target = e.target;
            const table = target.closest('table')
            const action = target.dataset ? target.dataset.action : null;
            if (target.id === "modal" || target.classList.contains("fermer")) {
            const modal = document.getElementById("modal");
            if (modal) {

                modal.classList.toggle("show");
            }
            return
        }
        if (action) {
            ItemsClick(target, table, action);

        }
 
 
        })

    }


 document.addEventListener('DOMContentLoaded', init);
})();






