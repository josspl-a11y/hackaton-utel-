const AppState = {
  currentView: 'welcome',
  questionIndex: 0,
  answers: {}
};

const questions = [
  {
    id: 'product_type',
    title: '¿Qué tipo de productos quieres vender?',
    options: [
      { id: 'start', label: 'Alimento para mascotas', icon: 'bone' },
      { id: 'some', label: 'Juguetes y accesorios', icon: 'soccer-ball' },
      { id: 'grow', label: 'Ropa y camas', icon: 'shirt' },
      { id: 'all', label: 'Venderé de todo', icon: 'package' }
    ]
  },
  {
    id: 'experience',
    title: '¿Cuál es tu experiencia con ventas online?',
    options: [
      { id: 'start', label: 'Recién empiezo', icon: 'baby' },
      { id: 'some', label: 'Ya vendo un poco', icon: 'smartphone' },
      { id: 'grow', label: 'Quiero crecer mi negocio', icon: 'trending-up' }
    ]
  },
  {
    id: 'catalog',
    title: '¿Cuántos productos planeas vender al inicio?',
    options: [
      { id: 'start', label: '1 a 10 productos', icon: 'box' },
      { id: 'some', label: '10 a 50 productos', icon: 'boxes' },
      { id: 'grow', label: 'Más de 50 productos', icon: 'warehouse' }
    ]
  },
  {
    id: 'goal',
    title: '¿Cuál es tu meta principal con tu tienda online?',
    options: [
      { id: 'start', label: 'Validar mi idea de negocio', icon: 'flag' },
      { id: 'some', label: 'Tener un ingreso extra', icon: 'coins' },
      { id: 'grow', label: 'Vivir de mi tienda online', icon: 'award' }
    ]
  }
];

const routes = [
  {
    id: 'essential',
    badgeText: 'Essential Store – Free Plan',
    badgeClass: 'badge-essential',
    title: 'Tienda Esencial',
    image: 'assets/essential.png',
    description: 'Perfecta para principiantes. Una tienda simple diseñada para validar tu idea de negocio.',
    features: [
      'Menú principal: Inicio | Perros | Gatos | Ofertas',
      'Banner promocional central',
      'Categorías base: Alimento, Juguetes, etc.',
      'Métodos de contacto básicos'
    ],
    actionText: 'Crear Tienda Esencial'
  },
  {
    id: 'growth',
    badgeText: 'Growth Store – Monthly Plan',
    badgeClass: 'badge-growth',
    title: 'Ruta Impulso – Tienda de Crecimiento',
    image: 'assets/growth.png',
    description: 'Según tus respuestas, esta ruta te ayudará a optimizar tu tienda y aumentar tus ventas.',
    features: [
      'Menú expandido con subcategorías',
      'Servicios de estética o cuidado',
      'Sección de Promociones y Reseñas',
      'Múltiples métodos de pago integrados'
    ],
    actionText: 'Elegir Ruta Impulso'
  },
  {
    id: 'pro',
    badgeText: 'Pro & Trust Store – Premium Plan',
    badgeClass: 'badge-pro',
    title: 'Tienda Pro & Trust',
    image: 'assets/pro.png',
    description: 'Para marcas verificadas. Diseño altamente profesional con blogs y confianza máxima.',
    features: [
      'Iconos modernos y navegación avanzada',
      'Sección de Blog de cuidados',
      'Insignias de confianza y opiniones verificadas',
      'Logística avanzada y múltiples divisas'
    ],
    actionText: 'Obtener Plan Premium'
  }
];

function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  switch (AppState.currentView) {
    case 'welcome':
      app.innerHTML = getWelcomeHTML();
      setupWelcomeEvents();
      break;
    case 'questionnaire':
      app.innerHTML = getQuestionnaireHTML();
      setupQuestionnaireEvents();
      break;
    case 'loading':
      app.innerHTML = getLoadingHTML();
      setTimeout(() => {
        AppState.currentView = 'recommendations';
        render();
      }, 2000);
      break;
    case 'recommendations':
      app.innerHTML = getRecommendationsHTML();
      setupRecommendationsEvents();
      break;
  }

  // Initialize Lucide Icons for dynamically added HTML
  lucide.createIcons();
}

