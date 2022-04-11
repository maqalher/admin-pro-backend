const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    //paginacion
    const desde = Number(req.query.desde) || 0;
    //  console.log(desde);

    // const usuarios = await Usuario
    //     .find({}, 'nombre email role google')
    //     .skip(desde)
    //     .limit(5)
    // const total = await Usuario.count();

    // Ejecutar las 2 consultas al mismo tiempo
    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip(desde)
            .limit(5),

        Usuario.countDocuments()
    ])

    res.status(200).json({
        ok: true,
        usuarios,
        total
        // uid: req.uid
    })

}

const crearUsuario = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }



}

const actualizarUsuario = async (req, res = response) => {

    const uid = req.params.id

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            })
        }

        // Actualizar
        const { password, google, email, ...campos } = req.body;
        // delete campos.password;
        // delete campos.google;

        // if(usuarioDB.email === req.body.email){
        //     delete campos.email;
        // } else {
        //     const existeEmail = await Usuario.findOne({email:req.body.email });
        //     if(existeEmail){
        //         return res.status(400).json({
        //             ok:false,
        //             msg:'Ya existe un usuario con ese email'
        //         })
        //     }
        // }

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;


        // const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos) // hace la actualizacion
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true }) // {new:true} regresa el nuevo usuario

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id


    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }



}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}