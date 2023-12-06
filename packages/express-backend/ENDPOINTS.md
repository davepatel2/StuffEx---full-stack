# Endpoints

This doc outlines what each endpoint in `server.js` does, and how to use it.

## Users

### GET `/users`

Returns a list of all users in the database.

### GET `/users/usernames/:username`

Return a specific user's data. The `username` path variable is the username.

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

### GET `/users/:userId/items-bought`

Retrieves a list of items that a specific user has bought. Use the `userId` path variable to specify which user's purchased items you want to see. For example,
`/users/abc/items-bought` to see items bought by the user with ID `abc`.

### PATCH `/users/:sellerId/items/:itemId`

Updates the buyer details for a specific item and adds it to the buyer's list of purchased items. This endpoint requires the `sellerId`and `itemId` path variables, where `sellerId` is the ID of the user selling the item and `itemId` is the ID of the item being purchased. The request body must include `buyerId`, which is the ID of the user buying the item.

## Authentication

### POST `/login`

Request body should contain a `username` and `password` field. If the fields match, the server returns a JSON object with a `token` field containing a JWT used for authentication and a `userId` field containing the user id of the authenticated user.

Non-GET endpoints require an `authorization` header. The header should be formatted as `Token <token>`, for example `Token 2783tgyu242ygf.287tyruh2f.328r7guh2i`.
