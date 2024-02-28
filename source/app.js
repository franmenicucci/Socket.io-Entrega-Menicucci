// App.js

const express = require('express');
const http = require('http');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const Handlebars = require('handlebars');
const viewsRouter = require('./routes/views.router.js');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let products = []; // Inicializar la variable 'products'

app.engine('handlebars', Handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars'); // PIENSO QUE ACA ESTABA EL ERROR EN CUANTO AL VIEWS
app.use(express.static(__dirname + '/public'));
app.use('/', viewsRouter);

socketServer.on('connection', socket => {
    console.log("Nuevo Cliente conectado");

    socket.on('addProduct', (productName) => {
        products.push(productName);
        socketServer.emit('products', products);
    });

    socket.on('deleteProduct', (productName) => {
        products = products.filter(product => product !== productName);
        socketServer.emit('products', products);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});
