const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img: {
        type: String
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,  // relacion entre Hospital y Usuario
        ref: 'Usuario' 
    }
// });
}, { collection: 'hospitales' }); // en mongo crea hospitals con collection crea hospitales

// No muestra __v 
HospitalSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
    return object
});

module.exports = model( 'Hospital', HospitalSchema );
