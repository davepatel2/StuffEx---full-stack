import mongoose from 'mongoose'
import Item from '../schemas/item_schema.js'
import User from '../schemas/user_schema.js'
import dotenv from 'dotenv'
dotenv.config()

const mongoDBUri = process.env.MONGODB_URI

if (!mongoDBUri) {
  throw new Error('MongoDB connection URI is missing')
}

mongoose.set('debug', true)

mongoose
  .connect(mongoDBUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error))

async function getItems() {
  try {
    return await Item.find()
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function getUsers() {
  try {
    return await User.find()
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function findItemById(itemId) {
  try {
    return await Item.findById(new mongoose.Types.ObjectId(itemId))
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function findUserById(userId) {
  try {
    return await User.findById(userId)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function createUser(user) {
  try {
    const userToAdd = new User(user)
    const savedUser = await userToAdd.save()
    return savedUser
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function createItem(item, uid) {
  try {
    if (Object.keys(item).includes('userId')) {
      throw new Error('Item passed to createItem must not include a userId')
    }

    const userId = new mongoose.Types.ObjectId(uid)

    item.seller_id = userId

    const itemToAdd = new Item(item)
    const itemCreator = await findUserById(userId)
    const savedItem = await itemToAdd.save()

    itemCreator.items_sold.push(savedItem.id)
    itemCreator.save()

    return savedItem
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function deleteUser(userId) {
  try {
    await User.findByIdAndDelete(userId)
  } catch (error) {
    console.log(error)
  }
}

async function deleteItem(itemId) {
  try {
    await Item.findByIdAndDelete(itemId)
  } catch (error) {
    console.log(error)
  }
}

async function findItemsByUserId(userId) {
  try {
    const user = await findUserById(userId)
    await user.populate('items_sold')
    return user.items_sold
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export default {
  getItems,
  getUsers,
  findItemById,
  findUserById,
  createUser,
  createItem,
  deleteUser,
  deleteItem,
  findItemsByUserId,
}
