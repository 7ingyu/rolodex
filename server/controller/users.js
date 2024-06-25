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
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.get('/login', async (req, res) => {
  try {
    const { email, password } = req.query
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const match = await bcrypt.compare(password, user.password)
    if (match) {
      return res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      })
    }
    res.status(401).json({ message: 'Invalid credentials' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router