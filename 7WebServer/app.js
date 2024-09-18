const express = require('express')
const hbs = require('hbs');

const app = express()
const port = 8080


// Handlebar
app.set('view engine', 'hbs')
hbs.registerPartials( __dirname + '/views/partials');

//Servir contenido estático
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Aday',
        title: 'Curso de Node'
    })
});

app.get('/generic', (req, res) => {
    res.render('generic', {
        name: 'Aday',
        title: 'Curso de Node'
    })
});

app.get('/elements', (req, res) => {
    res.render('elements', {
        name: 'Aday',
        title: 'Curso de Node'
    })
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

