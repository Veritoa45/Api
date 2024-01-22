const form = document.querySelector('#register');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                userName: document.getElementById('userName').value,
                password: document.getElementById('password').value,
            };
            fetch('../../auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((res) => res.json())
            .then((data) => {
                const responseDiv = document.querySelector('#response');
                if (data.message === 'Usuario registrado con éxito') {
                    responseDiv.innerHTML = '<p>Usuario registrado con éxito</p>';
                } else if (data.message === "El usuario ya existe") {
                    responseDiv.innerHTML = '<p>El usuario ya existe</p>';
                } else {
                    responseDiv.innerHTML = '<p>Error al registrar usuario</p>';
                }
                responseDiv.style.display = 'block';
            }).catch((err) => (document.querySelector('#response').innerHTML = err))
        })