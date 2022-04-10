const { response } = require("express");

const Hospital = require('../models/hospital');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
                                    .populate('usuario', 'nombre img');


    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async(req, res = response) => {
  
    // viene del token
    const uid = req.uid
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });


    try {

        // Guardar Hospital
        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrar hospitales'
    });

}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizar hospitales'
    });

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}