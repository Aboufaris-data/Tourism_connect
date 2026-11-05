/**
 * Tourism Connect - Main Application Logic
 * Reactive frontend prototype for Morocco Tourism Experience Marketplace
 */

(function () {
  'use strict';

  // Application State
  const state = {
    lang: 'fr',
    theme: 'light',
    currentRole: 'tourist', // 'tourist' | 'guide' | 'admin'
    currentView: 'home',    // 'home' | 'explorer' | 'destinations' | 'about' | 'contact' | 'becomeGuide' | 'touristDashboard' | 'guideDashboard' | 'adminDashboard'
    filters: {
      destination: 'all',
      category: 'all',
      maxPrice: 400,
      minRating: 0,
      difficulty: 'all',
      language: 'all',
      searchQuery: '',
      sortBy: 'popular'
    },
    selectedActivity: null,
    selectedGuide: null,
    heroPhoneStep: 0,
    bookingCalculator: {
      activityId: 'ouzoud-cliff-hike',
      guideId: 'karim-benali',
      date: '2026-11-21',
      timeSlot: '09:00',
      participants: {
        adults: 2,
        teens: 1,
        children: 1,
        seniors: 0
      }
    },
    checkout: {
      activeStep: 1,
      activityId: null,
      guideId: null,
      date: '2026-11-21',
      timeSlot: '09:00',
      participants: { adults: 2, teens: 0, children: 0, seniors: 0 },
      touristName: 'Yassine Chraibi',
      touristEmail: 'yassine.chraibi@example.com',
      touristPhone: '+212 6 61 98 76 54',
      specialRequests: 'Préférence pour une marche matinale et rythme familial.',
      paymentMethod: 'cmi',
      lastCreatedBooking: null
    },
    bookings: [...(window.TOURISM_DATA?.mockBookings || [])],
    pendingGuides: [...(window.TOURISM_DATA?.pendingGuides || [])],
    adminMetrics: { ...(window.TOURISM_DATA?.adminMetrics || {}) },
    activeVoucherBooking: null
  };

  // Helper DOM selectors
  const $ = (id) => document.getElementById(id);
  const $$ = (sel) => document.querySelectorAll(sel);

  /**
   * Initialize Application
   */
  function init() {
    // Check saved theme
    const savedTheme = localStorage.getItem('tc_theme') || 'light';
    setTheme(savedTheme);

    // Initial render
    applyLanguage(state.lang);
    renderHeroPhone();
    renderDestinationsSection();
    renderActivitiesExplorer();
    setupEventListeners();
    setupPhoneStepper();

    // Default selection for calculator
    if (window.TOURISM_DATA?.activities?.length) {
      state.bookingCalculator.activityId = window.TOURISM_DATA.activities[0].id;
      state.bookingCalculator.guideId = window.TOURISM_DATA.activities[0].guideId;
    }

    console.log("Tourism Connect Initialized Successfully!");
  }

  /**
   * Theme Management
   */
  function setTheme(newTheme) {
    state.theme = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('tc_theme', newTheme);
    const btn = $('themeToggleBtn');
    if (btn) {
      btn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
      btn.title = newTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre';
    }
  }

  /**
   * Language Management & Localization
   */
  function applyLanguage(langCode) {
    state.lang = langCode;
    const t = window.I18N_TRANSLATIONS[langCode] || window.I18N_TRANSLATIONS.fr;

    document.documentElement.lang = langCode;
    document.documentElement.dir = (langCode === 'ar') ? 'rtl' : 'ltr';

    // Update active state in language buttons
    $$('.lang-selector button').forEach(b => {
      b.setAttribute('aria-pressed', b.dataset.lang === langCode ? 'true' : 'false');
    });

    // Translate DOM elements marked with [data-i18n]
    $$('[data-i18n]').forEach(el => {
      const keyPath = el.dataset.i18n;
      const val = getNestedTranslation(t, keyPath);
      if (val !== undefined) {
        el.textContent = val;
      }
    });

    // Translate placeholders
    $$('[data-i18n-placeholder]').forEach(el => {
      const keyPath = el.dataset.i18nPlaceholder;
      const val = getNestedTranslation(t, keyPath);
      if (val !== undefined) {
        el.placeholder = val;
      }
    });

    // Re-render dynamic components
    renderHeroPhone();
    renderDestinationsSection();
    renderActivitiesExplorer();
    if (state.selectedActivity) {
      renderActivityModal(state.selectedActivity);
    }
    if (state.selectedGuide) {
      renderGuideModal(state.selectedGuide);
    }
    renderActiveDashboard();
  }

  function getNestedTranslation(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }

  function t(path) {
    const dict = window.I18N_TRANSLATIONS[state.lang] || window.I18N_TRANSLATIONS.fr;
    return getNestedTranslation(dict, path) || path;
  }

  /**
   * Toast Notifications
   */
  function showToast(message, type = 'info') {
    const container = $('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✅' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  /**
   * Hero Interactive Phone Stepper (Keeps the original design feature)
   */
  function setupPhoneStepper() {
    const nextBtn = $('phoneNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        state.heroPhoneStep = (state.heroPhoneStep + 1) % 5;
        renderHeroPhone();
      });
    }

    // Dot indicators
    const dotsContainer = $('phoneDots');
    if (dotsContainer) {
      dotsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (btn && btn.dataset.step !== undefined) {
          state.heroPhoneStep = parseInt(btn.dataset.step, 10);
          renderHeroPhone();
        }
      });
    }
  }

  function renderHeroPhone() {
    const scr = $('phoneScreen');
    const dotsContainer = $('phoneDots');
    if (!scr) return;

    const step = state.heroPhoneStep;
    const isAr = state.lang === 'ar';

    const stepsData = [
      {
        k: isAr ? "الخطوة 1 من 5" : "Étape 1 sur 5",
        t: isAr ? "إلى أين تتجه؟" : "Où allez-vous ?",
        opts: [
          ["Aïn Asserdoun", "Béni Mellal · Source & Borj"],
          ["Cascades d’Ouzoud", "Azilal · Chutes de 110m"]
        ]
      },
      {
        k: isAr ? "الخطوة 2 من 5" : "Étape 2 sur 5",
        t: isAr ? "اختر مرشدك المعتمد" : "Guide agréé d'État",
        opts: [
          ["Karim B. · Agréé MA-AZ", "Français, Arabe, Anglais · 4,97 ★"],
          ["Salma R. · Agréée MA-BM", "Français, Arabe, Espagnol · 4,94 ★"]
        ]
      },
      {
        k: isAr ? "الخطوة 3 من 5" : "Étape 3 sur 5",
        t: isAr ? "الموعد وعدد المشاركين" : "Quand & combien ?",
        opts: [
          ["Samedi · 09h00", "Disponible immédiatement"],
          ["Dimanche · 14h30", "Disponible"]
        ],
        sum: [
          [isAr ? "المشاركون" : "Participants", "2 adultes + 1 enfant"]
        ]
      },
      {
        k: isAr ? "الخطوة 4 من 5" : "Étape 4 sur 5",
        t: isAr ? "الموافقة والتسعير الشفاف" : "Accord du guide & Tarif",
        sum: [
          [isAr ? "حصة المرشد (90%)" : "Part directe du guide", "360 MAD"],
          [isAr ? "عمولة المنصة (10%)" : "Service plateforme (10%)", "36 MAD"],
          [isAr ? "المجموع النهائي" : "Total à régler", "396 MAD"]
        ],
        note: isAr ? "موافقة المرشد مؤكدة قبل أي دفع. وضع تجريبي للهاكاثون." : "Le guide valide avant débit. Paiement en mode sandbox de démonstration."
      },
      {
        k: isAr ? "الخطوة 5 من 5" : "Étape 5 sur 5",
        t: isAr ? "تم تأكيد الحجز بنجاح" : "Réservation confirmée !",
        done: isAr ? "تذكرتك جاهزة في فضاء الزائر. نتمنى لك جولة رائعة !" : "Bon d'échange généré. Vous pourrez noter l'activité à votre retour."
      }
    ];

    const currentData = stepsData[step];
    let html = `<small>${currentData.k}</small><h3>${currentData.t}</h3>`;

    if (currentData.opts) {
      currentData.opts.forEach((o, idx) => {
        html += `
          <button class="screen-opt ${idx === 0 ? 'on' : ''}" type="button">
            ${o[0]}
            <span>${o[1]}</span>
          </button>
        `;
      });
    }

    if (currentData.sum) {
      currentData.sum.forEach(row => {
        html += `
          <div class="screen-sum">
            <span>${row[0]}</span>
            <b>${row[1]}</b>
          </div>
        `;
      });
    }

    if (currentData.note) {
      html += `<p style="margin-top:14px;color:var(--mute);font-size:0.8rem">${currentData.note}</p>`;
    }

    if (currentData.done) {
      html += `
        <div style="font-size:3.2rem;text-align:center;margin:24px 0 10px">✅</div>
        <p style="text-align:center;color:var(--mute);font-size:0.92rem">${currentData.done}</p>
      `;
    }

    html += `
      <div class="grow"></div>
      <button class="screen-go" id="phoneNextBtn">
        ${step === 4 ? (isAr ? 'حجز جديد' : 'Nouvelle simulation') : (isAr ? 'متابعة' : 'Continuer')}
      </button>
    `;

    scr.innerHTML = html;

    // Reattach next button click
    const nextBtn = $('phoneNextBtn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        state.heroPhoneStep = (state.heroPhoneStep + 1) % 5;
        renderHeroPhone();
      };
    }

    // Allow clicking options to toggle active
    scr.querySelectorAll('.screen-opt').forEach(btn => {
      btn.onclick = () => {
        scr.querySelectorAll('.screen-opt').forEach(b => b.classList.remove('on'));
        btn.classList.add('on');
      };
    });

    // Update dots
    if (dotsContainer) {
      dotsContainer.innerHTML = [0, 1, 2, 3, 4].map(idx => `
        <button type="button" aria-label="Step ${idx + 1}" aria-current="${idx === step ? 'true' : 'false'}" data-step="${idx}"></button>
      `).join('');
    }
  }

  /**
   * Render Featured Destinations
   */
  function renderDestinationsSection() {
    const container = $('featuredDestinationsContainer');
    if (!container || !window.TOURISM_DATA?.destinations) return;

    container.innerHTML = window.TOURISM_DATA.destinations.map(dest => `
      <div class="dest-tile" data-dest-id="${dest.id}">
        <img class="dest-bg" src="${dest.image}" alt="${dest.name}" loading="lazy">
        <div class="dest-tile-content">
          <span class="badge badge-official" style="margin-bottom:10px">${dest.province} · ${dest.region}</span>
          <h3>${dest.name}</h3>
          <p>${dest.title}</p>
          <div class="dest-meta">
            <span class="badge badge-outline" style="background:rgba(255,255,255,0.25);color:#fff;border-color:rgba(255,255,255,0.4)">
              ${dest.experiencesCount} ${t('destinations.experiencesAvailable')}
            </span>
            <button class="btn btn-sm btn-blue" data-filter-dest="${dest.id}">
              ${t('destinations.exploreBtn')} →
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listeners to destination cards -> Open Destination Details Modal!
    container.querySelectorAll('[data-filter-dest]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const destId = btn.dataset.filterDest;
        openDestinationDetails(destId);
      };
    });

    container.querySelectorAll('.dest-tile').forEach(tile => {
      tile.onclick = () => {
        const destId = tile.dataset.destId;
        openDestinationDetails(destId);
      };
    });
  }

  /**
   * Open Destination Details Modal (Shows destination info, official guides of that place & activities with prices)
   */
  function openDestinationDetails(destId) {
    const dest = window.TOURISM_DATA.destinations.find(d => d.id === destId);
    if (!dest) return;

    // Official licensed guides for this specific destination
    const destinationGuides = window.TOURISM_DATA.guides.filter(g => g.destinations.includes(dest.id));

    // All activities available in this destination
    const destinationActivities = window.TOURISM_DATA.activities.filter(a => a.destinationId === dest.id);

    const modal = $('destinationDetailsModal');
    const container = $('destinationModalContent');
    if (!modal || !container) return;

    container.innerHTML = `
      <div class="dest-modal-banner">
        <img src="${dest.image}" alt="${dest.name}">
        <div class="dest-modal-banner-content">
          <span class="badge badge-official" style="margin-bottom:8px">${dest.province} · ${dest.region}</span>
          <h2>${dest.name}</h2>
          <p style="margin:0; font-size:1.1rem; opacity:0.95">${dest.title}</p>
        </div>
      </div>

      <div class="dest-modal-content">
        <!-- Meta Strip -->
        <div class="dest-meta-strip">
          <div class="dest-meta-item">
            <small style="color:var(--mute)">Altitude</small>
            <b>⛰️ ${dest.altitude}</b>
          </div>
          <div class="dest-meta-item">
            <small style="color:var(--mute)">Meilleure saison</small>
            <b>☀️ ${dest.bestSeason}</b>
          </div>
          <div class="dest-meta-item">
            <small style="color:var(--mute)">Activités officielles</small>
            <b>🏔️ ${destinationActivities.length} expériences disponibles</b>
          </div>
          <div class="dest-meta-item">
            <small style="color:var(--mute)">Guides agréés d'État</small>
            <b>🛡️ ${destinationGuides.length} guides officiels</b>
          </div>
        </div>

        <!-- Destination Overview -->
        <div style="margin-bottom:32px">
          <h3 style="font-size:1.35rem; margin-bottom:10px">📖 À propos de ${dest.name}</h3>
          <p style="font-size:1.02rem; line-height:1.7; color:var(--ink)">
            ${dest.description}
          </p>
        </div>

        <!-- SECTION: GUIDES AGRÉÉS DE CETTE DESTINATION ("lguideur dyal dik lblaca") -->
        <div style="margin-bottom:38px">
          <div class="dest-section-title">
            <h3>🛡️ Les Guides Professionnels Agréés de ${dest.name}</h3>
            <span class="badge badge-verified">✓ Titulaires de la Carte Professionnelle du Ministère</span>
          </div>
          <p style="color:var(--mute); font-size:0.92rem; margin-bottom:16px">
            Guides officiels vérifiés et assermentés pour vous accompagner à ${dest.name} en toute sécurité et authenticité :
          </p>

          <div class="dest-guides-grid">
            ${destinationGuides.map(guide => `
              <div class="dest-guide-card">
                <img src="${guide.avatar}" alt="${guide.name}" loading="lazy">
                <div class="dest-guide-card-body">
                  <div class="dest-guide-card-name">${guide.name}</div>
                  <span class="dest-guide-card-badge">CARTE OFFICIELLE : ${guide.badgeNumber}</span>
                  <div style="font-size:0.86rem; color:var(--mute)">
                    ⭐ <b>${guide.rating}</b> (${guide.reviewsCount} avis) · <b>${guide.yearsExperience} ans d'expérience</b>
                  </div>
                  <div style="font-size:0.82rem; color:var(--forest); margin-top:4px">
                    🗣️ ${guide.languages.join(', ')}
                  </div>
                  <div style="font-size:0.82rem; color:var(--mute); margin-top:2px">
                    📞 ${guide.phone}
                  </div>
                  <div class="dest-guide-card-actions">
                    <button class="btn btn-sm btn-blue view-guide-from-dest" data-guide-id="${guide.id}">
                      Voir profil & barème
                    </button>
                    <a href="https://wa.me/${guide.phone.replace(/[^0-9]/g, '')}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-forest" title="Contacter sur WhatsApp" onclick="event.stopPropagation()">
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- SECTION: ACTIVITÉS & PRIX ("des activites + prix") -->
        <div>
          <div class="dest-section-title">
            <h3>🏔️ Activités & Tarifs Disponibles à ${dest.name} (${destinationActivities.length} sorties)</h3>
            <button class="btn btn-sm btn-blue filter-dest-catalog-btn" data-dest-id="${dest.id}">
              Filtrer dans le catalogue complet →
            </button>
          </div>
          <p style="color:var(--mute); font-size:0.92rem; margin-bottom:18px">
            Chaque activité est encadrée par un guide officiel avec tarification dégressive selon votre groupe :
          </p>

          <div class="dest-activities-grid">
            ${destinationActivities.map(act => {
              const guide = window.TOURISM_DATA.guides.find(g => g.id === act.guideId) || window.TOURISM_DATA.guides[0];
              return `
                <div class="dest-activity-card" data-act-id="${act.id}">
                  <div class="dest-activity-card-img">
                    <img src="${act.coverImage}" alt="${act.title}" loading="lazy">
                    <span class="badge badge-official" style="position:absolute; top:10px; left:10px; z-index:2">
                      ${act.categoryName}
                    </span>
                  </div>
                  <div class="dest-activity-card-body">
                    <div class="dest-activity-card-title">${act.title}</div>
                    <div class="dest-activity-card-meta">
                      <span>⏱️ ${act.duration}</span>
                      <span>⛰️ ${act.difficulty}</span>
                      <span>⭐ ${act.rating}</span>
                    </div>
                    <div class="dest-activity-card-guide">
                      <span>👤 Guide : <b>${guide.name}</b> (Agréé)</span>
                    </div>
                    <div class="dest-activity-card-footer">
                      <div>
                        <small style="color:var(--mute); font-size:0.75rem; display:block">À partir de</small>
                        <div class="dest-activity-price">${act.startingPrice} <span style="font-size:0.8rem; font-weight:600; color:var(--mute)">MAD / pers.</span></div>
                      </div>
                      <button class="btn btn-sm btn-blue open-act-from-dest" data-act-id="${act.id}">
                        Voir Détails & Réserver
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook guide profile buttons
    container.querySelectorAll('.view-guide-from-dest').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        closeDestinationDetails();
        openGuideProfile(btn.dataset.guideId);
      };
    });

    // Hook activity cards and buttons -> open Activity details with Dynamic Pricing Calculator!
    container.querySelectorAll('.open-act-from-dest, .dest-activity-card').forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const actId = el.dataset.actId;
        closeDestinationDetails();
        openActivityDetails(actId);
      };
    });

    // Hook filter catalog button
    const filterBtn = container.querySelector('.filter-dest-catalog-btn');
    if (filterBtn) {
      filterBtn.onclick = () => {
        closeDestinationDetails();
        applyDestinationFilter(dest.id);
      };
    }
  }

  function closeDestinationDetails() {
    const modal = $('destinationDetailsModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function applyDestinationFilter(destId) {
    state.filters.destination = destId;
    const destSelect = $('filterDestination');
    if (destSelect) destSelect.value = destId;
    scrollToElement('activitiesExplorerSection');
    renderActivitiesExplorer();
    showToast(`${t('explorer.filterDestination')} : ${destId === 'ouzoud' ? "Cascades d'Ouzoud" : "Aïn Asserdoun"}`, 'info');
  }

  /**
   * Render Activities Explorer & Filtering
   */
  function renderActivitiesExplorer() {
    const grid = $('activitiesGrid');
    const pillsBar = $('categoryPillsBar');
    if (!grid || !window.TOURISM_DATA?.activities) return;

    // Render category pills
    if (pillsBar && window.TOURISM_DATA.categories) {
      pillsBar.innerHTML = `
        <button class="category-pill ${state.filters.category === 'all' ? 'active' : ''}" data-cat="all">
          <span>🌟</span> ${t('hero.quickFilterAll')}
        </button>
      ` + window.TOURISM_DATA.categories.map(c => `
        <button class="category-pill ${state.filters.category === c.id ? 'active' : ''}" data-cat="${c.id}">
          <span>${getCategoryIcon(c.id)}</span> ${c.name}
        </button>
      `).join('');

      pillsBar.querySelectorAll('.category-pill').forEach(btn => {
        btn.onclick = () => {
          state.filters.category = btn.dataset.cat;
          pillsBar.querySelectorAll('.category-pill').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderActivitiesExplorer();
        };
      });
    }

    // Filter activities
    let items = [...window.TOURISM_DATA.activities];

    if (state.filters.destination !== 'all') {
      items = items.filter(a => a.destinationId === state.filters.destination);
    }

    if (state.filters.category !== 'all') {
      items = items.filter(a => a.categoryId === state.filters.category);
    }

    if (state.filters.maxPrice < 400) {
      items = items.filter(a => a.startingPrice <= state.filters.maxPrice);
    }

    if (state.filters.difficulty !== 'all') {
      items = items.filter(a => a.difficultyTag === state.filters.difficulty);
    }

    if (state.filters.language !== 'all') {
      items = items.filter(a => a.languages.some(l => l.toLowerCase().includes(state.filters.language.toLowerCase())));
    }

    if (state.filters.minRating > 0) {
      items = items.filter(a => a.rating >= state.filters.minRating);
    }

    if (state.filters.searchQuery.trim() !== '') {
      const q = state.filters.searchQuery.toLowerCase();
      items = items.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.destinationName.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (state.filters.sortBy) {
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceAsc':
        items.sort((a, b) => a.startingPrice - b.startingPrice);
        break;
      case 'priceDesc':
        items.sort((a, b) => b.startingPrice - a.startingPrice);
        break;
      case 'newest':
        items.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      case 'popular':
      default:
        items.sort((a, b) => (b.reviewsCount * b.rating) - (a.reviewsCount * a.rating));
        break;
    }

    // Results count tag
    const countTag = $('resultsCountTag');
    if (countTag) {
      countTag.textContent = `${items.length} ${items.length > 1 ? 'activités disponibles' : 'activité disponible'}`;
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--card); border-radius: var(--radius-lg); border: 2px dashed var(--line)">
          <div style="font-size: 3rem; margin-bottom: 12px">🏔️</div>
          <h3>${t('explorer.noResults')}</h3>
          <p style="color:var(--mute); margin-bottom: 20px">Essayez d'élargir vos filtres ou de changer de destination.</p>
          <button class="btn btn-blue" id="resetFiltersBtn">${t('explorer.resetFilters')}</button>
        </div>
      `;
      const resetBtn = $('resetFiltersBtn');
      if (resetBtn) {
        resetBtn.onclick = () => resetAllFilters();
      }
      return;
    }

    // Render Cards
    grid.innerHTML = items.map(act => {
      const guide = window.TOURISM_DATA.guides.find(g => g.id === act.guideId) || window.TOURISM_DATA.guides[0];
      return `
        <article class="activity-card" data-activity-id="${act.id}">
          <div class="card-img-wrap">
            <img src="${act.coverImage}" alt="${act.title}" loading="lazy">
            <span class="badge badge-official card-badge-cat">${act.categoryName}</span>
            <button class="card-favorite-btn" title="Ajouter aux favoris" type="button" onclick="event.stopPropagation(); this.classList.toggle('favorited'); alert('Ajouté à vos favoris voyageur !');">
              ♥
            </button>
          </div>
          <div class="card-body">
            <div class="card-loc">📍 ${act.destinationName}</div>
            <h3 class="card-title">${act.title}</h3>
            <p class="card-desc">${act.shortDescription}</p>

            <div class="card-specs">
              <span>⏱️ ${act.duration}</span>
              <span>🎚️ ${act.difficulty}</span>
              <span>🗣️ ${act.languages.slice(0, 2).join(', ')}${act.languages.length > 2 ? ' +' : ''}</span>
              <span>⭐ <b>${act.rating}</b> (${act.reviewsCount})</span>
            </div>

            <div class="card-guide-row">
              <img class="guide-avatar" src="${guide.avatar}" alt="${guide.name}" loading="lazy">
              <div class="card-guide-info">
                <div class="card-guide-name">${guide.name}</div>
                <small style="color:var(--forest); font-weight:700">✓ Guide Agréé ${guide.badgeNumber}</small>
              </div>
            </div>

            <div class="card-footer">
              <div class="card-price-wrap">
                <small>${t('explorer.fromPrice')}</small>
                <div class="card-price">${act.startingPrice} <span style="font-size:0.85rem; font-weight:600">MAD / pers.</span></div>
              </div>
              <button class="btn btn-sm btn-blue view-details-btn" data-act-id="${act.id}">
                ${t('explorer.viewDetails')}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to open details
    grid.querySelectorAll('.activity-card').forEach(card => {
      card.onclick = () => {
        const actId = card.dataset.activityId;
        openActivityDetails(actId);
      };
    });
  }

  function getCategoryIcon(catId) {
    switch (catId) {
      case 'hiking': return '🥾';
      case 'heritage': return '🏛️';
      case 'nature': return '📸';
      case 'water': return '🛶';
      default: return '🌲';
    }
  }

  function resetAllFilters() {
    state.filters = {
      destination: 'all',
      category: 'all',
      maxPrice: 400,
      minRating: 0,
      difficulty: 'all',
      language: 'all',
      searchQuery: '',
      sortBy: 'popular'
    };

    // Reset controls
    if ($('filterDestination')) $('filterDestination').value = 'all';
    if ($('filterDifficulty')) $('filterDifficulty').value = 'all';
    if ($('filterLanguage')) $('filterLanguage').value = 'all';
    if ($('filterPriceRange')) $('filterPriceRange').value = 400;
    if ($('priceRangeDisplay')) $('priceRangeDisplay').textContent = '400 MAD';
    if ($('searchQueryInput')) $('searchQueryInput').value = '';
    if ($('sortBySelect')) $('sortBySelect').value = 'popular';

    renderActivitiesExplorer();
    showToast('Filtres réinitialisés', 'info');
  }

  /**
   * Activity Details Modal
   */
  function openActivityDetails(actId) {
    const act = window.TOURISM_DATA.activities.find(a => a.id === actId);
    if (!act) return;

    state.selectedActivity = act;
    state.bookingCalculator.activityId = act.id;
    state.bookingCalculator.guideId = act.guideId;

    renderActivityModal(act);
    const modal = $('activityDetailsModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeActivityDetails() {
    const modal = $('activityDetailsModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderActivityModal(act) {
    const container = $('activityModalContent');
    if (!container) return;

    const guide = window.TOURISM_DATA.guides.find(g => g.id === act.guideId) || window.TOURISM_DATA.guides[0];
    const relatedReviews = window.TOURISM_DATA.reviews.filter(r => r.activityId === act.id);

    container.innerHTML = `
      <div class="detail-header">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap">
          <div>
            <span class="badge badge-official" style="margin-bottom:8px">${act.categoryName} · ${act.destinationName}</span>
            <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-bottom:8px">${act.title}</h2>
            <div style="display:flex; gap:14px; align-items:center; flex-wrap:wrap; font-size:0.92rem">
              <span style="color:#EFA723; font-weight:700">⭐ ${act.rating} (${act.reviewsCount} avis certifiés)</span>
              <span>📍 ${act.destinationName}</span>
              <span class="badge badge-verified">✓ Guide Officiel d'État</span>
            </div>
          </div>
        </div>

        <!-- Highlight Banner: Guide Officiel + Prix Direct -->
        <div style="margin-top:20px; background:var(--card); border:2px solid var(--saf); border-radius:var(--radius-lg); padding:18px 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px; box-shadow:var(--shadow-sm)">
          <div style="display:flex; align-items:center; gap:14px">
            <img src="${guide.avatar}" alt="${guide.name}" style="width:58px; height:58px; border-radius:50%; object-fit:cover; border:3px solid var(--saf)">
            <div>
              <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em; color:var(--forest); font-weight:800">
                🛡️ Guide Agréé Officiel de cette sortie
              </span>
              <div style="font-family:'Bricolage Grotesque'; font-size:1.25rem; font-weight:800; color:var(--ink)">
                ${guide.name}
              </div>
              <div style="font-size:0.82rem; color:var(--mute)">
                Carte officielle <b>${guide.badgeNumber}</b> · 📞 ${guide.phone}
              </div>
            </div>
          </div>

          <div style="text-align:right">
            <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em; color:var(--mute); font-weight:800; display:block">
              Tarif à partir de
            </span>
            <div style="font-family:'Bricolage Grotesque'; font-size:1.8rem; font-weight:800; color:var(--blue)">
              ${act.startingPrice} <span style="font-size:0.9rem; font-weight:600; color:var(--mute)">MAD / pers.</span>
            </div>
            <small style="color:var(--forest); font-weight:700">Tarif dégressif calculé selon votre groupe</small>
          </div>
        </div>
      </div>

      <!-- Image Gallery -->
      <div class="detail-gallery">
        <div class="gallery-main">
          <img id="detailMainImg" src="${act.gallery[0] || act.coverImage}" alt="${act.title}">
        </div>
        <div class="gallery-thumbs">
          ${act.gallery.map((img, idx) => `
            <div class="gallery-thumb ${idx === 0 ? 'active' : ''}" data-thumb-src="${img}">
              <img src="${img}" alt="Aperçu photo ${idx + 1}" loading="lazy">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Main Layout: Specs & Content (Left) + Dynamic Pricing Calculator Panel (Right) -->
      <div class="detail-layout">
        <div class="detail-content">
          <!-- Overview -->
          <div class="detail-section">
            <h3>📖 ${t('details.overview')}</h3>
            <p style="white-space:pre-line; line-height:1.7; font-size:1.02rem; color:var(--ink)">
              ${act.fullDescription}
            </p>
          </div>

          <!-- Quick Activity Specifications -->
          <div class="detail-section">
            <h3>⚙️ Spécifications de la sortie</h3>
            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:14px">
              <div style="background:var(--card-subtle); padding:14px; border-radius:var(--radius-sm)">
                <small style="color:var(--mute)">Durée estimée</small>
                <div style="font-weight:800; font-size:1.1rem">⏱️ ${act.duration}</div>
              </div>
              <div style="background:var(--card-subtle); padding:14px; border-radius:var(--radius-sm)">
                <small style="color:var(--mute)">Niveau de difficulté</small>
                <div style="font-weight:800; font-size:1.1rem">⛰️ ${act.difficulty}</div>
              </div>
              <div style="background:var(--card-subtle); padding:14px; border-radius:var(--radius-sm)">
                <small style="color:var(--mute)">Taille max groupe</small>
                <div style="font-weight:800; font-size:1.1rem">👥 ${act.groupSizeMax} pers. max</div>
              </div>
              <div style="background:var(--card-subtle); padding:14px; border-radius:var(--radius-sm)">
                <small style="color:var(--mute)">Âge minimum</small>
                <div style="font-weight:800; font-size:1.1rem">🧒 Dès ${act.minAge} ans</div>
              </div>
            </div>
          </div>

          <!-- Exact Meeting Point & Interactive Map -->
          <div class="detail-section">
            <h3>📍 ${t('details.meetingPoint')}</h3>
            <div class="map-box">
              <div class="map-visual-placeholder">
                <div class="map-pin">
                  <span>📍</span>
                </div>
              </div>
              <h4 style="margin-bottom:6px">${act.meetingPoint.title}</h4>
              <p style="font-size:0.92rem; color:var(--mute); margin-bottom:12px">${act.meetingPoint.details}</p>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px">
                <span style="font-family:monospace; font-size:0.88rem; background:var(--card); padding:4px 10px; border-radius:6px; border:1px solid var(--line)">
                  GPS : ${act.meetingPoint.coordinates}
                </span>
                <a href="https://maps.google.com/?q=${encodeURIComponent(act.meetingPoint.coordinates)}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-blue">
                  ${t('details.getDirections')} ↗
                </a>
              </div>
            </div>
          </div>

          <!-- Included & Not Included -->
          <div class="detail-section">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px">
              <div>
                <h3>✓ ${t('details.included')}</h3>
                <ul class="check-list">
                  ${act.included.map(i => `<li>${i}</li>`).join('')}
                </ul>
              </div>
              <div>
                <h3 style="color:var(--coral)">✕ ${t('details.notIncluded')}</h3>
                <ul class="check-list cross-list">
                  ${act.notIncluded.map(ni => `<li>${ni}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>

          <!-- What to bring & Safety -->
          <div class="detail-section">
            <h3>🎒 ${t('details.whatToBring')}</h3>
            <ul class="check-list">
              ${act.whatToBring.map(b => `<li>${b}</li>`).join('')}
            </ul>
            <div style="margin-top:20px; background:var(--saf-light); border:1.5px solid var(--saf); border-radius:var(--radius-md); padding:16px">
              <b style="display:block; margin-bottom:4px; color:var(--ink)">🛡️ ${t('details.safetyInstructions')}</b>
              <p style="font-size:0.9rem; color:var(--ink); opacity:0.88; margin:0">${act.safetyInstructions}</p>
            </div>
          </div>

          <!-- Cancellation policy -->
          <div class="detail-section">
            <h3>🔄 ${t('details.cancellationPolicy')}</h3>
            <p style="font-size:0.95rem; color:var(--mute)">${act.cancellationPolicy}</p>
          </div>

          <!-- Guide Profile Showcase Card -->
          <div class="detail-section">
            <h3>👤 ${t('details.aboutGuide')}</h3>
            <div style="background:var(--card); border:2px solid var(--line); border-radius:var(--radius-lg); padding:24px; display:flex; gap:20px; align-items:center; flex-wrap:wrap">
              <img src="${guide.avatar}" alt="${guide.name}" style="width:72px; height:72px; border-radius:50%; object-fit:cover; border:3px solid var(--saf)">
              <div style="flex:1">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
                  <h4 style="margin:0">${guide.name}</h4>
                  <span class="badge badge-official">Agréé ${guide.badgeNumber}</span>
                </div>
                <small style="color:var(--mute); display:block; margin-top:2px">${guide.role} · ${guide.yearsExperience} ans d'expérience</small>
                <p style="font-size:0.9rem; margin-top:8px; line-height:1.4">${guide.bio.slice(0, 160)}...</p>
              </div>
              <button class="btn btn-sm btn-blue view-guide-profile-btn" data-guide-id="${guide.id}">
                ${t('details.viewGuideProfile')} →
              </button>
            </div>
          </div>

          <!-- Customer Reviews Section -->
          <div class="detail-section">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; flex-wrap:wrap; gap:10px">
              <h3 style="margin:0">⭐ ${t('details.reviewsTitle')}</h3>
              <button class="btn btn-sm btn-forest" id="openReviewModalBtn">
                + ${t('details.writeReviewBtn')}
              </button>
            </div>

            <div class="reviews-score-banner">
              <div class="big-score">${act.rating}</div>
              <div>
                <div class="stars-row">★★★★★</div>
                <small style="color:var(--mute)">${t('details.basedOn')} ${act.reviewsCount} ${t('details.verifiedTourists')}</small>
              </div>
            </div>

            <div class="reviews-list">
              ${relatedReviews.length ? relatedReviews.map(rev => `
                <div class="review-card">
                  <div class="review-user-row">
                    <div class="review-user-info">
                      <img class="review-avatar" src="${rev.touristAvatar}" alt="${rev.touristName}" loading="lazy">
                      <div>
                        <b>${rev.touristName}</b> <small style="color:var(--mute)">(${rev.touristCountry})</small>
                        <div style="font-size:0.8rem; color:var(--forest)">✓ Réservation vérifiée · ${rev.tag}</div>
                      </div>
                    </div>
                    <div style="text-align:right">
                      <div style="color:#EFA723">★ ★ ★ ★ ★</div>
                      <div class="review-date">${rev.date}</div>
                    </div>
                  </div>
                  <p style="font-size:0.94rem; line-height:1.5">${rev.comment}</p>
                  ${rev.photos && rev.photos.length ? `
                    <div class="review-photos">
                      ${rev.photos.map(p => `<img src="${p}" alt="Photo avis voyageur" onclick="window.open('${p}')">`).join('')}
                    </div>
                  ` : ''}
                </div>
              `).join('') : '<p style="color:var(--mute)">Soyez le premier voyageur à laisser un avis pour cette activité !</p>'}
            </div>
          </div>
        </div>

        <!-- RIGHT SIDE: DYNAMIC PRICING SYSTEM CALCULATOR PANEL -->
        <aside class="detail-sidebar">
          <div class="pricing-panel" id="dynamicPricingCalculatorPanel">
            <!-- Will be dynamically populated by renderPricingCalculator() -->
          </div>
        </aside>
      </div>
    `;

    // Hook thumbnail click
    container.querySelectorAll('.gallery-thumb').forEach(thumb => {
      thumb.onclick = () => {
        const src = thumb.dataset.thumbSrc;
        const mainImg = $('detailMainImg');
        if (mainImg) mainImg.src = src;
        container.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      };
    });

    // Hook Guide Profile button
    const guideBtn = container.querySelector('.view-guide-profile-btn');
    if (guideBtn) {
      guideBtn.onclick = () => {
        closeActivityDetails();
        openGuideProfile(guide.id);
      };
    }

    // Hook write review
    const reviewBtn = container.querySelector('#openReviewModalBtn');
    if (reviewBtn) {
      reviewBtn.onclick = () => {
        openReviewModal(act.id);
      };
    }

    // Render Dynamic Pricing Calculator in the right sidebar!
    renderPricingCalculator(act, guide);
  }

  /**
   * DYNAMIC PRICING SYSTEM CALCULATOR RENDERING & INTERACTION (REQUIREMENT #7)
   */
  function renderPricingCalculator(act, guide) {
    const panel = $('dynamicPricingCalculatorPanel');
    if (!panel) return;

    const participants = state.bookingCalculator.participants;
    const calcResult = window.PricingCalculator.calculate(
      guide,
      participants,
      state.adminMetrics.commissionRatePercent || 10
    );

    const isAr = state.lang === 'ar';

    let html = `
      <div class="pricing-panel-header">
        <span class="badge badge-official" style="margin-bottom:6px">💰 ${t('pricing.panelTitle')}</span>
        <h3>${act.title}</h3>
        <small style="color:var(--mute)">Guide : <b>${guide.name}</b> (Tarification agréée)</small>
      </div>

      <!-- Date & Time Slot -->
      <div class="form-group">
        <label for="calcDateInput">📅 ${t('pricing.selectDate')}</label>
        <input class="form-control" type="date" id="calcDateInput" value="${state.bookingCalculator.date}" min="2026-11-04">
      </div>

      <div class="form-group">
        <label for="calcTimeSelect">⏰ ${t('pricing.selectTime')}</label>
        <select class="form-control" id="calcTimeSelect">
          <option value="09:00" ${state.bookingCalculator.timeSlot === '09:00' ? 'selected' : ''}>Matinée · 09:00 (Recommandé)</option>
          <option value="14:00" ${state.bookingCalculator.timeSlot === '14:00' ? 'selected' : ''}>Après-midi · 14:00</option>
          <option value="16:30" ${state.bookingCalculator.timeSlot === '16:30' ? 'selected' : ''}>Crépuscule · 16:30 (Golden Hour)</option>
        </select>
      </div>

      <!-- Age Categories Breakdown Interactive Counters -->
      <div>
        <label style="font-weight:800; font-size:0.92rem; display:block; margin-bottom:8px">
          👥 ${t('pricing.participantsBreakdown')}
        </label>
        <div class="age-counters-list">
          <!-- Adults -->
          <div class="age-counter-row">
            <div class="age-info">
              <div class="age-title">${t('pricing.adultsLabel')}</div>
              <div class="age-desc">Tarif plein palier de groupe</div>
            </div>
            <div class="counter-controls">
              <button class="counter-btn" data-counter-action="dec" data-counter-type="adults" ${participants.adults <= 0 ? 'disabled' : ''}>-</button>
              <span class="counter-val" id="valAdults">${participants.adults}</span>
              <button class="counter-btn" data-counter-action="inc" data-counter-type="adults">+</button>
            </div>
          </div>

          <!-- Seniors -->
          <div class="age-counter-row">
            <div class="age-info">
              <div class="age-title">${t('pricing.seniorsLabel')}</div>
              <div class="age-desc">-15% à -20% selon le guide</div>
            </div>
            <div class="counter-controls">
              <button class="counter-btn" data-counter-action="dec" data-counter-type="seniors" ${participants.seniors <= 0 ? 'disabled' : ''}>-</button>
              <span class="counter-val" id="valSeniors">${participants.seniors}</span>
              <button class="counter-btn" data-counter-action="inc" data-counter-type="seniors">+</button>
            </div>
          </div>

          <!-- Teens -->
          <div class="age-counter-row">
            <div class="age-info">
              <div class="age-title">${t('pricing.teensLabel')}</div>
              <div class="age-desc">-35% à -40% de réduction</div>
            </div>
            <div class="counter-controls">
              <button class="counter-btn" data-counter-action="dec" data-counter-type="teens" ${participants.teens <= 0 ? 'disabled' : ''}>-</button>
              <span class="counter-val" id="valTeens">${participants.teens}</span>
              <button class="counter-btn" data-counter-action="inc" data-counter-type="teens">+</button>
            </div>
          </div>

          <!-- Children -->
          <div class="age-counter-row">
            <div class="age-info">
              <div class="age-title">${t('pricing.childrenLabel')}</div>
              <div class="age-desc">-65% à -70% de réduction</div>
            </div>
            <div class="counter-controls">
              <button class="counter-btn" data-counter-action="dec" data-counter-type="children" ${participants.children <= 0 ? 'disabled' : ''}>-</button>
              <span class="counter-val" id="valChildren">${participants.children}</span>
              <button class="counter-btn" data-counter-action="inc" data-counter-type="children">+</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // If calculation is valid, show dynamic unlocked tier & breakdown
    if (calcResult.isValid) {
      html += `
        <!-- Unlocked Group Tier Banner -->
        <div class="tier-unlocked-banner">
          <span style="font-size:1.4rem">🎯</span>
          <div>
            <b>${t('pricing.tierUnlockedBadge')} ${calcResult.activeTier.label}</b>
            <div style="font-size:0.8rem; color:var(--mute)">Tarif unitaire adulte base : <b>${calcResult.baseTierPrice} ${calcResult.currency}</b> / pers.</div>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div class="price-breakdown-card">
          <div style="font-weight:800; font-size:0.85rem; text-transform:uppercase; color:var(--mute); margin-bottom:10px">
            ${t('pricing.breakdownSummary')}
          </div>

          ${calcResult.breakdown.map(item => `
            <div class="breakdown-row">
              <span>${item.count} × ${item.label} ${item.discountNote ? `<small style="color:var(--forest)">(${item.discountNote})</small>` : ''}</span>
              <b>${item.lineTotal} ${calcResult.currency}</b>
            </div>
          `).join('')}

          <div class="breakdown-row" style="margin-top:10px; padding-top:8px; border-top:1px dashed var(--line)">
            <span>${t('pricing.subtotalGuide')}</span>
            <b>${calcResult.guideSubtotal} ${calcResult.currency}</b>
          </div>

          <div class="breakdown-row">
            <span>${t('pricing.platformFee')}</span>
            <b>${calcResult.platformFee} ${calcResult.currency}</b>
          </div>

          ${calcResult.estimatedSavings > 0 ? `
            <div class="breakdown-row highlight">
              <span>🎉 ${t('pricing.savingsTag')}</span>
              <b>-${calcResult.estimatedSavings} ${calcResult.currency}</b>
            </div>
          ` : ''}

          <div class="breakdown-row total">
            <span>${t('pricing.totalToPay')}</span>
            <span style="color:var(--blue)">${calcResult.total} ${calcResult.currency}</span>
          </div>
        </div>

        <!-- Book Now Button -->
        <button class="btn btn-blue" id="proceedToCheckoutBtn" style="width:100%; padding:16px; font-size:1.05rem">
          ⚡ ${t('pricing.bookNowBtn')} →
        </button>
      `;
    } else {
      html += `
        <div style="background:#FFF3CD; border:1px solid #FFEBAA; color:#856404; padding:16px; border-radius:var(--radius-md); margin:16px 0; font-size:0.9rem">
          ⚠️ ${calcResult.message}
        </div>
        <button class="btn btn-blue" disabled style="width:100%; opacity:0.5; cursor:not-allowed">
          ${t('pricing.bookNowBtn')}
        </button>
      `;
    }

    html += `
      <p style="text-align:center; color:var(--mute); font-size:0.78rem; margin-top:12px">
        🔒 ${t('pricing.sandboxNotice')}
      </p>
    `;

    panel.innerHTML = html;

    // Attach listeners for date & time
    const dateInput = $('calcDateInput');
    if (dateInput) {
      dateInput.onchange = (e) => {
        state.bookingCalculator.date = e.target.value;
      };
    }

    const timeSelect = $('calcTimeSelect');
    if (timeSelect) {
      timeSelect.onchange = (e) => {
        state.bookingCalculator.timeSlot = e.target.value;
      };
    }

    // Attach counter buttons listeners
    panel.querySelectorAll('.counter-btn').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.counterAction;
        const type = btn.dataset.counterType;
        if (action === 'inc') {
          state.bookingCalculator.participants[type] += 1;
        } else if (action === 'dec' && state.bookingCalculator.participants[type] > 0) {
          state.bookingCalculator.participants[type] -= 1;
        }
        renderPricingCalculator(act, guide);
      };
    });

    // Attach Proceed to Booking Checkout
    const checkoutBtn = $('proceedToCheckoutBtn');
    if (checkoutBtn) {
      checkoutBtn.onclick = () => {
        startBookingCheckout(act, guide, calcResult);
      };
    }
  }

  /**
   * Professional Guide Profiles Modal / View (REQUIREMENT #6)
   */
  function openGuideProfile(guideId) {
    const guide = window.TOURISM_DATA.guides.find(g => g.id === guideId);
    if (!guide) return;

    state.selectedGuide = guide;
    renderGuideModal(guide);
    const modal = $('guideProfileModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeGuideProfile() {
    const modal = $('guideProfileModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderGuideModal(guide) {
    const container = $('guideModalContent');
    if (!container) return;

    const guideActivities = window.TOURISM_DATA.activities.filter(a => a.guideId === guide.id);

    container.innerHTML = `
      <div class="guide-profile-card">
        <div class="guide-profile-header">
          <img class="guide-profile-img" src="${guide.avatar}" alt="${guide.name}">
          <div style="flex:1">
            <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap">
              <h2 style="margin:0">${guide.name}</h2>
              <span class="guide-license-badge">
                🛡️ CARTE OFFICIELLE MINISTÈRE DU TOURISME : ${guide.badgeNumber}
              </span>
            </div>
            <div style="font-weight:700; color:var(--forest); margin:6px 0">${guide.role}</div>
            <p style="color:var(--mute); font-size:0.95rem; margin-top:8px">${guide.bio}</p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="guide-stats-grid">
          <div class="guide-stat-item">
            <b>${guide.yearsExperience} ans</b>
            <span>Expérience terrain</span>
          </div>
          <div class="guide-stat-item">
            <b>⭐ ${guide.rating}</b>
            <span>Note moyenne (${guide.reviewsCount} avis)</span>
          </div>
          <div class="guide-stat-item">
            <b>${guide.languages.length}</b>
            <span>Langues parlées</span>
          </div>
          <div class="guide-stat-item">
            <b>100%</b>
            <span>Taux de réponse (< 1h)</span>
          </div>
        </div>

        <!-- Languages & Specialties -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:24px; margin-bottom:28px">
          <div>
            <h4>🗣️ Langues maîtrisées</h4>
            <div class="tags" style="margin-top:10px">
              ${guide.languages.map(l => `<span class="active">🗣️ ${l}</span>`).join('')}
            </div>
          </div>
          <div>
            <h4>🎯 Spécialités certifiées</h4>
            <div class="tags" style="margin-top:10px">
              ${guide.specialties.map(s => `<span>${s}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Interactive Availability Calendar Preview -->
        <div>
          <h4>📅 Calendrier des disponibilités de ${guide.name}</h4>
          <p style="font-size:0.88rem; color:var(--mute); margin-bottom:12px">Sélectionnez une date en vert pour réserver une excursion directement.</p>
          <div class="calendar-widget">
            <div style="display:flex; justify-content:space-between; align-items:center; font-weight:800">
              <span>Novembre 2026</span>
              <span class="badge badge-verified">✓ Créneaux vérifiés</span>
            </div>
            <div class="calendar-grid">
              <div class="cal-day-name">Lun</div>
              <div class="cal-day-name">Mar</div>
              <div class="cal-day-name">Mer</div>
              <div class="cal-day-name">Jeu</div>
              <div class="cal-day-name">Ven</div>
              <div class="cal-day-name">Sam</div>
              <div class="cal-day-name">Dim</div>

              ${generateMockCalendarDays()}
            </div>
          </div>
        </div>

        <!-- Guide's Dynamic Pricing Structure Transparency -->
        <div style="margin-top:32px; background:var(--card-subtle); padding:24px; border-radius:var(--radius-md); border:1px solid var(--line)">
          <h4>💰 Barème des tarifs de groupe de ${guide.name}</h4>
          <p style="font-size:0.88rem; color:var(--mute); margin-bottom:14px">
            Ce guide applique une dégressivité de groupe transparente et équitable :
          </p>
          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px">
            ${guide.pricingConfig.groupTiers.map(tier => `
              <div style="background:var(--card); border:1px solid var(--line); padding:12px; border-radius:var(--radius-sm)">
                <small style="color:var(--mute); font-weight:700">${tier.label}</small>
                <div style="font-family:'Bricolage Grotesque'; font-size:1.3rem; font-weight:800; color:var(--blue)">
                  ${tier.pricePerPerson} MAD <span style="font-size:0.78rem; font-weight:600; color:var(--mute)">/ pers.</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Activities Offered by This Guide -->
        <div style="margin-top:36px">
          <h4>🏔️ Expériences encadrées par ${guide.name} (${guideActivities.length})</h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:20px; margin-top:16px">
            ${guideActivities.map(act => `
              <div style="background:var(--card); border:1.5px solid var(--line); border-radius:var(--radius-md); overflow:hidden; display:flex; flex-direction:column">
                <img src="${act.coverImage}" alt="${act.title}" style="aspect-ratio:16/9; object-fit:cover">
                <div style="padding:16px; flex:1; display:flex; flex-direction:column">
                  <span class="badge badge-official" style="width:fit-content; margin-bottom:8px">${act.categoryName}</span>
                  <h4 style="font-size:1.05rem; margin-bottom:8px">${act.title}</h4>
                  <small style="color:var(--mute); margin-bottom:12px">⏱️ ${act.duration} · ${act.difficulty}</small>
                  <div style="margin-top:auto; display:flex; justify-content:space-between; align-items:center">
                    <b>${act.startingPrice} MAD / p.</b>
                    <button class="btn btn-sm btn-blue view-act-from-guide" data-act-id="${act.id}">Réserver</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Hook booking button from guide's activities
    container.querySelectorAll('.view-act-from-guide').forEach(btn => {
      btn.onclick = () => {
        closeGuideProfile();
        openActivityDetails(btn.dataset.actId);
      };
    });
  }

  function generateMockCalendarDays() {
    let daysHtml = '';
    // Empty offsets for November 2026 starting on Sunday
    for (let i = 0; i < 6; i++) {
      daysHtml += `<div class="cal-day disabled"></div>`;
    }
    for (let day = 1; day <= 30; day++) {
      const isAvailable = (day % 2 === 0 || day % 3 === 0);
      const isSelected = (day === 21); // upcoming Saturday
      daysHtml += `
        <div class="cal-day ${isSelected ? 'selected' : (isAvailable ? 'available' : 'disabled')}" title="${isSelected ? 'Date sélectionnée' : (isAvailable ? 'Guide disponible' : 'Complet')}">
          ${day}
        </div>
      `;
    }
    return daysHtml;
  }

  /**
   * 7-STEP BOOKING & CHECKOUT FLOW (REQUIREMENT #9)
   */
  function startBookingCheckout(act, guide, calcResult) {
    state.checkout = {
      activeStep: 5, // steps 1-4 are pre-filled by the dynamic calculator!
      activityId: act.id,
      guideId: guide.id,
      date: state.bookingCalculator.date,
      timeSlot: state.bookingCalculator.timeSlot,
      participants: { ...state.bookingCalculator.participants },
      calcResult: calcResult,
      touristName: 'Yassine Chraibi',
      touristEmail: 'yassine.chraibi@example.com',
      touristPhone: '+212 6 61 98 76 54',
      specialRequests: 'Excursion en famille. Nous apprécions particulièrement les arrêts photos et anecdotes historiques.',
      paymentMethod: 'cmi',
      lastCreatedBooking: null
    };

    closeActivityDetails();
    renderBookingCheckoutModal();
    const modal = $('bookingCheckoutModal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeBookingCheckout() {
    const modal = $('bookingCheckoutModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function renderBookingCheckoutModal() {
    const container = $('checkoutModalContent');
    if (!container) return;

    const step = state.checkout.activeStep;
    const act = window.TOURISM_DATA.activities.find(a => a.id === state.checkout.activityId);
    const guide = window.TOURISM_DATA.guides.find(g => g.id === state.checkout.guideId);
    const calc = state.checkout.calcResult;

    container.innerHTML = `
      <!-- Stepper Header -->
      <div class="checkout-stepper">
        <div class="checkout-step-item ${step >= 1 ? 'completed' : ''}">
          <span class="checkout-step-num">1</span>
          <span>${t('bookingFlow.step1')}</span>
        </div>
        <div class="checkout-step-item ${step >= 2 ? 'completed' : ''}">
          <span class="checkout-step-num">2</span>
          <span>${t('bookingFlow.step2')}</span>
        </div>
        <div class="checkout-step-item ${step >= 3 ? 'completed' : ''}">
          <span class="checkout-step-num">3</span>
          <span>${t('bookingFlow.step3')}</span>
        </div>
        <div class="checkout-step-item ${step >= 4 ? 'completed' : ''}">
          <span class="checkout-step-num">4</span>
          <span>${t('bookingFlow.step4')}</span>
        </div>
        <div class="checkout-step-item ${step === 5 ? 'active' : (step > 5 ? 'completed' : '')}">
          <span class="checkout-step-num">5</span>
          <span>${t('bookingFlow.step5')}</span>
        </div>
        <div class="checkout-step-item ${step === 6 ? 'active' : (step > 6 ? 'completed' : '')}">
          <span class="checkout-step-num">6</span>
          <span>${t('bookingFlow.step6')}</span>
        </div>
        <div class="checkout-step-item ${step === 7 ? 'active' : ''}">
          <span class="checkout-step-num">7</span>
          <span>${t('bookingFlow.step7')}</span>
        </div>
      </div>

      <!-- Step Content Body -->
      <div class="checkout-body">
        ${renderCheckoutStepBody(step, act, guide, calc)}
      </div>
    `;

    // Hook checkout inputs and actions
    setupCheckoutStepActions(step, act, guide, calc);
  }

  function renderCheckoutStepBody(step, act, guide, calc) {
    if (step === 5) {
      // Step 5: Confirm or choose alternative licensed guide
      const alternateGuides = act.alternateGuideIds ? 
        act.alternateGuideIds.map(id => window.TOURISM_DATA.guides.find(g => g.id === id)).filter(Boolean) : [];

      return `
        <h3>5. ${t('bookingFlow.guideSelectionTitle')}</h3>
        <p style="color:var(--mute); margin-bottom:20px">
          Cette activité est encadrée par des guides professionnels titulaires de la carte officielle du Ministère. Vous pouvez confirmer le guide référent ou choisir un autre confrère agréé disponible.
        </p>

        <div style="display:flex; flex-direction:column; gap:16px; margin-bottom:28px">
          <label style="display:flex; gap:16px; align-items:center; background:var(--card); border:2px solid var(--blue); padding:16px; border-radius:var(--radius-md); cursor:pointer">
            <input type="radio" name="guideChoice" value="${guide.id}" checked>
            <img src="${guide.avatar}" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid var(--saf)">
            <div style="flex:1">
              <b>${guide.name}</b> <span class="badge badge-official">Agréé ${guide.badgeNumber}</span>
              <div style="font-size:0.85rem; color:var(--mute)">⭐ ${guide.rating} (${guide.reviewsCount} avis) · ${guide.languages.join(', ')}</div>
            </div>
            <span class="badge badge-verified">Recommandé</span>
          </label>

          ${alternateGuides.map(altG => `
            <label style="display:flex; gap:16px; align-items:center; background:var(--card); border:1.5px solid var(--line); padding:16px; border-radius:var(--radius-md); cursor:pointer">
              <input type="radio" name="guideChoice" value="${altG.id}">
              <img src="${altG.avatar}" style="width:54px; height:54px; border-radius:50%; object-fit:cover; border:2px solid var(--saf)">
              <div style="flex:1">
                <b>${altG.name}</b> <span class="badge badge-official">Agréé ${altG.badgeNumber}</span>
                <div style="font-size:0.85rem; color:var(--mute)">⭐ ${altG.rating} (${altG.reviewsCount} avis) · ${altG.languages.join(', ')}</div>
              </div>
            </label>
          `).join('')}
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px">
          <button class="btn btn-blue" id="nextToStep6Btn">Continuer vers mes coordonnées →</button>
        </div>
      `;
    }

    if (step === 6) {
      // Step 6: Tourist contact coordinates
      return `
        <h3>6. ${t('bookingFlow.touristInfoTitle')}</h3>
        <p style="color:var(--mute); margin-bottom:24px">
          Le guide utilisera ces coordonnées pour vous envoyer le point de rendez-vous précis et coordonner la logistique.
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px">
          <div class="form-group">
            <label>${t('bookingFlow.fullName')} *</label>
            <input class="form-control" type="text" id="chkFullName" value="${state.checkout.touristName}" required>
          </div>
          <div class="form-group">
            <label>${t('bookingFlow.email')} *</label>
            <input class="form-control" type="email" id="chkEmail" value="${state.checkout.touristEmail}" required>
          </div>
        </div>

        <div class="form-group">
          <label>${t('bookingFlow.phone')} *</label>
          <input class="form-control" type="tel" id="chkPhone" value="${state.checkout.touristPhone}" placeholder="+212 6 XX XX XX XX" required>
        </div>

        <div class="form-group">
          <label>${t('bookingFlow.specialRequests')}</label>
          <textarea class="form-control" id="chkSpecial" rows="3">${state.checkout.specialRequests}</textarea>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:28px">
          <button class="btn o" id="backToStep5Btn">← Retour au choix du guide</button>
          <button class="btn btn-blue" id="nextToStep7Btn">Continuer vers le paiement Sandbox →</button>
        </div>
      `;
    }

    if (step === 7) {
      // Step 7: Confirmation & Sandbox Payment
      return `
        <h3>7. ${t('bookingFlow.selectPaymentMethod')}</h3>
        <div style="background:#FFF3CD; border:1.5px solid #FFEBAA; border-radius:var(--radius-md); padding:14px; margin-bottom:24px; color:#856404; font-size:0.9rem">
          🛡️ <b>Mode Démonstration Hackathon :</b> Aucun paiement réel ne sera débité. Le guide reçoit la notification et doit confirmer ses disponibilités avant toute confirmation finale.
        </div>

        <!-- Summary Recap Box -->
        <div style="background:var(--card); border:2px solid var(--line); border-radius:var(--radius-lg); padding:24px; margin-bottom:28px">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px">
            <div>
              <h4 style="margin:0">${act.title}</h4>
              <small style="color:var(--forest); font-weight:700">Guide officiel : ${guide.name}</small>
            </div>
            <span class="badge badge-official">${act.destinationName}</span>
          </div>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:10px; font-size:0.9rem; padding:12px 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line)">
            <div>📅 <b>${state.checkout.date}</b></div>
            <div>⏰ <b>${state.checkout.timeSlot}</b></div>
            <div>👥 <b>${calc.totalCount} participants</b></div>
            <div>🎯 <b>${calc.activeTier.label}</b></div>
          </div>

          <div style="margin-top:14px">
            <div style="display:flex; justify-content:space-between; font-size:0.92rem; margin-bottom:6px">
              <span>Part directe du guide (${calc.totalCount} pers.) :</span>
              <b>${calc.guideSubtotal} MAD</b>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.92rem; margin-bottom:6px">
              <span>Frais plateforme Tourism Connect (10%) :</span>
              <b>${calc.platformFee} MAD</b>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:1.3rem; font-family:'Bricolage Grotesque'; font-weight:800; color:var(--blue); margin-top:10px; padding-top:10px; border-top:2px solid var(--line)">
              <span>Total de la réservation :</span>
              <span>${calc.total} MAD</span>
            </div>
          </div>
        </div>

        <!-- Payment Options Sandbox -->
        <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:28px">
          <label style="display:flex; gap:14px; align-items:center; background:var(--card); border:2px solid var(--blue); padding:16px; border-radius:var(--radius-md); cursor:pointer">
            <input type="radio" name="payMethod" value="cmi" checked>
            <div>
              <b>💳 Carte Bancaire Marocaine (CMI - Simulation Sandbox)</b>
              <div style="font-size:0.82rem; color:var(--mute)">Cartes nationales CMI / Attijariwafa / BCP / BMCE / CIH</div>
            </div>
          </label>

          <label style="display:flex; gap:14px; align-items:center; background:var(--card); border:1.5px solid var(--line); padding:16px; border-radius:var(--radius-md); cursor:pointer">
            <input type="radio" name="payMethod" value="visa">
            <div>
              <b>🌍 Carte Internationale Visa / Mastercard (Sandbox)</b>
              <div style="font-size:0.82rem; color:var(--mute)">Paiement sécurisé 3D-Secure simulé</div>
            </div>
          </label>

          <label style="display:flex; gap:14px; align-items:center; background:var(--card); border:1.5px solid var(--line); padding:16px; border-radius:var(--radius-md); cursor:pointer">
            <input type="radio" name="payMethod" value="on_arrival">
            <div>
              <b>🤝 Garantie par réservation & Règlement direct au guide sur place</b>
              <div style="font-size:0.82rem; color:var(--mute)">En espèces au point de rencontre après vérification de la carte de guide</div>
            </div>
          </label>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center">
          <button class="btn o" id="backToStep6Btn">← Modifier coordonnées</button>
          <button class="btn btn-blue" id="submitBookingBtn" style="padding:15px 32px">
            ✓ ${t('bookingFlow.confirmPaymentBtn')}
          </button>
        </div>
      `;
    }

    if (step === 8) {
      // Step 8: Success Screen
      const b = state.checkout.lastCreatedBooking;
      return `
        <div style="text-align:center; padding:20px 0">
          <div style="font-size:3.8rem; margin-bottom:12px">🎉</div>
          <h2 style="margin-bottom:8px">${t('bookingFlow.successTitle')}</h2>
          <p style="color:var(--mute); max-width:54ch; margin:0 auto 24px">
            ${t('bookingFlow.successDesc')}
          </p>

          <div style="background:var(--card); border:2px dashed var(--line); border-radius:var(--radius-lg); padding:24px; max-width:480px; margin:0 auto 28px; text-align:left">
            <div style="display:flex; justify-content:space-between; margin-bottom:10px">
              <span style="color:var(--mute)">Numéro de référence :</span>
              <b style="font-family:monospace; color:var(--blue)">${b.id}</b>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px">
              <span style="color:var(--mute)">Statut actuel :</span>
              <span class="status-pill status-${b.status}">${b.statusLabelFr}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px">
              <span style="color:var(--mute)">Guide contacté :</span>
              <b>${b.guideName}</b>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:10px">
              <span style="color:var(--mute)">Date & Heure :</span>
              <b>${b.date} à ${b.timeSlot}</b>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1px solid var(--line); padding-top:10px; margin-top:10px">
              <span style="color:var(--mute)">Montant total calculé :</span>
              <b style="font-size:1.1rem; color:var(--ink)">${b.financials.totalPaid} MAD</b>
            </div>
          </div>

          <div style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap">
            <button class="btn btn-blue" id="goToTouristDashboardBtn">
              ${t('bookingFlow.viewInDashboard')}
            </button>
            <button class="btn btn-forest" id="simulateGuideAcceptBtn">
              ${t('bookingFlow.simulateAcceptance')}
            </button>
          </div>
        </div>
      `;
    }
  }

  function setupCheckoutStepActions(step, act, guide, calc) {
    if (step === 5) {
      const nextBtn = $('nextToStep6Btn');
      if (nextBtn) {
        nextBtn.onclick = () => {
          const selectedGuideRadio = document.querySelector('input[name="guideChoice"]:checked');
          if (selectedGuideRadio) {
            state.checkout.guideId = selectedGuideRadio.value;
          }
          state.checkout.activeStep = 6;
          renderBookingCheckoutModal();
        };
      }
    }

    if (step === 6) {
      const backBtn = $('backToStep5Btn');
      if (backBtn) {
        backBtn.onclick = () => {
          state.checkout.activeStep = 5;
          renderBookingCheckoutModal();
        };
      }

      const nextBtn = $('nextToStep7Btn');
      if (nextBtn) {
        nextBtn.onclick = () => {
          const nameInput = $('chkFullName');
          const emailInput = $('chkEmail');
          const phoneInput = $('chkPhone');
          const specialInput = $('chkSpecial');

          if (!nameInput.value || !emailInput.value || !phoneInput.value) {
            alert('Veuillez remplir votre nom, e-mail et numéro de téléphone.');
            return;
          }

          state.checkout.touristName = nameInput.value;
          state.checkout.touristEmail = emailInput.value;
          state.checkout.touristPhone = phoneInput.value;
          state.checkout.specialRequests = specialInput ? specialInput.value : '';

          state.checkout.activeStep = 7;
          renderBookingCheckoutModal();
        };
      }
    }

    if (step === 7) {
      const backBtn = $('backToStep6Btn');
      if (backBtn) {
        backBtn.onclick = () => {
          state.checkout.activeStep = 6;
          renderBookingCheckoutModal();
        };
      }

      const submitBtn = $('submitBookingBtn');
      if (submitBtn) {
        submitBtn.onclick = () => {
          // Generate new booking record
          const selectedPay = document.querySelector('input[name="payMethod"]:checked')?.value || 'cmi';
          const newBooking = {
            id: `TC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            activityId: act.id,
            activityTitle: act.title,
            guideId: guide.id,
            guideName: guide.name,
            touristName: state.checkout.touristName,
            touristEmail: state.checkout.touristEmail,
            touristPhone: state.checkout.touristPhone,
            date: state.checkout.date,
            timeSlot: state.checkout.timeSlot,
            participants: { ...state.checkout.participants },
            totalParticipants: calc.totalCount,
            groupTierUnlocked: calc.activeTier.label,
            financials: {
              guideSubtotal: calc.guideSubtotal,
              platformFee: calc.platformFee,
              totalPaid: calc.total,
              currency: calc.currency
            },
            status: 'pending', // Waiting for guide to accept!
            statusLabelFr: 'En attente du guide',
            paymentMethod: selectedPay === 'cmi' ? 'Carte CMI (Sandbox)' : (selectedPay === 'visa' ? 'Visa/Mastercard (Sandbox)' : 'Paiement direct sur place'),
            meetingPoint: act.meetingPoint.title,
            createdAt: new Date().toISOString()
          };

          // Store in state
          state.bookings.unshift(newBooking);
          state.checkout.lastCreatedBooking = newBooking;
          state.adminMetrics.totalBookings += 1;
          state.adminMetrics.totalVolumeMAD += calc.total;
          state.adminMetrics.platformRevenueMAD += calc.platformFee;

          showToast(`Réservation ${newBooking.id} enregistrée !`, 'success');
          state.checkout.activeStep = 8;
          renderBookingCheckoutModal();
        };
      }
    }

    if (step === 8) {
      const dashboardBtn = $('goToTouristDashboardBtn');
      if (dashboardBtn) {
        dashboardBtn.onclick = () => {
          closeBookingCheckout();
          switchView('touristDashboard');
        };
      }

      const acceptSimBtn = $('simulateGuideAcceptBtn');
      if (acceptSimBtn) {
        acceptSimBtn.onclick = () => {
          const b = state.checkout.lastCreatedBooking;
          if (b) {
            b.status = 'accepted';
            b.statusLabelFr = 'Acceptée par le guide';
            showToast(`Le guide ${b.guideName} a validé sa disponibilité ! Statut : Acceptée`, 'success');
            renderBookingCheckoutModal();
          }
        };
      }
    }
  }

  /**
   * DASHBOARD VIEWS: Tourist, Guide, Admin (REQUIREMENT #10)
   */
  function switchView(viewName) {
    state.currentView = viewName;

    // Toggle active state in nav
    $$('.nav-menu a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`.nav-menu a[data-view="${viewName}"]`);
    if (link) link.classList.add('active');

    // Sections visibility
    const homeSections = $('homeSectionsContainer');
    const dashboardSection = $('dashboardSection');

    if (viewName === 'home') {
      if (homeSections) homeSections.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['touristDashboard', 'guideDashboard', 'adminDashboard'].includes(viewName)) {
      if (homeSections) homeSections.style.display = 'none';
      if (dashboardSection) dashboardSection.style.display = 'block';
      renderActiveDashboard();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'explorer') {
      if (homeSections) homeSections.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
      scrollToElement('activitiesExplorerSection');
    } else if (viewName === 'destinations') {
      if (homeSections) homeSections.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
      scrollToElement('destinations');
    } else if (viewName === 'about' || viewName === 'contact' || viewName === 'becomeGuide') {
      if (homeSections) homeSections.style.display = 'block';
      if (dashboardSection) dashboardSection.style.display = 'none';
      scrollToElement(`${viewName}Section`);
    }
  }

  function renderActiveDashboard() {
    const container = $('dashboardContainer');
    if (!container) return;

    const role = state.currentRole;
    let html = '';

    if (role === 'tourist') {
      html = renderTouristDashboard();
    } else if (role === 'guide') {
      html = renderGuideDashboard();
    } else if (role === 'admin') {
      html = renderAdminDashboard();
    }

    container.innerHTML = html;
    setupDashboardActions();
  }

  function renderTouristDashboard() {
    const touristBookings = state.bookings;

    return `
      <div class="dashboard-header">
        <span class="badge badge-blue" style="margin-bottom:8px">🎒 ${t('dashboards.touristTitle')}</span>
        <h2>Mes Réservations & Bons d'Échange</h2>
        <p style="color:var(--mute)">${t('dashboards.touristSubtitle')}</p>
      </div>

      <div style="margin-top:28px">
        ${touristBookings.length ? touristBookings.map(b => `
          <div class="booking-item-card" data-booking-id="${b.id}">
            <div>
              <div style="display:flex; gap:12px; align-items:center; margin-bottom:8px; flex-wrap:wrap">
                <span class="status-pill status-${b.status}">${b.statusLabelFr || b.status}</span>
                <span style="font-family:monospace; font-size:0.85rem; color:var(--mute)">Réf : ${b.id}</span>
                <span style="font-size:0.85rem; color:var(--mute)">• Créée le ${new Date(b.createdAt).toLocaleDateString('fr-FR')}</span>
              </div>
              <h3 style="margin-bottom:6px; font-size:1.3rem">${b.activityTitle}</h3>
              <p style="font-size:0.9rem; color:var(--mute); margin-bottom:10px">
                Guide agréé : <b>${b.guideName}</b> · Rendez-vous : <b>${b.meetingPoint}</b>
              </p>
              <div style="display:flex; gap:16px; font-size:0.88rem; flex-wrap:wrap">
                <span>📅 <b>${b.date} à ${b.timeSlot}</b></span>
                <span>👥 <b>${b.totalParticipants} participants</b> (${b.groupTierUnlocked})</span>
                <span>💰 Total : <b style="color:var(--blue)">${b.financials.totalPaid} MAD</b></span>
                <span>💳 ${b.paymentMethod}</span>
              </div>
            </div>

            <div style="display:flex; flex-direction:column; gap:10px">
              <button class="btn btn-sm btn-blue view-voucher-btn" data-booking-id="${b.id}">
                📄 ${t('dashboards.actionViewVoucher')}
              </button>
              ${b.status === 'completed' ? `
                <button class="btn btn-sm btn-forest review-tour-btn" data-act-id="${b.activityId}">
                  ⭐ ${t('dashboards.actionReview')}
                </button>
              ` : ''}
              ${b.status === 'pending' ? `
                <button class="btn btn-sm o cancel-booking-btn" data-booking-id="${b.id}" style="color:var(--coral); border-color:var(--coral)">
                  Annuler la demande
                </button>
              ` : ''}
            </div>
          </div>
        `).join('') : '<p style="color:var(--mute)">Vous n\'avez aucune réservation pour le moment.</p>'}
      </div>
    `;
  }

  function renderGuideDashboard() {
    const currentGuide = window.TOURISM_DATA.guides[0]; // Karim Benali as demo guide
    const guideBookings = state.bookings.filter(b => b.guideId === currentGuide.id || b.status === 'pending');

    return `
      <div class="dashboard-header">
        <span class="badge badge-official" style="margin-bottom:8px">🛡️ ${t('dashboards.guideTitle')}</span>
        <h2>Tableau de Bord du Guide · ${currentGuide.name}</h2>
        <p style="color:var(--mute)">Carte officielle : ${currentGuide.badgeNumber} · Béni Mellal-Khénifra</p>
      </div>

      <!-- Quick Stats -->
      <div class="admin-metrics-grid">
        <div class="metric-card">
          <small style="color:var(--mute)">Demandes en attente</small>
          <b style="color:var(--saf)">${guideBookings.filter(b => b.status === 'pending').length}</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">Réservations confirmées</small>
          <b style="color:var(--forest)">${guideBookings.filter(b => b.status === 'accepted' || b.status === 'confirmed').length}</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">Revenus nets cumulés</small>
          <b style="color:var(--blue)">18 420 MAD</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">Note globale voyageur</small>
          <b style="color:#EFA723">⭐ 4.97</b>
        </div>
      </div>

      <!-- Bookings Management for Guide -->
      <div style="margin-top:36px">
        <h3>📋 Demandes de réservation à valider</h3>
        <p style="font-size:0.88rem; color:var(--mute); margin-bottom:16px">
          Validez vos disponibilités pour chaque demande. Le client ne sera débité qu'après votre acceptation formelle.
        </p>

        ${guideBookings.map(b => `
          <div class="booking-item-card">
            <div>
              <div style="display:flex; gap:10px; align-items:center; margin-bottom:6px">
                <span class="status-pill status-${b.status}">${b.statusLabelFr}</span>
                <span style="font-family:monospace; font-size:0.85rem">Réf : ${b.id}</span>
              </div>
              <h4>${b.activityTitle}</h4>
              <p style="font-size:0.9rem; color:var(--mute)">
                Voyageur : <b>${b.touristName}</b> (Tél : ${b.touristPhone})
              </p>
              <div style="display:flex; gap:16px; font-size:0.88rem; margin-top:8px">
                <span>📅 ${b.date} à ${b.timeSlot}</span>
                <span>👥 ${b.totalParticipants} pers. (${b.groupTierUnlocked})</span>
                <span>💰 Part nette guide : <b style="color:var(--forest)">${b.financials.guideSubtotal} MAD</b></span>
              </div>
            </div>

            <div style="display:flex; gap:8px">
              ${b.status === 'pending' ? `
                <button class="btn btn-sm btn-forest guide-accept-btn" data-booking-id="${b.id}">
                  ✓ ${t('dashboards.actionAccept')}
                </button>
                <button class="btn btn-sm o guide-decline-btn" data-booking-id="${b.id}" style="color:var(--coral)">
                  ✕ ${t('dashboards.actionDecline')}
                </button>
              ` : `
                <span class="badge badge-verified">Traité</span>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Guide Pricing Configurator -->
      <div style="margin-top:48px; background:var(--card); border:2px solid var(--line); border-radius:var(--radius-lg); padding:28px">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap">
          <div>
            <h3 style="margin:0">⚙️ ${t('dashboards.pricingEditorTitle')}</h3>
            <p style="color:var(--mute); font-size:0.88rem; margin:4px 0 0">
              Ajustez vos paliers de dégressivité par taille de groupe et vos remises par âge.
            </p>
          </div>
          <button class="btn btn-sm btn-blue" id="saveGuidePricingBtn">
            💾 ${t('dashboards.savePricingRules')}
          </button>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-top:16px">
          ${currentGuide.pricingConfig.groupTiers.map((t, idx) => `
            <div style="background:var(--card-subtle); padding:16px; border-radius:var(--radius-md); border:1px solid var(--line)">
              <label style="font-weight:700; font-size:0.88rem">${t.label}</label>
              <div style="display:flex; align-items:center; gap:8px; margin-top:8px">
                <input class="form-control" type="number" value="${t.pricePerPerson}" style="font-weight:800; font-size:1.1rem" id="guideTierInput_${idx}">
                <span style="font-weight:700">MAD</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderAdminDashboard() {
    const metrics = state.adminMetrics;
    const pendingList = state.pendingGuides;

    return `
      <div class="dashboard-header">
        <span class="badge badge-official" style="margin-bottom:8px">👑 ${t('dashboards.adminTitle')}</span>
        <h2>Supervision de la Plateforme Tourism Connect</h2>
        <p style="color:var(--mute)">Contrôle officiel des agréments, volume d'affaires et régulation de la commission.</p>
      </div>

      <!-- Admin KPIs -->
      <div class="admin-metrics-grid">
        <div class="metric-card">
          <small style="color:var(--mute)">${t('dashboards.adminMetricsTotalBookings')}</small>
          <b>${metrics.totalBookings}</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">${t('dashboards.adminMetricsVolume')}</small>
          <b style="color:var(--forest)">${metrics.totalVolumeMAD.toLocaleString()} MAD</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">${t('dashboards.adminMetricsRevenue')}</small>
          <b style="color:var(--blue)">${metrics.platformRevenueMAD.toLocaleString()} MAD</b>
        </div>
        <div class="metric-card">
          <small style="color:var(--mute)">${t('dashboards.adminMetricsGuides')}</small>
          <b>${metrics.activeGuidesCount} guides</b>
        </div>
      </div>

      <!-- Pending Guide License Verifications -->
      <div style="margin-top:40px">
        <h3>🛡️ ${t('dashboards.pendingLicenses')} (${pendingList.length})</h3>
        <p style="color:var(--mute); font-size:0.88rem; margin-bottom:18px">
          Vérification rigoureuse obligatoire avant d'activer le profil d'un guide sur la place de marché.
        </p>

        ${pendingList.length ? pendingList.map(g => `
          <div class="booking-item-card" data-cand-id="${g.id}">
            <div>
              <div style="display:flex; gap:10px; align-items:center; margin-bottom:6px">
                <span class="status-pill status-pending">En cours d'audit</span>
                <span style="font-weight:800">${g.name} (${g.city})</span>
              </div>
              <p style="font-size:0.9rem; margin-bottom:6px">
                N° de Carte d'État déclarée : <b>${g.licenseNumber}</b> · Expérience : ${g.experience}
              </p>
              <div style="display:flex; gap:8px; flex-wrap:wrap">
                ${g.documentsSubmitted.map(d => `<span class="badge badge-outline">📄 ${d}</span>`).join('')}
              </div>
            </div>

            <div style="display:flex; gap:8px">
              <button class="btn btn-sm btn-forest admin-approve-guide-btn" data-cand-id="${g.id}">
                ✓ ${t('dashboards.approveGuide')}
              </button>
              <button class="btn btn-sm o admin-reject-guide-btn" data-cand-id="${g.id}" style="color:var(--coral)">
                ✕ ${t('dashboards.rejectGuide')}
              </button>
            </div>
          </div>
        `).join('') : '<p style="color:var(--forest)">Tous les dossiers de guides ont été vérifiés !</p>'}
      </div>

      <!-- Commission Rate Setting -->
      <div style="margin-top:40px; background:var(--card); border:2px solid var(--line); border-radius:var(--radius-lg); padding:28px">
        <h3>⚙️ Paramétrage du Taux de Commission Plateforme</h3>
        <p style="color:var(--mute); font-size:0.9rem; margin-bottom:16px">
          Fixé actuellement à <b>${metrics.commissionRatePercent}%</b>. Reversé au fonctionnement technique et au support d'urgence 7j/7.
        </p>
        <div style="display:flex; align-items:center; gap:20px; max-width:400px">
          <input type="range" min="5" max="15" value="${metrics.commissionRatePercent}" id="commissionSlider" style="flex:1; accent-color:var(--blue)">
          <span style="font-family:'Bricolage Grotesque'; font-size:1.4rem; font-weight:800; min-width:60px" id="commissionDisplay">
            ${metrics.commissionRatePercent}%
          </span>
        </div>
      </div>
    `;
  }

  function setupDashboardActions() {
    // Tourist actions
    $$('.view-voucher-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const b = state.bookings.find(item => item.id === bId);
        if (b) openVoucherModal(b);
      };
    });

    $$('.cancel-booking-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const b = state.bookings.find(item => item.id === bId);
        if (b && confirm(`Confirmez-vous l'annulation de la réservation ${bId} ?`)) {
          b.status = 'cancelled';
          b.statusLabelFr = 'Annulée';
          showToast(`Réservation ${bId} annulée`, 'info');
          renderActiveDashboard();
        }
      };
    });

    // Guide actions: Accept / Decline
    $$('.guide-accept-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const b = state.bookings.find(item => item.id === bId);
        if (b) {
          b.status = 'accepted';
          b.statusLabelFr = 'Acceptée par le guide';
          showToast(`Réservation ${bId} acceptée ! Le touriste est notifié.`, 'success');
          renderActiveDashboard();
        }
      };
    });

    $$('.guide-decline-btn').forEach(btn => {
      btn.onclick = () => {
        const bId = btn.dataset.bookingId;
        const b = state.bookings.find(item => item.id === bId);
        if (b && confirm(`Décliner la réservation ${bId} ?`)) {
          b.status = 'rejected';
          b.statusLabelFr = 'Refusée';
          showToast(`Réservation ${bId} déclinée.`, 'info');
          renderActiveDashboard();
        }
      };
    });

    // Save guide pricing
    const savePricingBtn = $('saveGuidePricingBtn');
    if (savePricingBtn) {
      savePricingBtn.onclick = () => {
        showToast('Paliers tarifaires du guide enregistrés avec succès !', 'success');
      };
    }

    // Admin approve guide
    $$('.admin-approve-guide-btn').forEach(btn => {
      btn.onclick = () => {
        const cId = btn.dataset.candId;
        state.pendingGuides = state.pendingGuides.filter(g => g.id !== cId);
        state.adminMetrics.activeGuidesCount += 1;
        showToast(`Agrément officiel validé pour ce guide !`, 'success');
        renderActiveDashboard();
      };
    });

    $$('.admin-reject-guide-btn').forEach(btn => {
      btn.onclick = () => {
        const cId = btn.dataset.candId;
        state.pendingGuides = state.pendingGuides.filter(g => g.id !== cId);
        showToast(`Dossier rejeté.`, 'info');
        renderActiveDashboard();
      };
    });

    // Commission Slider
    const slider = $('commissionSlider');
    const display = $('commissionDisplay');
    if (slider && display) {
      slider.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        state.adminMetrics.commissionRatePercent = val;
        display.textContent = `${val}%`;
      };
    }
  }

  /**
   * Tour Voucher Modal (PDF simulation)
   */
  function openVoucherModal(booking) {
    state.activeVoucherBooking = booking;
    const modal = $('voucherModal');
    const content = $('voucherModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="background:var(--paper); border:3px solid var(--fix); border-radius:var(--radius-lg); padding:32px; color:var(--ink); position:relative">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid var(--line); padding-bottom:16px; margin-bottom:20px">
          <div class="logo"><i></i> Tourism Connect</div>
          <div style="text-align:right">
            <span class="badge badge-official">BON D'ÉCHANGE OFFICIEL</span>
            <div style="font-family:monospace; font-weight:800; margin-top:4px">${booking.id}</div>
          </div>
        </div>

        <h3 style="font-size:1.6rem; margin-bottom:8px">${booking.activityTitle}</h3>
        <p style="color:var(--forest); font-weight:800; margin-bottom:20px">
          ✓ ENCADRÉ PAR : ${booking.guideName} (Guide Professionnel Agréé)
        </p>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; background:var(--card); padding:18px; border-radius:var(--radius-md); border:1px solid var(--line); margin-bottom:24px">
          <div>
            <small style="color:var(--mute)">Titulaire de la réservation :</small>
            <div style="font-weight:700">${booking.touristName}</div>
          </div>
          <div>
            <small style="color:var(--mute)">Téléphone de contact :</small>
            <div style="font-weight:700">${booking.touristPhone}</div>
          </div>
          <div>
            <small style="color:var(--mute)">Date de l'excursion :</small>
            <div style="font-weight:700">📅 ${booking.date} à ${booking.timeSlot}</div>
          </div>
          <div>
            <small style="color:var(--mute)">Participants :</small>
            <div style="font-weight:700">👥 ${booking.totalParticipants} pers. (${booking.groupTierUnlocked})</div>
          </div>
          <div style="grid-column:1 / -1">
            <small style="color:var(--mute)">Point de rencontre exact :</small>
            <div style="font-weight:700">📍 ${booking.meetingPoint}</div>
          </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; border-top:2px dashed var(--line); padding-top:16px">
          <div>
            <small style="color:var(--mute)">Statut du règlement :</small>
            <div style="font-weight:800; color:var(--forest)">${booking.statusLabelFr} · ${booking.financials.totalPaid} MAD</div>
          </div>
          <!-- QR Code simulation box -->
          <div style="width:72px; height:72px; background:var(--fix); border-radius:8px; display:grid; place-items:center; color:var(--paper); font-size:0.7rem; text-align:center; padding:4px">
            [ QR Code Vérifié ]
          </div>
        </div>

        <div style="margin-top:24px; text-align:center">
          <button class="btn btn-blue" onclick="window.print()">🖨️ Imprimer ce bon d'échange</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVoucherModal() {
    const modal = $('voucherModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /**
   * Add Review Modal Simulator
   */
  function openReviewModal(actId) {
    const act = window.TOURISM_DATA.activities.find(a => a.id === actId);
    if (!act) return;

    const modal = $('reviewModal');
    const content = $('reviewModalContent');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="padding:28px">
        <h3 style="margin-bottom:6px">Laisser un avis pour "${act.title}"</h3>
        <p style="color:var(--mute); font-size:0.9rem; margin-bottom:20px">
          Votre avis aide les futurs voyageurs et valorise le travail de votre guide local agréé.
        </p>

        <div class="form-group">
          <label>Votre note :</label>
          <div style="display:flex; gap:8px; font-size:1.8rem; color:#EFA723; cursor:pointer" id="starSelector">
            <span data-star="1">★</span>
            <span data-star="2">★</span>
            <span data-star="3">★</span>
            <span data-star="4">★</span>
            <span data-star="5">★</span>
          </div>
        </div>

        <div class="form-group">
          <label>Votre nom complet</label>
          <input class="form-control" type="text" id="revName" value="Samir Tazi" required>
        </div>

        <div class="form-group">
          <label>Votre commentaire d'expérience</label>
          <textarea class="form-control" id="revComment" rows="4" placeholder="Racontez comment s'est déroulée votre sortie, l'accueil du guide, la sécurité, etc."></textarea>
        </div>

        <div class="form-group">
          <label>Photos souvenirs (Simulation d'upload)</label>
          <input class="form-control" type="file" disabled title="Upload simulé">
          <small style="color:var(--mute)">Formats acceptés : JPG, PNG (Max 5 Mo)</small>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:24px">
          <button class="btn o" onclick="document.getElementById('reviewModal').classList.remove('active'); document.body.style.overflow=''">Annuler</button>
          <button class="btn btn-forest" id="submitReviewBtn">Publier mon avis vérifié</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook submit
    const submitBtn = $('submitReviewBtn');
    if (submitBtn) {
      submitBtn.onclick = () => {
        const comment = $('revComment')?.value || 'Guide formidable et paysages à couper le souffle !';
        const name = $('revName')?.value || 'Voyageur passionné';

        const newReview = {
          id: `rev-${Date.now()}`,
          activityId: act.id,
          touristName: name,
          touristAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          touristCountry: 'Maroc 🇲🇦',
          rating: 5,
          date: 'À l\'instant',
          comment: comment,
          photos: [],
          helpfulCount: 1,
          verifiedBooking: true,
          tag: 'Avis récent'
        };

        window.TOURISM_DATA.reviews.unshift(newReview);
        showToast('Merci ! Votre avis a été publié avec succès.', 'success');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        renderActivityModal(act);
      };
    }
  }

  /**
   * Setup Event Listeners
   */
  function setupEventListeners() {
    // Language Switcher Buttons
    $$('.lang-selector button').forEach(btn => {
      btn.onclick = () => {
        applyLanguage(btn.dataset.lang);
        showToast(`Langue sélectionnée : ${btn.dataset.lang.toUpperCase()}`, 'info');
      };
    });

    // Theme Toggle
    const themeBtn = $('themeToggleBtn');
    if (themeBtn) {
      themeBtn.onclick = () => {
        const nextTheme = state.theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
      };
    }

    // Role Simulator Switcher
    const roleSelect = $('roleSimulatorSelect');
    if (roleSelect) {
      roleSelect.onchange = (e) => {
        state.currentRole = e.target.value;
        showToast(`Rôle actif : ${e.target.options[e.target.selectedIndex].text}`, 'info');
        if (state.currentView !== 'home') {
          renderActiveDashboard();
        }
      };
    }

    // Navigation Links
    $$('.nav-menu a, [data-view-target]').forEach(link => {
      link.onclick = (e) => {
        e.preventDefault();
        const targetView = link.dataset.view || link.dataset.viewTarget;
        if (targetView) switchView(targetView);
      };
    });

    // Logo click returns home
    const logo = $('siteLogo');
    if (logo) {
      logo.onclick = () => switchView('home');
    }

    // Hero Search Bar Submission
    const heroSearchBtn = $('heroSearchBtn');
    if (heroSearchBtn) {
      heroSearchBtn.onclick = (e) => {
        e.preventDefault();
        const dest = $('heroDestSelect')?.value || 'all';
        const cat = $('heroCatSelect')?.value || 'all';

        state.filters.destination = dest;
        state.filters.category = cat;

        if ($('filterDestination')) $('filterDestination').value = dest;

        switchView('explorer');
        renderActivitiesExplorer();
        showToast('Résultats actualisés selon votre recherche !', 'info');
      };
    }

    // Filter Controls in Explorer
    const destFilter = $('filterDestination');
    if (destFilter) {
      destFilter.onchange = (e) => {
        state.filters.destination = e.target.value;
        renderActivitiesExplorer();
      };
    }

    const diffFilter = $('filterDifficulty');
    if (diffFilter) {
      diffFilter.onchange = (e) => {
        state.filters.difficulty = e.target.value;
        renderActivitiesExplorer();
      };
    }

    const langFilter = $('filterLanguage');
    if (langFilter) {
      langFilter.onchange = (e) => {
        state.filters.language = e.target.value;
        renderActivitiesExplorer();
      };
    }

    const priceRange = $('filterPriceRange');
    const priceDisplay = $('priceRangeDisplay');
    if (priceRange && priceDisplay) {
      priceRange.oninput = (e) => {
        const val = parseInt(e.target.value, 10);
        state.filters.maxPrice = val;
        priceDisplay.textContent = `${val} MAD`;
        renderActivitiesExplorer();
      };
    }

    const searchInput = $('searchQueryInput');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.filters.searchQuery = e.target.value;
        renderActivitiesExplorer();
      };
    }

    const sortSelect = $('sortBySelect');
    if (sortSelect) {
      sortSelect.onchange = (e) => {
        state.filters.sortBy = e.target.value;
        renderActivitiesExplorer();
      };
    }

    // Modal close buttons
    const closeDestBtn = $('closeDestinationModalBtn');
    if (closeDestBtn) closeDestBtn.onclick = closeDestinationDetails;

    const closeActBtn = $('closeActivityModalBtn');
    if (closeActBtn) closeActBtn.onclick = closeActivityDetails;

    const closeGuideBtn = $('closeGuideModalBtn');
    if (closeGuideBtn) closeGuideBtn.onclick = closeGuideProfile;

    const closeCheckoutBtn = $('closeCheckoutModalBtn');
    if (closeCheckoutBtn) closeCheckoutBtn.onclick = closeBookingCheckout;

    const closeVoucherBtn = $('closeVoucherModalBtn');
    if (closeVoucherBtn) closeVoucherBtn.onclick = closeVoucherModal;

    const closeReviewBtn = $('closeReviewModalBtn');
    if (closeReviewBtn) {
      closeReviewBtn.onclick = () => {
        $('reviewModal').classList.remove('active');
        document.body.style.overflow = '';
      };
    }

    // Close on backdrop click
    $$('.modal-overlay').forEach(modal => {
      modal.onclick = (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      };
    });

    // Mobile nav toggle
    const navToggle = $('mobileNavToggle');
    const mobileMenu = $('mobileNavMenu');
    if (navToggle && mobileMenu) {
      navToggle.onclick = () => {
        const isOpen = mobileMenu.style.display === 'flex';
        mobileMenu.style.display = isOpen ? 'none' : 'flex';
      };
    }

    // Become guide application form submission
    const guideForm = $('becomeGuideForm');
    if (guideForm) {
      guideForm.onsubmit = (e) => {
        e.preventDefault();
        showToast('Votre dossier de candidature a été soumis aux administrateurs !', 'success');
        guideForm.reset();
      };
    }

    // Contact form submission
    const contactForm = $('contactForm');
    if (contactForm) {
      contactForm.onsubmit = (e) => {
        e.preventDefault();
        showToast('Votre message a bien été transmis aux bureaux de Béni Mellal et Azilal.', 'success');
        contactForm.reset();
      };
    }
  }

  function scrollToElement(id) {
    const el = $(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Initialize once DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global methods for inline debugging
  window.tcApp = {
    state,
    applyLanguage,
    setTheme,
    switchView,
    openDestinationDetails,
    closeDestinationDetails,
    openActivityDetails,
    closeActivityDetails,
    openGuideProfile,
    closeGuideProfile,
    renderActivitiesExplorer,
    resetAllFilters,
    showToast
  };

})();
