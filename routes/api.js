const express = require('express');
const router = express.Router();
const News = require('../models/news')
const defaultSort = -1;

/* GET home page. */
router.get('/', (req, res) => {
    const search = req.query.search || '';
    let sort = req.query.sort || defaultSort;

    if (sort !== -1 || sort !== 1) {
        sort = defaultSort;
    } // ten if zabezpiecza przed wpiasnie 0 w sort ale powoduje , że sortowanie jest zawsze -1

    const findNews = News
        .find({ title: new RegExp(search.trim(), 'i') })
        .sort({ created: sort })
    // odpalamy ręcznie http://localhost:3000/api?search=test&sort=1
    //http://localhost:3000/api?search=art&sort=1 jeśli mamy artykuł 1 i artykuł 2 i artykuł dwa jest na górze to sort =1 posortuje  rosnąco i artykuł 2 bedzie na dole a artykuł 1 na górze. Wystraczy w serch= wstawić art zamiast całego słowa artykuł dla artykułów bo szuka po frazach, gdyż stosujemy RegExp - wyrażenia regularne

    // .select('_id title description') //  możemy sobie ograniczyć w select jakie chcemy pola w api

    findNews.exec((err, data) => {

        res.json(data);
        // res.json({ data });
    })

});

// metoda do pobierania jednego artykułu
router.get('/:id', (req, res) => {
    const id = req.params.id;

    const findNews = News
        .findById(id)
    // http://localhost:3000/api/5cdc4d9e3f2f4800179f3528 - otrzymujemy artykuł o w/w id

    findNews.exec((err, data) => {

        res.json(data);
        // res.json({ data });
    })

});

module.exports = router;
