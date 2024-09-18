const express = require('express')
const app = express()
const port = 8080


app.use(express.static('public'));



app.get('/hola-mundo', (req, res) => {
    req.send('Hola mundo')
});

app.get('*', (req, res) => {
    req.send('404 | Page not found')
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost${port}`)
})

