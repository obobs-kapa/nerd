// Verificar se o acesso está sendo feito por um dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Exemplo de uso
if (isMobile()) {
  var personImage = document.getElementById('person-image');
  var foodImage = document.getElementById('food-image');
  var statusText = document.getElementById('status-text');
  var isHungry = true;

  // Adicionar eventos de toque aos elementos
  personImage.addEventListener('touchstart', touchStart);
  foodImage.addEventListener('touchstart', touchStart);
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

    if (
      touchEndX >= personImage.offsetLeft &&
      touchEndX <= personImage.offsetLeft + personImage.offsetWidth &&
      touchEndY >= personImage.offsetTop &&
      touchEndY <= personImage.offsetTop + personImage.offsetHeight
    ) {
      if (isHungry) {
        personImage.src = 'person-happy.png';
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
} else {
  var personImage = document.getElementById('person-image');
  var foodImage = document.getElementById('food-image');
  var statusText = document.getElementById('status-text');
  var isHungry = true;

  // Adicionar eventos de arrastar e soltar aos elementos
  personImage.addEventListener('dragover', allowDrop);
  personImage.addEventListener('drop', drop);

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
        personImage.src = 'erguida.png';
        statusText.innerHTML = 'A pessoa está alimentada. Obrigado!';
        food.style.display = 'none';
        isHungry = false;
      } else {
        statusText.innerHTML = 'A pessoa já está alimentada.';
      }
    } else {
      statusText.innerHTML = 'Arraste a comida até a pessoa para alimentá-la.';
    }
  }
}
