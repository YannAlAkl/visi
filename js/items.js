let data=[];
const ItemsView = (data) => /*html*/`
    <div class="card">
        <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200&h=250&fit=crop" alt="Activités" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 20px;">
        <h1 id='page-title'>Activités d'Entraînement 🏋️</h1>
        <p class="paragraphe">Parcourez et gérez les activités d'entraînement disponibles. Créez des routines personnalisées ou modifiez celles existantes pour atteindre vos objectifs de fitness.</p>
    </div>
    <div class="card" style="margin-top: 20px;">
    <h2 style="margin-bottom: 15px;">Toutes les Activités</h2>
    <table data-tableFor="Items">
        <thead>
            <tr>
                <th> Nom </th>
                <th> Type </th>
                <th> duree </th>
                <th> </th>
                <th> </th>
            </tr>
        </thead>
        <tbody>
            ${data.map(item => creerLignePourItem(item)).join('')}
        </tbody>
    </table>
    <button id='btnTable' class="btn btn-primary" data-action='ajouter' style="margin-top: 15px;">➕ Ajouter une Activité</button>
    </div>
    <div id="modal" class="modal">
        <div class="modal-content">
            <span class="fermer">❌</span>
        </div>
    </div>
`;
function creerLignePourItem(item){
    return /*html*/`
    <tr data-id=${item.id}>
        <td> ${item.nom} </td>
        <td> ${item.type} </td>
        <td> ${item.durée} </td>
        <td> <span class=bouton data-action="modifier">✏️</span> </td>
        <td> <span class=bouton data-action="supprimer">❌</span> </td>
    </tr> `
}
 const ItemsClick = (target, table, action) => {
    const tr = target.closest('tr');
    let id = table ? tr?.dataset?.id : target.parentElement.querySelector('#id')?.value;
    let index = data.findIndex(item => item.id == id);
    let modal = document.getElementById('modal');
    switch(action){
        case "ajouter": {
            let modal = document.getElementById('modal');
            modal?.classList?.toggle('show');
            chargerModal(modal, {id:0,nom:"",type:"",durée:0}, 'ajouterItem');
        }
        break;
        case "modifier": {
            let modal = document.getElementById('modal');
            modal?.classList?.toggle('show');
            let item = data[index];
            chargerModal(modal, item, 'modifierItem');
        }
        break;
        case "supprimer": 
            data.splice(index, 1);
            tr.outerHTML = "";
            break;
        case "ajouterItem": {
            ajouterItemDepuisModal(modal)
        }
        break;
        case "modifierItem": {
            let nom = modal.querySelector('#nom').value;
            let desc = modal.querySelector('#description').value;
            let poids = modal.querySelector('#poids').value;
            let item = {id: id, nom: nom, type:type, durée:durée};
            data[index] = item;
            let trOld = document.querySelectorAll(`[data-id='${id}']`)[0];
            let trNew = creerLignePourItem(item);
            trOld.outerHTML = trNew;
            break;
        }
    }
}

/**
 * 
 * @param {HTMLElement} modal 
 * @param {Item} item 
 */
function chargerModal(modal, item, action){
    let modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = "";
    modalContent.insertAdjacentHTML('afterbegin', '<span class="fermer">❌</span>');
    let html = /*html*/`
        <input id='id' type='text' style='display:none' value=${item.id} disabled>
        <label for='nom'>Nom:</label>
        <input id='nom' name='nom' type='text' value='${item.nom}'>
        <label for='type'>type:</label>
        <input id='type' name='type' type='text' value='${item.type}'>
        <label for='durée'>durée:</label>
        <input id='durée' name='durée' type='number' min='1' max='1000' step='0.1' value='${item.durée}'>
        <input type='button' value='Sauvegarder' data-action='${action}' style='margin-top:1.5em'>
    `;
    modal.querySelector('.modal-content').insertAdjacentHTML('beforeend', html);
}
async function ajouterItemDepuisModal(modal){
   const nom = modal.querySelector('#nom').value;
    const type= modal.querySelector('#type').value;
    const durée= modal.querySelector('#durée').value ;

           const response = await fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: nom,
                type: type,
                durée:durée,
            })
        });

        const dataActivites = await response.json();
        if (result.success) {
        const item = result.activite;
        dataActivites.push(item);
        const trNew = creerLignePourItem(item);
        document.querySelector('table tbody').insertAdjacentHTML('beforeend', trNew);
        modal.classList.remove("show");
    } else {
        alert("Erreur lors de l'ajout de l'activité");
    }
}