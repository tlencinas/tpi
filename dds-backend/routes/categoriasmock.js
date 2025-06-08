import express from "express";

const router = express.Router();

let arr_CategoriasMock = [
    {
      "IdCategoria": 1,
      "Nombre": "ACCESORIOS"
    },
    {
      "IdCategoria": 2,
      "Nombre": "AUDIO"
    },
    {
      "IdCategoria": 3,
      "Nombre": "CELULARES"
    },
    {
      "IdCategoria": 4,
      "Nombre": "CUIDADO PERSONAL"
    },
    {
      "IdCategoria": 5,
      "Nombre": "DVD"
    },
    {
      "IdCategoria": 6,
      "Nombre": "FOTOGRAFIA"
    },
    {
      "IdCategoria": 7,
      "Nombre": "FRIO-CALOR"
    },
    {
      "IdCategoria": 8,
      "Nombre": "GPS"
    },
    {
      "IdCategoria": 9,
      "Nombre": "INFORMATICA"
    },
    {
      "IdCategoria": 10,
      "Nombre": "LED-LCD"
    }
];

// Get general, trae todos los objetos.

router.get('/api/categoriasmock', async function (req, res){
    const {nombre} = req.query;
    console.log('1: ', nombre);
    let filtro = `${nombre ? nombre : ''}`;
    console.log('2: ', filtro);
    let categoria = arr_CategoriasMock.filter(
        (cat) => cat.Nombre.toLowerCase().startsWith(filtro.toLowerCase())
    );
    console.log('3: ', categoria);
    if (categoria) res.json(categoria);
    else res.json(arr_CategoriasMock);
});

// Get por ID, trae el específico con req.params.id

router.get('/api/categoriasmock/:id', async function (req, res) {
    let categoria = arr_CategoriasMock.find(
        (x) => x.IdCategoria === parseInt(req.params.id)
    );
    if (categoria) res.json(categoria);
    else res.status(404).json({ message: 'categoria no encontrado' });
});

// Post con body

router.post('/api/categoriasmock/', (req, res) => {
    const { Nombre } = req.body;
    let categoria = {
      Nombre,
      IdCategoria: Math.floor(Math.random()*100000)
    };

    arr_CategoriasMock.push(categoria);

    res.status(201).json(categoria);
});

// Put para actualizar, requiere body y ID

router.put('/api/categoriasmock/:id', (req, res) => {
    let categoria = arr_CategoriasMock.find(
        (x) => x.IdCategoria === parseInt(req.params.id)
    );

    if (categoria) {
        const { Nombre } = req.body;
        categoria.Nombre = Nombre;
        res.json({ message: 'Categoría actualizada.' });
    } else {
        res.status(404).json({ message: 'Categoría no encontrada.' })
    }
});

// Delete para borrar, requiere ID.

router.delete('/api/categoriasmock/:id', (req, res) => {
    let categoria= arr_CategoriasMock.find(
        (x) => x.IdCategoria === parseInt(req.params.id)
    );

    if (categoria) {
        arr_CategoriasMock = arr_CategoriasMock.filter(
            (x) => x.IdCategoria !== parseInt(req.params.id)
        );
        res.json({ message: 'Categoría eliminada.' });
    } else {
        res.status(404).json({ message: 'Categoría no encontrada.' })
    }
});




export default router;