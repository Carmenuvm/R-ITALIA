const express = require ('express');

const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clientes r-italia'
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');app.use(express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/index.html', (req, res) => {
    res.render('index.html');
})

app.get('/menu.html', (req, res) => {
    res.render('menu.html');
})

app.get('/contacto.html', (req, res) => {
    res.render('contacto.html');
})

app.post("/validar", (req, res) => {
    let nombre = req.body.Name;
    let email = req.body.Email;
    let telf = req.body.Tlf;
    let msj = req.body.Msg;
    let registrar = `INSERT INTO clientes (Nombre, Email, Telefono, Mensaje) VALUES ('${nombre}', '${email}', '${telf}', '${msj}')`;
    connection.query(registrar, (err, result) => {
        if (err) throw err;
        res.redirect('/index.html');
    })
})
app.listen(3000, () => {
    console.log("Todo listo");
})