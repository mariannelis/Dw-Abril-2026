const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        tabs.forEach(btn => {
            btn.classList.remove("active-tab");
            btn.setAttribute("aria-selected", "false");
        });

        contents.forEach(content => {
            content.classList.remove("active-content");
        });

        tab.classList.add("active-tab");
        tab.setAttribute("aria-selected", "true");

        const tabId = tab.dataset.tab;
        document.getElementById(tabId).classList.add("active-content");
    });
});
// Nivel 2 Video
document.addEventListener('DOMContentLoaded', () => {
  const ocean = document.getElementById('ocean');
  const scoreDisplay = document.getElementById('score');
  const feeder = document.getElementById('feeder');

  let score = 0;
  const fishList = [];
  const foods = [];

  // Utility: get ocean bounds
  function getOceanSize() {
    return {
      width: ocean.clientWidth,
      height: ocean.clientHeight
    };
  }

  // Fish class
  class Fish {
    constructor(element) {
      this.element = element;
      const size = getOceanSize();
      this.x = Math.random() * (size.width - 80) + 40;
      this.y = Math.random() * (size.height - 120) + 60;
      this.speed = 0.6 + Math.random() * 1.2;
      this.isEating = false;
      this.direction = 1;
      this.idleTime = 0;
      this.idleTarget = { x: this.x, y: this.y };

      this.updatePosition();
      this.element.classList.add('idle');
    }

    updatePosition() {
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      // flip horizontally using scaleX(-1)
      this.element.style.transform = `scaleX(${this.direction})`;
    }

    findClosestFood() {
      if (foods.length === 0) return null;
      let closest = null;
      let closestDist = Infinity;
      for (const f of foods) {
        if (f.eaten) continue;
        const dx = f.x - this.x;
        const dy = f.y - this.y;
        const dist = Math.hypot(dx, dy);
        if (dist < closestDist) {
          closestDist = dist;
          closest = f;
        }
      }
      return closest;
    }

    moveToward(targetX, targetY, speed) {
      const dx = targetX - this.x;
      const dy = targetY - this.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 4) {
        this.x += (dx / dist) * speed;
        this.y += (dy / dist) * speed;
        this.direction = dx >= 0 ? 1 : -1;
        return false;
      }
      return true;
    }

    idleSwim() {
      this.idleTime++;
      if (
        this.idleTime > 120 ||
        this.moveToward(this.idleTarget.x, this.idleTarget.y, this.speed * 0.4)
      ) {
        this.idleTime = 0;
        const size = getOceanSize();
        this.idleTarget = {
          x: Math.random() * (size.width - 80) + 40,
          y: Math.random() * (size.height - 120) + 60
        };
      }
    }

    update() {
      // If currently eating (temporary pause), skip movement
      if (this.isEating) return;

      const closestFood = this.findClosestFood();
      if (closestFood) {
        this.element.classList.remove('idle');
        const arrived = this.moveToward(closestFood.x, closestFood.y, this.speed * 2);
        if (arrived && !closestFood.eaten) {
          this.eatFood(closestFood);
        }
      } else {
        this.element.classList.add('idle');
        this.idleSwim();
      }

      // Keep fish inside ocean bounds
      const size = getOceanSize();
      this.x = Math.max(20, Math.min(size.width - 50, this.x));
      this.y = Math.max(30, Math.min(size.height - 40, this.y));

      this.updatePosition();
    }

    eatFood(food) {
      food.eaten = true;
      this.isEating = true;

      // Eat effect
      const eatEffect = document.createElement('div');
      eatEffect.className = 'eat-effect';
      eatEffect.textContent = '😋';
      eatEffect.style.left = `${food.x}px`;
      eatEffect.style.top = `${food.y}px`;
      ocean.appendChild(eatEffect);

      // Remove food element
      if (food.element && food.element.remove) food.element.remove();

      score++;
      scoreDisplay.textContent = score;

      setTimeout(() => {
        eatEffect.remove();
        this.isEating = false;
        const idx = foods.indexOf(food);
        if (idx > -1) foods.splice(idx, 1);
      }, 500);
    }
  }

  // Food class
  class Food {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.sinkSpeed = 0.4 + Math.random() * 0.4;
      this.wobble = 0;
      this.eaten = false;

      this.element = document.createElement('div');
      this.element.className = 'food';
      this.element.textContent = '🍦', '🍧';
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      ocean.appendChild(this.element);

      // Splash
      const splash = document.createElement('div');
      splash.className = 'splash';
      splash.style.left = `${this.x - 15}px`;
      splash.style.top = `${this.y - 15}px`;
      ocean.appendChild(splash);
      setTimeout(() => splash.remove(), 500);
    }

    update() {
      if (this.eaten) return;
      this.y += this.sinkSpeed;
      this.wobble += 0.12;
      const wobbleX = Math.sin(this.wobble) * 0.6;
      this.x += wobbleX;

      if (this.element) {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
      }

      const size = getOceanSize();
      if (this.y > size.height - 20) {
        this.eaten = true;
        if (this.element) this.element.style.opacity = '0.3';
        setTimeout(() => {
          if (this.element) this.element.remove();
          const idx = foods.indexOf(this);
          if (idx > -1) foods.splice(idx, 1);
        }, 800);
      }
    }
  }

  // Create fish objects
  document.querySelectorAll('.fish').forEach(el => {
    fishList.push(new Fish(el));
  });

  // Drop food on click
  ocean.addEventListener('click', (e) => {
    const rect = ocean.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (y > 20) {
      foods.push(new Food(x, y));
    }
  });

  // Feeder: follow mouse
  ocean.addEventListener('mousemove', (e) => {
    const rect = ocean.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    feeder.style.left = `${x}px`;
    feeder.style.top = `${y}px`;
  });

  // Show/hide feeder when entering/leaving ocean
  ocean.addEventListener('mouseenter', () => feeder.style.display = 'block');
  ocean.addEventListener('mouseleave', () => feeder.style.display = 'none');

  // Main loop
  function gameLoop() {
    fishList.forEach(f => f.update());
    foods.forEach(f => f.update());
    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});