// ========================
// HTML Generators
// ========================

function getWelcomeHTML() {
  return `
    <div class="card">
      <div class="welcome-illustration">
        <i data-lucide="bot"></i>
      </div>
      <h1>Ruta Nube</h1>
      <p class="subtitle">Tu mentor para crear tu tienda online</p>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">
        Acompañamos a emprendedores a construir y hacer crecer su tienda digital paso a paso.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; color: var(--primary);">
        <i data-lucide="dog"></i>
        <i data-lucide="cat"></i>
        <i data-lucide="bone"></i>
      </div>
      <button id="btn-start" class="btn-primary">
        Comenzar diagnóstico <i data-lucide="arrow-right"></i>
      </button>
    </div>
  `;
}

function getQuestionnaireHTML() {
  const isComplete = AppState.questionIndex >= questions.length;
  if (isComplete) return '';

  const currentQ = questions[AppState.questionIndex];
  
  return `
    <div class="card" style="max-width: 700px;">
      <div class="flow-steps" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 1rem; text-transform: uppercase;">
        <span style="color: var(--primary)">Inicio</span>
        <i data-lucide="chevron-right" style="width: 14px;"></i>
        <span style="color: var(--primary)">Diagnóstico</span>
        <i data-lucide="chevron-right" style="width: 14px;"></i>
        <span>Ruta Recomendada</span>
        <i data-lucide="chevron-right" style="width: 14px;"></i>
        <span>Ejemplo de Tienda</span>
      </div>
      <h2 class="question-text">${currentQ.title}</h2>
      
      <div class="options-grid">
        ${currentQ.options.map(opt => `
          <div class="option-card" data-answer="${opt.id}">
            <i data-lucide="${opt.icon}" class="option-icon"></i>
            <span class="option-title">${opt.label}</span>
          </div>
        `).join('')}
      </div>
      
      ${AppState.questionIndex > 0 ? `
        <button id="btn-back" class="btn-secondary" style="margin-top: 2rem;">
          <i data-lucide="arrow-left" style="width: 16px; margin-right: 8px;"></i> Volver
        </button>
      ` : ''}
    </div>
  `;
}

function getLoadingHTML() {
  return `
    <div class="card loader-container">
      <span class="spinner"></span>
      <h2 style="margin-top: 1rem;">Analizando tu ruta ideal...</h2>
      <p style="color: var(--text-secondary);">El mentor está creando las mejores opciones para tu tienda de mascotas.</p>
    </div>
  `;
}

