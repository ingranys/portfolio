/*
#######################################################
MENU
#######################################################
*/
/* get elements */
const toggle = document.querySelector('.toggle');
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
const menuItems = document.querySelectorAll('.menu-content > li > a');

/* compute header delay */
const style = getComputedStyle(document.body);
const headerDelay = 1000*0.8*parseFloat(style.getPropertyValue('--menu-reveal-duration')); 

/* toggle on click */
toggle.addEventListener('click', () => {

  menu.classList.toggle('active');
  toggle.classList.toggle('active');

  if (header.classList.contains('active')){
    setTimeout(function(){
      header.classList.remove('active');
    }, headerDelay);
  } else {
    header.classList.add('active');
  }
})

/* scroll to section on click */
menuItems.forEach(menuItem => {
  menuItem.addEventListener('click', (event) => {
    let anchor = menuItem.getAttribute('data-text');

    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
    }
    if (header.classList.contains('active')) {
      header.classList.remove('active');
    }
    
    setTimeout(function(){
      /*document.location.hash = '#' + anchor.toString();*/
      document.querySelector('.' + anchor.toString()).scrollIntoView({behavior: "smooth"});
      history.pushState(null,null,'#' + anchor.toString());
    }, 500);

    event.preventDefault();
  })
})


/*
#######################################################
SVG
#######################################################
*/
/* convert svg files to inline html */
/* hide img html elements until they are converted > style="display:none;"*/
const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);
  
    images.forEach(image => {
      if (image.src.includes('.svg')){

        fetch(image.src)
        .then(res => res.text())
        .then(data => {
          const parser = new DOMParser();
          /* fetch raw svg from file */
          const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
    
          /* retrive attributes*/
          if (image.id) svg.id = image.id;
          if (image.className) svg.classList = image.classList;
          if (image.title) {
            var title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            title.textContent = image.title;
            svg.appendChild(title);
          }

          if (image.getAttribute('link')){
            /* put inside an anchor whe link is required and replace image */
            var link = document.createElement('a');
            link.setAttribute('href', image.getAttribute('link'));
            if (image.getAttribute('target')){
              link.setAttribute('target', image.getAttribute('target'));
            }
            link.appendChild(svg);  
            image.parentNode.replaceChild(link, image);  
          } else {
            /* replace image with generated svg */ 
            image.parentNode.replaceChild(svg, image);
          }
          
        })
        .then(callback)
        .catch(error => console.error(error))
      }
    });
}
  
convertImages('img');


/*
#######################################################
SCROLL
#######################################################
*/
/* use IntersectionObserver > 
https://stackoverflow.com/a/62536793/5390321 */
function onObserverChange(entries, observer)
{
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target.classList.contains('lock')){
        entry.target.classList.remove('lock');
        entry.target.classList.add('init');
    } /*else if (!entry.isIntersecting && !entry.target.classList.contains('lock')) {
        entry.target.className = entry.target.classList[0];
        entry.target.classList.add('lock');
    }*/
    /*
    var txt = "class:" + entry.target.className + ", id:" + entry.target.id + ", visibility: " + entry.isIntersecting;
    console.log(txt);
    */
  });
}

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  };

let observer = new IntersectionObserver(onObserverChange, options);

cards.forEach(card => {
    observer.observe(card);
});

/* toggle header shadow */
window.onscroll = function() {
  if(window.scrollY !== 0){
    if(!header.classList.contains('shadow')){
      header.classList.add('shadow');
    }
    }else{
      header.classList.remove('shadow');
    }
};


/*
#######################################################
PARTICLES
#######################################################
*/
/* load configuration file, fine-tune params and start */
/* setParticles(@dom-id, @path-json, @callback (optional)); */
setParticles = function(tag_id, path_config_json, callback){

  /* load json config */
  var xhr = new XMLHttpRequest();
  xhr.open('GET', path_config_json);
  xhr.onreadystatechange = function (data) {
    if(xhr.readyState == 4){
      if(xhr.status == 200){
        var params = JSON.parse(data.currentTarget.response);
        params = adaptParticlesParams(tag_id,params);
        window.particlesJS(tag_id, params);
        if(callback) callback();
      }else{
        console.log('Error pJS - XMLHttpRequest status: '+xhr.status);
        console.log('Error pJS - File config not found');
      }
    }
  };
  xhr.send();
};

/* adaptParticlesParams(@dom-id, @path-json); */
adaptParticlesParams = function(tag_id, params){ 

  /*get element size*/  
  const particlesElement = document.querySelector('#'+tag_id);
  var size = Math.min(particlesElement.clientWidth,particlesElement.clientHeight);

  /*device pixel ratio can mess settings*/
  pixelRatio = window.devicePixelRatio;

  /* adjust repulse radius to canvas size */
  var repulseDistance = 0.5 * 0.9 * size ;
  params.interactivity.modes.repulse.distance = repulseDistance;

  /* adjust density for small devices */
  var particlesDensity = 1 / 5000 ;
  var particlesArea = particlesElement.clientWidth * particlesElement.clientHeight;
  var particlesNumber = particlesDensity * particlesArea;
  params.particles.number.value = particlesNumber;

  /* retina detect must be enabled for better performance */
  if (!params.retina_detect){
    console.log('WARNING: Particles.js retina_detect feature is disabled.')
  }

  return params;
};

/* reload particles when screen size is updated */
var loadParticles = function(event) {
  setParticles('particles', 'config/particles.json', function() {
    console.log('Particles.js configuration loaded.');
  });
};  

window.onresize = loadParticles;
window.onload = loadParticles;

/* load particles from configuration file */
/* particles.JS.load(@dom-id, @path-json, @callback (optional)); */
/*
    particlesJS.load('particles', 'config/particles.json', function() {
      console.log('Particles.js configuration loaded.');
});
*/


/*
#######################################################
TYPED
#######################################################
*/
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
  onReset: (self) => {console.log("Typed.js configuration loaded.");}
}).reset();


/*
#######################################################
HISTORY
#######################################################
*/
/* get history items*/
const historyItems = document.querySelectorAll('.history > li > a');

/* display preview image when hovering */
historyItems.forEach(historyItem => {
  historyItem.addEventListener('mousemove', e => {
    var xOffset = 30;
    var yOffset = 30;

    var x0 = e.clientX;
    var y0 = e.clientY;

    var previewId = historyItem.getAttribute('data-id');
    var previewImg = document.querySelector(previewId + ' > img');
    var previewParent = document.querySelector(previewId);
    
    var previewHeight = previewImg.offsetHeight;
    var previewWidth = previewImg.offsetWidth;

    const previewRight = previewParent.classList.contains('right');
    const previewLeft = previewParent.classList.contains('left');

    var viewportWidth = document.documentElement.clientWidth;

    if (viewportWidth < 600){
      var x = viewportWidth/2 - previewWidth/2;
      var y = y0 + yOffset;
    } else if (previewLeft){
      var x = x0 + xOffset;
      var y = y0 + yOffset;
    } else if (previewRight) {
      var x = x0 - previewWidth - xOffset;
      var y = y0 + yOffset;
    } else {
      var y = y0 - previewHeight/2;
    }
    previewImg.setAttribute("style", "top: "+y+"px; left: "+x+"px;");
  })
})

