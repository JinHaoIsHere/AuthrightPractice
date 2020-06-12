var cardsArray = [
    {    'name': 'CSS',    'img': 'https://github.com/robgmerrill/img/blob/master/css3-logo.png?raw=true',  },
    {    'name': 'HTML',    'img': 'https://github.com/robgmerrill/img/blob/master/html5-logo.png?raw=true',  },
    {    'name': 'jQuery',    'img': 'https://github.com/robgmerrill/img/blob/master/jquery-logo.png?raw=true',  },
    {    'name': 'JS',    'img': 'https://github.com/robgmerrill/img/blob/master/js-logo.png?raw=true',  },
    {    'name': 'Node',    'img': 'https://github.com/robgmerrill/img/blob/master/nodejs-logo.png?raw=true',  },
    {    'name': 'Photo Shop',    'img': 'https://github.com/robgmerrill/img/blob/master/photoshop-logo.png?raw=true',  },
    {    'name': 'PHP',    'img': 'https://github.com/robgmerrill/img/blob/master/php-logo_1.png?raw=true',  },
    {    'name': 'Python',    'img': 'https://github.com/robgmerrill/img/blob/master/python-logo.png?raw=true',  },
    {    'name': 'Ruby',    'img': 'https://github.com/robgmerrill/img/blob/master/rails-logo.png?raw=true',  },
    {    'name': 'Sass',    'img': 'https://github.com/robgmerrill/img/blob/master/sass-logo.png?raw=true',  },
    {    'name': 'Sublime',    'img': 'https://github.com/robgmerrill/img/blob/master/sublime-logo.png?raw=true',  },
    {    'name': 'Wordpress',    'img': 'https://github.com/robgmerrill/img/blob/master/wordpress-logo.png?raw=true',  },
  ];
// var another = [{'name':'aa'},{'name':'bb'},{'name':'cc'},{'name':'dd'}];
var gameGrid = cardsArray.concat(cardsArray.slice());
//var gameGrid = [...another, {'name':'aa'},{'name':'bb'},{'name':'cc'},{'name':'dd'}];
// var newgameGrid = gameGrid.map((obj)=>{
//     obj.sort = Math.random();
//     return obj;
// });
// for(var i=0;i<gameGrid.length;i++){
//     gameGrid[i].sort=Math.random();

// }

// gameGrid = gameGrid.map((obj)=>{
//     obj.ref = Math.random();
//     console.log(obj.ref);
//     return obj;
// });

// console.log(gameGrid);
// console.log(newgameGrid);
gameGrid.sort(function(obja, objb){
    return 0.5- Math.random();
});

//console.table(gameGrid);
var game = document.querySelector('#game-board');
var grid = document.createElement('section');
grid.setAttribute('class','grid');
game.appendChild(grid);


for(let i=0;i<gameGrid.length;i++){
    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name=gameGrid[i].name;

    var front = document.createElement('div');
    front.classList.add('front');
    var back = document.createElement('div');
    back.classList.add('back');

    back.style.backgroundImage=`url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
}
var firstGuess ="";
var secondGuess="";
var count = 0;
var prev=null;
var delay = 1200;
var match = function(){
    var selected = document.querySelectorAll('.selected');
    for(let i=0;i<selected.length;i++){
        selected[i].classList.add('match');
    }
}
var resetGuess = function(){
    firstGuess='';
    secondGuess='';
    count=0;
    prev=null;
    var selected = document.querySelectorAll('.selected');
    for(let i=0;i<selected.length;i++){
        selected[i].classList.remove('selected');
    }
}

grid.addEventListener('click', function(event){
    var clicked = event.target;
    console.log(clicked);
    if(clicked.nodeName === 'SECTION' || clicked===prev || clicked.parentNode.classList.contains('match') || clicked.parentNode.classList.contains('selected')){
        console.log("return");
        return;
    }
    if(count<2){
        count++;
        if(count==1){
            firstGuess=clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }else{
            secondGuess=clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        }
        if(firstGuess&&secondGuess){
            if(firstGuess===secondGuess){
                setTimeout(match, delay);
            }
            setTimeout(resetGuess,delay);
        }else
            prev=clicked.parentNode;
    }
    
});