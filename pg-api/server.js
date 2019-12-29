let express = require('express')
let bodyParser = require('body-parser')
let morgan = require('morgan')
let pg = require('pg')
let cors = require('cors')
const PORT = 3000

// posstgres server connect info
let pool = new pg.Pool({
	port: 5432,
	host: 'localhost',
	user: 'postgres',
	password: 'oasis',
	database: 'celery',
	max: 10
})

let app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.use(morgan('dev'))

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*")
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Get user list from users
app.get('/api/users', function(request, response){
  pool.connect(function(err, db, done){
    if(err){
      return response.status(400).send(err)
    }
    else{
      db.query('SELECT * FROM users', function(err,table){
        done()
        if(err){
          return response.status(400).send(err)
        }
        else{
          return response.status(200).send(table.rows)
        }
      })
    }
  })
})

// Add new users
app.post('/api/new-user', function(request, response){
  var name = request.body.name
  var surname = request.body.surname
  var id = request.body.id
  let newUser = [name, surname, id]

  // connect to postgres
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err)
    }
    else {
      db.query('INSERT INTO users (name, surname, id) VALUES ($1,$2,$3)', newUser, (err, table) => {
        done()
        if(err) {
          return response.status(400).send(err)
        }
        else {
          console.log("Data inserted")
          response.status(201).send({message: 'Data inserted'})
        }
      })
    }
  })
})

// Delete a user
app.delete('/api/remove/:id', function(request,response) {
  var id = request.params.id
  pool.connect(function(err, db, done) {
    if(err) {
      return response.status(400).send(err)
    }
    else{
      db.query('delete from users where id = $1', [id], function(err, result){
        done()
        if(err){
          return response.status(400).send(err)
        }
        else{
          return response.status(200).send({message:'delete user success'})
        }
      })
    }
  })
})

// Get records from certain user
app.get('/api/records/:id/:month/:day', function(request, response){
  var id = request.params.id
  var month = request.params.month
  var day = request.params.day
  pool.connect(function(err, db, done){
    if(err){
      return response.status(400).send(err)
    }
    else{
      db.query('SELECT * FROM records WHERE user_id = $1 and month = $2 and day = $3', [id, month, day], function(err, table){
        done()
        if(err){
          return response.status(400).send(err)
        }
        else{
          return response.status(200).send(table.rows)
        }
      })
    }
  })
})

// Add new record
app.post('/api/new-record', function(request, response){
  var id = request.body.id
  var user_id = request.body.user_id
  var month = request.body.month
  var day = request.body.day
  var mealtype = request.body.mealtype
  var calories = request.body.calories
  var menu = request.body.menu
  let newRecord = [id, user_id, month, day, mealtype, calories, menu]

  // connect to postgres
  pool.connect((err, db, done) => {
    if(err) {
      return response.status(400).send(err)
    }
    else {
      db.query('INSERT INTO records (id, user_id, month, day, mealtype, calories, menu) VALUES ($1,$2,$3,$4,$5,$6,$7)', newRecord, (err, table) => {
        done()
        if(err) {
          return response.status(400).send(err)
        }
        else {
          console.log("Data inserted")
          response.status(201).send({message: 'Data inserted'})
        }
      })
    }
  })
})

// Delete a record
app.delete('/api/remove-record/:id', function(request,response) {
  var id = request.params.id
  pool.connect(function(err, db, done) {
    if(err) {
      return response.status(400).send(err)
    }
    else{
      db.query('delete from records where id = $1', [id], function(err, result){
        done()
        if(err){
          return response.status(400).send(err)
        }
        else{
          return response.status(200).send({message:'delete record success'})
        }
      })
    }
  })
})


app.listen(PORT, () => console.log('Listening on port ' + PORT))