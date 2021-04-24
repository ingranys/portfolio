/* toggle menu */
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');

toggle.addEventListener('click', () => {
  menu.classList.toggle('active');
  header.classList.toggle('active');
})


/* convert svg files to inline html */
const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);
  
    images.forEach(image => {
      fetch(image.src)
      .then(res => res.text())
      .then(data => {
        const parser = new DOMParser();
        const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
  

        if (image.id) svg.id = image.id;
        if (image.className) svg.classList = image.classList;
        if (image.title) {
          var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
          title.textContent = image.title;
          svg.appendChild(title);
        }

        if (image.getAttribute('link')){
          var link = document.createElement('a');
          link.setAttribute('href', image.getAttribute('link'));
          link.appendChild(svg);  
          image.parentNode.replaceChild(link, image);  
        } else {
          image.parentNode.replaceChild(svg, image);
        }
        
      })
      .then(callback)
      .catch(error => console.error(error))
    });
}
  
convertImages('img');


/* particles.JS.load(@dom-id, @path-json, @callback (optional)); */
var loadParticles = function(event) {
  if (window.innerWidth > 600)  {
    particlesJS.load('particles', 'config/particles-large.json', function() {
      console.log('Particles.js configuration loaded.');
    });  
  } else {
    particlesJS.load('particles', 'config/particles-small.json', function() {
      console.log('Particles.js configuration loaded.');
    }); 
  }
};  

window.onresize = loadParticles;
window.onload = loadParticles;


/* typed.js */
var typedOptions = document.getElementById('typed-options');
var elementTypeSpeed = typedOptions.getAttribute('type-speed');
var elementBackSpeed = typedOptions.getAttribute('back-speed');
var elementStartDelay = typedOptions.getAttribute('start-delay');
var elementBackDelay = typedOptions.getAttribute('back-delay');

var typed = new Typed('#typed', {
  //strings: [  "Identity Management Specialist",
  //            "Machine Learning Enthusiast",
  //            "Self-Taught Web Developer"],
  stringsElement: '#typed-strings',
  typeSpeed: parseInt(elementTypeSpeed),
  backSpeed: parseInt(elementBackSpeed),  
  startDelay: parseInt(elementStartDelay),
  backDelay: parseInt(elementBackDelay),
  showCursor: false,
  loop: true,
  onBegin: (self) => {console.log("Typed.js configuration loaded.")},
});


