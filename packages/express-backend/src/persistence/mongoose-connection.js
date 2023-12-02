import mongoose from 'mongoose'
import Item from '../schemas/item_schema.js'
import User from '../schemas/user_schema.js'

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

function removePasswordField(user_object) {
  const skippedKeys = new Set(['hashed_password'])
  const result = {}
  Object.keys(user_object).forEach((key) => {
    if (skippedKeys.has(key)) {
      return
    }

    result[key] = user_object[key]
  })

  return result
}

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
    return (await User.find())
      .map((user) => user.toObject())
      .map(removePasswordField)
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
    return removePasswordField((await User.findById(userId)).toObject())
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function createUser(user) {
  try {
    const userToAdd = new User(user)
    const savedUser = await userToAdd.save()
    return removePasswordField(savedUser.toObject())
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

async function getWishlist(userId) {
  try {
    const user = await findUserById(userId)
    await user.populate('wishlist')
    return user.wishlist
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function addToWishList(userId, itemId) {
  try {
    const item = await findItemById(itemId)
    const user = await findUserById(userId)

    if (item === undefined || user === undefined) {
      throw new Error('Item or User not found')
    }

    if (user.wishlist.indexOf(item._id) !== -1) {
      return user.wishlist
    }

    user.wishlist.push(item._id)
    user.save()

    return user.wishlist
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function removeFromWishList(userId, itemId) {
  try {
    const item = await findItemById(itemId)
    const user = await findUserById(userId)

    if (item === undefined || user === undefined) {
      throw new Error('Item or User not found')
    }

    user.wishlist = user.wishlist.filter((itemId) => {
      return !item._id.equals(itemId)
    })

    user.save()
  } catch (error) {
    console.log(error)
  }
}

async function findUserByUsername(username) {
  try {
    const user = await User.findOne({ username: username }).exec()
    if (!user) {
      throw new Error(`Username "${username}" not found`)
    }

    return user
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
  getWishlist,
  addToWishList,
  removeFromWishList,
  findUserByUsername,
}
