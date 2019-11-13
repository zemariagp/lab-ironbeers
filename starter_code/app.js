const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');



app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + '/views/partials')



app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/beers', (req, res, next) => {

  punkAPI.getBeers().then(beerObject => {

    res.render('beers', {
      beers: beerObject
    });

  }).catch(error => {
    console.log(error);
  });
});
app.get('/random-beer', (req, res, next) => {

  punkAPI.getRandom().then(rbeerObject => {

    res.render('random-beer', {
      beers: rbeerObject
    });

  }).catch(error => {
    console.log(error);
  });
});

app.get('/:id', (req, res, next) => {
  punkAPI.getBeer(req.params.id).then(beer => {

    res.render("random-beer", beer[0]);
  });

});

app.listen(3000);