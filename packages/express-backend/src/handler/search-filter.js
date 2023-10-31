const fieldWeights = {
    'title': 3,
    'description': 1
}

/**
 * Return the score of an item from the query words
 *
 * @param {[string]} words 
 * @param {*} item
 * 
 * @returns number of words that appear in item
 */
function keywordScore(words, item) {
    let hits = 0

    words.forEach(word => {
        Object.keys(fieldWeights).forEach(field => {
            let count = substringCount(item[field], word)
            if (count) {
                hits += count * fieldWeights[field]
            }
        })
    })

    return hits
}

/**
 * @param {string} mainString
 * @param {string} subString
 *
 * @returns the number of times subString occurs in mainString
 */
function substringCount(mainString, subString) {
    let position = 0
    let count = 0

    while (mainString.indexOf(subString, position) !== -1) {
        count += 1
        position = mainString.indexOf(subString, position) + 1
    }

    return count
}

/**
 * A plain data object to hold item search sorting data
 */
class SearchItem {
    constructor(item, score) {
        this.item = item
        this.score = score
    }

    getItem() {
        return this.item
    }

    getScore() {
        return this.score
    }
}

/**
 * 
 * @param {string} query 
 * @param {[*]} items 
 * @returns list of items that match the keyword search
 */
export const applyKeywordItemSearch = (query, items) => {
    const result = []
    const keywords = query.split(' ')

    // Build list of sort-friendly SearchItem
    items.forEach(item => {
        const scored = new SearchItem(item, keywordScore(keywords, item))
        if (scored.getScore())
            result.push(scored)
    })

    // Sort result items
    result.sort((a, b) => b.getScore() - a.getScore())

    return result.map(searchItem => searchItem.getItem())
}
