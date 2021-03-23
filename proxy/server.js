var express = require('express');
var app = express()
var port = 5000
var path = require('path')
var axios = require('axios')

app.use(express.static('/index.html'))

app.get('/:id', (req,res) => {

  var settings = {url: 'string',params: {indicator: 'all'}}
  var productId = req.params.id
  var melissaUrl = `http://localhost:8003/${productId}`
  var marlonUrl = `http://localhost:8001/${productId}`
  // console.log('id -> ', productId)
  // console.log('params -> ', req.params)
  // console.log('here ->',req.query)

  var melissaService = `http://localhost:8003/related-products/${productId}`

  // axios.get(melissaService,settings)
  // .then((data)=> {
  //   console.log('data->', data)
  //   res.end()
  // })
  // .catch((err)=> {
  //   console.log('err->', err)
  //   res.end()

  // })
  if (req.query.service === 'details') {
    var jamesUrl = `http://localhost:3001/${productId}`
    var settings = {url: 'string',params: {indicator: 'all'}}
    axios.get(jamesUrl,settings).
    then((data) => {res.send(data.data)})
    .catch((err) => {console.log('err from resp -> ', err);res.end()})
  } else {
    res.sendFile(path.join(__dirname, 'index.html'))
  }
  // res.end()
})
app.get('/card/:id', (req, res) => {
  // console.log('entering')
  const {host, port, path, productId} = req.query;
  const route = `http://${host}:${port}${path}${productId}`;
  return axios.get(route)
    .then((result) => {
      const response = JSON.stringify(result.data);
      res.status(200).send(response);
    })
    .catch((error)=> {
      console.log(error);
    });
});

app.post('/:id', (req,res) => {
  var id = req.params.id
  var gageUrl = `http://localhost:3000/${id}`
  axios.post(gageUrl)
  .then((data) => {res.send(data.data)})
  .catch((err) => {
    console.log('err -> ', err)
    res.end()
  })
})










/*
  get the paramaters of current url
  make axios request to james service with params and id from url to -> localhost8002
  // res.send()
  --> the data that we need to
  */
/*

route should have product id with colon
request.params.product id
component did mount service = details
if service === details make a axios request to server
axios sends a object with params
axios(url,settings)

settings = {
  url: string
  params: {
    indicator: all
  }
}
service recieves id and service
*/

// proxy = port:5000
// service = port:3000

// melissa
// service = port:8003

// james
// service = port:3001

// marlon
// service = port:8001

// handle my service first
// handle james queery

// handle marlons query

// handle melissa's query

// app.get('/', (req,res) => {
//   console.log('request has been sent')
//   res.sendFile(path.resolve(__dirname,'./index.html'))
// })








app.listen(port, () => console.log(`server is running on port ${port}`) )