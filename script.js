// ###################### login page ################# \\
let LoginUserName = document.querySelector("#getLoginUserName");
let LoginUserPassword = document.querySelector("#getLoginUserPassword");
let LoginBtn = document.querySelector("#getLoginBtn");
let SignupBtn = document.querySelector("#getSignupBtn");

// ####################### signup page ######################## \\
let userFullName = document.querySelector("#setFullName");
let UserName = document.querySelector("#setUserName");
let UserEmail = document.querySelector("#setUserEmail");
let UserPassword = document.querySelector("#setUserPassword");
let UserConfirmPassword = document.querySelector("#setUserConfirmPassword");
let UserSignupBtn = document.querySelector("#setUserSignupBtn");
let UserLoginBtn = document.querySelector("#setUserLoginBtn");
let signupPage = document.querySelector(".SignupPage");
let loginPage = document.querySelector(".loginPage");

// ####################### save user Data ##################### \\

let saveUserDataArr = [];
let saveUserDataObj = {};

// Function to save array to local storage
function saveToLocalStorage() {
    localStorage.setItem("Save", JSON.stringify(saveUserDataArr));
}

// Function to retrieve array from local storage
function loadFromLocalStorage() {
    let retrievedData = localStorage.getItem("Save");
    if (retrievedData) {
        saveUserDataArr = JSON.parse(retrievedData);
    }
}

// Load data from local storage on page load
loadFromLocalStorage();

// ############# page changing ############### \\
SignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    signupPage.style.display = "flex";
    loginPage.style.display = "none";
});
UserLoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
});

// ################ work ############### \\
UserSignupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    userValidate();
});

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function userValidate() {
    let setFullName = userFullName.value.trim();
    let setUserName = UserName.value.trim();
    let setUserEmail = UserEmail.value.trim();
    let setUserPassword = UserPassword.value.trim();
    let setUserConfirmPassword = UserConfirmPassword.value.trim();

    if (
        setFullName === "" ||
        setUserName === "" ||
        setUserEmail === "" ||
        setUserPassword === "" ||
        setUserConfirmPassword === ""
    ) {
        Swal.fire("Please fill the required fields");
        return;
    }

    if (setFullName.length < 3 || setFullName.length > 20) {
        Swal.fire("Name must be between 3 and 20 characters");
        return;
    }

    if (setUserName.length < 5 || setUserName.length > 15) {
        Swal.fire("Username must be between 5 and 15 characters");
        return;
    }

    if (!isValidEmail(setUserEmail)) {
        Swal.fire("Please enter a valid email address");
        return;
    }

    if (setUserPassword.length < 6) {
        Swal.fire("Password must be at least 6 characters long");
        return;
    }

    if (setUserPassword !== setUserConfirmPassword) {
        Swal.fire("Passwords do not match");
        return;
    }

    userRegistration(setFullName, setUserName, setUserEmail, setUserPassword);
}

function userRegistration(fullName, userName, userEmail, userPassword) {
    let userExists = saveUserDataArr.some(check => check.email === userEmail);

    if (userExists) {
        Swal.fire("User already exists");
        return;
    }

    let newUser = {
        FullName: fullName,
        username: userName,
        email: userEmail,
        password: userPassword
    };

    saveUserDataArr.push(newUser);
    saveToLocalStorage();
    Swal.fire("Registration successful!");
    loginPage.style.display = "flex";
    signupPage.style.display = "none";
}

// ######################## login Page Functionality ###################### \\
LoginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    loginData();
});

function loginData() {
    let getUserEmail = LoginUserName.value.trim();
    let getUserPassword = LoginUserPassword.value.trim();

    let userFound = saveUserDataArr.some(data =>
        (data.email === getUserEmail || data.username === getUserEmail) &&
        data.password === getUserPassword
    );

    if (userFound) {
        Swal.fire("Login successful!");
    } else {
        Swal.fire("Invalid email or password!");
    }
}
