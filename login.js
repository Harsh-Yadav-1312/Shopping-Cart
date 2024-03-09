import { allUsers } from "./data.js";

console.log('userData from Localstorage: ', allUsers);

let lgnForm = document.getElementById("loginForm");

        lgnForm.addEventListener("submit", (e)=> {
            e.preventDefault();
            let status = document.getElementById("status");

            let userEmail = document.getElementById("emailInput");
            let userPw = document.getElementById("passwordInput");

            console.log(userPw.value);
            if (userEmail.value == null || userPw.value == null) {
                alert("Please enter all fields");
            }
            else {
                // console.log(allUsers);
                let matchStatus =false;
                allUsers.map(({email, password}) => {
                    console.log("hi");
                    if(email === userEmail.value && password === userPw.value.trim()){
                        console.log("Email matched with ", email + " "+ password);
                        matchStatus = true;
                    }
                });

                if(matchStatus){
                    alert("Login Successful");
                    window.location.href = 'home.html';
                }
                else{
                    alert("Login Failed");
                }
                // perform operation with form input
                status.innerHTML = "<b>This form is submitted!</b>";
                console.log(
                `FORM INPUT: Username ${userEmail.value} & password ${userPw.value}`
                );

                userEmail.value = "";
                userPw.value = "";
            }


      });