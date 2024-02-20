// Index.js

const socket = io();

const productList = document.getElementById('productList');
const productForm = document.getElementById('productForm');
const productNameInput = document.getElementById('productName');

productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const productName = productNameInput.value;
    socket.emit('addProduct', productName);
    productNameInput.value = ''; //  Para limpiar el campo de entrada después de enviar el producto(importante)
});

socket.on('products', (products) => {
    productList.innerHTML = ''; // Para poder limpiar la lista de productos (!!!)
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = product;
        productList.appendChild(li);
    });
});
