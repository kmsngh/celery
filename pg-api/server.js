let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
const PORT = 3000;

// posstgres server connect info
let pool = new pg.Pool({
	port: 5432,
	host: 'localhost',
	user: 'postgres',
	password: 'oasis',
	database: 'celery',
	max: 10
});

// connect to postgres
pool.connect((err, db, done) => {
  if(err) {
    return console.log(err);
  }
  else {
    // var name = 'John';
    // var surname = 'Doe';
    // var id = Math.random().toFixed(3);
    db.query('SELECT * from users', (err,table) => {
      if(err) {
        return console.log(err);
      }
      else {
        console.log(table);
      }
    })
  }
})

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(morgan('dev'));

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));