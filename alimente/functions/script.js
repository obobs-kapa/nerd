// Verificar se o acesso está sendo feito por um dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Obter as referências dos elementos
var personImage = document.getElementById('person-image');
var foodImage = document.getElementById('food-image');
var statusText = document.getElementById('status-text');
var isHungry = true;

var isDragging = false;
var touchOffsetX;
var touchOffsetY;

// Adicionar eventos de toque ou arrastar e soltar aos elementos
if (isMobile()) {
  foodImage.addEventListener('touchstart', touchStart);
  foodImage.addEventListener('touchmove', touchMove);
  foodImage.addEventListener('touchend', touchEnd);
} else {
  foodImage.addEventListener('mousedown', dragStart);
  window.addEventListener('mousemove', dragMove);
  window.addEventListener('mouseup', dragEnd);
}

// Função de início de toque ou arrastar
function touchStart(event) {
  event.preventDefault();

  var touch = event.touches[0];
  touchOffsetX = touch.clientX - foodImage.offsetLeft;
  touchOffsetY = touch.clientY - foodImage.offsetTop;
  
  isDragging = true;
}

// Função de movimento de toque ou arrastar
function touchMove(event) {
  event.preventDefault();

  if (isDragging) {
    var touch = event.touches[0];
    var x = touch.clientX - touchOffsetX;
    var y = touch.clientY - touchOffsetY;
    
    moveFoodImage(x, y);
  }
}

// Função de finalização de toque ou arrastar
function touchEnd(event) {
  event.preventDefault();

  if (isDragging) {
    isDragging = false;
    
    checkFeedPerson();
  }
}

// Função de início de arrastar
function dragStart(event) {
  event.preventDefault();
  
  touchOffsetX = event.clientX - foodImage.offsetLeft;
  touchOffsetY = event.clientY - foodImage.offsetTop;
  
  isDragging = true;
}

// Função de movimento de arrastar
function dragMove(event) {
  event.preventDefault();
  
  if (isDragging) {
    var x = event.clientX - touchOffsetX;
    var y = event.clientY - touchOffsetY;
    
    moveFoodImage(x, y);
  }
}

// Função de finalização de arrastar
function dragEnd(event) {
  event.preventDefault();
  
  if (isDragging) {
    isDragging = false;
    
    checkFeedPerson();
  }
}

// Função para mover a imagem do hambúrguer
function moveFoodImage(x, y) {
  foodImage.style.left = x + 'px';
  foodImage.style.top = y + 'px';
}

// Função para verificar se a pessoa foi alimentada
function checkFeedPerson() {
  var personRect = personImage.getBoundingClientRect();
  var foodRect = foodImage.getBoundingClientRect();

  if (
    foodRect.left >= personRect.left &&
    foodRect.right <= personRect.right &&
    foodRect.top >= personRect.top &&
    foodRect.bottom <= personRect.bottom &&
    isHungry
  ) {
    personImage.src = 'person-happy.png';
    statusText.innerHTML = 'A pessoa está alimentada. Obrigado!';
    foodImage.style.display = 'none';
    isHungry = false;
  } else {
    statusText.innerHTML = 'Arraste o hambúrguer até a pessoa para alimentá-la.';
  }
}
