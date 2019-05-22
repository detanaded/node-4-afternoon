require('dotenv').config();

const express = require('express')
const session = require('express-session')
const app = express();
const checkForSession = require("./middlewares/checkForSession")
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')

let {SERVER_PORT, SESSION_SECRET} = process.env

app.use(checkForSession)
app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}))





// ===========Endpoint========
app.get('/api/swag', swagController.read)


app.post('/api/login',authController.login)
app.post('api/register', authController.register)
app.post('/api/signout',authController.signout)
app.get('/api/user',authController.getUser)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.post('/api/cart/:id',cartController.delete)






app.listen(SERVER_PORT, () => {
  console.log(`Pepe Memein on ${SERVER_PORT}!`)
})