import { allUsers } from "./data.js";
console.log("REGISTER.JS- ALL USERS", allUsers);

let registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", (e)=> {
            e.preventDefault();

            let userEmail = document.getElementById("emailInput");
            let userPw = document.getElementById("passwordInput");
            console.log(userEmail.value,  userPw.value);

            allUsers.push({email: userEmail.value, password: userPw.value});

            localStorage.setItem('userData', JSON.stringify(allUsers));
});