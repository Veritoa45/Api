const form = document.querySelector('#delete');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();

  try {
    const response = await fetch(`/products/${encodeURIComponent(title)}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar el producto');
    }

    const responseDiv = document.querySelector('#response');

    responseDiv.innerHTML = '<p>Producto eliminado con éxito</p>';
    responseDiv.style.display = 'block';

    document.getElementById('title').value = '';

  } catch (error) {
    console.error(error);
    const responseDiv = document.querySelector('#response');
    responseDiv.innerHTML = `<p>${error.message}</p>`;
    responseDiv.style.display = 'block';
  }
});