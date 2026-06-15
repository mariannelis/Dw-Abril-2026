fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(data => {
        console.log("FETCH 1 - Usuarios");
        console.log(data);
    });

fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        console.log("FETCH 2 - Posts");
        console.log(data);
    });

fetch("https://jsonplaceholder.typicode.com/comments")
    .then(response => response.json())
    .then(data => {
        console.log("FETCH 3 - Comentarios");
        console.log(data);
    });