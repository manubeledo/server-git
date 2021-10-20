const fs = require("fs");
const { Router } = require("express");
const Contenedor = require('./Contenedor');
const router = Router();


function serverRouter(app){
    app.use("/api/productos", router);

    router.get('/', (req, res) => {
        async function getAll() {
            try {
                let response = JSON.parse(await fs.promises.readFile('./api/productos.txt'));
                res.json(response);
            }
            catch (err) {
                console.log(err);
            }
        }
        getAll()
    })
    
    router.get('/:id', (req, res) => {
        async function getById() {
            try {
                let id = req.params.id;
                let datos = JSON.parse(await fs.promises.readFile('./api/productos.txt'));
                let responseFilter = datos.filter(elemento => elemento.id==id);
                if (responseFilter.length != 0){
                res.json(responseFilter);
                } else {
                    res.json(`{error:'producto no encontrado'}`)
                }
            }
        catch (err) {
                    console.log(err);
                }
            }
        getById()
    })
    
    router.post('/', (req, res) => {
        async function save(){
            try {
                if (fs.existsSync('./api/productos.txt')) {
                    new Contenedor(`${req.body.title}`, `${req.body.price}`, `${req.body.thumbnail}`);
                    let datos = JSON.stringify(Contenedor.productos);
                    fs.writeFile('./api/productos.txt', datos, function (err) {
                        if (err) throw err;
                        console.log('Nuevo producto almacenado!');
                      });
                      req.body.id = (Contenedor.id - 1);
                      res.json(req.body);
                } else {
                    new Contenedor(`${req.body.title}`, `${req.body.price}`, `${req.body.thumbnail}`);
                    let datos = JSON.stringify(Contenedor.productos);
                    await fs.promises.writeFile('./api/productos.txt', datos)
                    console.log('Primer producto almacenado!')
                    req.body.id = (Contenedor.id - 1);
                    res.json(req.body);
                }
            }
            catch(err){
                console.log(err);
            }
        }
        save();
    })

    router.put('/:id', (req, res) => {
        async function put(){
            try{
               let id = req.params.id;
               const contenido = await fs.promises.readFile('./api/productos.txt', 'utf-8');
               fs.promises.unlink('./api/productos.txt');
               let data = JSON.parse(contenido);
               for (i=0; i < data.length; i++){
                    if (data[i].id == id) {
                        data[i].title = req.body.title;
                        data[i].price = req.body.price;
                        data[i].thumbnail = req.body.thumbnail;
                        let datos = JSON.stringify(data);
                        await fs.promises.writeFile('./api/productos.txt', datos);
                        res.json(data[i]);
                    }
               }

            } 
            catch(err) {
                console.log(err);
            }
        }
        put();
    })
    
    router.delete('/:id', (req, res) => {
        async function deleteById(){
            try{
                const contenido = await fs.promises.readFile('./api/productos.txt', 'utf-8');
                await fs.promises.unlink('./api/productos.txt');
                let datos = JSON.parse(contenido);
                let responseFilter = datos.filter(elemento => elemento.id!=req.params.id);
                datos = JSON.stringify(responseFilter)
                await fs.promises.writeFile('./api/productos.txt', datos);
            }
            catch(err){
                console.log(err);
            }
            res.send('delete ok');
        }
        deleteById();
    })
}

module.exports = serverRouter;