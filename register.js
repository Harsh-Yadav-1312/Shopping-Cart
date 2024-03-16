import { allUsers } from "./data.js";
console.log("REGISTER.JS- ALL USERS", allUsers);

let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let userEmail = document.getElementById("emailInput");
    let userPw = document.getElementById("passwordInput");
    console.log(userEmail.value, userPw.value);

    allUsers.push({ email: userEmail.value, password: userPw.value });

    localStorage.setItem('userData', JSON.stringify(allUsers));
    window.location.href = "login.html"
});




// Selecting the password input field and the eye icon
const passwordInput = document.getElementById('passwordInput');
const toggleIcon = document.querySelector('.password-toggle-icon i');

// Adding click event listener to the eye icon
toggleIcon.addEventListener('click', function () {
    // Toggling the type attribute of the password input field
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
});