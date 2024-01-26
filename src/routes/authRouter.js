import express from 'express';
import passport from 'passport';
import User from '../dao/models/userModel.js';
import bcrypt from 'bcrypt';
import LocalStrategy from 'passport-local';
import GitHubStrategy from 'passport-github';

const authRouter = express.Router();

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
}, async (email, password, done) => {
  const user = await User.findOne({ email });

  if (!user) {
      return done(null, false, { message: 'Correo incorrecto.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
      return done(null, false, { message: 'Contraseña incorrecta.' });
  }

  return done(null, user);
}));

// Configurar Passport para utilizar la estrategia de autenticación de GitHub
passport.use(new GitHubStrategy({
  clientID: '68b25fadb2da04b510b6',
  clientSecret: 'f8932f0bcd51b76f7fb2c1e72990d240af115bb1',
  callbackURL: 'http://localhost:3000/auth/github/callback', 
}, async (accessToken, refreshToken, profile, done) => {
  const githubUsername = profile.username;

  try {
      const existingUser = await userModel.findOne({ githubUsername });

      if (existingUser) {
          return done(null, existingUser);
      } else {
          const newUser = new userModel({
              githubUsername,
             
          });

          const savedUser = await newUser.save();
          return done(null, savedUser);
      }
  } catch (error) {
      return done(error);
  }
}));

// Ruta para iniciar el proceso de autenticación de GitHub
authRouter.get('/github', passport.authenticate('github'));

 // Ruta para manejar el callback después de la autenticación exitosa o fallida de GitHub
 authRouter.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/products',  // Redirección en caso de éxito de autenticación de GitHub
  failureRedirect: '/login',     // Redirección en caso de falla de autenticación de GitHub
}));

// Ruta para renderizar la vista de registro
authRouter.get('/register', (req, res) => {
  res.render('register'); // Renderiza la vista de registro
});

// Ruta para manejar el registro de usuarios
authRouter.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hashear la contraseña usando bcrypt con un factor de coste de 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await User.register(newUser, hashedPassword);

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
    res.redirect('/auth/login'); // Redirige a la página de login después del registro exitoso
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});

// Ruta para manejar el inicio de sesión
authRouter.get('/login', (req, res) => {
  res.render('login'); // Renderiza la vista de login
});


authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/auth/login'); }
    
    // Autenticación exitosa
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.json({ message: 'Login exitoso', user: req.user });
    });
  })(req, res, next);
});

// Ruta para manejar el cierre de sesión
authRouter.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout exitoso' });
  res.redirect('/auth/login'); // Redirige a la página de login después del logout exitoso
});

export function checkRole(role) {
  return (req, res, next) => {
    if (req.isAuthenticated() && req.user.roles === role) {
      return next();
    }
    res.status(403).json({ error: 'Acceso no autorizado' });
  };
}

export default authRouter;
