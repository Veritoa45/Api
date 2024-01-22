const form = document.querySelector('#login');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                userName: document.getElementById('userName').value,
                password: document.getElementById('password').value,
            };
            fetch('../../auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((data) => {
                const responseDiv = document.querySelector('#response');
                if (data.message === "Credenciales inválidas") {
                    responseDiv.innerHTML = '<p>Credenciales Inválidas</p>';
                } else {
                    if (data.role === 'admin') {
                        window.location.href = 'admin.html'; 
                    } else {
                        window.location.href = 'client.html'; 
                    }
                }    responseDiv.style.display = 'block';
            }).catch((err) => (document.querySelector('#response').innerHTML = err))
        })