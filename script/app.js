function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        // fetch_login();
        window.location.href = "../movies/movies.html";
        // Perform your AJAX/Fetch login
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });
    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch register
        fetch_register();
    });
    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });

    //login
    async function fetch_login() {
        const user = document.getElementById("user_login").value
        const pwd = document.getElementById("user_pwd").value

        const response = await fetch('http://localhost:3011/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pwd
            })
        });

        const data = await response.json()
        console.log(data)
    }
    //register
    async function fetch_register() {
        const user = document.getElementById("signupUsername").value
        const pwd = document.getElementById("singupPwd").value

        const response = await fetch('http://localhost:3011/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user,
                password: pwd
            })
        });

        const data = await response.json()
        console.log(data)
    }
});



async function getMovies() {
    const response = await fetch('http://localhost:3011/movies/');
    const data = await response.json()
    var html = "<table>" + templateTableHeader();
    data.forEach(e => html += template(e))
    $("#moviesTemplate").html(html + "</table>")
    console.log(data)

}
async function getMovieById() {
    const response = await fetch('http://localhost:3011/movies/2');
    const data = await response.json()
    var html = "<table>" + templateTableHeader();
    data.forEach(e => html += template(e))
    $("#moviesTemplate").html(html+"</table>");
    console.log(data)
}
async function CreateNewMovie() {
    const response = await fetch('http://localhost:3011/movies/add', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: 10,
            title: "Dances with Wolves",
            genres: [
                "Adventure", "Western ", "Drama"
            ],
            year: 1990,
            director: "Kevin Costner",
            actors: [
                "Kevin Costner",
                "Mary McDonnell",
                "Graham Greene",
                "Rodney A. Grant"
            ]
        })
    });
    const data = await response.json()
    var html = "<table>" + templateTableHeader();
    data.forEach(e => html += template(e))
    $("#moviesTemplate").html(html + "</table>")
    console.log(data)
}
async function UpdateMovie() {
    const response = await fetch('http://localhost:3011/movies/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "id": 3,
            "title": "El padrino parte II",
            "genres": [
                "Crime", "Drama"
            ],
            "year": 1994,
            "director": "Frank Darabont",
            "actors": [
                "Tim Robbins",
                "Ricard el profe",
                "Bob Gunton",
                "William Sadler",
                "Clancy Brown",
                "Gil Bellows"
            ]
        })
    });
    const data = await response.json()
    var html = "<table>" + templateTableHeader();
    data.forEach(e => html += template(e))
    $("#moviesTemplate").html(html + "</table>")
    console.log(data)
}
async function RemovieMovie() {
    const response = await fetch('http://localhost:3011/movies/10', {
        method: 'DELETE'
    });
    const data = await response.json()
    var html = "<table>" + templateTableHeader();
    data.forEach(e => html += template(e))
    $("#moviesTemplate").html(html + "</table>");
    console.log(data)
}



function templateTableHeader() {
    return `<tr><th>Id</th><th>Title</th><th>Genres</th><th>Year</th><th>Director</th><th>Actors</th></tr>`
}

function template(data) {

    return `<tr><td>${data.id}</td><td>${data.title}</td><td>${data.genres}</td><td>${data.year}</td><td>${data.director}</td><td>${data.actors}</td></tr >`;
}