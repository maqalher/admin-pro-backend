const { response } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    // Leer el token
    const token = req.header('x-token');
    // console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {

        // si hay error lo manda al catch
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        // console.log(uid);
        // si el token es correcto se agrega una porpidad al req
        req.uid = uid;

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        });
    }
}

module.exports = {
    validarJWT
}