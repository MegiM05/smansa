const validCredentials = {
    username: "admin",
    password: "sman1buru75"
};

const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (username === validCredentials.username && password === validCredentials.password) {
        message.textContent = "";
        window.location.href = "./fauzi";
    } else {
        message.textContent = "Username atau password salah";
    }
});
