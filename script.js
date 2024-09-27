let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function registerUser() {
    const name = document.getElementById('register-name').value;
    const surname = document.getElementById('register-surname').value;
    const address = document.getElementById('register-address').value;
    const city = document.getElementById('register-city').value;
    const phone = document.getElementById('register-phone').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const photoInput = document.getElementById('register-photo');

    if (photoInput.files.length === 0) {
        alert('Por favor, selecione uma foto de perfil.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const photoData = e.target.result;

        const user = {
            name: name,
            surname: surname,
            address: address,
            city: city,
            phone: phone,
            email: email,
            password: password,  // Salvando senha
            photo: photoData,
            orders: []
        };

        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuário cadastrado com sucesso!');
        clearRegisterForm();
        window.location.href = 'index.html';
    };
    reader.readAsDataURL(photoInput.files[0]);
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'profile.html';
    } else {
        alert('Email ou senha incorretos.');
    }
}

function showForgotPassword() {
    document.getElementById('forgot-password').style.display = 'block';
}

function resetPassword() {
    const email = document.getElementById('forgot-email').value;
    const user = users.find(user => user.email === email);
    
    if (user) {
        user.password = prompt('Digite sua nova senha:');
        localStorage.setItem('users', JSON.stringify(users));
        alert('Senha redefinida com sucesso! Você pode fazer login com sua nova senha.');
        window.location.href = 'index.html';
    } else {
        alert('Email não encontrado.');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function clearRegisterForm() {
    document.getElementById('register-name').value = '';
    document.getElementById('register-surname').value = '';
    document.getElementById('register-address').value = '';
    document.getElementById('register-city').value = '';
    document.getElementById('register-phone').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-photo').value = '';
}

function displayProfile(user) {
    document.getElementById('user-photo').src = user.photo;
    document.getElementById('user-name').textContent = `${user.name} ${user.surname}`;
    document.getElementById('user-address').textContent = user.address;
    document.getElementById('user-city').textContent = user.city;
    document.getElementById('user-phone').textContent = user.phone;
    document.getElementById('user-email').textContent = user.email;
}

document.addEventListener('DOMContentLoaded', function () {
    if (window.location.pathname.endsWith('profile.html') && !currentUser) {
        window.location.href = 'index.html';
    } else if (currentUser && window.location.pathname.endsWith('profile.html')) {
        displayProfile(currentUser);
        document.querySelector('.profile-container').style.display = 'block';
    }
});
