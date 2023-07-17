var food = document.getElementById("food-image");
var person = document.getElementById("person-image");

food.addEventListener("mousedown", function(e) {
  e.preventDefault();
  this.style.cursor = "move";
  this.style.touchAction = "none";
});

food.addEventListener("touchstart", function(e) {
  e.preventDefault();
  this.style.cursor = "move";
  this.style.touchAction = "none";
});

food.addEventListener("mousemove", function(e) {
  this.style.left = e.clientX - this.offsetWidth / 2 + "px";
  this.style.top = e.clientY - this.offsetHeight / 2 + "px";
});

food.addEventListener("touchmove", function(e) {
  this.style.left = e.touches[0].clientX - this.offsetWidth / 2 + "px";
  this.style.top = e.touches[0].clientY - this.offsetHeight / 2 + "px";
});

food.addEventListener("mouseup", function(e) {
  this.style.cursor = "default";
});

food.addEventListener("touchend", function(e) {
  this.style.cursor = "default";
});

person.addEventListener("click", function(e) {
  if (food.contains(e.target)) {
    alert("Você alimentou a pessoa!");
  }
});
