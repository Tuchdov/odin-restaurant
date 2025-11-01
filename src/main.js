import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import breakfastSvg from './assets/breakfast.svg'
import breakfastPhoto from './assets/breakfast.jpeg'

const content = document.querySelector('#home');

const img = document.createElement('img');
img.src = breakfastPhoto;
img.alt = 'Breakfast icon';

content.appendChild(img);


 const buttons = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active state
        buttons.forEach(btn => btn.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Add active state to clicked button and its content
        button.classList.add('active');
        const tabId = button.dataset.tab;
        document.getElementById(tabId).classList.add('active');
      });
    });
