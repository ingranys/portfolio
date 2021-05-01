/* get cards */
const cards = document.querySelectorAll('.lock');


/* on click */
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (card.classList.contains('ready') && card.classList.contains('toback') ){
            card.classList.remove('ready','toback');
            card.classList.add('tofront');
        } else if (card.classList.contains('ready')) {
            card.classList.add('toback');        
        } else if (card.classList.contains('toback')) {
            card.classList.remove('toback');
            card.classList.add('tofront');
        } else if (card.classList.contains('tofront')) {
            card.classList.remove('tofront');
            card.classList.add('toback');
        }
    });
});


/* on mouseleave */
cards.forEach(card => {
    card.addEventListener('mouseleave', () => {

        if (card.classList.contains('tofront')) {
            card.classList.remove('tofront'); 
            card.classList.add('ready'); 
        } else if (card.classList.contains('ready') && card.classList.contains('toback')) {
            card.classList.remove('toback'); 
            card.classList.add('tofront');   
        } else if (card.classList.contains('toback')) {
            card.classList.remove('toback'); 
            card.classList.add('ready','tofront');      
        }     
    });
});

/* on mouseenter */
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {

        if (card.classList.contains('tofront')) {
            card.classList.remove('tofront'); 
        }  
        
        if (card.classList.contains('init')) {
            card.classList.remove('init'); 
            card.classList.add('ready'); 
        }  
    });
});