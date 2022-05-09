var express = require('express');
var axios = require('axios');
var app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/search/:keyword/:page', (req, res) => {
    axios.get('https://api.unsplash.com/search/photos?client_id=87EHTIvtrdAyFr-PaG30bQyAJHeHBdFKOJtkhaSKXaA&per_page=21&page=' + req.params.page + '&query=' + req.params.keyword).then(data => {
        res.send(data.data);
    });
});
app.listen(8080);