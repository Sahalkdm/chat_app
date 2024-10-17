const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  timestamp: { type: Date, default: Date.now },
  });

module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema)