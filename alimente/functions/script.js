var personImage = document.getElementById('person-image');
var foodImage = document.getElementById('food-image');
var statusText = document.getElementById('status-text');
var isHungry = true;

// Adicionar eventos de toque aos elementos
personImage.addEventListener('touchstart', touchStart);
personImage.addEventListener('touchmove', touchMove);
personImage.addEventListener('touchend', touchEnd);

// Variáveis para rastrear o estado do toque
var touchStartX;
var touchStartY;

// Função de início de toque
function touchStart(event) {
  var touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
}

// Função de movimento de toque
function touchMove(event) {
  event.preventDefault();
}

// Função de finalização de toque
function touchEnd(event) {
  var touch = event.changedTouches[0];
  var touchEndX = touch.clientX;
  var touchEndY = touch.clientY;

  var rect = personImage.getBoundingClientRect();
  var personImageX = rect.left;
  var personImageY = rect.top;
  var personImageWidth = rect.width;
  var personImageHeight = rect.height;

  if (
    touchEndX >= personImageX &&
    touchEndX <= personImageX + personImageWidth &&
    touchEndY >= personImageY &&
    touchEndY <= personImageY + personImageHeight
  ) {
    if (isHungry) {
      personImage.src = 'erguida.png';
      statusText.innerHTML = 'A pessoa está alimentada. Obrigado!';
      foodImage.style.display = 'none';
      isHungry = false;
    } else {
      statusText.innerHTML = 'A pessoa já está alimentada.';
    }
  } else {
    statusText.innerHTML = 'Toque na pessoa para alimentá-la.';
  }
}
