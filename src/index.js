import http from 'http';
import fs from 'fs/promises';


const server = http.createServer(async (req, res) => {

    if(req.url === '/'){
        const homeHtml = await fs.readFile('./src/views/home/index.html', {encoding: 'utf-8'})

        res.writeHead(200, {
            "content-type": 'text/html'
        })

        res.write(homeHtml);
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

console.log('Server is listening on http://localhost:5000...') 