const form = document.querySelector('#create');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    fetch('/products', {
        method: 'POST',
        body: data
    })
    .then((res) => res.json())
    .then((data) => {
        const responseDiv = document.querySelector('#response');
        if (data.message === "El producto ya existe") {
            responseDiv.innerHTML = '<p>El producto ya existe</p>';
        } else if (data.message === "La categoria no es valida") {
            responseDiv.innerHTML = '<p>La categoría no es válida</p>';
        } else if (data.message === "Error al crear el producto") {
            responseDiv.innerHTML = '<p>Error al crear el producto</p>';
        } else if (data.message === "Usted no está autorizado") {
            responseDiv.innerHTML = '<p>Usted no está autorizado</p>'; 
        } else {
            responseDiv.innerHTML = '<p>Producto creado con éxito</p>';
        }
        responseDiv.style.display = 'block';
    })
    .catch((err) => {
        document.querySelector('#response').innerHTML = err;
    });
});
