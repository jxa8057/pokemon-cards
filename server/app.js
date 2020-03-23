// init project
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Using `public` for static files: http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// Use bodyParser to parse application/x-www-form-urlencoded form data
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const router = require("./router");
app.use(router);

// Listen on port 8080
const listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
