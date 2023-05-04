import User from '../models/user.js';

export function getSignup(req, res) {
  res.render('auth/signup', {
    title: 'Sign Up'
  });
}

export async function postSignup(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const user = new User({ name, email, password });
    await user.save();

    req.flash('success', 'Account created successfully');
    res.redirect('/'); // Redirige vers la page de login
   
  } catch (err) {
    req.flash('error', 'An error occurred');
    res.redirect('/signup'); // Redirige vers la page de signup
  }
}

export function getLogin(req, res) {
  res.render('auth/login', {
    title: 'Login'
  });
}

export async function postLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login'); // Redirige vers la page de login
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login'); // Redirige vers la page de login
    }

    req.session.user = user;
    req.session.isLoggedIn = true;
    await req.session.save();

    res.redirect('/'); // Redirige vers la page d'accueil
    
  } catch (err) {
    req.flash('error', 'An error occurred');
    res.redirect('/login'); // Redirige vers la page de login
  }
}

export function postLogout(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/login'); // Redirige vers la page de login après la déconnexion
  });
}
