/* ===== Estado e constantes ===== */
const STORAGE_KEY = "mecanica-flash-v2";
const MASTER_STREAK = 2;          // 2 acertos seguidos = dominado
const UNLOCK_PERCENT = 70;        // % do nível anterior para liberar o próximo

const LEVEL_NAMES = {
    1: "Básico",
    2: "Intermediário",
    3: "Avançado"
};

let state = {
    progress: {},       // { cardId: { streak: number, mastered: boolean } }
    currentLevel: 1,
    currentTheme: "Todos",
    currentCardId: null,
    flipped: false,
    unlockedLevels: [1]
};

/* ===== Persistência ===== */
function save() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            progress: state.progress,
            currentLevel: state.currentLevel,
            unlockedLevels: state.unlockedLevels
        }));
    } catch (e) {
        console.warn("Não foi possível salvar:", e);
    }
}

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        state.progress = data.progress || {};
        state.currentLevel = data.currentLevel || 1;
        state.unlockedLevels = data.unlockedLevels || [1];
    } catch (e) {
        console.warn("Erro ao carregar progresso:", e);
    }
}

/* ===== Helpers de dados ===== */
function getProgress(id) {
    if (!state.progress[id]) {
        state.progress[id] = { streak: 0, mastered: false };
    }
    return state.progress[id];
}

function getFilteredCards() {
    return CARDS.filter(c => {
        const levelOk = c.nivel === state.currentLevel;
        const themeOk = state.currentTheme === "Todos" || c.tema === state.currentTheme;
        return levelOk && themeOk;
    });
}

function getNextCard() {
    const pool = getFilteredCards();
    if (pool.length === 0) return null;

    // Prioriza os menos dominados (repetição espaçada simples)
    const sorted = [...pool].sort((a, b) => {
        const pa = getProgress(a.id);
        const pb = getProgress(b.id);
        if (pa.mastered !== pb.mastered) return pa.mastered ? 1 : -1;
        return pa.streak - pb.streak;
    });

    return sorted[0];
}

/* ===== UI – Stats e Progresso ===== */
function updateStats() {
    const masteredCount = Object.values(state.progress).filter(p => p.mastered).length;
    document.getElementById("stat-mastered").textContent = masteredCount;
    document.getElementById("stat-level").textContent = state.currentLevel;

    const levelCards = CARDS.filter(c => c.nivel === state.currentLevel);
    const masteredInLevel = levelCards.filter(c => getProgress(c.id).mastered).length;
    const total = levelCards.length;
    const pct = total ? Math.round((masteredInLevel / total) * 100) : 0;

    document.getElementById("progress-label").textContent =
        `Nível ${state.currentLevel} – ${LEVEL_NAMES[state.currentLevel]}`;
    document.getElementById("progress-count").textContent = `${masteredInLevel} / ${total}`;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("progress-bar").setAttribute("aria-valuenow", pct);
}

/* ===== UI – Filtros ===== */
function renderFilters() {
    const levelEl = document.getElementById("level-filters");
    const themeEl = document.getElementById("theme-filters");

    levelEl.innerHTML = "";
    [1, 2, 3].forEach(n => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-btn" + (state.currentLevel === n ? " active" : "");
        btn.textContent = LEVEL_NAMES[n];
        btn.disabled = !state.unlockedLevels.includes(n);
        btn.addEventListener("click", () => {
            if (!state.unlockedLevels.includes(n)) return;
            state.currentLevel = n;
            state.currentTheme = "Todos";
            renderFilters();
            showNextCard();
            updateStats();
        });
        levelEl.appendChild(btn);
    });

    const themes = ["Todos", ...new Set(CARDS.filter(c => c.nivel === state.currentLevel).map(c => c.tema))];
    themeEl.innerHTML = "";
    themes.forEach(t => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "filter-btn" + (state.currentTheme === t ? " active" : "");
        btn.textContent = t;
        btn.addEventListener("click", () => {
            state.currentTheme = t;
            renderFilters();
            showNextCard();
        });
        themeEl.appendChild(btn);
    });
}

/* ===== Card ===== */
function showCard(card) {
    if (!card) {
        document.getElementById("card-question").textContent = "Nenhum card neste filtro.";
        return;
    }

    state.currentCardId = card.id;
    state.flipped = false;
    document.getElementById("card").classList.remove("flipped");

    document.getElementById("card-theme").textContent = card.tema;
    document.getElementById("card-question").textContent = card.pergunta;
    document.getElementById("card-answer").textContent = card.resposta;
    document.getElementById("card-explanation").textContent = card.explicacao;
    document.getElementById("card-source").textContent = "Fonte: " + card.fonte;
}

function showNextCard() {
    const next = getNextCard();
    showCard(next);
}

function flipCard() {
    if (state.flipped) return;
    state.flipped = true;
    document.getElementById("card").classList.add("flipped");
}

function markAnswer(isCorrect) {
    if (!state.currentCardId || !state.flipped) return;

    const prog = getProgress(state.currentCardId);

    if (isCorrect) {
        prog.streak += 1;
        if (prog.streak >= MASTER_STREAK) {
            prog.mastered = true;
        }
    } else {
        prog.streak = 0;
        prog.mastered = false;
    }

    save();
    updateStats();
    checkLevelUnlock();
    showNextCard();
}

/* ===== Progressão de níveis ===== */
function checkLevelUnlock() {
    const levelCards = CARDS.filter(c => c.nivel === state.currentLevel);
    const mastered = levelCards.filter(c => getProgress(c.id).mastered).length;
    const pct = levelCards.length ? (mastered / levelCards.length) * 100 : 0;

    if (pct >= UNLOCK_PERCENT && state.currentLevel < 3) {
        const next = state.currentLevel + 1;
        if (!state.unlockedLevels.includes(next)) {
            state.unlockedLevels.push(next);
            save();
            showModal(
                "Nível desbloqueado!",
                `Você dominou ${Math.round(pct)}% do Nível ${state.currentLevel}. O Nível ${next} – ${LEVEL_NAMES[next]} está liberado.`
            );
            renderFilters();
        }
    }

    // Deck completo
    if (mastered === levelCards.length && levelCards.length > 0) {
        showModal(
            "Deck concluído!",
            `Parabéns! Você dominou todos os cards do Nível ${state.currentLevel}.`
        );
    }
}

function showModal(title, msg) {
    document.getElementById("modal-title").textContent = title;
    document.getElementById("modal-msg").textContent = msg;
    document.getElementById("modal").classList.remove("hidden");
}

/* ===== Reset ===== */
function resetProgress() {
    if (!confirm("Tem certeza que deseja zerar todo o progresso?")) return;
    state.progress = {};
    state.currentLevel = 1;
    state.unlockedLevels = [1];
    state.currentTheme = "Todos";
    localStorage.removeItem(STORAGE_KEY);
    renderFilters();
    updateStats();
    showNextCard();
}

/* ===== Eventos ===== */
document.getElementById("btn-flip").addEventListener("click", flipCard);
document.getElementById("btn-correct").addEventListener("click", () => markAnswer(true));
document.getElementById("btn-wrong").addEventListener("click", () => markAnswer(false));
document.getElementById("btn-reset").addEventListener("click", resetProgress);
document.getElementById("btn-modal-ok").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
});

// Teclado
document.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!state.flipped) flipCard();
    }
    if (state.flipped) {
        if (e.key === "1" || e.key.toLowerCase() === "a") markAnswer(true);
        if (e.key === "2" || e.key.toLowerCase() === "e") markAnswer(false);
    }
});

/* ===== Inicialização ===== */
load();
renderFilters();
updateStats();
showNextCard();