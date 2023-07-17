// Verificar se o acesso está sendo feito por um dispositivo móvel
function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Exemplo de uso
if (isMobile()) {
  var draggableImage = document.getElementById('draggable-image');
  var dropZone = document.getElementById('drop-zone');

  // Variáveis para rastrear a posição inicial do toque
  var startX = 0;
  var startY = 0;

  // Adicionar eventos de toque para iniciar e parar o movimento
  draggableImage.addEventListener('touchstart', startDrag);
  draggableImage.addEventListener('touchend', stopDrag);

  function startDrag(event) {
    // Impedir que outros eventos de toque ocorram
    event.preventDefault();

    // Obter as coordenadas do toque inicial
    var touch = event.touches[0];
    startX = touch.clientX - draggableImage.offsetLeft;
    startY = touch.clientY - draggableImage.offsetTop;

    // Adicionar evento de movimento do toque para atualizar a posição da imagem
    document.addEventListener('touchmove', moveImage);
  }

  function stopDrag(event) {
    // Remover evento de movimento do toque
    document.removeEventListener('touchmove', moveImage);

    // Verificar se a imagem foi solta na zona de destino
    var dropZoneRect = dropZone.getBoundingClientRect();
    var imageRect = draggableImage.getBoundingClientRect();

    if (
      imageRect.left >= dropZoneRect.left &&
      imageRect.right <= dropZoneRect.right &&
      imageRect.top >= dropZoneRect.top &&
      imageRect.bottom <= dropZoneRect.bottom
    ) {
      // Ação a ser executada quando a imagem for solta no local correto
      alert('Imagem solta no local correto!');
    }
  }

  function moveImage(event) {
    // Impedir que a página role
    event.preventDefault();

    // Obter as coordenadas do toque atual
    var touch = event.touches[0];
    var currentX = touch.clientX - startX;
    var currentY = touch.clientY - startY;

    // Atualizar a posição da imagem
    draggableImage.style.left = currentX + 'px';
    draggableImage.style.top = currentY + 'px';
  }
}
