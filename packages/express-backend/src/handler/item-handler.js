import Database from '../persistence/mongoose-connection.js'

class ItemHandler {
  constructor() {}

  async getItems() {
    return await Database.getItems()
  }

  async getItemById(itemId) {
    return await Database.findItemById(itemId)
  }

  async createItem(item, userId) {
    return await Database.createItem(item, userId)
  }
}

export default ItemHandler
