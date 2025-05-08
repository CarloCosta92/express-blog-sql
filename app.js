const express = require("express");
const app = express();
const port = 3500;
const postRoutes = require("./routers/routes.js");

// middlewares
const notFound = require("./middlewares/notFound.js");
const errorHandler = require("./middlewares/errorHandler.js");

//registro il body parser 
app.use(express.json());

app.use('/posts', postRoutes);


app.get('/', (req, res) => {
    res.send('Ciao Carlo')
});

// middleware per endpoint inesistente
app.use(notFound);

//middleware per errore server
app.use(errorHandler);


app.listen(port, () => {
    console.log(`In ascolto sulla porta ` + port)
})