const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./models')

app.use(express.json())

// Controllers
app.use('/api/users', require('./controller/users'))

// Server Front-end
app.get('/', (req, res) => {
  // send my front-end

})


app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log(`Example app listening on port ${port}`)
})

// user table
// id, name, email, password

// contacts
// id, user_id, name, label

// info
// id, contact_id, type, value