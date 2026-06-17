const contenido = document.getElementById("contenido");

function cargarPagina(archivo) {
    fetch(archivo)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo");
            }
            return response.text();
        })
        .then(data => {
            contenido.classList.remove("fade-in");

            // Reinicia la animación
            void contenido.offsetWidth;

            contenido.innerHTML = data;
            contenido.classList.add("fade-in");
        })
        .catch(error => {
            contenido.innerHTML = `<p>${error.message}</p>`;
        });
}

document.getElementById("btn1").addEventListener("click", () => {
    cargarPagina("contenido1.html");
});

document.getElementById("btn2").addEventListener("click", () => {
    cargarPagina("contenido2.html");
});

// Nivel 2
const apiKey = "e32f29ceef4049afc55e3ae4f8c24dc4";

async function getWeather() {
    const apiKey = "e32f29ceef4049afc55e3ae4f8c24dc4";
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim() || "Istanbul";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById("description").textContent = data.weather[0].description;

        const iconCode = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("weatherCard").style.display = "block";
        document.getElementById("errorMessage").textContent = "";

    } catch (error) {
        document.getElementById("weatherCard").style.display = "none";
        document.getElementById("errorMessage").textContent =
            "No se pudo encontrar el clima de esa ciudad.";
        console.error("Error:", error.message);
    }
}

getWeather();

// Nivel 3
// Nivel 3 - Buscador de películas con TMDB

const movieInput = document.getElementById("movieInput");
const movieButton = document.getElementById("movieButton");
const moviesResults = document.getElementById("moviesResults");
const movieError = document.getElementById("movieError");

const tmdbToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTUwMzA0NDUzNzg1MGNlNWY3OGY5ZjUwOThjNzVjNCIsIm5iZiI6MTczNDQ1ODExMC42MTksInN1YiI6IjY3NjFiYWZlZWQyNmE5ZDJkOGRmZTExMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ok29UicAMLyCxOTRSK5GZw4rG3-7Xk6DW1pLZXGtMMU";;

async function searchMovies() {
    const movieName = movieInput.value.trim();

    if (movieName === "") {
        movieError.textContent = "Por favor escribe el nombre de una película.";
        moviesResults.innerHTML = "";
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&query=${encodeURIComponent(movieName)}`;

    try {
        movieError.textContent = "";
        moviesResults.innerHTML = "<p>Buscando películas...</p>";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${tmdbToken}`
            }
        });

        if (!response.ok) {
            throw new Error("Error al conectar con TMDB");
        }

        const data = await response.json();

        if (data.results.length === 0) {
            moviesResults.innerHTML = "";
            movieError.textContent = "No se encontraron películas.";
            return;
        }

        moviesResults.innerHTML = "";

        data.results.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            const imageUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=Sin+imagen";

            const year = movie.release_date
                ? movie.release_date.split("-")[0]
                : "Sin año";

            card.innerHTML = `
        <img src="${imageUrl}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Año: ${year}</p>
        <button onclick="getTrailer(${movie.id})">
            Ver tráiler
        </button>
    `;

            moviesResults.appendChild(card);
        });

    } catch (error) {
        moviesResults.innerHTML = "";
        movieError.textContent = "Ocurrió un problema al buscar las películas.";
        console.error(error);
    }
}

movieButton.addEventListener("click", searchMovies);

movieInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});
// para ver el trailer de la pelicula
async function getTrailer(movieId) {

    try {

        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?language=es-ES`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${tmdbToken}`
                }
            }
        );

        const data = await response.json();

        const trailer = data.results.find(
            video => video.type === "Trailer"
        );

        if (trailer) {
            window.open(
                `https://www.youtube.com/watch?v=${trailer.key}`,
                "_blank"
            );
        } else {
            alert("No hay tráiler disponible");
        }

    } catch (error) {
        console.error(error);
        alert("Error al cargar el tráiler");
    }
}