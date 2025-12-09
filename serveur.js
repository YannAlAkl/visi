 const express = require("express");
 const app = express();
 const path = require("path");
 const port = 3000;

const fs = require ("fs");
const { isUtf8 } = require("buffer");
const data_file = path.join(__dirname , 'data','users.json')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'view')))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

function getUsers(){
    const data = fs.readFileSync(data_file,'utf8');
    const users = JSON.parse(data);

    return users;

}

app.post('/login', (req, res) =>{

    const {
        email,
        password,
    }   = req.body;

    users = getUsers();
    users.forEach(user => {

    if (email === user.email && password === user.password )
    
    return res.json({
        user,
        sucess:true
    })
    else{
        return res.json({
        success: false 
        })
    }

})
})
app.listen(port,() =>{
console.log("Serveur démarré sur http://localhost:" + port);
});


    


