var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    teksti: { type: String }
});

// Export model.
module.exports = mongoose.model('Post', PostSchema);
