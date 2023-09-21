import { addPost, getPosts } from '../lib/index.js';

function feed(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';
  const userIcon = document.createElement('img');
  userIcon.className = 'userIcon';
  userIcon.alt = 'user icon';
  userIcon.src = '../assets/userIcon.png';
  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';
  const feedName = document.createElement('h1');
  feedName.className = 'feedName';
  feedName.textContent = 'Tu muro';
  const feedPost = document.createElement('h1');
  feedPost.className = 'feedPost';
  feedPost.textContent = 'Tus publicaciones';
  const form = document.createElement('form');
  const hr = document.createElement('hr');
  hr.className = 'hrFeed';

  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('input');
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputPost.className = 'inputLog';
  inputPost.type = 'text';
  inputPost.placeholder = 'Escribe tu post';

  inputTitle.className = 'inputLog';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  btnPost.className = 'btnLogin';
  btnPost.textContent = 'Enviar';

  section.append(logoImg, userIcon, feedName, feedPost, hr);
  form.append(inputTitle, inputPost, btnPost);
  section.append(form, withOutPost, logoImg);

  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = inputTitle.value.trim();
    const post = inputPost.value.trim();
    if (title === '' || post === '') {
      withOutPost.textContent = 'No puedes enviar un post vacío';
      return;
    }
    const postContainer = await addPost(title, post);
    document.body.appendChild(postContainer);
    await addPost(title, post);
    inputTitle.value = '';
    inputPost.value = '';
    withOutPost.textContent = '';
    getPosts();
  });

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;