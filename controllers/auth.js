exports.getLogin = (req, res, next)=>{
    const isLoggedIn = req.get('Cookie').split(';')[0].split('=')[1] === 'true';
    console.log(isLoggedIn);
    res.render('auth/login', { 
        pageTitle: 'Login', 
        path: '/login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next)=>{
    req.isLoggedIn = true;
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
};