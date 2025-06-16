import express from 'express';
import categoriasMock from './routes/categoriasmock.js';
import inicializarBase from './models/inicializarBase.js';
import categorias from "./routes/categorias.js";

const app = express();
app.use(express.json()); // para poder leer json en el body

app.use(categoriasMock);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(categorias);




await inicializarBase();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
