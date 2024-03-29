var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var cors = require('cors')
let session = require('express-session')
let server = require('http').createServer(app)
const API_VERSION = require('./utils/connectDB').API
const user = require('./routes/user')
custom=require('./routes/custom')
admin=require('./routes/admin')
const md5=require('./utils/config')
const options = {
  setHeaders(res, path, stat) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}
app.use(cors())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(`${API_VERSION}/custom`,custom)
app.use(`${API_VERSION}/user`, user)
app.use(`${API_VERSION}/admin`, admin)
app.get('/', (req, res) => {
  res.sendfile(__dirname + '/index.html')
})
app.get('/admin', (req, res) => {
  res.sendfile(__dirname + '/public/build/index.html')
})

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
const PORT=process.env.PORT||3000
server.listen(PORT, () => {
  console.log('node.js start')
});
module.exports = app;