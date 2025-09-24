import http from 'http';
import fs from 'fs/promises';


const server = http.createServer(async (req, res) => {

    if(req.url === '/'){
        // const homeHtml = await fs.readFile('./src/views/home/index.html', {encoding: 'utf-8'})

        res.writeHead(200, {
            "content-type": 'text/html'
        })

        res.write(await createHomeHTML());
    } else if(req.url === '/styles/site.css'){
        const css = await fs.readFile('./src/styles/site.css', {encoding: 'utf-8'})

        res.writeHead(200, {
            "content-type": 'text/css',
        });
        res.write(css)
    } else if(req.url === '/cats/add-breed'){
        const addBreedHtml = await fs.readFile('./src/views/addBreed.html')

        res.writeHead(200, {
            "content-type": 'text/html'
        })

        res.write(addBreedHtml);
    } else if(req.url === '/cats/add-cat'){
        const addCatHtml = await fs.readFile('./src/views/addCat.html')

        res.writeHead(200, {
            "content-type": 'text/html'
        })

        res.write(addCatHtml);
    }


    res.end()
});

server.listen(5000);

async function createHomeHTML () {
    let homeHtml = await fs.readFile('./src/home.html.js', {encoding: 'utf-8'})
    const databaseString = await fs.readFile('./src/db.json', {encoding: 'utf-8'})
    const database = JSON.parse(databaseString); 
    const cats = database.cats

    if(!cats || cats.length === 0){
        homeHtml = homeHtml.replaceAll('{{cats}}', '<li>There are no cats to display</li>')
        return homeHtml
    }
    const catsHtml = cats.map(cat => `
    <li id="${cat.id}">
        <img src="${cat.imageUrl}" alt="${cat.name}">
        <h3>${cat.name}</h3>
        <p><span>Breed: </span>${cat.breed}</p>
        <p><span>Description: </span>${cat.description}</p>
        <ul class="buttons">
            <li class="btn edit"><a href="">Change Info</a></li>
            <li class="btn delete"><a href="">New Home</a></li>
        </ul>
    </li>
    `);
    homeHtml = homeHtml.replaceAll('{{cats}}', catsHtml.join('\n'))
    return homeHtml

}

console.log('Server is listening on http://localhost:5000...') 