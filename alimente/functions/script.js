// Verificar se o acesso está sendo feito por um dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Obter as referências dos elementos
var personImage = document.getElementById('person-image');
var foodImage = document.getElementById('food-image');
var statusText = document.getElementById('status-text');
var isHungry = true;

// Variáveis para rastrear o estado do arrastar
var isDragging = false;
var touchStartX;
var touchStartY;
var offsetX;
var offsetY;

// Adicionar eventos de toque ou arrastar e soltar aos elementos
if (isMobile()) {
  foodImage.addEventListener('touchstart', touchStart);
  foodImage.addEventListener('touchmove', touchMove);
  foodImage.addEventListener('touchend', touchEnd);
} else {
  foodImage.addEventListener('dragstart', dragStart);
  personImage.addEventListener('dragover', allowDrop);
  personImage.addEventListener('drop', drop);
}

// Função de início de toque ou arrastar
function touchStart(event) {
  event.preventDefault();

  var touch = event.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  offsetX = touch.clientX - foodImage.getBoundingClientRect().left;
  offsetY = touch.clientY - foodImage.getBoundingClientRect().top;
  
  isDragging = true;
}

// Função de movimento de toque ou arrastar
function touchMove(event) {
  event.preventDefault();

  if (isDragging) {
    var touch = event.touches[0];
    var x = touch.clientX - offsetX;
    var y = touch.clientY - offsetY;
    
    foodImage.style.left = x + 'px';
    foodImage.style.top = y + 'px';
  }
}

// Função de finalização de toque ou arrastar
function touchEnd(event) {
  event.preventDefault();

  if (isDragging) {
    isDragging = false;

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
}

// Função de início de arrastar
function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.id);
}

// Função de manipulação de permitir soltar
function allowDrop(event) {
  event.preventDefault();
}

// Função de manipulação de soltar
function drop(event) {
  event.preventDefault();
  var foodId = event.dataTransfer.getData('text/plain');
  var food = document.getElementById(foodId);

  var rect = personImage.getBoundingClientRect();
  var personImageX = rect.left;
  var personImageY = rect.top;
  var personImageWidth = rect.width;
  var personImageHeight = rect.height;

  var dropX = event.clientX;
  var dropY = event.clientY;

  if (
    dropX >= personImageX &&
    dropX <= personImageX + personImageWidth &&
    dropY >= personImageY &&
    dropY <= personImageY + personImageHeight
  ) {
    if (isHungry) {
      personImage.src = 'person-happy.png';
      statusText.innerHTML = 'A pessoa está alimentada. Obrigado!';
      food.style.display = 'none';
      isHungry = false;
    } else {
      statusText.innerHTML = 'A pessoa já está alimentada.';
    }
  } else {
    statusText.innerHTML = 'Arraste o hambúrguer até a pessoa para alimentá-la.';
  }
}
