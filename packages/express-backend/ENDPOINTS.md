# Endpoints

This doc outlines what each endpoint in `server.js` does, and how to use it.

## Users

### GET `/users`

Returns a list of all users in the database.

### POST `/users`

Creates a new user in the database. In the POST body, pass an object meeting the requirements in the `user_schema.js` file. `username` is the only required field.

### GET `/users/:userId`

Gets a specific user's data. The `userId` path variable is the user id for the user you would like to fetch.

## Wishlists

### GET `/users/:userId/wishlist`

Gets a specific user's wishlist. The `userId` path variable is the user id for the user whose wishlist you would like to fetch.

### PUT `/users/:userId/wishlist/:itemId`

Adds a specific item to a specific user's wishlist. The `userId` path variable is the user id for the user's whose wishlist you would like to change, and the `itemId` path variable is the id for the item you would like to add.

### DELETE `/users/:userId/wishlist/:itemId`

Removes a specific item from a specific user's wishlist.

### GET `/items`

Returns a list of all items in the database. Particularly useful in populating the main page. If you want to run a keyword search, pass the url parameter `q` set to a string. For example, a keyword search on `spicy peppers` would look like `/items?q=spicy peppers`.

### GET `/items/:itemId`

Gets a specific item's data. The `itemId` path variable is the item id for the item whose details you would like to see.

### Get `/users/:userId/items`

Gets a list of the items a particular user has posted.

### POST `/users/:userId/items`

Creates a new listing from a user. The post body should contain an object meeting the requirements in the item schema. `title` and `description` are the only required fields.
