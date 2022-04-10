const { response } = require("express");

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    //expresion regular para la busqueda i -> insencible
    const regx = new RegExp(busqueda, 'i');

    // const usuarios = await Usuario.find({nombre:busqueda};)
    // const usuarios = await Usuario.find({nombre:regx});
    // const medicos = await Medico.find({nombre:regx});
    // const hospitales = await Hospital.find({nombre:regx});

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regx }),
        Medico.find({ nombre: regx }),
        Hospital.find({ nombre: regx }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regx = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regx })
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regx })   
                                .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regx });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser hospitales,medicos o usuarios'
            });

    }

    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}