exports.login = (req, res, next) => {
    res.render('settings/login.ejs');
}

exports.register = (req, res, next) => {
    res.render('settings/register.ejs');
}