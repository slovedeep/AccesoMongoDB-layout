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