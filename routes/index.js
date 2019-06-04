
module.exports = (app)=> {
  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.sendFile('index.html');
  });
};

