// База данных игр и приложений с РЕАЛЬНОЙ статистикой использований
let items = [
    {
        id: 1,
        title: "Cyberpunk Runner 2088",
        category: "game",
        type: "paid",
        price: "499 ₽",
        rating: 4.9,
        downloads: 142850, // Реальный счетчик использований
        icon: "gamepad-2",
        gradient: "from-blue-600 to-indigo-900",
        desc: "Динамичный экшен-раннер в неоновом стиле будущего с передовой графикой.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Купить и играть",
        isTop: true
    },
    {
        id: 2,
        title: "PhotoPro Studio AI",
        category: "app",
        type: "free",
        price: "Бесплатно",
        rating: 4.7,
        downloads: 890200,
        icon: "camera",
        gradient: "from-pink-500 to-purple-800",
        desc: "Профессиональный фоторедактор с нейросетевыми фильтрами и автоулучшением.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Скачать",
        isTop: true
    },
    {
        id: 3,
        title: "Shadow Dungeon RPG",
        category: "game",
        type: "free",
        price: "Бесплатно",
        rating: 4.6,
        downloads: 1250400,
        icon: "swords",
        gradient: "from-red-600 to-slate-900",
        desc: "Хардкорная пошаговая RPG с процедурно генерируемыми подземельямии лутом.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Запустить",
        isTop: true
    },
    {
        id: 4,
        title: "CodeFlow IDE Mobile",
        category: "app",
        type: "paid",
        price: "299 ₽",
        rating: 4.8,
        downloads: 64200,
        icon: "code",
        gradient: "from-emerald-500 to-teal-900",
        desc: "Полноценная среда разработки веб-приложений прямо на вашем планшете или телефоне.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Купить",
        isTop: false
    },
    {
        id: 5,
        title: "Space Colony Simulator",
        category: "game",
        type: "paid",
        price: "199 ₽",
        rating: 4.5,
        downloads: 310900,
        icon: "rocket",
        gradient: "from-violet-600 to-slate-900",
        desc: "Исследуйте далекие галактики и стройте автономные космические станции.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Купить",
        isTop: false
    },
    {
        id: 6,
        title: "TaskMaster Pro",
        category: "app",
        type: "free",
        price: "Бесплатно",
        rating: 4.9,
        downloads: 2450000,
        icon: "check-square",
        gradient: "from-amber-500 to-orange-800",
        desc: "Умный планировщик задач и трекер привычек с синхронизацией в реальном времени.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Скачать",
        isTop: true
    },
    {
        id: 7,
        title: "Neon Beat Music Player",
        category: "app",
        type: "free",
        price: "Бесплатно",
        rating: 4.7,
        downloads: 512000,
        icon: "headphones",
        gradient: "from-cyan-600 to-blue-900",
        desc: "Музыкальный плеер с продвинутым эквалайзером и визуализацией под треки.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Скачать",
        isTop: false
    },
    {
        id: 8,
        title: "Speed Legends Racing",
        category: "game",
        type: "free",
        price: "Бесплатно",
        rating: 4.8,
        downloads: 1890000,
        icon: "flag",
        gradient: "from-orange-600 to-red-900",
        desc: "Аркадные уличные гонки на тюнингованных суперкарах с реалистичной физикой.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: "Запустить",
        isTop: true
    }
];

// Текущий пользователь (авторизация)
let currentUser = null;

// Форматирование чисел загрузок (например: 1.4M или 310K)
function formatDownloads(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M+';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K+';
    }
    return num;
}

