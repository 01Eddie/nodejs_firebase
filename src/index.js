const app = require('./app');


//app.listen(3000)

app.listen(app.get('port'));


console.log('Server on port', app.get('port'));

