var express = require('express')
var app = express()
var path = require('path');

app.set('port', (process.env.PORT || 5001))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/../dist'))

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/../dist/index.html'))
})

app.get('/test', function(request, response) {
  response.send('Hello test!')
})


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
