var personImage = document.getElementById('person-container');
var foodImage = document.getElementById('food-container');
var statusText = document.getElementById('status-container');
var isHungry = true;

// Adicionar eventos de arrastar e soltar aos elementos
  foodImage.addEventListener('touchstart', allowDrop);
  foodImage.addEventListener('touchmove', allowDrop);
  foodImage.addEventListener('touchend', drop);

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

    var dropX = event.touches[0].clientX;
    var dropY = event.touches[0].clientY;

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
