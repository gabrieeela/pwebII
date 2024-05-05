/*
Nombre: Tienda de muñecos "Nupi".

Objetivos:
- En Nupi se venden muñecos tejidos de diferentes personajes animados.
- Cada muñeco va a estar asignado con el nombre de un personaje en especifico.
- El precio de cada uno varía según su tamaño.

Métodos:
- GET /personajes --> muestra todos los muñecos que hay en venta
- GET /personajes/:id --> busca un muñeco en especifico
- POST /personajes --> agrega a la venta un nuevo muñeco
- PUT /personajes/:id --> modifica un atributo de un muñeco en especifico (Por ejemplo el precio)
- DELETE /personajes/:id --> elimina un muñeco en especifico (En este caso por quedar sin stock)
*/

const express = require("express");
const morgan = require("morgan");

const app = express();
let personajes = [];
personajes.push({nom: "peppa", tam: "10cm", precio: 2500, id: 1});
personajes.push({nom: "snoopy", tam: "15cm", precio: 3500, id: 2});
personajes.push({nom: "kitty", tam: "20cm", precio: 7000, id: 3});
personajes.push({nom: "mickey", tam: "25cm", precio: 9000, id: 4});

app.use(morgan("dev"));
app.use(express.json());

app.get("/personajes", (req, res) => {
  res.json(personajes);
});

app.get("/personajes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pExistente = personajes.find(p => p.id === id);

    if(pExistente){
        res.json(pExistente);
    } else{
        res.status(404).send("No hay stock!! Espere a que vuelva a estar disponible");
    }

  });

app.post("/personajes", (req, res) => {
  const pNuevo = { ...req.body, id: personajes.length + 1 };
  personajes.push(pNuevo);
  res.send(pNuevo);
});

app.put("/personajes/:id", (req, res) => {
  const pModificado = req.body;
  const id = parseInt(req.params.id);
  const pExistente = personajes.findIndex(p => p.id === id);

  if(pExistente === -1){
    return res.status(404).json({message: "No hay stock!! Espere a que vuelva a estar a la venta"});
  }

  personajes[pExistente] = pModificado;
  res.json({message: "Modificado con éxito!!"});

});

app.delete("/personajes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pExistente = personajes.findIndex(p => p.id === id);

  if(pExistente === -1){
    return res.status(404).json({message: "No hay stock!! Espere a que vuelva a estar a la venta"});
  }

  personajes.splice(pExistente, 1);
  res.sendStatus(204);

});

app.listen(8080, () => {
    console.log("Listening localhost 8080");
});
