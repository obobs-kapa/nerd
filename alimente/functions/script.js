// Selecionar a imagem
var image = document.getElementById('food-image');

// Variáveis para rastrear a posição inicial do toque
var startX = 0;
var startY = 0;

// Adicionar eventos de toque para iniciar e parar o movimento
image.addEventListener('touchstart', startDrag);
image.addEventListener('touchend', stopDrag);

function startDrag(event) {
  // Impedir que outros eventos de toque ocorram
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
