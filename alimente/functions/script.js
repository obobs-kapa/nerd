// Verificar se o acesso está sendo feito por um dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
  var personImage = document.getElementById('person-image');
  var foodImage = document.getElementById('food-image');
  var isHungry = true;

  // Variáveis para rastrear a posição inicial do toque
  var startX = 0;
  var startY = 0;

  // Adicionar eventos de toque para iniciar e parar o movimento
  foodImage.addEventListener('touchstart', startDrag);
  foodImage.addEventListener('touchend', stopDrag);

  function startDrag(event) {
    // Impedir que outros eventos de toque ocorram
    event.preventDefault();

    // Obter as coordenadas do toque inicial
    var touch = event.touches[0];
    startX = touch.clientX - foodImage.offsetLeft;
    startY = touch.clientY - foodImage.offsetTop;

    // Adicionar evento de movimento do toque para atualizar a posição da comida
    document.addEventListener('touchmove', moveFood);
  }

  function stopDrag(event) {
    // Remover evento de movimento do toque
    document.removeEventListener('touchmove', moveFood);

    // Verificar se a comida foi solta em cima do personagem
    var personRect = personImage.getBoundingClientRect();
    var foodRect = foodImage.getBoundingClientRect();

    if (
      foodRect.left >= personRect.left &&
      foodRect.right <= personRect.right &&
      foodRect.top >= personRect.top &&
      foodRect.bottom <= personRect.bottom &&
      isHungry
    ) {
      // Trocar a imagem do personagem
      personImage.src = 'images/erguida.png';
      isHungry = false;
    }
  }

  function moveFood(event) {
    // Impedir que a página role
    event.preventDefault();

    // Obter as coordenadas do toque atual
    var touch = event.touches[0];
    var currentX = touch.clientX - startX;
    var currentY = touch.clientY - startY;

    // Atualizar a posição da comida
    foodImage.style.left = currentX + 'px';
    foodImage.style.top = currentY + 'px';
  }
}
