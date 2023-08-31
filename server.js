if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
console.log(stripeSecretKey, stripePublicKey)

const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/store', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).send('Error reading items.json')
    } else {
      res.render('store.ejs', {
        stripePublicKey : stripePublicKey,
        items: JSON.parse(data)
      })
    }
  })
})

// Additional routes and middleware can be added here

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


// app.post('/purchase', function(req, res) {
//   fs.readFile('items.json', function(error, data) {
//     if (error) {
//       res.status(500).end()
//     } else {
//       const itemsJson = JSON.parse(data)
//       const itemsArray = itemsJson.music.concat(itemsJson.merch)
//       let total = 0
//       req.body.items.forEach(function(item) {
//         const itemJson = itemsArray.find(function(i) {
//           return i.id == item.id
//         })
//         total = total + itemJson.price * item.quantity
//       })

//       stripe.charges.create({
//         amount: total,
//         source: req.body.stripeTokenId,
//         currency: 'usd'
//       }).then(function() {
//         console.log('Charge Successful')
//         res.json({ message: 'Successfully purchased items' })
//       }).catch(function() {
//         console.log('Charge Fail')
//         res.status(500).end()
//       })
//     }
//   })
// })

