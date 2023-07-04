// create class for creating tamagotchi objects
class Tamagotchi {
    constructor(hunger, sleepiness, boredom, age) {
        this.hunger = hunger;
        this.sleepiness = sleepiness;
        this.boredom = boredom;
        this.age = age;
    }
}

// Função para salvar o estado do jogo
function salvarEstado() {
    localStorage.setItem("tamagotchiData", JSON.stringify(myTamagotchi));
}

// Função para restaurar o estado do jogo
function restaurarEstado() {
    var savedData = localStorage.getItem("tamagotchiData");
    if (savedData) {
        myTamagotchi = JSON.parse(savedData);

        // Atualize os elementos HTML com os valores restaurados, se necessário
        $("#hunger").replaceWith(`<p id='hunger'>Fome: ${myTamagotchi.hunger}</p>`);
        $("#sleepiness").replaceWith(`<p id='sleepiness'>Sono: ${myTamagotchi.sleepiness}</p>`);
        $("#boredom").replaceWith(`<p id='boredom'>Tédio: ${myTamagotchi.boredom}</p>`);
        $("#age").replaceWith(`<p id='age'>Level: ${myTamagotchi.age}</p>`);

        // Atualize a imagem do Tamagotchi com base na idade
        let imgSrc;
        if (myTamagotchi.age === 0) {
            imgSrc = "tamagotchi-egg.png";
        } else if (myTamagotchi.age < 4) {
            imgSrc = "tamagotchi-egg2.png";
        } else if (myTamagotchi.age < 8) {
            imgSrc = "cat1.png";
        } else if (myTamagotchi.age < 15) {
            imgSrc = "cat2.png";
        } else if (myTamagotchi.age < 25) {
            imgSrc = "cat3.png";
        } else if (myTamagotchi.age < 50) {
            imgSrc = "cat4.png";
        } else {
            imgSrc = "cat5.png";
        }
        $(".tamagotchi img").attr("src", imgSrc);
    }
    if (alive == false) {
        $("#restart").hide();
        $("#sleep").show();
        $("#play").show();
        $("#feed").show();
        $("img:eq(1)").replaceWith(`<img src="${imgSrc}">`);
    }
}
    

// create tamagotchi object
let myTamagotchi = new Tamagotchi(1, 1, 1, 0);
let alive = true;

//hide the restart button at start of game
$("#restart").hide();

//create function to call and start the game
function startGame() {
    grow();
}

let growInterval;
let imgSrc = "";
// create functions to hatch the tamagotchi after x time then start all other incremental functions
function grow() {
    if (myTamagotchi.age < 2) {
        hatch();
    } else {
        incrementAge();
        incrementHunger();
        incrementSleepiness();
        incrementBoredom();

        growInterval = setInterval(function() {
            if (myTamagotchi.age < 4 && alive == true) {
                imgSrc = "tamagotchi-egg2.png";
            } else if (myTamagotchi.age < 8) {
                imgSrc = "cat1.png";
            } else if (myTamagotchi.age < 15) {
                imgSrc = "cat2.png";
            } else if (myTamagotchi.age < 25) {
                imgSrc = "cat3.png";
            } else if (myTamagotchi.age < 50) {
                imgSrc = "cat4.png";
            } else {
                imgSrc = "cat5.png";
            }

            $(".tamagotchi img").attr("src", imgSrc);
        }, 500); // Atualizar a cada 1 segundo (1000 milissegundos)
    }
}

function hatch() {
    let timeoutID = window.setTimeout(function() {
        myTamagotchi.age += 1;
        $("#age").replaceWith(`<p id='age'>Level: ${myTamagotchi.age}</p>`);
        grow();
    }, 50000)
}


//create functions to increment stats

function incrementHunger() {
    let timeoutID = window.setTimeout(function() {
        myTamagotchi.hunger += 1;
        $("#hunger").replaceWith(`<p id='hunger'>Fome: ${myTamagotchi.hunger}</p>`);
        if (myTamagotchi.hunger < 10) {
            incrementHunger();
        } else {
            die();
        }
    }, 50000)
};

function incrementSleepiness() {

    let timeoutID = window.setTimeout(function() {
        myTamagotchi.sleepiness += 1;
        $("#sleepiness").replaceWith(`<p id='sleepiness'>Sono: ${myTamagotchi.sleepiness}</p>`);
        if (myTamagotchi.sleepiness < 10) {
            incrementSleepiness();
        } else {
            die();
        }
    }, 60000)

};

