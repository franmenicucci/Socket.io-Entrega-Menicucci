// App.js

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Handlebars from 'handlebars';
import viewsRouter from './routes/views.router.js';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => console.log("Listening on PORT 8080"));
const socketServer = new Server(httpServer);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine('handlebars', Handlebars.engine());
app.set('views', __dirname + '/views');
app.set('views engine', 'handlebars');
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
