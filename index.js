const express = require('express')
const bodyParser = require('body-parser')
const db = require('./server/db')

const app = express()
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async function (req, res) {
    const tweets = await db.findTweets()
    res.render('index', {
        tweets: tweets,
    })
})

app.post('/tweet', async (req, res) => {
    const tweet = req.body.tweet

    if (tweet.length < 3) {
        res.status(400).send('Your tweet must be at least 3 characters long.')
        return
    }

    await db.insertTweet(tweet)
    res.redirect('/')
})

db.connect()

app.listen(3000)