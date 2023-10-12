import { sigInWithGoogle, loginUser } from '../lib/index.js';

function login(navigateTo) {
  if (localStorage.getItem('userRegistered') === 'true') {
    return navigateTo('/feed');
  }
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const btnLoginGoogle = document.createElement('button');
  const logoGoogle = document.createElement('img');
  const googleText = document.createElement('p');
  const hr = document.createElement('hr');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const registerAnchor = document.createElement('a');
  const btnLogin = document.createElement('button');
  const passAnchor = document.createElement('a');
  const homeImg = document.createElement('img');
  const mensaje = document.createElement('p');
  const contentSection = document.createElement('section');
  const formSection = document.createElement('section');

  section.className = 'container';
  contentSection.className = 'contentSection';
  formSection.className = 'formSection';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.svg';

  btnLoginGoogle.className = 'btnGoogle';

  logoGoogle.id = 'iconGoogle';
  logoGoogle.alt = 'Logo de Google';
  logoGoogle.src = '../assets/googleIcon.png';

  googleText.textContent = 'Inicia sesión con Google';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📧   Correo electrónico';

  inputPass.className = 'inputLog';
  inputPass.type = 'password';
  inputPass.placeholder = '🔑   Contraseña';

  registerAnchor.textContent = '¿Nuevo usuario? Regístrate';

  btnLogin.className = 'buttons';
  btnLogin.textContent = 'Iniciar sesión';

  passAnchor.textContent = '¿Olvidaste tu contraseña?';
  passAnchor.id = 'passAnchor';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  mensaje.id = 'mensaje';
  // asigna valor mensaje a la propiedad id del elemento mensaje
  // el elemento tiene un identificdor único (útil para seleccionar y manipular el elemento)

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });
  btnLoginGoogle.addEventListener('click', async (event) => {
    event.preventDefault();
    const user = await sigInWithGoogle(event);
    // se llama a la fx pasando el evento como argumento
    if (user) {
      navigateTo('/feed');
    }
  });
  registerAnchor.addEventListener('click', () => {
    navigateTo('/register');
  });

  btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    // obtiene los valores de email y password
    const user = await loginUser(email, password, mensaje);
    // llama a loginUser pasando 3 argumentos
    if (user) {
      navigateTo('/feed');
    }
  });

  passAnchor.addEventListener('click', () => {
    navigateTo('/forgotPassword');
  });

  section.append(contentSection);
  contentSection.append(logoImg, formSection);
  formSection.append(btnLoginGoogle, hr, form, registerAnchor, btnLogin, passAnchor, homeImg);
  btnLoginGoogle.append(logoGoogle, googleText);
  form.append(inputEmail, inputPass, mensaje);

  return section;
}

export default login;
