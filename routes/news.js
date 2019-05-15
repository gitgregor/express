const express = require('express');
const router = express.Router();
const News = require('../models/news')

/* GET home page. */
router.get('/', (req, res) => {
    // console.log(req.query);
    const search = req.query.search || ''; // || ''  dodane zeby zabezpieczyc przed pustym stringiem w search i zeby dodany do metody search trim() (serach.trim() - nie wyrzucał błędu)

    const findNews = News
        // .find({ title: search })
        .find({ title: new RegExp(search.trim(), 'i') }) // i- insentitive - nie czuły na wielkośc liter ?
        .sort({ created: -1 })  // sort words out in alphabetical order from A to Z

    findNews.exec((err, data) => {
        // console.log(data);
        res.render('news', { title: 'News', data, search });
    })

});


module.exports = router;