function getRecommendationsHTML() {
  // Let's assume the recommended route is the 'growth' route based on the prompt description.
  const mainRoute = routes.find(r => r.id === 'growth');
  const otherRoutes = routes.filter(r => r.id !== 'growth');

  return `
    <div class="recommendations-view">
      <div class="flow-steps" style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 2rem; max-width: 700px; margin-left: auto; margin-right: auto; text-transform: uppercase;">
        <span style="color: var(--primary)">Inicio</span>
        <i data-lucide="chevron-right" style="width: 14px; color: var(--primary)"></i>
        <span style="color: var(--primary)">Diagnóstico</span>
        <i data-lucide="chevron-right" style="width: 14px; color: var(--primary)"></i>
        <span style="color: var(--primary)">Ruta Recomendada</span>
        <i data-lucide="chevron-right" style="width: 14px;"></i>
        <span>Ejemplo de Tienda</span>
      </div>

      <div class="recommendations-header">
        <h1>Tu ruta recomendada</h1>
        <p class="subtitle">Según tus respuestas, esta ruta te ayudará a optimizar tu tienda y aumentar tus ventas.</p>
      </div>

      <!-- Mentor Tip Box -->
      <div class="mentor-tip" style="background: var(--cloud-soft); border-left: 4px solid var(--primary); padding: 1.5rem; border-radius: var(--radius-md); max-width: 800px; margin: 0 auto 3rem; text-align: left; display: flex; gap: 1rem; align-items: flex-start;">
        <div style="background: white; padding: 0.5rem; border-radius: 50%; color: var(--primary); display: flex;">
          <i data-lucide="lightbulb"></i>
        </div>
        <div>
          <h4 style="color: var(--primary); margin-bottom: 0.25rem;">Consejo del mentor</h4>
          <p style="color: var(--text-primary); margin: 0; font-size: 0.95rem;">
            "Las tiendas que comienzan con un catálogo pequeño suelen lograr sus primeras ventas más rápido al poder enfocar mejor su publicidad."
          </p>
        </div>
      </div>

      <!-- Main Recommendation -->
      <div class="main-route" style="max-width: 800px; margin: 0 auto 4rem;">
        <div class="route-card" style="flex-direction: row; text-align: left;">
          <div class="route-image-wrapper" style="width: 50%; height: auto; border-bottom: none; border-right: 1px solid var(--border);">
            <img src="${mainRoute.image}" class="route-image" alt="${mainRoute.title}" style="height: 100%;">
          </div>
          <div class="route-content" style="width: 50%;">
            <span class="route-badge ${mainRoute.badgeClass}">⭐ Destacado para ti</span>
            <h2 class="route-title" style="font-size: 2rem;">${mainRoute.title}</h2>
            <p class="route-desc">${mainRoute.description}</p>
            <ul class="feature-list">
              ${mainRoute.features.map(f => `<li><i data-lucide="check-circle"></i> ${f}</li>`).join('')}
            </ul>
            <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="alert('Ruta Seleccionada: ${mainRoute.title}')">
              Ver tienda de ejemplo
            </button>
          </div>
        </div>
      </div>

      <!-- Other Options -->
      <h3 style="text-align: center; margin-bottom: 2rem; color: var(--text-secondary);">Otras rutas disponibles</h3>
      <div class="routes-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 800px; margin: 0 auto;">
        ${otherRoutes.map(r => `
          <div class="route-card">
            <div class="route-image-wrapper" style="height: 150px;">
              <img src="${r.image}" class="route-image" alt="${r.title}">
            </div>
            <div class="route-content" style="padding: 1.5rem;">
              <span class="route-badge ${r.badgeClass}">${r.badgeText}</span>
              <h3 class="route-title" style="font-size: 1.25rem;">${r.title}</h3>
              <p class="route-desc" style="font-size: 0.85rem; margin-bottom: 1rem;">${r.description}</p>
              <button class="route-action" onclick="alert('Ruta Seleccionada: ${r.title}')">
                Ver detalles
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div style="text-align: center; margin-top: 4rem;">
        <button id="btn-restart" class="btn-secondary">
          <i data-lucide="refresh-cw" style="width: 16px; margin-right: 8px; vertical-align: middle;"></i> Volver a empezar
        </button>
      </div>
    </div>
  `;
}

// ========================
// Events Setup
// ========================

function setupWelcomeEvents() {
  document.getElementById('btn-start').addEventListener('click', () => {
    AppState.currentView = 'questionnaire';
    AppState.questionIndex = 0;
    render();
  });
}

function setupQuestionnaireEvents() {
  const options = document.querySelectorAll('.option-card');
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      const answer = e.currentTarget.getAttribute('data-answer');
      const currentQ = questions[AppState.questionIndex];
      AppState.answers[currentQ.id] = answer;
      
      // Add slight delay for selection effect
      e.currentTarget.style.borderColor = 'var(--primary)';
      e.currentTarget.style.background = 'var(--cloud-soft)';
      
      setTimeout(() => {
        if (AppState.questionIndex < questions.length - 1) {
          AppState.questionIndex++;
          render();
        } else {
          AppState.currentView = 'loading';
          render();
        }
      }, 300);
    });
  });

  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      AppState.questionIndex--;
      render();
    });
  }
}

function setupRecommendationsEvents() {
  document.getElementById('btn-restart').addEventListener('click', () => {
    AppState.currentView = 'welcome';
    AppState.questionIndex = 0;
    AppState.answers = {};
    render();
  });
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  render();
});
