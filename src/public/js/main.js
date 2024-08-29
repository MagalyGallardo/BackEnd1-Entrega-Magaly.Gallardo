const socket = io();

socket.emit('message', "Comunicando desde webSocket Main");

socket.on("products", (data) => {

    const productsList = document.getElementById("productsList");
    productsList.innerHTML = '';
    data.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <p>Nombre: ${product.title}</p>
            <p>Descripción: ${product.description}</p>
            <p>Precio:$ ${product.price}</p>
            <button class="delete-button" data-id="${product.id}">Eliminar Producto</button>`;
        productsList.appendChild(productElement);
    });

    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            socket.emit("deleteProduct", productId);
            //console.log("Producto Eliminado por el ID", productId);
            });
        });
});
const formulario = document.getElementById("formulario")

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

        const title = document.getElementById('title').value;        
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = document.getElementById('price').value;
        const stock = document.getElementById('stock').value;

        if (e){
            
            socket.emit('productForm', {title,
                description,
                code,
                price,
                stock});
        }
        
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('code').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';  
});