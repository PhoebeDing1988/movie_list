const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const movieList = require('./movies.json')
//Set template engine 
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//Router setting
app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })
})

app.get('/search', (req, res) => {
  // console.log('req keyword', req.query.keyword)
  const movies = movieList.results.filter((movie) => {
    return movie.title.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { movies: movies, keyword: req.query.keyword })
})

app.get('/movies/:movie_id', (req, res) => {
  // console.log('movie_id', req.params.movie_id)
  const movie = movieList.results.find(movie => movie.id.toString() === req.params.movie_id
  )
  // console.log(movie)

  res.render('show', { movie: movie })

})

//Set static file
app.use(express.static('public'))

//Start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})