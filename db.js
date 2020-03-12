const MongoClient = require('mongodb')

const mongoURL = 'mongodb://localhost:27017/bootcamp'

let client

async function getTweets() {
    const collection = client.db('bootcamp').collection('tweets')
    const tweets = await collection.find().sort({timestamp: -1}).toArray()
    return tweets
}

async function addTweet(tweet) {
    const collection = client.db('bootcamp').collection('tweets')
    await collection.insertOne({
        tweet: tweet,
        timestamp: new Date(),
    })
}

async function init() {
    client = await MongoClient(
        mongoURL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
}

module.exports = {
    getTweets: getTweets,
    addTweet: addTweet,
    init: init,
}