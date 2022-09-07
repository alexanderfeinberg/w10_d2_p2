const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});


const notFound = (err, req, res, next)=>{
  const errorCode = err.errorCode
  res.status(errorCode || 500)
  console.error(`NEW ERROR: ${err}, STATUS: ${errorCode}`)
  const body = {"message": err.message, "statusCode":errorCode}
  res.json(body)
}
app.use('/',[(req, res, next)=>{
  const newErr = new Error("Sorry, the requested resource couldn't be found")
  newErr.errorCode = 404
  next(newErr)
}, notFound])


const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));
