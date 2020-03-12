const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async  (req, res) => {
    try {
        const tweets = await db.getTweets()
        res.render('index', {
            tweets: tweets,
        })
    } catch (error) {
        console.log(error)
        res.status(500)
        res.json({
            error: error,
        })
    }
})

app.post('/tweet', async (req, res) => {
    const tweet = req.body.tweet

    if (tweet.length < 3) {
        res.status(400).send('Your tweet must be at least 3 characters long.')
        return
    }

    try {
        await db.addTweet(tweet)
        res.redirect('/')
    } catch (error) {
        res.status(500)
        res.json({
            error: error
        })
    }
})

async function start() {
    await db.init()
    app.listen(3000)
}

start()