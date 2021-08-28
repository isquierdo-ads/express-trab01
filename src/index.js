const app = require("express")();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

let clientes = [
  { id: 1, nome: "Fernando", idade: 32 },
  { id: 2, nome: "Bob", idade: 22 },
  { id: 3, nome: "Luis", idade: 12 },
  { id: 4, nome: "Luciano", idade: 02 },
];

const middleware = (req, res, next) => {
  const { url, method } = req;
  console.log(`${method} - ${url} at ${new Date()}`);
  next();
};

//app.use(middleware);

app.get("/clientes", middleware, (req, res) => {
  res.json(clientes);
});

app.get("/clientes/:id", middleware, (req, res) => {
  const { id } = req.params;

  const cliente = clientes.find((v) => v.id == id);

  if (cliente == undefined) {
    res.status(400).send({ error: "Usuário não encontrado" });
  } else {
    res.status(200).json(cliente);
  }
});

app.post("/clientes", middleware, (req, res) => {
  clientes.push(req.body);
  res.status(201).send(req.body);
});

app.put("/clientes/:id", middleware, (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;

  let cliente = clientes.find((v) => v.id == id);
  if (cliente == undefined) {
    res.status(400).send({ error: "erro ao adicionar" });
  } else {
    cliente.nome = nome;
    res.status(200).json(cliente);
  }
});

app.delete("/clientes/:id", middleware, (req, res) => {
  const { id } = req.params;

  const index = clientes.findIndex((v) => v.id == id);

  if (index == -1) {
    res.status(400).send({ msg: "Usuário não encontrado" });
  } else {
    clientes.splice(index, 1);
    res.status(204).send();
  }
});

app.listen(3001);
