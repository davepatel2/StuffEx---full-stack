const items = [
    {
        id: '1999',
        title: 'colts game ball',
        description: 'a game ball from a colts game',
        images: ['https://www.si.com/.image/t_share/MTk5Nzk4Nzk1NjI4NzE3Njk2/nflfootball.jpg'],
        userId: '18'
    },
    {
        id: '1238',
        title: 'broncos game ball',
        description: 'a game ball from a broncos game',
        images: ['https://www.si.com/.image/t_share/MTk5Nzk4Nzk1NjI4NzE3Njk2/nflfootball.jpg'],
        userId: '18'
    },
    {
        id: '4002',
        title: 'dented trophy',
        description: 'a dented super bowl trophy',
        images: [
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffun107.com%2Fhow-to-get-a-photo-with-the-dented-lombardi-trophy%2F&psig=AOvVaw2yLypjJexszXUrSiyEr0HL&ust=1698780089039000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLDBoJC_noIDFQAAAAAdAAAAABAE'
        ],
        userId: '12'
    },
    {
        id: '1012',
        title: 'patriots game ball',
        description: 'a game ball from a pats game but its slightly deflated',
        images: ['https://www.si.com/.image/t_share/MTk5Nzk4Nzk1NjI4NzE3Njk2/nflfootball.jpg'],
        userId: '12'
    },
    {
        id: '9013',
        title: 'buccaneers game ball',
        description: 'a buccaneers game ball. fully inflated.',
        images: ['https://www.si.com/.image/t_share/MTk5Nzk4Nzk1NjI4NzE3Njk2/nflfootball.jpg'],
        userId: '12'
    }
]

/** Return a random hex string */
const randomHexString = () =>
    Math.round(Math.random() * (1 << 16)).toString(16)

/** Return a user id string */
const userIdGenerator = () =>
    `${randomHexString()}-${randomHexString()}`

class ItemHandler {
    constructor() {}

    getItems() {
        return items
    }

    getItemById(itemId) {
        return items.find(item => item.id === itemId)
    }

    createItem(item) {
        if (Object.keys(item).includes('id') ||
            !Object.keys(item).includes('title') ||
            !Object.keys(item).includes('userId')) {
            return undefined
        }

        item.id = userIdGenerator()

        items.push(item)

        return item
    }
}

export default ItemHandler
