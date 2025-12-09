(() => {
    let main = "";
    let currentUser = null; //new


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
                main.innerHTML = AppView();
                initAppView();
                break;
            case 5:
                const user = users.find(user => user.isLogged === true);
                if (!user) {
                    alert("Vous devez vous connecter pour afficher votre profil!");
                    return;
                }
                main.innerHTML = ProfilView(user);
                break;
            case 6:
                main.innerHTML = LoginView();
                break;
            case 7:
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

    function gererSubmit(event) {
        event.preventDefault();
        const form = document.getElementById('formLogin')
        const formId = form.id;
        if (formId == "formLogin") {
            const email = form.email.value;
            const password = form.password.value;
            authentification(email, password);
        }
    }
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
            // we keep the connected user
            currentUser = data.user;

            // On met à jour le bouton Login -> Logout
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



    function initFormulaires() {
        window.addEventListener("submit", gererSubmit);
    }

    function init() {
        main = document.getElementById("main-content");
        initNavigation();

        initFormulaires();
        main.innerHTML = AccueilView();
    }

    document.addEventListener('DOMContentLoaded', init);
})();



class Exercise {
    constructor(nom, type, duree) {
        this.nom = nom;
        this.type = type;
        this.duree = duree;
    }
}

const exercises = [
    new Exercise("Squats", "Force", 15),
    new Exercise("Course sur tapis", "Cardio", 20),
    new Exercise("Pompes", "Force", 10),
    new Exercise("Yoga", "Souplesse", 30),
    new Exercise("HIIT", "Cardio", 25),
];

const AppView = () => `
    <div class="card">
        <h1 id="page-title">Votre Routine Fitness 💪</h1>
        <p class="paragraphe">Gérez vos exercices : ajoutez, modifiez ou supprimez vos activités préférées.</p>
        <form id="formExercise" style="margin-top: 20px;">
            <input type="text" id="exercise-name" placeholder="Nom de l'exercice" required>
            <input type="text" id="exercise-type" placeholder="Type (Force, Cardio, Souplesse)" required>
            <input type="number" id="exercise-duration" placeholder="Durée (minutes)" required>
            <button class="btn btn-primary" type="submit" style="margin-top: 10px;">Ajouter Exercice</button>
        </form>
        <div id="exercise-list" style="margin-top: 20px;"></div>
    </div>
`;

function renderExercises() {
    const listDiv = document.getElementById("exercise-list");
    listDiv.innerHTML = "";
    exercises.forEach((ex, index) => {
        const div = document.createElement("div");
        div.className = "card";
        div.style.marginBottom = "12px";
        div.innerHTML = `
            <strong>${ex.nom}</strong> (${ex.type}) - ${ex.duree} min
            <div style="margin-top: 8px;">
                <button class="btn btn-ghost" data-action="edit" data-index="${index}">Modifier</button>
                <button class="btn btn-ghost" data-action="delete" data-index="${index}">Supprimer</button>
            </div>
        `;
        listDiv.appendChild(div);
    });
}

function setupAppEvents() {
    const form = document.getElementById("formExercise");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nom = document.getElementById("exercise-name").value.trim();
        const type = document.getElementById("exercise-type").value.trim();
        const duree = parseInt(document.getElementById("exercise-duration").value);
        if (nom && type && duree > 0) {
            exercises.push(new Exercise(nom, type, duree));
            renderExercises();
            form.reset();
        }
    });

    document.getElementById("exercise-list").addEventListener("click", (e) => {
        const btn = e.target;
        const action = btn.dataset.action;
        const index = btn.dataset.index;
        if (action === "delete") {
            exercises.splice(index, 1);
            renderExercises();
        } else if (action === "edit") {
            const ex = exercises[index];
            const newNom = prompt("Modifier le nom", ex.nom);
            const newType = prompt("Modifier le type", ex.type);
            const newDuree = prompt("Modifier la durée (minutes)", ex.duree);
            if (newNom && newType && newDuree) {
                exercises[index] = new Exercise(newNom, newType, parseInt(newDuree));
                renderExercises();
            }
        }
    });
}

function initAppView() {
    renderExercises();
    setupAppEvents();
}