const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,  // relacion entre Hospital y Usuario
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,  // relacion entre Hospital y Medico
        ref: 'Hospital',
        required: true 
    }
});

// No muestra __v 
MedicoSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object
});

module.exports = model( 'Medico', MedicoSchema );
