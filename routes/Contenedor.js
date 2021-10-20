class Contenedor {
    
    static productos = [];
    static id = 1;

    constructor(title, price, thumbnail){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = Contenedor.id++;
        Contenedor.productos.push(this);
    }
}

module.exports = Contenedor;