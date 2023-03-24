exports.home = (req, res, next) => {
    res.render('home/home.ejs', {title: 'Home'});
}