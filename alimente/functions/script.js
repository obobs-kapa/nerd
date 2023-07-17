  // Verificar se o acesso está sendo feito por um dispositivo móvel
  function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Exemplo de uso
    if (isMobile()) {
    // Selecionar a imagem
    var personImage = document.getElementById('person-image');
    var foodImage = document.getElementById('food-image');
    var statusText = document.getElementById('status-text');
    var isHungry = true;
    
    // Variáveis para rastrear a posição inicial do toque
    var startX = 0;
    var startY = 0;
    
    // Adicionar eventos de toque para iniciar e parar o movimento
    image.addEventListener('touchstart', startDrag);
    image.addEventListener('touchend', stopDrag);
    
    function startDrag(event) {
      // Impedir que outros eventos de toque ocorra m
      event.preventDefault();
    
      // Obter as coordenadas do toque inicial
      var touch = event.touches[0];
      startX = touch.clientX - image.offsetLeft;
      startY = touch.clientY - image.offsetTop;
    
      // Adicionar evento de movimento do toque para atualizar a posição da imagem
      document.addEventListener('touchmove', moveImage);
    }
    
    function stopDrag(event) {
      // Remover evento de movimento do toque
      document.removeEventListener('touchmove', moveImage);
    }
    
    function moveImage(event) {
      // Impedir que a página role
      event.preventDefault();
    
      // Obter as coordenadas do toque atual
      var touch = event.touches[0];
      var currentX = touch.clientX - startX;
      var currentY = touch.clientY - startY;
    
      // Atualizar a posição da imagem
      image.style.left = currentX + 'px';
      image.style.top = currentY + 'px';
    }
    
// Função de manipulação de soltar
function stopDrag(event) {
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
      personImage.src = 'images/erguida.png';
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
