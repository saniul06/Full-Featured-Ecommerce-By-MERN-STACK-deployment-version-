class ApiFeatures {
    constructor(collection, query) {
        this.collection = collection;
        this.query = query
    }

    search() {
        const keyword = this.query.keyword ? {
            name: {
                $regex: this.query.keyword,
                $options: 'i'
            }
        } : {}

        this.collection = this.collection.find(keyword)
        return this
    }

    filter() {
        const queryCopy = { ...this.query }
        // Remove keywords that are not present in Product model
        const remove = ['keyword', 'limit', 'page']
        remove.forEach(item => delete queryCopy[item])
        // Add dollar sign ($) before gte and lte for filter price between given range
        let str = JSON.stringify(queryCopy)
        str = str.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        this.collection = this.collection.find(JSON.parse(str))
        return this
    }

    pagination(itemPerPage) {
        let currentPage = this.query.page || 1
        let skipItem = itemPerPage * (currentPage - 1)
        this.collection = this.collection.limit(itemPerPage).skip(skipItem)
        return this
    }
}

module.exports = ApiFeatures;