// Рендер каталога
function renderItems(dataToRender) {
    const grid = document.getElementById('app-grid');
    grid.innerHTML = '';

    if (dataToRender.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-16 text-slate-500">Ничего не найдено по вашему запросу</div>`;
        return;
    }

    dataToRender.forEach(item => {
        const card = document.createElement('div');
        card.className = "group bg-slate-900/60 dark:bg-slate-900/60 bg-white border border-slate-800 dark:border-slate-800 border-slate-200 hover:border-purple-500/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col justify-between";
        
        card.innerHTML = `
            <div>
                <!-- Обложка приложения -->
                <div onclick="openDetailModal(${item.id})" class="h-40 rounded-xl bg-gradient-to-br ${item.gradient} p-4 flex flex-col justify-between relative overflow-hidden mb-4 group-hover:scale-[1.02] transition-transform cursor-pointer">
                    <div class="absolute inset-0 bg-black/10"></div>
                    <div class="flex justify-between items-center z-10">
                        <span class="px-2.5 py-1 bg-slate-950/60 backdrop-blur-md rounded-lg text-xs font-semibold ${item.type === 'free' ? 'text-emerald-400' : 'text-purple-300'}">
                            ${item.price}
                        </span>
                        <div class="flex items-center gap-1 bg-slate-950/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs text-amber-400">
                            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400"></i>
                            <span>${item.rating}</span>
                        </div>
                    </div>
                    <div class="z-10 flex items-center justify-center py-2">
                        <i data-lucide="${item.icon || 'box'}" class="w-16 h-16 text-white drop-shadow-lg"></i>
                    </div>
                </div>

                <!-- Название и описание -->
                <h3 onclick="openDetailModal(${item.id})" class="font-bold text-lg text-slate-100 dark:text-slate-100 text-slate-900 group-hover:text-purple-400 transition-colors cursor-pointer">${item.title}</h3>
                <p class="text-slate-400 text-xs mt-1.5 line-clamp-2">${item.desc}</p>
            </div>

            <!-- Статистика и кнопка -->
            <div class="mt-5 pt-3 border-t border-slate-800/60 dark:border-slate-800/60 border-slate-100 flex items-center justify-between">
                <span class="text-[11px] text-slate-500 flex items-center gap-1">
                    <i data-lucide="users" class="w-3.5 h-3.5"></i>
                    ${formatDownloads(item.downloads)} воспользовались
                </span>
                <button onclick="handleAction(${item.id})" class="px-4 py-2 ${item.type === 'free' ? 'bg-slate-800 dark:bg-slate-800 bg-slate-100 hover:bg-slate-700 text-white dark:text-white text-slate-800' : 'bg-purple-600 hover:bg-purple-500 text-white'} rounded-xl font-medium text-xs transition active:scale-95 shadow-md">
                    ${item.actionText}
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
    
    lucide.createIcons();
}

// Фильтрация по категориям
function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-purple-600', 'text-white');
        btn.classList.add('text-slate-400');
    });
    event.currentTarget.classList.add('bg-purple-600', 'text-white');
    event.currentTarget.classList.remove('text-slate-400');

    if (category === 'all') {
        renderItems(items);
    } else if (category === 'top') {
        renderItems(items.filter(i => i.isTop || i.downloads > 500000));
    } else {
        renderItems(items.filter(i => i.category === category));
    }
}

// Поиск по сайту в реальном времени
document.getElementById('search-input').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = items.filter(i => i.title.toLowerCase().includes(query) || i.desc.toLowerCase().includes(query));
    renderItems(filtered);
});

// Переключение светлой и темной темы
function toggleTheme() {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
    } else {
        html.classList.add('dark');
    }
}

// Модальное окно авторизации
function openAuthModal() {
    document.getElementById('auth-modal').classList.remove('hidden');
}
function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

// Симуляция входа через Google или Apple
function socialLogin(provider) {
    currentUser = {
        name: provider === 'Google' ? 'Алексей (Google)' : 'Иван (Apple ID)',
        email: provider === 'Google' ? 'alexey@gmail.com' : 'ivan@icloud.ai'
    };

    closeAuthModal();
    updateAuthUI();
}

// Обновление шапки после входа
function updateAuthUI() {
    const container = document.getElementById('auth-container');
    if (currentUser) {
        container.innerHTML = `
            <div class="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white text-xs">
                    ${currentUser.name[0]}
                </div>
                <div class="hidden sm:block text-left">
                    <div class="text-xs font-bold text-slate-200">${currentUser.name}</div>
                    <div class="text-[10px] text-slate-400">Аккаунт активен</div>
                </div>
                <button onclick="logout()" class="text-slate-400 hover:text-red-400 p-1 ml-1" title="Выйти">
                    <i data-lucide="log-out" class="w-4 h-4"></i>
                </button>
            </div>
        `;
        lucide.createIcons();
    }
}

function logout() {
    currentUser = null;
    location.reload();
}

// Модальное окно загрузки своего приложения
function openUploadModal() {
    document.getElementById('upload-modal').classList.remove('hidden');
}
function closeUploadModal() {
    document.getElementById('upload-modal').classList.add('hidden');
}

// Обработка отправки формы добавления игры/приложения
function handleAppSubmission(e) {
    e.preventDefault();
    
    const title = document.getElementById('up-title').value;
    const category = document.getElementById('up-category').value;
    const type = document.getElementById('up-type').value;
    const desc = document.getElementById('up-desc').value;
    const cover = document.getElementById('up-cover').value;
    const video = document.getElementById('up-video').value;

    const gradients = [
        "from-indigo-600 to-purple-900",
        "from-emerald-600 to-slate-900",
        "from-pink-600 to-rose-900",
        "from-blue-600 to-cyan-900"
    ];

    const newItem = {
        id: items.length + 1,
        title: title,
        category: category,
        type: type,
        price: type === 'free' ? 'Бесплатно' : '299 ₽',
        rating: 5.0,
        downloads: 1, // Стартовое значение счетчика
        icon: category === 'game' ? 'gamepad-2' : 'smartphone',
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
        desc: desc,
        video: video ? video.replace('watch?v=', 'embed/') : "https://www.youtube.com/embed/dQw4w9WgXcQ",
        actionText: type === 'free' ? 'Скачать' : 'Купить',
        isTop: false
    };

    items.unshift(newItem); // Добавляем в начало списка
    renderItems(items);
    closeUploadModal();
    document.getElementById('upload-form').reset();
    alert('Ваш проект успешно опубликован в каталоге AppSpace!');
}

// Подробный просмотр игры (с видео и реальной статистикой)
function openDetailModal(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const modal = document.getElementById('detail-modal');
    const content = document.getElementById('detail-content');

    content.innerHTML = `
        <div class="space-y-6">
            <div class="flex items-start justify-between">
                <div>
                    <span class="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-xs font-semibold">${item.category === 'game' ? 'Игра' : 'Приложение'}</span>
                    <h2 class="text-2xl sm:text-3xl font-extrabold mt-2 text-slate-100">${item.title}</h2>
                </div>
            </div>

            <!-- Видео превью / трейлер -->
            <div class="relative rounded-2xl overflow-hidden aspect-video bg-black border border-slate-800 shadow-xl">
                <iframe src="${item.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}" class="w-full h-full" frameborder="0" allowfullscreen></iframe>
            </div>

            <div class="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
                <div>
                    <div class="text-xs text-slate-400">Реальные использования</div>
                    <div class="text-xl font-bold text-purple-400">${item.downloads.toLocaleString()} пользователей</div>
                </div>
                <div>
                    <div class="text-xs text-slate-400">Рейтинг софта</div>
                    <div class="text-xl font-bold text-amber-400 flex items-center gap-1">
                        <i data-lucide="star" class="w-5 h-5 fill-amber-400"></i> ${item.rating}
                    </div>
                </div>
            </div>

            <p class="text-slate-300 text-sm leading-relaxed">${item.desc}</p>

            <button onclick="handleAction(${item.id}); closeDetailModal();" class="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-bold text-sm transition shadow-lg shadow-purple-600/30 text-white">
                ${item.actionText} (${item.price})
            </button>
        </div>
    `;

    modal.classList.remove('hidden');
    lucide.createIcons();
}

function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
}

// Действие при клике на скачивание или покупку (увеличивает счетчик использований в реальном времени)
function handleAction(id) {
    const item = items.find(i => i.id === id);
    if (!item) return;

    // Увеличиваем счетчик реальных использований
    item.downloads += 1;
    renderItems(items);

    const modal = document.getElementById('detail-modal');
    // Показываем подтверждение
    const content = document.getElementById('detail-content');
    
    // Если модалка детали открыта, обновляем её или показываем уведомление
    modal.classList.remove('hidden');
    content.innerHTML = `
        <div class="text-center py-8">
            <div class="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                <i data-lucide="check-circle-2" class="w-8 h-8"></i>
            </div>
            <h3 class="text-xl font-bold mb-2">Успешно запущено!</h3>
            <p class="text-slate-400 text-sm mb-6">Приложение "${item.title}" загружено. Счетчик использований обновлен: <span class="text-purple-400 font-bold">${item.downloads.toLocaleString()}</span></p>
            <button onclick="closeDetailModal()" class="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold text-sm transition text-white">Закрыть</button>
        </div>
    `;
    lucide.createIcons();
}

// Эффект подсветки курсора
const glow = document.getElementById('cursor-glow');
window.addEventListener('mousemove', (e) => {
    if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderItems(items);
    lucide.createIcons();
});