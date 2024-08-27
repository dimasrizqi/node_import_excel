const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const router = require('./routes');
app.use(express.json());
app.use(fileupload());
// untuk prefix api
app.use('/api/book', router);
app.listen(3001, () => console.log("API example export-import" + " run on " + "localhost:3001"));