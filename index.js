const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => console.log('Tic Scratch Toe is ready on port 3000!'))