const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const { User, Contact } = require('../models')

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    const hash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ name, email, password: hash })
    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// route.get('/login', async (req, res) => {
//   try {
//     const users = await User.find()
//     res.json(users)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: 'Server Error' })
//   }
// })

module.exports = router