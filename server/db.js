const mongo = require('mongodb')
const MongoClient = mongo.MongoClient

const mongoURL = 'mongodb://localhost:27017'

const client = new MongoClient(
    mongoURL,
    {useNewUrlParser: true, useUnifiedTopology: true}
)

async function findTweets() {
    const collection = client.db('bootcamp').collection('tweets')
    const tweets = await collection.find().sort({timestamp: -1}).toArray()
    return tweets
 }

 async function insertTweet(tweet) {
    const collection = client.db('bootcamp').collection('tweets')
    await collection.insertOne({
        tweet: tweet,
        timestamp: new Date(),
    })
}

async function connect() {
    await client.connect()
    db = client.db(config.dbName)
}

async function close() {
    await client.close()
}

module.exports = {
    findTweets: findTweets,
    insertTweet: insertTweet,
    connect: connect,
    close: close,
}

/**
 * TODO
 * - add error handling
 * - reuse connection across app
 * - write up as a cohesive workshop plan
 * 
 * - start w/ getting MongoDB installed
 * - then do async review, if possible
 * - then: go through "building Twitter"
 */