import mongoose from 'mongoose'

import Item from '../schemas/item_schema.js'
import User from '../schemas/user_schema.js'

const cluster = process.env['STUFFEX_CLUSTER']
const username = process.env['STUFFEX_USERNAME']
const password = process.env['STUFFEX_PASSWORD']
const database = process.env['STUFFEX_DATABASE']

if (
  cluster === undefined ||
  username === undefined ||
  password === undefined ||
  database === undefined
) {
  throw new Error('Missing database credentials')
}

mongoose.set('debug', true)

mongoose
  .connect(`mongodb+srv://${username}:${password}@${cluster}/${database}`, {
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
