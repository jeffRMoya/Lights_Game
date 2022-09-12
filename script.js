function startUp() {
    console.log("startUp is firing");

    wireUpButtons();
}

function wireUpButtons() {
    $('#start').on('click', onStartGame)
    $('#stop').on('click', onStopGame)
    $('.div_color1').on('click', onUserClick)
}

let compArr = [];
let userArr = [];

function onStartGame() {
    while(compArr.length === 0) {
        getRandom();
    }
}

function onStopGame() {
    compArr = [];
    userArr = [];
    alert("GameBoard Reset");
}

function getRandom() {
    let randomDivId = Number(Math.floor(9 * Math.random()) + 1).toString();
    flash(randomDivId);
    compArr.push(randomDivId);
    console.log(compArr);
}

function compTurn() {
    for (let i = 0; i < compArr.length; i++) {
        const sequence = compArr[i];
        setTimeout(flash, i * 600, sequence, i);
    }
}

function onUserClick(e) {
    if(compArr.length >= 1) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const divClicked = this.id;
    flash(divClicked);
    userArr.push(divClicked);
    console.log(userArr);
    if(userArr.length === compArr.length){
        if(compArr.join() === userArr.join()){
            if(userArr.length === 5) {
                alert("YOU WIN!!");
                onStopGame();
            } 
            else {
                userArr = [];
                setTimeout(compTurn, 2000);
            }
        }
        else {
            alert("You lose");
            onStopGame();
        }
    }
}
}

function flash(divId, i) {
    const div = $(`#${divId}`)
    div.removeClass("div_color1");
    div.addClass("div_color2")
    
    setTimeout(returnColor, 500, divId, i);  
}

function returnColor(divId, i) {
    const div = $(`#${divId}`)
    div.removeClass("div_color2");
    div.addClass("div_color1");

    if(i === (compArr.length -1)) {
        getRandom();
    }
}