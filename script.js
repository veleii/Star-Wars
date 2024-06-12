// Jag kan inte göra den mer användervänlig eftersom att jag har lyckas koda in mig själv i ett hörn... jag tror att det kan bero på att jag gjort position: absolut på obi-wan knappen. Men längre ner finns level 2.. ish.


const button = document.querySelector('#fetchButton');
const responseContainer = document.querySelector('#responseContainer');

async function fetchfromapi() {
    try {
        const baseUrl = 'https://swapi.dev/api/people/10/';
        const response = await fetch(baseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        const info = `
            Name: ${data.name}
            Height: ${data.height} cm
            Mass: ${data.mass} kg
            Hair Color: ${data.hair_color}
            Skin Color: ${data.skin_color}
            Gender: ${data.gender}
            Birth Year: ${data.birth_year}
            Eye Color: ${data.eye_color}
            Created: ${data.created}
            Edited: ${data.edited}
        `;

        responseContainer.innerText = info;
    } catch (error) {
        console.error('Fetch error: ', error);
        responseContainer.innerText = 'Failed to fetch data for Obi-Wan.';
    }
}

button.addEventListener('click', fetchfromapi);

const searchButton = document.querySelector('#searchButton');
const searchResponse = document.querySelector('#searchResponse');
const searchInput = document.querySelector('#searchInput');

document.querySelector('#searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
       
        event.preventDefault();
        
       
        document.querySelector('#searchButton').click();
    }
});

document.querySelector('#searchButton').addEventListener('click', async function() {
    try {
        const query = document.querySelector('#searchInput').value;
        const SecondbaseUrl = `https://swapi.dev/api/people/?search=${query}`;
        const SecondResponse = await fetch(SecondbaseUrl);
        if (!SecondResponse.ok) {
            throw new Error(`HTTP error! status: ${SecondResponse.status}`);
        }
        const SecondData = await SecondResponse.json();
        console.log(SecondData);

        if (SecondData.results.length > 0) {
            const character = SecondData.results[0];
            const info = `
                Name: ${character.name}
                Height: ${character.height} cm
                Mass: ${character.mass} kg
                Hair Color: ${character.hair_color}
                Skin Color: ${character.skin_color}
                Gender: ${character.gender}
                Birth Year: ${character.birth_year}
                Eye Color: ${character.eye_color}
            `;
            document.querySelector('#searchResponse').innerText = info;
        } else {
            document.querySelector('#searchResponse').innerText = 'Character not found.';
        }
    } catch (error) {
        console.error('Search error: ', error);
        document.querySelector('#searchResponse').innerText = 'Failed to search for character.';
    }
});