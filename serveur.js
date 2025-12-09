 const express = require("express");
 const app = express();
 const path = require("path");
 const port = 3000;

 const fs = require("fs");

 const data_file = path.join(__dirname, 'data', 'users.json')

 app.use(express.static(path.join(__dirname, 'public')))
    app.use(express.static(__dirname));

 app.use(express.json());
 app.use(express.urlencoded({
     extended: true
 }));

 function getUsers() {
     const data = fs.readFileSync(data_file, 'utf8');
     const users = JSON.parse(data);

     return users;

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

 app.listen(port, () => {
     console.log("Serveur démarré sur http://localhost:" + port);
 });