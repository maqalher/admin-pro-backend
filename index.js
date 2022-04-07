const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config')

// Crear el servidor express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y paseo del body
app.use( express.json() );

// Base de Datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puesto ' + process.env.PORT);
})