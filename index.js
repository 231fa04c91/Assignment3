function checkCredentials(phone, password) {
    return new Promise((resolve, reject) => {
        if (phone === "1234" && password === "1234") {
            resolve("Login successful!");
        } else {
            reject("Invalid phone or password.");
        }
    });
}

function login() {
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("message");

    checkCredentials(phone, password)
        .then(success => {
            messageBox.style.color = "green";
            messageBox.innerText = success;
        })
        .catch(error => {
            messageBox.style.color = "red";
            messageBox.innerText = error;
        });
}
