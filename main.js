// Beta Break Digital - External main.js (2024 FIXED RANDOM DRAW VERSION)

// --- GLOBAL GAME STATE & CACHING ---
const CACHE_KEY = 'betaBreakGame_local';

// --- CARD DEFINITIONS ---
// Replace or expand as needed for your full game
const BASE_CARDS = [
            // BETA CARDS (20 unique rules)
            { id: 1, name: "Hand Besties", type: "Beta", description_html: "Every use of a hand on a hold must be matched by the other hand before moving on.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Hand+Besties" },
            { id: 2, name: "Foot Besties", type: "Beta", description_html: "Every use of a foot on a hold must be matched by the other foot before moving on.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Foot+Besties" },
            { id: 3, name: "T-rex", type: "Beta", description_html: "No straight elbows during the climb.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=T-rex" },
            { id: 4, name: "Newb", type: "Beta", description_html: "No using your toes... that means use just heels and arches.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Newb" },
            { id: 5, name: "Toes Only", type: "Beta", description_html: "Only use your toes when using your feet (no heels, no arches).", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Toes+Only" },
            { id: 6, name: "No Adjusting", type: "Beta", description_html: "Once you grab a hold or place a foot, you cannot adjust or reposition your hand or foot.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=No+Adjusting" },
            { id: 7, name: "Silent Climb", type: "Beta", description_html: "No speaking or making any sounds while climbing.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Silent+Climb" },
            { id: 8, name: "Tripod", type: "Beta", description_html: "Max 3 points of contact at any time.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Tripod" },
            { id: 9, name: "No Hips", type: "Beta", description_html: "Keep your hips square to the wall at all times (no side-on body positioning).", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=No+Hips" },
            { id: 10, name: "Invisible Chair", type: "Beta", description_html: "No straight legs during the climb.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Invisible+Chair" },
            { id: 11, name: "Flag Every Move", type: "Beta", description_html: "You must flag (extend 1 leg out to the side or behind for balance) to complete every hand move.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Flag+Every+Move" },
            { id: 12, name: "No Edges", type: "Beta", description_html: "No using any outside edge/rand of your shoes (including the toe edge and heel edge) against the wall for balance.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=No+Edges" },
            { id: 13, name: "No Soles", type: "Beta", description_html: "No pressing the soles of your feet against the wall for friction.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=No+Soles" },
            { id: 14, name: "Peace!", type: "Beta", description_html: "Only 2 fingers on each hand can be in contact with any hold at a given time.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Peace!" },
            { id: 15, name: "Hand-emies", type: "Beta", description_html: "No hand-matching any holds.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Hand-emies" },
            { id: 16, name: "Foot-emies", type: "Beta", description_html: "No foot-matching any holds.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Foot-emies" },
            { id: 17, name: "Poisonous Foot", type: "Beta", description_html: "Once a foot touches a hold, it cannot be used again by a foot.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Poisonous+Foot" },
            { id: 18, name: "Poisonous Hand", type: "Beta", description_html: "Once a hand touches a hold, it cannot be used again by a hand.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Poisonous+Hand" },
            { id: 19, name: "Crosses Only", type: "Beta", description_html: "Use only crossover or crossunder hand movements (left over/under right, right over/under left) for hand moves.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Crosses+Only" },
            { id: 20, name: "Disposable Thumbs", type: "Beta", description_html: "No pinches... that means no using your thumb for grip.", image_url: "https://placehold.co/400x600/3b82f6/ffffff?text=Disposable+Thumbs" },
            
            // BREAK CARDS (20 unique rules)
            { id: 101, name: "Heel Hook", type: "Break", description_html: "Use a heel hook to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Heel+Hook" },
            { id: 102, name: "Toe Hook", type: "Break", description_html: "Use a toe hook to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Toe+Hook" },
            { id: 103, name: "Drop Knee", type: "Break", description_html: "Use a Drop Knee to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Drop+Knee" },
            { id: 104, name: "Dyno Required", type: "Break", description_html: "Complete at least 1 jump move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Dyno+Required" },
            { id: 105, name: "Gaston Required", type: "Break", description_html: "Use a gaston (grab a hold with your thumb toward the ground, pulling outward) to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Gaston+Required" },
            { id: 106, name: "High Step", type: "Break", description_html: "Complete at least 1 move by placing a foot above waist height.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=High+Step" },
            { id: 107, name: "Legs Crossed", type: "Break", description_html: "Complete at least 1 move by crossing a leg over the other leg.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Legs+Crossed" },
            { id: 108, name: "Downclimb", type: "Break", description_html: "No jumping to the ground. Beta and Break cards can be ignored during the downclimb.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Downclimb" },
            { id: 109, name: "Palm Press", type: "Break", description_html: "Use a palm press (use the palm of your hand to press against a hold or surface for stability) to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Palm+Press" },
            { id: 110, name: "Straight Arms", type: "Break", description_html: "Complete at least 1 move with both arms straight.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Straight+Arms" },
            { id: 111, name: "Straight Right Arm", type: "Break", description_html: "Complete at least 1 hand move without bending your right elbow.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Straight+Right+Arm" },
            { id: 112, name: "Straight Left Arm", type: "Break", description_html: "Complete at least 1 hand move without bending your left elbow.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Straight+Left+Arm" },
            { id: 113, name: "Deadpoint", type: "Break", description_html: "Complete at least 1 move with a quick, dynamic reach to the next hold, without pausing, while keeping one foot planted.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Deadpoint" },
            { id: 114, name: "Footswap", type: "Break", description_html: "Swap a foot with the other foot on the same hold without removing both feet from the wall.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Footswap" },
            { id: 115, name: "Bicycle", type: "Break", description_html: "Use a bicycle (pinch a hold between the top of one foot and the bottom of the other foot) to complete at least 1 move.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Bicycle" },
            { id: 116, name: "Rockover", type: "Break", description_html: "Complete at least 1 move by shifting your weight over a high foot.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Rockover" },
            { id: 117, name: "Pogo", type: "Break", description_html: "Complete at least 1 move by dynamically swinging one leg to generate upward momentum.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Pogo" },
            { id: 118, name: "Double Smear", type: "Break", description_html: "Complete at least 1 move by pressing the soles of both feet against the wall for friction.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Double+Smear" },
            { id: 119, name: "Hand Bump", type: "Break", description_html: "Complete at least 1 hand move by bumping a hand placement from a temporary hold to its optimal hold.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Hand+Bump" },
            { id: 120, name: "Foot Bump", type: "Break", description_html: "Complete at least 1 foot move by bumping a foot placement from a temporary hold to its optimal hold.", image_url: "https://placehold.co/400x600/f97316/ffffff?text=Foot+Bump" },

            // ELIMINATE CARD (Rule is handled by logic)
            { id: 201, name: "Eliminate Hold", type: "Eliminate", description_html: "The Climber names and eliminates one handhold for all subsequent attempts. Cannot be played by a Ghost Player.", image_url: "https://placehold.co/400x600/dc2626/ffffff?text=ELIMINATE+CARD" },
        ];

// --- INITIAL GAME STATE FUNCTION ---
function getInitialGameState() {
    return {
        players: [],
        deck: [],
        discard: [],
        eliminatedHolds: [],
        activeBeta: null,
        activeBreak: null,
        currentClimberIndex: 0,
        routeLength: 10,
        pendingDrawnCard: null, 
        isAcknowledged: false, 
        hasGhostSucceeded: false, 
    };
}
let gameState = getInitialGameState();

// --- PERSISTENCE ---
function saveGame() {
    if (gameState.players.length > 0) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(gameState));
    }
}
function loadGame() {
    const savedState = localStorage.getItem(CACHE_KEY); 
    if (savedState) {
        Object.assign(gameState, getInitialGameState()); 
        Object.assign(gameState, JSON.parse(savedState));
        return true;
    }
    return false;
}
function clearGame() {
    localStorage.removeItem(CACHE_KEY); 
    Object.assign(gameState, getInitialGameState());
    showSetup();
    renderGame();
}

