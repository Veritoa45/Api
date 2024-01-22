const form = document.querySelector('#update');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const stock = document.getElementById('stock').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  
  console.log('Updated values:', { stock, price, description });

  try {
    const queryParams = `stock=${encodeURIComponent(stock)}&price=${encodeURIComponent(price)}&description=${encodeURIComponent(description)}`;
    const response = await fetch(`/products/${encodeURIComponent(title)}`, {
      method: 'PUT',
      body: queryParams,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al actualizar el producto');
    }

    const responseDiv = document.querySelector('#response');
    responseDiv.innerHTML = '<p>Producto actualizado con éxito</p>';
    responseDiv.style.display = 'block';
    document.getElementById('title').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('price').value = '';
    document.getElementById('description').value = '';
  } catch (error) {
    console.error(error);
    const responseDiv = document.querySelector('#response');
    responseDiv.innerHTML = `<p>${error.message}</p>`;
    responseDiv.style.display = 'block';
  }
});