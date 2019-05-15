const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

/* GET home page. */
router.get('/', (req, res) => {
    // new Quiz({ title: 'Pytanie1', vote: 0 }).save() // save() zapisuje dane do mongoDB i utworzy schemat quizzes - l. mn. quiz i tworzy z małej litery ? Ten kod było odpalony do utworzenia bazy, potem w mongo utworzyłem rekordy Lato, Jesień< Zima, Wiosna i akomentowałem new Quiz z pytanie1

    const show = !req.session.vote; // kiesy będzie show false pokazujemy formularz (czyli kiedy jest sesja z posta (req.session.vote = 1))

    Quiz.find({}, (err, data) => {
        // console.log(data);
        let sum = 0;
        data.forEach((item) => {
            sum += item.vote;

        });

        res.render('quiz', { title: 'Quiz', data, show, sum });
    })
});


router.post('/', (req, res) => {
    const id = req.body.quiz;   // quiz jako property do req.body.quiz w widoku w którym nazwa w naszym quiz.pug  quiz (name='quiz') - w radio button
    // Quiz.find({}, (err, data) => {
    //     res.render('quiz', { title: 'Quiz', data });
    Quiz.findOne({ _id: id }, (err, data) => {
        //  res.render('quiz', { title: 'Quiz', data }); // nie renderujemy tylko robimy redirect

        console.log(data); // -sprawdzamy czy wybrany radiobutton na stroniie pokazuje się w konsoli

        data.vote = data.vote + 1;
        data.save((err) => {
            req.session.vote = 1;
            res.redirect('/quiz');
        });
    });
});

module.exports = router;