function incrementBoredom() {
    let timeoutID = window.setTimeout(function() {
        myTamagotchi.boredom += 2;
        $("#boredom").replaceWith(`<p id='boredom'>Tédio: ${myTamagotchi.boredom}</p>`);
        if (myTamagotchi.boredom < 10) {
            incrementBoredom();
        } else {
            die();
        }
    }, 70000)
};

function incrementAge() {
    if (alive == true) {
        let timeoutID = window.setTimeout(function() {
        myTamagotchi.age += 1;
        $("#age").replaceWith(`<p id='age'>Level: ${myTamagotchi.age}</p>`);
        if (myTamagotchi.age < 200) {
            incrementAge();
        }
        if (myTamagotchi.age >= 100){
            $("img:eq(0)").replaceWith("<img id='catImg' src='tamagotchi-egg.png'/>");
        }
        }, 150000)
    } else {
        return;
    }
}

//create functions to decrease stats
function feed() {
    if (myTamagotchi.hunger >= 2) {
        myTamagotchi.hunger -= 2;
        $("#hunger").replaceWith(`<p class='bar' id='hunger'>Fome: ${myTamagotchi.hunger}</p>`);
    } else {
        myTamagotchi.hunger = 0;
        $("#hunger").replaceWith(`<p id='hunger'>Fome: ${myTamagotchi.hunger}</p>`);
    }
    myTamagotchi.sleepiness += 1;
}

function play() {
    if (myTamagotchi.boredom >= 3) {
        myTamagotchi.boredom -= 3;
        $("#boredom").replaceWith(`<p id='boredom'>Tédio: ${myTamagotchi.boredom}</p>`);
    } else {
        myTamagotchi.boredom = 0;
        $("#boredom").replaceWith(`<p id='boredom'>Tédio: ${myTamagotchi.boredom}</p>`);
    }
    myTamagotchi.hunger += 1;
}

function bedtime(time) {
    
    if (myTamagotchi.age < 100) {
    $(".tamagotchi img").css("display", "none");
    $("img:eq(0)").replaceWith("<img src='tamagotchi-home-night.png'>");
    let timeoutID = window.setTimeout(function() {
        myTamagotchi.sleepiness = 0;
        $(".tamagotchi img").css("display", "block");
        $("img:eq(0)").replaceWith("<img src='tamagotchi-home.png'>")
        $("#sleepiness").replaceWith(`<p id='sleepiness'>Sono: ${myTamagotchi.sleepiness}</p>`);
    }, time)
    } else {
        myTamagotchi.sleepiness = 0;
        $("#sleepiness").replaceWith(`<p id='sleepiness'>Sono: ${myTamagotchi.sleepiness}</p>`);
    }
    myTamagotchi.boredom += 1;
}

// create functions for die and to restart game
function die() {
    alive = false;
    $("img:eq(1)").replaceWith("<img src='tamagotchi-dead.png'>");
    $("#sleep").hide();
    $("#play").hide();
    $("#feed").hide();
    $("#restart").show();
    $("#salvar").hide();
    $("#restaurar").hide();
    clearInterval(growInterval);
}

function restart() {

    alive = true;
    $("#restart").hide();
    $("img:eq(1)").replaceWith("<img id='catImg' src='tamagotchi-egg.png'/>");
    myTamagotchi.sleepiness = 0;
    $("#sleepiness").replaceWith(`<p id='sleepiness'>Sono: 1</p>`);
    $("#sleep").show()
    myTamagotchi.boredom = 0;
    $("#boredom").replaceWith(`<p id='boredom'>Tédio: 1</p>`);
    $("#play").show()
    myTamagotchi.hunger = 0;
    $("#hunger").replaceWith(`<p id='hunger'>Fome: 1</p>`);
    $("#feed").show()
    myTamagotchi.age = 0
    $("#age").replaceWith(`<p id='age'>Level: 0</p>`);
    $("#salvar").show();
    $("#restaurar").show();
    startGame();
}

//set up click event listeners
$("#sleep").click(function() {
    bedtime(2000);
});

$("#play").click(function() {
    play();
})

$("#feed").click(function() {
    feed();
})

$("#restart").click(function() {
    restart();
})

startGame();

if (myTamagotchi.sleep > 10) {
    die()
}

// while(true) {
// 	// Event Loop
// 	if(gameOver) break;
// }

