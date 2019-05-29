var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productSchema = new Schema({
    name: { type: String, required: [true, 'El nombre es necesario'] },
    price: { type: Number, required: [true, 'El precio únitario es necesario'] },
    description: { type: String, required: false },
    available: { type: Boolean, required: true, default: true },
    //El ref: es como decir "Este campo referencía a este modelo, tiene que ver con el populate"
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = mongoose.model('Producto', productoSchema);