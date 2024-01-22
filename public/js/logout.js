const logout = document.getElementById('salir'); 

logout.addEventListener('click', async () => {
    try {
        const response = await fetch('../../auth/logout', {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Error al cerrar sesión');
        }

        window.location.href = '../index.html';
    } catch (error) {
        console.error(error);
    }
});