// --- UTILITIES ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function updateDeckEstimate() {
    const routeLength = parseInt(document.getElementById('routeLength').value) || 0;
    const eliminateCount = Math.max(0, routeLength - 4); 
    document.getElementById('deck-estimate').textContent = `Recommended Eliminate Cards: ${eliminateCount}`;
}

// --- VIEW HELPERS ---
function showSetup() {
    document.getElementById('setup-screen').classList.remove('hidden');
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('winner-modal').classList.add('hidden');
}
function showGame() {
    document.getElementById('setup-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
}
function showRules() { document.getElementById('rules-modal').classList.remove('hidden'); }
function hideRules() { document.getElementById('rules-modal').classList.add('hidden'); }
function addClimberInput() {
    const container = document.getElementById('player-inputs');
    const count = container.querySelectorAll('input').length + 1;
    const div = document.createElement('div');
    div.className = 'flex gap-2';
    div.style.marginBottom = '0.75rem';
    div.innerHTML = `
        <input type="text" placeholder="Climber ${count} Name" class="input-field" value="Climber ${String.fromCharCode(65 + count - 1)}">
        <button type="button" onclick="this.parentNode.remove()" class="btn btn-red" style="width: 3rem; padding: 0;">X</button>
    `;
    container.appendChild(div);
}

// --- FINAL DECK GENERATOR (this ensures randomness and uniqueness) ---
function initializeDeck(routeLength) {
    const deck = [];

    // Add Eliminate cards (if any)
    const eliminateCount = Math.max(0, routeLength - 4);
    const eliminateCard = BASE_CARDS.find(c => c.type === 'Eliminate');
    for (let i = 0; i < eliminateCount; i++) {
        deck.push({ ...eliminateCard, id: `Elim-${i}-${Date.now()}-${Math.random()}` });
    }

    // Beta & Break
    const betaCards = BASE_CARDS.filter(c => c.type === 'Beta');
    const breakCards = BASE_CARDS.filter(c => c.type === 'Break');
    const numPlayers = gameState.players.length;
    const neededSets = numPlayers * 3;

    // Ensure enough cards in deck by repeating full shuffled sets if necessary
    let fullBetaSet = [];
    let fullBreakSet = [];
    while (fullBetaSet.length < neededSets) fullBetaSet = fullBetaSet.concat(shuffle([...betaCards]));
    while (fullBreakSet.length < neededSets) fullBreakSet = fullBreakSet.concat(shuffle([...breakCards]));

    // For real uniqueness, mix and assign unique IDs to EACH card instance in deck
    for (let i = 0; i < neededSets; i++) {
        deck.push({ ...fullBetaSet[i], id: `Beta-${i}-${Date.now()}-${Math.random()}` });
        deck.push({ ...fullBreakSet[i], id: `Break-${i}-${Date.now()}-${Math.random()}` });
    }

    return shuffle(deck);
}

// --- GAME LOGIC ---
function startGame() {
    const playerInputs = Array.from(document.querySelectorAll('#player-inputs input[type="text"]'));
    const climbers = playerInputs.map(i => i.value.trim()).filter(n => n.length > 0)
        .map(name => ({ name, isGhost: false, id: crypto.randomUUID() }));

    if (climbers.length < 2) { alert("You need at least two climbers to start the game."); return; }
    const routeLength = parseInt(document.getElementById('routeLength').value);
    if (routeLength < 5) { alert("Please enter a route length of 5 or more handholds."); return; }

    Object.assign(gameState, getInitialGameState());
    gameState.players = climbers;
    gameState.routeLength = routeLength;
    gameState.deck = initializeDeck(routeLength);
    gameState.discard = [];

    // Set up initial active Beta and Break
    const initBeta = gameState.deck.findIndex(c => c.type === 'Beta');
    if (initBeta !== -1) gameState.activeBeta = gameState.deck.splice(initBeta, 1)[0];
    const initBreak = gameState.deck.findIndex(c => c.type === 'Break');
    if (initBreak !== -1) gameState.activeBreak = gameState.deck.splice(initBreak, 1)[0];

    // 2nd shuffle for the remaining deck is fine (as in your original)
    gameState.deck = shuffle(gameState.deck);
    gameState.isAcknowledged = false;

    showGame();
    renderGame();
    saveGame();
}

function drawCard() {
    if (gameState.deck.length === 0) {
        if (gameState.discard.length === 0) return;
        gameState.deck = shuffle(gameState.discard);
        gameState.discard = [];
    }
    const drawnCard = gameState.deck[0];
    if (!drawnCard) return;

    gameState.pendingDrawnCard = drawnCard;

    document.getElementById('drawn-card-type').textContent = `${drawnCard.type} Card`;
    document.getElementById('drawn-card-name').textContent = drawnCard.name;
    document.getElementById('drawn-card-description').innerHTML = drawnCard.description_html;
    document.getElementById('drawn-card-image').style.backgroundImage = `url('${drawnCard.image_url}')`;

    const cardModal = document.getElementById('drawn-card-modal');
    let color = drawnCard.type === 'Beta' ? '#4338ca' : (drawnCard.type === 'Break' ? '#c2410c' : '#b91c1c');
    cardModal.style.borderTop = `8px solid ${color}`;

    document.getElementById('drawn-card-overlay').classList.remove('hidden');
    document.getElementById('draw-card-btn').classList.add('hidden');
    renderGame();
    saveGame();
}

function acknowledgeCard() {
    const drawnCard = gameState.pendingDrawnCard;
    if (!drawnCard) return;

    gameState.deck.shift();
    gameState.discard.push(drawnCard);

    const currentPlayer = gameState.players[gameState.currentClimberIndex];

    if (drawnCard.type === 'Beta') gameState.activeBeta = drawnCard;
    else if (drawnCard.type === 'Break') gameState.activeBreak = drawnCard;
    else if (drawnCard.type === 'Eliminate' && !currentPlayer.isGhost) {
        document.getElementById('drawn-card-overlay').classList.add('hidden');
        document.getElementById('eliminate-modal').classList.remove('hidden');
        gameState.pendingDrawnCard = null;
        renderGame();
        saveGame();
        return;
    }

    gameState.isAcknowledged = true;
    gameState.pendingDrawnCard = null;
    document.getElementById('drawn-card-overlay').classList.add('hidden');
    document.getElementById('send-outcome-buttons').classList.remove('hidden');
    renderGame();
    saveGame();
}

function confirmEliminateHold() {
    const holdName = document.getElementById('eliminated-hold-name').value.trim();
    if (holdName) {
        gameState.eliminatedHolds.push({ name: holdName, id: crypto.randomUUID() });
        document.getElementById('eliminated-hold-name').value = '';
        document.getElementById('eliminate-modal').classList.add('hidden');
        gameState.isAcknowledged = true;
        document.getElementById('send-outcome-buttons').classList.remove('hidden');
        renderGame();
        saveGame();
    } else {
        alert("Please enter a hold name.");
    }
}

function recordSendOutcome(succeeded) {
    const currentPlayer = gameState.players[gameState.currentClimberIndex];
    let shouldMove = true; 
    gameState.hasGhostSucceeded = false;

    if (succeeded) {
        if (currentPlayer.isGhost && gameState.eliminatedHolds.length > 0) {
            gameState.hasGhostSucceeded = true;
            shouldMove = false;
        }
    } else {
        currentPlayer.isGhost = true;
    }

    const active = gameState.players.filter(p => !p.isGhost);
    if (active.length <= 1) {
        endGame(active.length === 1 ? active[0].name : "The Ghosts won!");
        return;
    }

    if (shouldMove) moveToNextPlayer();
    else {
        renderGame();
        saveGame();
    }
}

function moveToNextPlayer() {
    document.getElementById('send-outcome-buttons').classList.add('hidden');
    document.getElementById('draw-card-btn').classList.remove('hidden');
    gameState.isAcknowledged = false; 
    gameState.hasGhostSucceeded = false; 
    gameState.currentClimberIndex = (gameState.currentClimberIndex + 1) % gameState.players.length;
    renderGame();
    saveGame();
}

function removeEliminatedHold(holdId) {
    const currentPlayer = gameState.players[gameState.currentClimberIndex];
    if (gameState.hasGhostSucceeded && currentPlayer && currentPlayer.isGhost) {
        gameState.eliminatedHolds = gameState.eliminatedHolds.filter(h => h.id !== holdId);
        moveToNextPlayer();
    }
    renderGame(); 
}

function endGame(winner) {
    document.getElementById('winner-name').textContent = winner === "The Ghosts won!"
        ? winner
        : `The Winner is: ${winner}!`;
    document.getElementById('winner-modal').classList.remove('hidden');
    localStorage.removeItem(CACHE_KEY);
}

function resetGame() {
    clearGame();
}

function renderGame() {
    const currentPlayer = gameState.players[gameState.currentClimberIndex] || {};
    document.getElementById('current-climber-name').textContent = currentPlayer ? currentPlayer.name : "N/A";
    document.getElementById('cards-remaining-count').textContent = gameState.deck.length;
    document.getElementById('problem-holds').textContent = `Holds: ${gameState.routeLength - gameState.eliminatedHolds.length}`;
    document.getElementById('active-beta-content').innerHTML = gameState.activeBeta ? gameState.activeBeta.description_html : 'No Active Beta.';
    document.getElementById('active-break-content').innerHTML = gameState.activeBreak ? gameState.activeBreak.description_html : 'No Active Break.';

    const holdsList = document.getElementById('eliminated-holds-list');
    holdsList.innerHTML = ''; 
    if (gameState.eliminatedHolds.length === 0) {
        holdsList.innerHTML = '<p class="text-sm text-gray-500 italic">None so far.</p>';
    } else {
        const canRemove = gameState.hasGhostSucceeded && currentPlayer && currentPlayer.isGhost;
        gameState.eliminatedHolds.forEach(hold => {
            const addBtn = canRemove 
                ? `<button onclick="removeEliminatedHold('${hold.id}')" class="ml-2 text-xs bg-white text-green-700 px-2 rounded hover:bg-green-100 border border-green-200">ADD</button>`
                : '';
            const div = document.createElement('div');
            div.className = 'eliminate-tag';
            div.innerHTML = `<span>${hold.name}</span>${addBtn}`;
            holdsList.appendChild(div);
        });
        if (canRemove) holdsList.innerHTML += `<p class="w-full text-sm text-red-700 mt-2 font-bold">Ghost Bonus: Click 'ADD' to return a hold to the problem and end turn!</p>`;
    }

    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';
    gameState.players.forEach((player, index) => {
        const isCurrent = index === gameState.currentClimberIndex;
        const div = document.createElement('div');
        div.className = `player-row ${isCurrent ? 'player-active' : 'player-inactive'}`;
        
        let badgeClass = player.isGhost ? 'badge-ghost' : 'badge-active';
        let badgeText = player.isGhost ? 'GHOST' : 'ACTIVE';
        if (isCurrent) {
            badgeClass = 'badge-climber';
            badgeText = player.isGhost ? 'GHOST TURN' : 'CLIMBER';
        }

        div.innerHTML = `
            <p class="font-bold text-gray-800 truncate">${player.name}</p>
            <span class="status-badge ${badgeClass}">${badgeText}</span>
        `;
        playerList.appendChild(div);
    });
    
    const drawBtn = document.getElementById('draw-card-btn');
    const outcomeBtns = document.getElementById('send-outcome-buttons');
    if (gameState.isAcknowledged) {
        drawBtn.classList.add('hidden');
        if (gameState.hasGhostSucceeded && currentPlayer && currentPlayer.isGhost) outcomeBtns.classList.add('hidden');
        else outcomeBtns.classList.remove('hidden');
    } else {
        drawBtn.classList.remove('hidden');
        outcomeBtns.classList.add('hidden');
    }
}

// --- INITIAL LOAD LOGIC ---
window.onload = function() { 
    const gameLoaded = loadGame();
    if (gameLoaded && gameState.players.length > 0) {
        showGame(); 
    } else {
        showSetup();
    }
    updateDeckEstimate(); 
    renderGame(); 
};

// --- HANDLER EXPORTS FOR HTML EVENTS ---
window.addClimberInput = addClimberInput;
window.startGame = startGame;
window.drawCard = drawCard;
window.acknowledgeCard = acknowledgeCard;
window.confirmEliminateHold = confirmEliminateHold;
window.recordSendOutcome = recordSendOutcome;
window.showRules = showRules;
window.hideRules = hideRules;
window.resetGame = resetGame;
window.removeEliminatedHold = removeEliminatedHold;