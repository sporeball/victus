document.addEventListener('DOMContentLoaded', victus.setup({
  id: 'canvas',
  w: 300,
  h: 300,
  color: '#fdd2ed'
}));

let rect = new victus.Rect(20, 20, 20, 20, '#ea323c');
let ellipse = new victus.Ellipse(30, 70, 20, 20, '#0098dc');
let sprite = new victus.Sprite('assets/smile.png', 20, 100, 20, 20);
let text = new victus.Text('default text', 20, 150);
let sound = new victus.Sound('assets/confirmation_001.ogg', 0.25);

const stringify = obj => JSON.stringify(obj).replace(/:/gm, ': ').replace(/,/gm, ', ');

const playSound = () => {
  sound.reset();
  sound.play();
}

const toggleData = () => {
  if (keys.style.display === 'block' || keys.style.display === '') {
    keys.style.display = mouse.style.display = 'none';
    return;
  }
  keys.style.display = mouse.style.display = 'block';
};

const main = () => {
  victus.clear();
  rect.draw();
  ellipse.draw();
  sprite.draw();
  text.draw();
  keys.innerHTML = 'keys: ' + stringify(victus.keys);
  mouse.innerHTML = 'mouse: ' + stringify(victus.mouse);
  victus.mouse.click = false;
  for (let key in victus.keys) {
    victus.keys[key].press = false;
  }
  window.requestAnimationFrame(main);
};

window.requestAnimationFrame(main);
