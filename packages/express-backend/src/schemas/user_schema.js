import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String }, // Email is optional
  phone: { type: String }, // Phone is optional
  items_sold: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  items_bought: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  reviews_written: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  reviews_received: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
})

const User = mongoose.model('User', userSchema)

export default User
