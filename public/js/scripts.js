document.addEventListener('DOMContentLoaded', function () {
    fetch('/products')
        .then(res => res.json())
        .then(products => {
            const agendasContainer = document.getElementById('agendas-container');
            products.forEach(product => {
                if (product.stock > 0) {
                    const agendaCard = document.createElement('div');
                    agendaCard.classList.add('agenda-card');
                    agendaCard.innerHTML = `
                        <h3 class="titulo">${product.title}</h3>
                        <p class="descripcion">${product.description}</p>
                        <img src="/uploads/${product.thumbnail}" alt="Thumbnail" class="agenda">
                        <p class="precio">Precio: $ ${product.price}</p>
                    `;
                    agendasContainer.appendChild(agendaCard);
                }
            });
        })
        .catch(error => console.error('Error al obtener las agendas:', error));
});