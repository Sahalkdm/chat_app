const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    type:{type:String, default: 'private' },
    createdAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.models.Group || mongoose.model('Group', GroupSchema)