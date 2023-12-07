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
    const { username } = user

    if (await findUserByUsername(username)) {
      throw new Error(`User with username ${username} already exists.`)
    }

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
    const itemCreator = await User.findById(userId)
    const savedItem = await itemToAdd.save()

    itemCreator.items_sold.push(savedItem.id)
    itemCreator.save()

    return savedItem
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function updateItemBuyerAndAddToUserBought(itemId, buyerId) {
  try {
    const item = await findItemById(itemId)
    if (!item) {
      throw new Error('Item not found')
    }

    const buyer = await User.findById(buyerId)
    if (!buyer) {
      throw new Error('Buyer not found')
    }

    item.buyer_id = buyerId
    await item.save()

    buyer.items_bought.push(item._id)
    await buyer.save()

    return item
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
    const user = await User.findById(userId)
    await user.populate('items_sold')
    return user.items_sold
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function findBoughtItemsByUserId(userId) {
  try {
    const user = await User.findById(userId)
    await user.populate('items_bought')
    return user.items_bought
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function getWishlist(userId) {
  try {
    const user = await User.findById(userId)
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
    const user = await User.findById(userId)

    if (item === undefined || user === undefined) {
      throw new Error('Item or User not found')
    }

    if (user.wishlist.indexOf(item._id) !== -1) {
      return user.wishlist
    }

    item.interested_users.push(user._id)

    user.wishlist.push(item._id)
    user.save()
    item.save()

    return user.wishlist
  } catch (error) {
    console.log(error)
    return undefined
  }
}

async function removeFromWishList(userId, itemId) {
  try {
    const item = await findItemById(itemId)
    const user = await User.findById(userId)

    if (item === undefined || user === undefined) {
      throw new Error('Item or User not found')
    }

    user.wishlist = user.wishlist.filter((itemId) => !item._id.equals(itemId))

    item.interested_users = item.interested_users.filter(
      (userId) => !user._id.equals(userId)
    )

    user.save()
    item.save()
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

async function getItemInterestedUsers(itemId) {
  try {
    const item = await Item.findById(itemId)
    if (!item) {
      throw new Error(`Item ${itemId} not found`)
    }

    await item.populate('interested_users')

    return item.interested_users
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
  findBoughtItemsByUserId,
  createUser,
  createItem,
  updateItemBuyerAndAddToUserBought,
  deleteUser,
  deleteItem,
  findItemsByUserId,
  getWishlist,
  addToWishList,
  removeFromWishList,
  findUserByUsername,
  getItemInterestedUsers,
}
