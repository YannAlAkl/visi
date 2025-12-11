 const express = require("express");
 const app = express();
 const path = require("path");
 const port = 3000;

 const fs = require("fs");

 const data_file = path.join(__dirname, 'data', 'users.json')
 const data_activites = path.join(__dirname, 'data', 'activites.json');

 app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static(__dirname));

 app.use(express.json());
 app.use(express.urlencoded({
     extended: true
 }));

function getActivites() {
    const dataActivites = fs.readFileSync(data_activites, 'utf8');
    const activites = JSON.parse(dataActivites);

    return activites;
}

app.get('/items',(req,res) => {
  const items = getActivites();
  return res.json(items);
})
 function getUsers() {

     const data = fs.readFileSync(data_file, 'utf8');
     const users = JSON.parse(data);

     return users;

 }
 function saveActivites(activites){
     const json = JSON.stringify(activites, null);
    fs.writeFileSync(data_activites, json, "utf8");


 }
 function saveUsers(users) {
    const json = JSON.stringify(users, null, 2);
    fs.writeFileSync(data_file, json, "utf8");
}
 app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const users = getUsers();
    let foundUser = null;
    // petite boucle toute simple
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (email === user.email && password === user.password) {
            foundUser = user;
            break;
        }
    }
    if (foundUser === null) {
        // pas de match
        return res.json({
            success: false
        });
    }
    // si on arrive ici, on a trouvé un user
    return res.json({
        success: true,
        user: foundUser
    });
});


app.post("/profil", (req, res) => {
    const id = req.body.id;
    const nom = req.body.nom;
    const abonnement = req.body.abonnement;
    const users = getUsers();
    let foundIndex = -1;
    for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) { // == pour accepter string ou number
            foundIndex = i;
            break;
        }
    }
    if (foundIndex === -1) {
        return res.json({
            success: false,
            message: "Utilisateur non trouvé"
        });
    }
    if (nom) {
        users[foundIndex].nom = nom;
    }
    if (abonnement) {
        users[foundIndex].abonnement = abonnement;
    }
    saveUsers(users);
    const updatedUser = users[foundIndex];

    return res.json({
        success: true,
        user: updatedUser
    });
});

app.post('/items',(res,req) =>{
    console.log(req.body);
    const nom = req.body.nom;
    const type = req.body.type;
    const durée = req.body.durée;
    activites = getActivites();
    
    // activites.forEach(activite => { 
    //     if (nom == activite.nom){
    //         return res.json({message: "L'activité éxiste déja"})
    //     }
    // })
       let newId = 1;
    if (activites.length > 0) {
        let maxId = activites[0].id;
        for (let i = 1; i < activites.length; i++) {
            if (activites[i].id > maxId) {
                maxId = activites[i].id;
            }
        }
        newId = maxId + 1;
    }
    const newActivite = {
        id:newId,
        nom: nom,
        type:type,
        durée: durée
    }
    activites.push(newActivite);
    saveActivites(activites);
   
    return res.json({
         success:true,
        activites:activites

    })
    });

 app.listen(port, () => {
     console.log("Serveur démarré sur http://localhost:" + port);
 });
