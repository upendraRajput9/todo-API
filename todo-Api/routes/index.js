var express = require('express')
const fetch = require('node-fetch')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

//Get todos
router.get('/todos', async (req, res, next) => {
  let todos = null
  try {
    await fetch('https://jsonplaceholder.typicode.com/todos') 
      .then((response) => response.json())
      .then((data) => (todos = data))
    todos = todos.map((data) => {
      return { id: data.id, title: data.title, completed: data.completed }
    })
    res.status(201).json(todos)
  } catch (error) {
    next(error)
  }
})

//get user
router.get('/user/:userId', async (req, res, next) => {
  let userData = null
  let todos = null
  let userId = req.params.userId
  try {
    await fetch('https://jsonplaceholder.typicode.com/todos') 
      .then((response) => response.json())
      .then((data) => (todos = data))
    todos = todos.filter((data) => {
      if (data.userId == userId) {
        return { id: data.id, title: data.title, completed: data.completed }
      }
    })

    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`) 
      .then((response) => response.json())
      .then(
        (data) =>
          (userData = {
            id: data.id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            todos: todos,
          }),
      )
    res.status(201).json(userData)
  } catch (error) {
    next(error)
  }
})

module.exports = router