// Nivel 2 imput del 1 al 9
function jugarNumero() {

    const numeroUsuario =
        Number(document.getElementById("numeroUsuario").value);

    const mensaje =
        document.getElementById("mensajeJuego");

    const numeroAleatorio =
        Math.floor(Math.random() * 9) + 1;

    if (numeroUsuario === numeroAleatorio) {

        mensaje.textContent =
            `🎉 ¡Ganaste! El número era ${numeroAleatorio}`;

        mensaje.style.color = "green";

    } else {

        mensaje.textContent =
            `😢 Perdiste. El número era ${numeroAleatorio}`;

        mensaje.style.color = "red";
    }
}

// Nivel 3
const button = document.getElementById('confettiButton');
button.addEventListener('click', () => {
    // Primera llamada a la función `confetti`
    confetti({
        particleCount: 120, // Cantidad de partículas de confetti generadas
        angle: 60,          // Ángulo en grados hacia donde se dispersará el confetti
        spread: 100,        // Amplitud del área de dispersión del confetti
        origin: { x: 0.5, y: 0.5 }, // Punto de origen: centro de la pantalla (50% x, 50% y)
        colors: ['#ff6f61', '#4a90e2', '#50c878'] // Colores del confetti (rojo, azul y verde)
    });

    // Segunda llamada a la función `confetti` con ajustes similares
    confetti({
        particleCount: 120, // Misma cantidad de partículas
        angle: 120,         // Ángulo en grados hacia el lado opuesto (dirección inversa)
        spread: 100,        // Misma amplitud del área de dispersión
        origin: { x: 0.5, y: 0.5 }, // Mismo punto de origen: centro de la pantalla
        colors: ['#ff6f61', '#4a90e2', '#50c878'] // Misma combinación de colores
    });
});