let myCanvasElement = document.getElementById("myCanvas");
let myCanvas = myCanvasElement.getContext('2d');

let rectangle = null;

function calculate() {
    let point = getHtmlElements("X","Y","A","B");
    rectangle = {positions: point};

    try {
         isvalidFields();
         let calculateMessage = document.getElementById("message");
         calculateMessage.innerHTML = "Square area: " + rectangle.positions.width * rectangle.positions.height;
         drawRectangle();
    } catch(e) {
        console.log(e);
        let divElement = document.getElementById('showMessage');
         divElement.innerHTML = "Please Correct Errors<br> " + e.message;
    }
  
}
let message = new String();

function isvalidFields() {

    clearFields();
    let showWidthError;
    message = "";

    if(isEmptyField(rectangle.positions.width)) {
        showError("A"); 
        showWidthError = document.getElementById('AError');
        showWidthError.innerHTML = " *fill A input <br>";
        message += " *fill A input <br>";
    }
    
    if(isEmptyField(rectangle.positions.height)) {
        showError("B"); 
        showWidthError = document.getElementById('BError');
        showWidthError.innerHTML = " *fill B input <br>";
        message += " *fill B input <br>";
    }

    if(isEmptyField(rectangle.positions.xPosition)) {
        showError("X");
        showWidthError = document.getElementById('XError');
        showWidthError.innerHTML = " *fill X input <br>";
        message += " *fill X input <br>"; 
    } 

    if(isEmptyField(rectangle.positions.yPosition)) {
        showError("Y"); 
        showWidthError = document.getElementById('YError');
        showWidthError.innerHTML = " *fill Y input <br>";
        message += " *fill Y input <br>";
    }
      
    checkRectangleSides();

    if(message != "") {
        throw new Error(message);
    }
    
}

function checkRectangleSides() {
    console.log(rectangle.positions.xPosition,rectangle.positions.yPosition);
    if(rectangle.positions.xPosition < 0 && !isEmptyField(rectangle.positions.xPosition)) {
        message += " *Rectangle passed over border of canvas to X coordinate <br>";
    }

    if(rectangle.positions.xPosition + rectangle.positions.width > 400 && !isEmptyField(rectangle.positions.xPosition)) {
        message += " *Rectangle passed over border of canvas to X coordinate <br>";
    } 

    if(rectangle.positions.yPosition < 0  && !isEmptyField(rectangle.positions.yPosition)) {
        message += " *Rectangle passed over border of canvas to Y coordinate <br>";
    }

    if(rectangle.positions.yPosition + rectangle.positions.height > 500 && !isEmptyField(rectangle.positions.yPosition)) {
        message += " *Rectangle passed over border of canvas to Y coordinate <br>";
    }

    if(rectangle.positions.width < 5  && !isEmptyField(rectangle.positions.width)) {
        message += " Rectangle width must be minimum 5 <br>";
    }

    if(rectangle.positions.height < 5  && !isEmptyField(rectangle.positions.height)) {
        message += " Rectangle height must be minimum 5 <br>";
    }
    
}

function clearFields() {
    clearError("A");
    clearError("B");
    clearError("X");
    clearError("Y");
    clearMessage("AError");
    clearMessage("BError");
    clearMessage("XError");
    clearMessage("YError");
    clearMessage("message");
    clearMessage("showMessage");
}


function clearAllValues() {
    clearValue("A");
    clearValue("B");
    clearValue("X");
    clearValue("Y");
}


function clearValue(id) {
    let node = document.getElementById(id);
    node.value = "";
}

function clearError(id) {
    let node = document.getElementById(id);
    node.style.border = "";
}

function clearMessage(id) {
    let userElement = document.getElementById(id);
    userElement.innerHTML = "";
}

function showError(id) {

    let node = document.getElementById(id);
    node.style.border = "1px solid red";
}

function isEmptyField(text) {

    if(text == null) {
        return true;
    }

    if(text == "") {
        return true;
    }
    
    return false;
}

function drawRectangle() {
    myCanvas.beginPath();
    myCanvas.strokeStyle = '#999';
    myCanvas.rect(rectangle.positions.xPosition, 
                  rectangle.positions.yPosition,
                  rectangle.positions.width, 
                  rectangle.positions.height);
    myCanvas.stroke();
}


function getHtmlElements(xDOMId,yDOMId,widthDOMId,heightDOMId) {

    let x = +document.getElementById(xDOMId).value;
    let y = +document.getElementById(yDOMId).value;
    let width = +document.getElementById(widthDOMId).value;
    let height = +document.getElementById(heightDOMId).value;

    return {xPosition: x, yPosition: y, width: width, height: height};
}




/* Clear Canvas */

function refreshPage() {
    myCanvas.clearRect(0,0,400,500);
    clearAllValues();
    clearFields();
}



/* Draw Rectangles */

let coordinates = null;

let array = [];

myCanvasElement.addEventListener("click", relMouseCoords);

function relMouseCoords(event){
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement = currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    console.log(canvasX, canvasY);

    coordinates = {x:canvasX, y:canvasY};

    array.push(coordinates);

    return {x:canvasX, y:canvasY};
}

console.log(array);

let drawbutton = document.getElementById("draw-button"); 

drawbutton.addEventListener("click", draw);

function draw() {

   
    for(let i = 0; i < array.length; i++) {
        myCanvas.beginPath();
        myCanvas.strokeStyle = "green";
        myCanvas.rect(array[i].x, array[i].y, 20, 20);
        myCanvas.stroke();
    }
    array = [];
}





