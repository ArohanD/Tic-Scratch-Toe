const express = require('express');
const app = express();

app.use('/', express.static('./Public'));

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', './Public/index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log('Tic Scratch Toe is ready on port 3000!'))