'use strict';

// ===== CONFIGURATION =====
const CONFIG = {
    playerColors: {
        Carlos: '#7c3aed',
        Carey: '#00d4ff',
        Jorge: '#10b981'
    },
    animationDuration: 2000,
    chartColors: {
        white: '#f8f9fa',
        black: '#475569',
        draw: '#7c3aed'
    }
};

// ===== STATISTICS DATA =====
let STATS = {"totalGames":296,"players":["Carey","Carlos","Jorge"],"playerStats":{"Carey":{"totalGames":122,"wins":60,"losses":60,"winRate":49},"Carlos":{"totalGames":255,"wins":136,"losses":111,"winRate":53},"Jorge":{"totalGames":215,"wins":91,"losses":116,"winRate":42}},"headToHead":{"Carey_vs_Carlos":{"total":81,"player1":"Carey","player2":"Carlos","player1Wins":36,"player2Wins":44,"draws":1},"Carlos_vs_Jorge":{"total":174,"player1":"Carlos","player2":"Jorge","player1Wins":92,"player2Wins":75,"draws":7},"Carey_vs_Jorge":{"total":41,"player1":"Carey","player2":"Jorge","player1Wins":24,"player2Wins":16,"draws":1}},"colorStats":{"whiteWins":141,"blackWins":146,"draws":9},"victoryMethods":{"Draw":9,"Time":3,"Resigned":46,"Checkmate":238},"brutality":{"totalBrutalGames":47,"byPlayer":{"Carey":{"inflicted":45,"suffered":60},"Carlos":{"inflicted":44,"suffered":26},"Jorge":{"inflicted":41,"suffered":44}},"topGames":[{"date":"5/12/2025","winner":"Jorge","loser":"Carey","rating":5,"note":"Grampa was gonna force the draw via the 50 move rule; Carey tipped his king in frustration with the peanut gallery (Carlos).Carey fladgulated himself to loss."},{"date":"3/23/2025","winner":"Carlos","loser":"Carey","rating":4,"note":"Scholar's Mate"},{"date":"6/17/2025","winner":"Carey","loser":"Jorge","rating":4,"note":"Annoyance"},{"date":"7/23/2025","winner":"Draw","loser":"Carey vs Carlos","rating":4,"note":"three white queens. Seemingly infinite check loops. Maximum absurdity."},{"date":"9/6/2025","winner":"Carlos","loser":"Carey","rating":4,"note":""}]},"timeStats":{"peakHour":21,"peakHourGames":62,"byPeriod":{"Night":165,"Morning":1,"Afternoon":71,"Evening":59}},"sessions":{"total":48,"avgGames":6,"epicSessions":[{"date":"9/27/2025","games":25,"players":"Carey, Carlos, Jorge","hours":5.3,"wins":{"Carlos":11,"Jorge":9,"Carey":4}},{"date":"12/30/2025","games":22,"players":"Carey, Carlos, Jorge","hours":4.37,"wins":{"Carlos":12,"Jorge":9,"Carey":1}},{"date":"12/24/2025","games":19,"players":"Carey, Carlos, Jorge","hours":4.39,"wins":{"Carlos":8,"Jorge":8,"Carey":3}},{"date":"5/22/2025","games":13,"players":"Carey, Carlos, Jorge","hours":2.7,"wins":{"Jorge":7,"Carlos":5,"Carey":0}},{"date":"11/5/2025","games":12,"players":"Carlos, Jorge","hours":3.0,"wins":{"Carlos":7,"Jorge":4,"Carey":0}},{"date":"4/6/2025","games":12,"players":"Carey, Carlos, Jorge","hours":3.0,"wins":{"Carlos":9,"Carey":1,"Jorge":1}},{"date":"7/13/2025","games":11,"players":"Carlos, Jorge","hours":2.75,"wins":{"Jorge":8,"Carlos":3,"Carey":0}},{"date":"6/17/2025","games":11,"players":"Carey, Carlos, Jorge","hours":2.75,"wins":{"Jorge":5,"Carey":4,"Carlos":2}},{"date":"12/24/2025","games":11,"players":"Carey, Carlos, Jorge","hours":2.75,"wins":{"Carlos":4,"Jorge":4,"Carey":3}},{"date":"11/9/2025","games":11,"players":"Carey, Carlos, Jorge","hours":2.75,"wins":{"Carlos":8,"Jorge":2,"Carey":1}},{"date":"9/6/2025","games":11,"players":"Carey, Carlos, Jorge","hours":2.75,"wins":{"Carlos":4,"Jorge":4,"Carey":3}},{"date":"6/13/2025","games":10,"players":"Carlos, Jorge","hours":2.5,"wins":{"Jorge":6,"Carlos":4,"Carey":0}}]},"streaks":{"Carey":8,"Carlos":11,"Jorge":8},"monthly":{"January":{"games":9,"wins":{"Carlos":7,"Carey":1,"Jorge":1},"losses":{"Carlos":2,"Carey":4,"Jorge":3}},"February":{"games":20,"wins":{"Carlos":10,"Carey":6,"Jorge":4},"losses":{"Carlos":7,"Carey":3,"Jorge":10}},"March":{"games":18,"wins":{"Carlos":7,"Carey":8,"Jorge":2},"losses":{"Carlos":5,"Carey":9,"Jorge":3}},"April":{"games":12,"wins":{"Carlos":9,"Carey":1,"Jorge":1},"losses":{"Carlos":1,"Carey":2,"Jorge":8}},"May":{"games":34,"wins":{"Carlos":8,"Carey":8,"Jorge":16},"losses":{"Carlos":15,"Carey":6,"Jorge":11}},"June":{"games":26,"wins":{"Carlos":8,"Carey":7,"Jorge":11},"losses":{"Carlos":13,"Carey":6,"Jorge":7}},"July":{"games":14,"wins":{"Carlos":4,"Carey":1,"Jorge":8},"losses":{"Carlos":9,"Carey":1,"Jorge":3}},"August":{"games":22,"wins":{"Carlos":10,"Carey":8,"Jorge":3},"losses":{"Carlos":8,"Carey":4,"Jorge":9}},"September":{"games":43,"wins":{"Carlos":20,"Carey":7,"Jorge":14},"losses":{"Carlos":13,"Carey":7,"Jorge":21}},"October":{"games":19,"wins":{"Carlos":7,"Carey":4,"Jorge":8},"losses":{"Carlos":8,"Carey":6,"Jorge":5}},"November":{"games":33,"wins":{"Carlos":24,"Carey":2,"Jorge":6},"losses":{"Carlos":8,"Carey":6,"Jorge":18}},"December":{"games":46,"wins":{"Carlos":22,"Carey":7,"Jorge":17},"losses":{"Carlos":22,"Carey":6,"Jorge":18}}},"quarterly":{"Q1":{"games":47,"wins":{"Carlos":24,"Carey":15,"Jorge":7}},"Q2":{"games":72,"wins":{"Carlos":25,"Carey":16,"Jorge":28}},"Q3":{"games":79,"wins":{"Carlos":34,"Carey":16,"Jorge":25}},"Q4":{"games":98,"wins":{"Carlos":53,"Carey":13,"Jorge":31}}}};

// ===== PLAYER COLOR PERFORMANCE DATA =====
const PLAYER_COLOR_STATS = {
  Carlos: {
    "January": { "white": { "wins": 3, "losses": 1, "draws": 0 }, "black": { "wins": 4, "losses": 1, "draws": 0 } },
    "February": { "white": { "wins": 3, "losses": 5, "draws": 0 }, "black": { "wins": 7, "losses": 2, "draws": 0 } },
    "March": { "white": { "wins": 6, "losses": 1, "draws": 0 }, "black": { "wins": 1, "losses": 4, "draws": 0 } },
    "April": { "white": { "wins": 4, "losses": 1, "draws": 1 }, "black": { "wins": 5, "losses": 0, "draws": 0 } },
    "May": { "white": { "wins": 4, "losses": 9, "draws": 0 }, "black": { "wins": 4, "losses": 6, "draws": 2 } },
    "June": { "white": { "wins": 5, "losses": 6, "draws": 0 }, "black": { "wins": 3, "losses": 7, "draws": 0 } },
    "July": { "white": { "wins": 3, "losses": 5, "draws": 0 }, "black": { "wins": 1, "losses": 4, "draws": 1 } },
    "August": { "white": { "wins": 4, "losses": 6, "draws": 1 }, "black": { "wins": 6, "losses": 2, "draws": 0 } },
    "September": { "white": { "wins": 9, "losses": 6, "draws": 1 }, "black": { "wins": 11, "losses": 7, "draws": 1 } },
    "October": { "white": { "wins": 3, "losses": 5, "draws": 0 }, "black": { "wins": 4, "losses": 3, "draws": 0 } },
    "November": { "white": { "wins": 14, "losses": 3, "draws": 0 }, "black": { "wins": 10, "losses": 5, "draws": 1 } },
    "December": { "white": { "wins": 11, "losses": 14, "draws": 0 }, "black": { "wins": 11, "losses": 8, "draws": 0 } },
    summary: { white: { games: 134, wins: 69, losses: 62, draws: 3, winRate: 51.5 }, black: { games: 121, wins: 67, losses: 49, draws: 5, winRate: 55.4 } }
  },
  Carey: {
    "January": { "white": { "wins": 1, "losses": 2, "draws": 0 }, "black": { "wins": 0, "losses": 2, "draws": 0 } },
    "February": { "white": { "wins": 3, "losses": 2, "draws": 0 }, "black": { "wins": 3, "losses": 1, "draws": 0 } },
    "March": { "white": { "wins": 6, "losses": 1, "draws": 1 }, "black": { "wins": 2, "losses": 8, "draws": 0 } },
    "April": { "white": { "wins": 0, "losses": 1, "draws": 0 }, "black": { "wins": 1, "losses": 1, "draws": 0 } },
    "May": { "white": { "wins": 3, "losses": 3, "draws": 0 }, "black": { "wins": 5, "losses": 3, "draws": 0 } },
    "June": { "white": { "wins": 4, "losses": 2, "draws": 0 }, "black": { "wins": 3, "losses": 4, "draws": 0 } },
    "July": { "white": { "wins": 0, "losses": 0, "draws": 1 }, "black": { "wins": 1, "losses": 1, "draws": 0 } },
    "August": { "white": { "wins": 4, "losses": 2, "draws": 0 }, "black": { "wins": 4, "losses": 2, "draws": 0 } },
    "September": { "white": { "wins": 4, "losses": 3, "draws": 0 }, "black": { "wins": 3, "losses": 4, "draws": 0 } },
    "October": { "white": { "wins": 2, "losses": 3, "draws": 0 }, "black": { "wins": 2, "losses": 3, "draws": 0 } },
    "November": { "white": { "wins": 1, "losses": 2, "draws": 0 }, "black": { "wins": 1, "losses": 4, "draws": 0 } },
    "December": { "white": { "wins": 1, "losses": 3, "draws": 0 }, "black": { "wins": 6, "losses": 3, "draws": 0 } },
    summary: { white: { games: 55, wins: 29, losses: 24, draws: 2, winRate: 52.7 }, black: { games: 67, wins: 31, losses: 36, draws: 0, winRate: 46.3 } }
  },
  Jorge: {
    "January": { "white": { "wins": 0, "losses": 2, "draws": 0 }, "black": { "wins": 1, "losses": 1, "draws": 0 } },
    "February": { "white": { "wins": 1, "losses": 6, "draws": 0 }, "black": { "wins": 3, "losses": 4, "draws": 0 } },
    "March": { "white": { "wins": 2, "losses": 1, "draws": 0 }, "black": { "wins": 0, "losses": 2, "draws": 1 } },
    "April": { "white": { "wins": 0, "losses": 5, "draws": 0 }, "black": { "wins": 1, "losses": 3, "draws": 1 } },
    "May": { "white": { "wins": 7, "losses": 6, "draws": 2 }, "black": { "wins": 9, "losses": 5, "draws": 0 } },
    "June": { "white": { "wins": 6, "losses": 3, "draws": 0 }, "black": { "wins": 5, "losses": 4, "draws": 0 } },
    "July": { "white": { "wins": 4, "losses": 1, "draws": 0 }, "black": { "wins": 4, "losses": 2, "draws": 0 } },
    "August": { "white": { "wins": 1, "losses": 4, "draws": 0 }, "black": { "wins": 2, "losses": 5, "draws": 1 } },
    "September": { "white": { "wins": 7, "losses": 12, "draws": 1 }, "black": { "wins": 7, "losses": 9, "draws": 1 } },
    "October": { "white": { "wins": 3, "losses": 3, "draws": 0 }, "black": { "wins": 5, "losses": 2, "draws": 0 } },
    "November": { "white": { "wins": 4, "losses": 8, "draws": 1 }, "black": { "wins": 2, "losses": 10, "draws": 0 } },
    "December": { "white": { "wins": 8, "losses": 9, "draws": 0 }, "black": { "wins": 9, "losses": 9, "draws": 0 } },
    summary: { white: { games: 107, wins: 43, losses: 60, draws: 4, winRate: 40.2 }, black: { games: 108, wins: 48, losses: 56, draws: 4, winRate: 44.4 } }
  }
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    createElement(tag, className = '', content = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (content) el.innerHTML = content;
        return el;
    },
    
    animateCounter(element, target, decimals = 0) {
        if (!element) return;
        let start = 0;
        const increment = target / (CONFIG.animationDuration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = decimals > 0 ? target.toFixed(decimals) : Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = decimals > 0 ? start.toFixed(decimals) : Math.floor(start);
            }
        }, 16);
    },
    
    formatDate(dateStr) {
        const date = new Date(dateStr);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    },
    
    getWinner(matchup) {
        const {player1, player2, player1Wins, player2Wins} = matchup;
        return player1Wins >= player2Wins ? player1 : player2;
    }
};

// ===== SVG CHART COMPONENTS =====
const Charts = {
    createDoughnut(player1Wins, player2Wins, draws, color1, color2) {
        const total = player1Wins + player2Wins + draws;
        if (total === 0) return '';
        
        const data = [];
        if (player1Wins > 0) data.push({value: player1Wins, itemStyle: {color: color1}});
        if (draws > 0) data.push({value: draws, itemStyle: {color: '#475569'}});
        if (player2Wins > 0) data.push({value: player2Wins, itemStyle: {color: color2}});
        
        return `<div class="echarts-container" style="width: 140px; height: 140px; position: relative;" data-chart-type="doughnut" data-chart-data='${JSON.stringify(data)}'></div>`;
    }
};

// ===== COMPONENTS =====
const Components = {
    playerLegend() {
        return STATS.players.map(player => `
            <div class="player-legend__item">
                <div class="player-legend__dot" style="background: ${CONFIG.playerColors[player]}; box-shadow: 0 0 12px ${CONFIG.playerColors[player]};"></div>
                <span class="player-legend__name" style="color: ${CONFIG.playerColors[player]};">${player}</span>
            </div>
        `).join('');
    },
    
    overview() {
        const avgSessionGames = STATS.sessions.avgGames;
        const avgMinutesPerGame = 15; // Average chess game duration estimate
        const avgSessionMinutes = Math.round(avgSessionGames * avgMinutesPerGame);
        const timedGames = 18;

        return `
            <div class="stats-grid--full section animate-in">
                <h2 class="section-title">Overview</h2>

                <!-- Hero Stats -->
                <div class="mb-lg" style="aspect-ratio: 1 / .6; width: 90%; margin-left: auto; margin-right: auto; background: linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(0, 212, 255, 0.12) 50%, rgba(16, 185, 129, 0.12) 100%); border-radius: var(--radius-lg); padding: var(--spacing-lg); border: 1px solid rgba(255, 255, 255, 0.1); display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; box-sizing: border-box;">
                    <div class="stat-number" style="font-size: clamp(12rem, 45vw, 60rem); font-weight: 900; background: linear-gradient(135deg, #7c3aed, #00d4ff, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 0.9; margin-bottom: var(--spacing-sm); max-width: 100%;" data-count="${STATS.totalGames}">0</div>
                    <div style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700; color: var(--color-text-primary); max-width: 100%; text-align: center;">Total Games</div>
                </div>

                <!-- Stats Grid -->
                <div class="overview-stats-grid">
                    <!-- Sessions Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(124, 58, 237, 0.04); border: 1px solid rgba(124, 58, 237, 0.15); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(124, 58, 237, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">Sessions</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: ${CONFIG.playerColors.Carlos}; line-height: 0.85; max-width: 100%;" data-count="${STATS.sessions.total}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Sessions</div>
                    </div>

                    <!-- Games per Session Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0, 212, 255, 0.04); border: 1px solid rgba(0, 212, 255, 0.15); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(0, 212, 255, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">Games Per</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: ${CONFIG.playerColors.Carey}; line-height: 0.85; max-width: 100%;" data-count="${avgSessionGames}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Games/Session</div>
                    </div>

                    <!-- Avg Session Duration Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.15); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(16, 185, 129, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">Avg Duration</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: ${CONFIG.playerColors.Jorge}; line-height: 0.85; max-width: 100%;" data-count="${avgSessionMinutes}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Mins/Session</div>
                    </div>

                    <!-- Brutal Games Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(220, 38, 38, 0.05); border: 1px solid rgba(220, 38, 38, 0.2); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(239, 68, 68, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">Brutality</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: #ef4444; line-height: 0.85; max-width: 100%;" data-count="${STATS.brutality.totalBrutalGames}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Savage Games</div>
                    </div>

                    <!-- Timed Games Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(16, 185, 129, 0.04); border: 1px solid rgba(16, 185, 129, 0.15); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(16, 185, 129, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">5:00 Mins</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: ${CONFIG.playerColors.Jorge}; line-height: 0.85; max-width: 100%;" data-count="${timedGames}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Timed Games</div>
                    </div>

                    <!-- Longest Streak Card -->
                    <div class="card" style="aspect-ratio: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(251, 191, 36, 0.05); border: 1px solid rgba(251, 191, 36, 0.2); padding: 0.5rem; gap: 0.25rem; overflow: hidden; box-sizing: border-box;">
                        <div style="font-size: clamp(0.7rem, 2vw, 0.85rem); font-weight: 600; color: rgba(251, 191, 36, 0.6); text-transform: uppercase; letter-spacing: 1.5px; max-width: 100%; text-align: center;">Consecutive Wins</div>
                        <div class="stat-number" style="font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; color: #fbbf24; line-height: 0.85; max-width: 100%;" data-count="${Math.max(...Object.values(STATS.streaks))}">0</div>
                        <div style="font-size: clamp(1.2rem, 3.5vw, 1.8rem); color: var(--color-text-secondary); font-weight: 500; max-width: 100%; text-align: center;">Best Streak</div>
                    </div>
                </div>
            </div>
        `;
    },
    
    playerStats() {
        const sortedPlayers = [...STATS.players].sort((a, b) => STATS.playerStats[b].winRate - STATS.playerStats[a].winRate);
        const playerBars = sortedPlayers.map((player, index) => {
            const stats = STATS.playerStats[player];
            const color = CONFIG.playerColors[player];
            const winRate = stats.winRate;
            const gradient = `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)`;

            let draws = 0;
            Object.entries(STATS.headToHead).forEach(([key, matchup]) => {
                if (matchup.player1 === player || matchup.player2 === player) {
                    draws += matchup.draws;
                }
            });
            
            const drawPercentage = (draws / stats.totalGames) * 100;
            const winPlusDrawPercentage = winRate + drawPercentage;

            return `
                <div class="${index < sortedPlayers.length - 1 ? 'mb-lg' : ''}">
                    <div style="display: flex; gap: var(--spacing-md); align-items: flex-start;">
                        <div style="flex-shrink: 0;">
                            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: ${color}; margin: 0;">${player}</h3>
                        </div>
                        <div style="flex: 1;">
                            <div style="background: rgba(255,255,255,0.05); height: 32px; border-radius: var(--radius-sm); overflow: hidden; position: relative; margin-bottom: var(--spacing-xs);">
                                <div style="background: ${gradient}; height: 100%; width: ${winRate}%; border-radius: var(--radius-sm) 0 0 var(--radius-sm); transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); display: flex; align-items: center; padding-left: 0.75rem;">
                                    <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: var(--color-bg-secondary); font-size: 0.85rem;">${stats.wins}W - ${stats.losses}L - ${draws}D</span>
                                </div>
                                ${drawPercentage > 0 ? `<div style="background: var(--color-accent-neutral); height: 100%; width: ${drawPercentage}%; position: absolute; left: ${winRate}%; top: 0;"></div>` : ''}
                                <div style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: ${color}; font-size: 1.1rem;">${stats.winRate}%</div>
                            </div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary);">
                                ${stats.totalGames} total games
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="1">
                <h2 class="section-title">Player Statistics</h2>
                ${playerBars}
            </div>
        `;
    },
    
    gameAnalytics() {
        const methods = STATS.victoryMethods;

        const methodColors = {
            'Checkmate': '#10b981',
            'Resigned': '#f59e0b',
            'Stalemate': '#6b7280',
            'Time': '#ef4444',
            'Draw': '#9ca3af'
        };

        const methodData = {
            methods: Object.keys(methods),
            values: Object.values(methods),
            colors: Object.entries(methods).map(([name]) => methodColors[name])
        };

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="2">
                <h2 class="section-title">Game Analytics</h2>
                <div class="card">
                    <div class="subsection-title">Victory Methods</div>
                    <div class="echarts-wrapper" style="width: 100%; height: 120px;" data-chart-type="stacked-bar" data-chart-data='${JSON.stringify(methodData)}'></div>
                </div>
            </div>
        `;
    },

    timedGames() {
        const timedGamesData = {
            total: 18,
            timeoutWins: 3,
            percentageOfTotal: 5.9,
            byPlayer: {
                'Carlos': { wins: 9, losses: 9, winRate: 50.0, timeWins: 0, timeLosses: 3, gamesAsWhite: 10, gamesAsBlack: 8 },
                'Jorge': { wins: 9, losses: 8, winRate: 52.9, timeWins: 3, timeLosses: 0, gamesAsWhite: 8, gamesAsBlack: 9 },
                'Carey': { wins: 0, losses: 1, winRate: 0, timeWins: 0, timeLosses: 0, gamesAsWhite: 0, gamesAsBlack: 1 }
            },
            colorStats: {
                whiteWins: 7,
                blackWins: 11,
                draws: 0
            }
        };

        // Sort players by total games (exclude Carey who only has 1 game)
        const activePlayers = Object.entries(timedGamesData.byPlayer)
            .filter(([player]) => player !== 'Carey')
            .sort((a, b) => (b[1].wins + b[1].losses) - (a[1].wins + a[1].losses));

        const playerBars = activePlayers.map(([player, stats]) => {
            const color = CONFIG.playerColors[player];

            return `
                <div style="margin-bottom: 1.5rem;">
                    <div style="display: flex; align-items: center; gap: var(--spacing-md); margin-bottom: 0.5rem;">
                        <div style="flex-shrink: 0; width: 80px;">
                            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; color: ${color}; margin: 0;">${player}</h3>
                        </div>
                        <div style="flex: 1; display: flex; align-items: center; gap: 0; height: 32px; background: rgba(255, 255, 255, 0.05); border-radius: var(--radius-md); overflow: hidden;">
                            <div style="background: linear-gradient(90deg, ${color}cc, ${color}); height: 100%; flex: ${stats.wins}; border-radius: 0;"></div>
                            <div style="background: rgba(255, 255, 255, 0.1); height: 100%; flex: ${stats.losses}; border-radius: 0;"></div>
                        </div>
                        <div style="flex-shrink: 0; width: 100px; text-align: right;">
                            <div style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${color}; font-size: 1rem;">${stats.wins}W-${stats.losses}L</div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-weight: 500; color: var(--color-text-secondary); font-size: 0.85rem;">${stats.winRate.toFixed(1)}%</div>
                        </div>
                    </div>
                    <div style="display: flex; gap: var(--spacing-md); margin-left: 95px; font-size: 0.85rem; color: var(--color-text-secondary);">
                        <span>⏱️ Time wins: ${stats.timeWins}</span>
                        <span>⏱️ Time losses: ${stats.timeLosses}</span>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="3">
                <h2 class="section-title">Timed Games (5:00 Minute)</h2>

                <!-- Summary Stats -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
                    <div class="card" style="text-align: center;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 2.5rem; font-weight: 800; color: var(--color-text-primary); margin-bottom: 0.5rem;">18</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary);">Total Timed Games</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.25rem;">5.9% of all games</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 2.5rem; font-weight: 800; color: ${CONFIG.playerColors.Jorge}; margin-bottom: 0.5rem;">3</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary);">Timeout Wins</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.25rem;">All by Jorge</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 2.5rem; font-weight: 800; color: #f8f9fa; margin-bottom: 0.5rem;">61%</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary);">Black Wins</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.25rem;">vs 39% White</div>
                    </div>
                    <div class="card" style="text-align: center;">
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 2.5rem; font-weight: 800; color: ${CONFIG.playerColors.Carlos}; margin-bottom: 0.5rem;">17</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary);">Carlos vs Jorge</div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.75rem; color: var(--color-text-secondary); margin-top: 0.25rem;">Only matchup</div>
                    </div>
                </div>

                <!-- Player Performance -->
                <div class="card">
                    <div class="subsection-title">Player Performance</div>
                    <div style="margin-bottom: var(--spacing-md); padding: var(--spacing-sm); background: rgba(16, 185, 129, 0.1); border-radius: var(--radius-md); border-left: 4px solid ${CONFIG.playerColors.Jorge};">
                        <div style="font-size: 0.9rem; color: var(--color-text-secondary);">
                            <strong style="color: ${CONFIG.playerColors.Jorge};">Jorge dominates time management</strong> - Won all 3 time expiration games, never lost on time
                        </div>
                    </div>
                    ${playerBars}
                    <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 1px solid rgba(255, 255, 255, 0.1); font-size: 0.85rem; color: var(--color-text-secondary);">
                        <em>Note: Carey played only 1 timed game (lost to Carlos)</em>
                    </div>
                </div>

                <!-- Session Highlights -->
                <div class="card" style="margin-top: var(--spacing-lg);">
                    <div class="subsection-title">Session Highlights</div>
                    <div style="margin-bottom: var(--spacing-sm); font-size: 0.9rem; color: var(--color-text-secondary);">
                        4 sessions with timed games • Average 4.5 games per session
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md);">
                        <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid ${CONFIG.playerColors.Jorge}; padding: var(--spacing-md); border-radius: var(--radius-md);">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">February 21, 2025</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.25rem;">🏆 7 timed games</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary);"><strong style="color: ${CONFIG.playerColors.Jorge};">Jorge 4W-3L</strong><br/>Carlos 3W-4L<br/>⏱️ 2 timeout wins</div>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid ${CONFIG.playerColors.Jorge}; padding: var(--spacing-md); border-radius: var(--radius-md);">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">July 13, 2025</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.25rem;">5 timed games</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary);"><strong style="color: ${CONFIG.playerColors.Jorge};">Jorge 3W-2L</strong><br/>Carlos 2W-3L<br/>⏱️ 1 timeout win</div>
                        </div>
                        <div style="background: rgba(124, 58, 237, 0.08); border-left: 4px solid ${CONFIG.playerColors.Carlos}; padding: var(--spacing-md); border-radius: var(--radius-md);">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">April 6, 2025</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.25rem;">5 timed games</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary);"><strong style="color: ${CONFIG.playerColors.Carlos};">Carlos 3W-2L</strong><br/>Jorge 2W-3L</div>
                        </div>
                        <div style="background: rgba(124, 58, 237, 0.08); border-left: 4px solid ${CONFIG.playerColors.Carlos}; padding: var(--spacing-md); border-radius: var(--radius-md);">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">July 23, 2025</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 0.25rem;">1 timed game</div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary);"><strong style="color: ${CONFIG.playerColors.Carlos};">Carlos</strong> vs Carey<br/>Carlos win</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    headToHead() {
        const matchups = Object.values(STATS.headToHead);
        
        const cards = matchups.map((matchup, index) => {
            const {player1, player2, player1Wins, player2Wins, draws, total} = matchup;
            const winner = Utils.getWinner(matchup);
            const leftPlayer = winner === player1 ? player1 : player2;
            const rightPlayer = winner === player1 ? player2 : player1;
            const leftWins = winner === player1 ? player1Wins : player2Wins;
            const rightWins = winner === player1 ? player2Wins : player1Wins;
            const leftColor = CONFIG.playerColors[leftPlayer];
            const rightColor = CONFIG.playerColors[rightPlayer];
            
            const doughnutData = [];
            if (leftWins > 0) doughnutData.push({name: leftPlayer, value: leftWins, itemStyle: {color: leftColor}});
            if (draws > 0) doughnutData.push({name: 'Draws', value: draws, itemStyle: {color: '#475569'}});
            if (rightWins > 0) doughnutData.push({name: rightPlayer, value: rightWins, itemStyle: {color: rightColor}});
            
            return `
                <div class="card animate-in" data-animate-delay="${index + 1}">
                    <div style="display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm);">
                        <div style="position: relative; width: 240px; height: 240px;">
                            <div class="echarts-wrapper" style="width: 100%; height: 100%;" data-chart-type="doughnut" data-chart-data='${JSON.stringify(doughnutData)}' data-center-text="${total} games"></div>
                        </div>
                        <div style="text-align: center; width: 100%;">
                            <div style="display: flex; justify-content: center; align-items: center; gap: var(--spacing-sm); margin-bottom: var(--spacing-xs);">
                                <div style="text-align: center;">
                                    <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.35rem; font-weight: 800; color: ${leftColor};">${leftPlayer}</div>
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary);">${((leftWins/total)*100).toFixed(1)}%</div>
                                </div>
                                <div style="font-family: 'Space Grotesk', sans-serif; font-size: 0.85rem; font-weight: 700; color: var(--color-text-secondary);">vs</div>
                                <div style="text-align: center;">
                                    <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1.35rem; font-weight: 800; color: ${rightColor};">${rightPlayer}</div>
                                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.8rem; font-weight: 500; color: var(--color-text-secondary);">${((rightWins/total)*100).toFixed(1)}%</div>
                                </div>
                            </div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.1rem; font-weight: 700; letter-spacing: 0.05em;">
                                <span style="color: ${leftColor}">${leftWins}</span> <span style="color: var(--color-text-secondary)">-</span> <span style="color: #64748b">${draws}</span> <span style="color: var(--color-text-secondary)">-</span> <span style="color: ${rightColor}">${rightWins}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="4">
                <h2 class="section-title">Head-to-Head Records</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-sm);">
                    ${cards}
                </div>
            </div>
        `;
    },
    
    brutality() {
        // Generate chess-themed headlines based on notes
        const generateHeadline = (game) => {
            const { winner, loser, note } = game;

            // Custom headlines based on specific notes
            if (note.includes('Scholar\'s Mate')) {
                return `${winner} caught ${loser} sleeping with the oldest trick in the book`;
            } else if (note.includes('50 move rule') || note.includes('fladgulated')) {
                return `${winner} psychologically dismantled ${loser} in an epic endgame`;
            } else if (note.includes('three white queens')) {
                return `Carey and Carlos create pure chaos`;
            } else if (note.includes('Annoyance')) {
                return `${winner} annoyed ${loser} into submission`;
            } else {
                return `${winner} destroyed ${loser}`;
            }
        };

        const topGames = STATS.brutality.topGames.slice(0, 5).map((game, index) => {
            const color = game.winner === 'Draw' ? '#9ca3af' : CONFIG.playerColors[game.winner];
            const brutalityIndicator = '🗡️'.repeat(game.rating);
            const headline = generateHeadline(game);
            const noteHtml = game.note ? `<div style="font-style: italic; margin-top: var(--spacing-sm); color: var(--color-text-secondary); font-size: 0.9rem; line-height: 1.5;">"${game.note}"</div>` : '';

            return `
                <div class="brutality-card" style="color: ${color};">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.75rem;">
                        <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--color-text-primary);">${Utils.formatDate(game.date)}</div>
                        <div style="font-size: 1.3rem; margin-left: var(--spacing-md);">${brutalityIndicator}</div>
                    </div>
                    <div style="font-family: 'JetBrains Mono', monospace; color: ${color}; font-size: 0.95rem; font-weight: 600;">
                        ${headline}
                    </div>
                    ${noteHtml}
                </div>
            `;
        }).join('');

        // Create rows with name, inflicted, and suffered
        const players = Object.entries(STATS.brutality.byPlayer)
            .sort((a, b) => {
                const order = { Carey: 0, Jorge: 1, Carlos: 2 };
                return (order[a[0]] ?? 3) - (order[b[0]] ?? 3);
            });

        const statsRows = players.map(([player, stats]) => {
            const color = CONFIG.playerColors[player];
            const maxStat = Math.max(...Object.values(STATS.brutality.byPlayer).flatMap(p => [p.inflicted, p.suffered]));
            const inflictedPercent = (stats.inflicted / maxStat) * 100;
            const sufferedPercent = (stats.suffered / maxStat) * 100;
            
            // Invert the player color for suffered bars
            const invertColor = (hex) => {
                const r = (255 - parseInt(hex.slice(1, 3), 16)).toString(16).padStart(2, '0');
                const g = (255 - parseInt(hex.slice(3, 5), 16)).toString(16).padStart(2, '0');
                const b = (255 - parseInt(hex.slice(5, 7), 16)).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            };
            const invertedColor = invertColor(color);

            return `
                <div style="margin: 0;">
                    <!-- Suffered Row (Odd) -->
                    <div style="display: flex; align-items: center; gap: 0;">
                        <div style="flex-shrink: 0; width: 80px; text-align: right; margin-right: var(--spacing-md);">
                            <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; color: ${color}; margin: 0;">${player}</h3>
                        </div>
                        <!-- Suffered bar (extends left) - invisible on odd rows -->
                        <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 0; margin-right: 0;">
                            <div style="background: transparent; height: 28px; border-radius: var(--radius-sm) 0 0 var(--radius-sm); overflow: hidden; flex-basis: ${sufferedPercent}%; margin-right: 0;">
                                <div style="background: transparent; height: 100%; width: 100%;"></div>
                            </div>
                        </div>
                        <!-- Center Divider -->
                        <div style="width: 2px; height: 28px; background: rgba(255,255,255,0.2); flex-shrink: 0; margin: 0;"></div>
                        <!-- Inflicted bar (extends right) - normal color on odd rows -->
                        <div style="flex: 1; display: flex; align-items: center; gap: 0; margin-left: 0;">
                            <div style="background: rgba(255,0,0,0.08); height: 28px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; overflow: hidden; flex-basis: ${inflictedPercent}%; margin-left: 0;">
                                <div style="background: linear-gradient(90deg, ${color}cc, ${color}); height: 100%; width: 100%;"></div>
                            </div>
                            <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${color}; font-size: 0.9rem; margin-left: 0.5rem; min-width: 40px; text-align: left;">${stats.inflicted}</span>
                        </div>
                    </div>
                    
                    <!-- Inflicted Row (Even) -->
                    <div style="display: flex; align-items: center; gap: 0; margin: 0;">
                        <div style="flex-shrink: 0; width: 80px; margin-right: var(--spacing-md);"></div>
                        <!-- Suffered bar (extends left) - normal color on even rows -->
                        <div style="flex: 1; display: flex; align-items: center; justify-content: flex-end; gap: 0; margin-right: 0;">
                            <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${invertedColor}; font-size: 0.9rem; margin-right: 0.5rem; min-width: 40px; text-align: right;">-${stats.suffered}</span>
                            <div style="background: rgba(255,0,0,0.08); height: 28px; border-radius: var(--radius-sm) 0 0 var(--radius-sm); overflow: hidden; flex-basis: ${sufferedPercent}%; margin-right: 0;">
                                <div style="background: linear-gradient(90deg, ${invertedColor}cc, ${invertedColor}); height: 100%; width: 100%;"></div>
                            </div>
                        </div>
                        <!-- Center Divider -->
                        <div style="width: 2px; height: 28px; background: rgba(255,255,255,0.2); flex-shrink: 0; margin: 0;"></div>
                        <!-- Inflicted bar (extends right) - invisible on even rows -->
                        <div style="flex: 1; display: flex; align-items: center; gap: 0; margin-left: 0;">
                            <div style="background: transparent; height: 28px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; overflow: hidden; flex-basis: ${inflictedPercent}%; margin-left: 0;">
                                <div style="background: transparent; height: 100%; width: 100%;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="5">
                <h2 class="section-title">Brutality Statistics</h2>

                <!-- What is Brutality Card -->
                <div class="card mb-lg">
                    <div class="subsection-title">What is Brutality?</div>
                    <div style="font-family: 'Inter', sans-serif; line-height: 1.6; color: var(--color-text-secondary);">
                        <strong>Brutality Inflicted</strong> = Total brutality points from games where the player won (how savage their victories were)<br/><br/>
                        <strong>Brutality Suffered</strong> = Total brutality points from games where the player lost (how crushing their defeats were)
                    </div>
                </div>

                <!-- Stats Chart Card with Visual Bars -->
                <div class="card mb-lg">
                    <div class="subsection-title">Player Brutality Rankings</div>
                    <div style="display: flex; align-items: flex-end; gap: 0; margin-bottom: 1.5rem;">
                        <div style="flex-shrink: 0; width: 80px;"></div>
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0;">
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--color-text-secondary);">Suffered</div>
                        </div>
                        <div style="width: 2px;"></div>
                        <div style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 0;">
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--color-text-secondary);">Inflicted</div>
                        </div>
                    </div>
                    ${statsRows}
                </div>

                <!-- Brutality Paradox Card -->
                <div class="card mb-lg">
                    <div class="subsection-title">The Brutality Paradox</div>
                    <div style="font-family: 'Inter', sans-serif; line-height: 1.8; color: var(--color-text-secondary);">
                        <div class="mb-md"><strong style="color: ${CONFIG.playerColors.Carey};">Carey's Story:</strong> Inflicted 45 points but suffered 60 - Carey's losses tend to be more brutal than victories</div>
                        <div class="mb-md"><strong style="color: ${CONFIG.playerColors.Carlos};">Carlos's Dominance:</strong> Inflicted 44 points but only suffered 26 - More dignified defeats, savage wins</div>
                        <div><strong style="color: ${CONFIG.playerColors.Jorge};">Jorge's Balance:</strong> Inflicted 41, suffered 44 - Nearly balanced brutality in wins and losses</div>
                    </div>
                </div>

                <!-- Most Savage Moments Card -->
                ${topGames ? `
                <div class="card">
                    <div class="subsection-title">Most Savage Moments</div>
                    ${topGames}
                </div>
                ` : ''}
            </div>
        `;
    },
    
    sessions() {
        const sessions = STATS.sessions.epicSessions.slice(0, 12).map((session) => {
            // Format date to match "September 27th" style
            const formatSessionDate = (dateStr) => {
                const [month, day] = dateStr.split('/');
                const months = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
                const dayNum = parseInt(day);
                const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st' :
                              dayNum === 2 || dayNum === 22 ? 'nd' :
                              dayNum === 3 || dayNum === 23 ? 'rd' : 'th';
                return `${months[parseInt(month) - 1]} ${dayNum}${suffix}`;
            };

            const wins = session.wins || {};

            // Find the player with most wins
            const topPlayer = Object.entries(wins)
                .filter(([, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])[0];

            const topPlayerColor = topPlayer ? CONFIG.playerColors[topPlayer[0]] : 'rgba(156, 163, 175, 0.6)';

            // Extract RGB values from hex color for transparent background on hover
            const hexToRgba = (hex, alpha) => {
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            };

            const topPlayerColorHover = topPlayer ? hexToRgba(CONFIG.playerColors[topPlayer[0]], 0.15) : 'rgba(26, 26, 26, 0.85)';

            const winsDisplay = Object.entries(wins)
                .filter(([, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([player, count]) => {
                    const color = CONFIG.playerColors[player];
                    return `<span style="color: ${color}; font-weight: 600;">${player}: ${count}W</span>`;
                })
                .join('  ');

            return `
                <div class="session-card" 
                     style="color: ${topPlayerColor};"
                     onmouseenter="this.style.backgroundColor='${topPlayerColorHover}'; this.style.transform='translateX(4px)';"
                     onmouseleave="this.style.backgroundColor='transparent'; this.style.transform='translateX(0)';">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.2rem; color: var(--color-text-primary); margin-bottom: var(--spacing-xs);">
                                ${formatSessionDate(session.date)}
                            </div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem;">
                                ${winsDisplay}
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; color: var(--color-text-primary);">
                                ${session.games} <span style="font-size: 0.9rem; color: var(--color-text-secondary);">games</span>
                            </div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--color-text-secondary);">
                                ${session.hours} hours
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="6">
                <h2 class="section-title">Epic Sessions (10+ Games)</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: var(--spacing-md);">
                    ${sessions}
                </div>
            </div>
        `;
    },

    playerHighlights() {
        const highlights = [
            {
                player: 'Carlos',
                accomplishments: [
                    { icon: '👑', label: '2025 Champion', value: '53% Win Rate' },
                    { icon: '🔥', label: 'Longest Win Streak', value: '11 Games' },
                    { icon: '🛡️', label: 'Never Surrender', value: '1% Resignation Rate' }
                ]
            },
            {
                player: 'Carey',
                accomplishments: [
                    { icon: '⚖️', label: 'Perfect Balance', value: '60W - 60L' },
                    { icon: '🎲', label: 'Hot Streak', value: '8 Game Win Streak' },
                    { icon: '💀', label: 'Brutality Magnet', value: '60 Points Suffered' }
                ]
            },
            {
                player: 'Jorge',
                accomplishments: [
                    { icon: '🗡️', label: 'Most Brutal Victory', value: '5 Dagger Rating' },
                    { icon: '⏱️', label: 'Clock Assassin', value: 'Only Player with Time Wins' },
                    { icon: '🎪', label: 'Endgame Specialist', value: 'Master of Long Games' },
                ]
            }
        ];

        const cards = highlights.map((highlight) => {
            const color = CONFIG.playerColors[highlight.player];
            const accomplishmentsList = highlight.accomplishments.map(acc => `
                <div class="nested-item">
                    <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                        <div style="font-size: 1.5rem; flex-shrink: 0;">${acc.icon}</div>
                        <div style="flex: 1;">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 0.8rem; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.05em;">${acc.label}</div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.95rem; font-weight: 600; color: ${color};">${acc.value}</div>
                        </div>
                    </div>
                </div>
            `).join('');

            return `
                <div class="card card--accent-top" style="color: ${color};">
                    <div style="text-align: center; margin-bottom: var(--spacing-lg);">
                        <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 1.8rem; font-weight: 700; color: ${color}; margin: 0;">${highlight.player}</h3>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-xs);">Notable Achievements</div>
                    </div>
                    ${accomplishmentsList}
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="7">
                <h2 class="section-title">Player Highlights</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--spacing-md);">
                    ${cards}
                </div>
            </div>
        `;
    },

    yearTimeline() {
        // Quarterly summary
        const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        const quarterlyCards = quarters.map(q => {
            const data = STATS.quarterly[q];
            const winner = data.wins.Carlos > data.wins.Jorge && data.wins.Carlos > data.wins.Carey ? 'Carlos' :
                          data.wins.Jorge > data.wins.Carey ? 'Jorge' : 'Carey';
            const winnerColor = CONFIG.playerColors[winner];

            return `
                <div style="background: rgba(26, 26, 26, 0.6); border-radius: 8px; padding: 1rem; border-top: 3px solid ${winnerColor};">
                    <div style="font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--color-text-primary); margin-bottom: 0.5rem;">
                        ${q}
                    </div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; font-weight: 700; color: var(--color-text-primary); margin-bottom: 0.5rem;">
                        ${data.games} <span style="font-size: 0.8rem; color: rgba(248, 249, 250, 0.5);">games</span>
                    </div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 0.75rem; display: flex; gap: 0.5rem;">
                        <span style="color: ${CONFIG.playerColors.Carlos};">C:${data.wins.Carlos}</span>
                        <span style="color: ${CONFIG.playerColors.Carey};">C:${data.wins.Carey}</span>
                        <span style="color: ${CONFIG.playerColors.Jorge};">J:${data.wins.Jorge}</span>
                    </div>
                    <div style="margin-top: 0.5rem; font-family: 'Inter', sans-serif; font-size: 0.75rem; color: ${winnerColor};">
                        ${winner} dominated
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="8">
                <h2 class="section-title">Timeline</h2>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
                    ${quarterlyCards}
                </div>

                <div class="card">
                    <div style="text-align: center; margin-bottom: var(--spacing-lg);">
                        <div class="subsection-title" style="text-align: center; border: none; padding: 0;">
                            Monthly Win-Loss Trends
                        </div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-xs);">
                            Player performance throughout the year
                        </div>
                    </div>

                    <div id="monthly-trends-chart" style="width: 100%; height: 400px;"></div>
                </div>
            </div>
        `;
    },

    colorPerformance() {
        const players = ['Carlos', 'Carey', 'Jorge'];

        // Generate tabs
        const tabs = players.map((player, index) => {
            const color = CONFIG.playerColors[player];
            const isActive = index === 0 ? 'tab-button--active' : '';
            return `
                <button class="tab-button color-tab ${isActive}"
                        data-player="${player}"
                        style="border-color: ${color}; ${isActive ? `background: ${color}; color: var(--color-bg-primary);` : ''}">
                    ${player}
                </button>
            `;
        }).join('');

        // Generate content for each player
        const playerContent = players.map((player, index) => {
            const stats = PLAYER_COLOR_STATS[player].summary;
            const isActive = index === 0 ? 'active' : '';
            const color = CONFIG.playerColors[player];

            return `
                <div class="color-tab-content ${isActive}" data-player="${player}" style="display: ${isActive ? 'block' : 'none'};">
                    <div style="text-align: center; margin-bottom: var(--spacing-lg);">
                        <div class="subsection-title" style="color: ${color}; text-align: center; border: none; padding: 0;">
                            ${player}'s Wins & Losses by Piece Color
                        </div>
                        <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-xs);">
                            White pieces vs Black pieces performance throughout 2025
                        </div>
                    </div>

                    <div id="${player.toLowerCase()}-color-chart" style="width: 100%; height: 400px;"></div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-top: var(--spacing-md);">
                        <div style="background: rgba(248, 249, 250, 0.05); border-radius: var(--radius-md); padding: var(--spacing-md); border-left: 4px solid ${CONFIG.chartColors.white};">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: ${CONFIG.chartColors.white}; margin-bottom: var(--spacing-sm);">
                                As White
                            </div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; color: var(--color-text-primary);">
                                <span style="color: #10b981;">${stats.white.wins}W</span> - <span style="color: #ef4444;">${stats.white.losses}L</span> - <span style="color: #64748b;">${stats.white.draws}D</span>
                            </div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-sm);">
                                ${stats.white.games} total games (${stats.white.winRate}% win rate)
                            </div>
                        </div>

                        <div style="background: rgba(71, 85, 105, 0.15); border-radius: var(--radius-md); padding: var(--spacing-md); border-left: 4px solid ${CONFIG.chartColors.black};">
                            <div style="font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: ${CONFIG.chartColors.black}; margin-bottom: var(--spacing-sm);">
                                As Black
                            </div>
                            <div style="font-family: 'JetBrains Mono', monospace; font-size: 1.3rem; color: var(--color-text-primary);">
                                <span style="color: #10b981;">${stats.black.wins}W</span> - <span style="color: #ef4444;">${stats.black.losses}L</span> - <span style="color: #64748b;">${stats.black.draws}D</span>
                            </div>
                            <div style="font-family: 'Inter', sans-serif; font-size: 0.85rem; color: var(--color-text-secondary); margin-top: var(--spacing-sm);">
                                ${stats.black.games} total games (${stats.black.winRate}% win rate)
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        return `
            <div class="stats-grid--full section animate-in" data-animate-delay="9">
                <h2 class="section-title">Color Performance</h2>

                <div class="card">
                    <!-- Tab Buttons -->
                    <div style="display: flex; gap: var(--spacing-md); margin-bottom: var(--spacing-lg); justify-content: center; flex-wrap: wrap;">
                        ${tabs}
                    </div>

                    <!-- Tab Content -->
                    ${playerContent}
                </div>
            </div>
        `;
    }
};

// ===== APP CLASS =====
class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.loadData();
    }

    async loadData() {
        // Data is embedded, just initialize
        this.init();
    }

    init() {
        this.render();
        this.animateCounters();
        this.initECharts();
    }
    
    render() {
        const html = `
            ${Components.overview()}
            ${Components.playerStats()}
            ${Components.gameAnalytics()}
            ${Components.headToHead()}
            ${Components.timedGames()}
            ${Components.yearTimeline()}
            ${Components.brutality()}
            ${Components.playerHighlights()}
            ${Components.sessions()}
        `;

        this.appElement.innerHTML = html;
    }
    
    initECharts() {
        requestAnimationFrame(() => {
            const echartsWrappers = document.querySelectorAll('.echarts-wrapper');
            echartsWrappers.forEach(wrapper => {
                const chartType = wrapper.dataset.chartType;
                const chartDataRaw = JSON.parse(wrapper.dataset.chartData);
                
                const chart = echarts.init(wrapper);
                let option = {};
                
                if (chartType === 'bar') {
                    // Bar chart configuration
                    const { players, winRates, colors } = chartDataRaw;
                    
                    option = {
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'axis',
                            formatter: function(params) {
                                if (params.length > 0) {
                                    const param = params[0];
                                    const stats = STATS.playerStats[param.name];
                                    let draws = 0;
                                    Object.entries(STATS.headToHead).forEach(([key, matchup]) => {
                                        if (matchup.player1 === param.name || matchup.player2 === param.name) {
                                            draws += matchup.draws;
                                        }
                                    });
                                    return `${param.name}: ${stats.wins}W - ${stats.losses}L - ${draws}D (${param.value.toFixed(1)}%)`;
                                }
                                return '';
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            borderColor: '#666',
                            textStyle: { color: '#fff' }
                        },
                        grid: {
                            left: '10%',
                            right: '5%',
                            top: '15%',
                            bottom: '10%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value',
                            min: 0,
                            max: 100,
                            axisLabel: {
                                color: 'rgba(248, 249, 250, 0.6)',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 11,
                                formatter: '{value}%'
                            },
                            axisLine: { show: false },
                            splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.08)' } }
                        },
                        yAxis: {
                            type: 'category',
                            data: players,
                            axisLabel: {
                                color: 'rgba(248, 249, 250, 0.7)',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 12,
                                fontWeight: 700
                            },
                            axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
                            splitLine: { show: false }
                        },
                        series: [{
                            name: 'Win Rate',
                            data: winRates.map((rate, index) => {
                                const player = players[index];
                                const stats = STATS.playerStats[player];
                                let draws = 0;
                                Object.entries(STATS.headToHead).forEach(([key, matchup]) => {
                                    if (matchup.player1 === player || matchup.player2 === player) {
                                        draws += matchup.draws;
                                    }
                                });
                                return {
                                    value: rate,
                                    itemStyle: { color: colors[index] },
                                    wld: `${stats.wins}W - ${stats.losses}L - ${draws}D`
                                };
                            }),
                            type: 'bar',
                            radius: [0, 6, 6, 0],
                            emphasis: {
                                itemStyle: {
                                    opacity: 0.8,
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: {
                                show: true,
                                position: 'right',
                                color: 'rgba(248, 249, 250, 0.9)',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 10,
                                fontWeight: 700,
                                formatter: function(params) {
                                    return `${params.value.toFixed(1)}%`;
                                }
                            }
                        }]
                    };
                } else if (chartType === 'stacked-bar') {
                    // Stacked horizontal bar chart configuration
                    const { methods, values, colors } = chartDataRaw;
                    
                    option = {
                        backgroundColor: 'transparent',
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                return `${params.seriesName}: ${params.value}`;
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            borderColor: '#666',
                            textStyle: { color: '#fff' }
                        },
                        grid: {
                            left: '2%',
                            right: '2%',
                            top: '5%',
                            bottom: '5%',
                            containLabel: false
                        },
                        xAxis: {
                            type: 'value',
                            boundaryGap: [0, 0],
                            axisLabel: { show: false },
                            axisLine: { show: false },
                            axisTick: { show: false },
                            splitLine: { show: false }
                        },
                        yAxis: {
                            type: 'category',
                            data: ['Victory Methods'],
                            axisLabel: { show: false },
                            axisLine: { show: false },
                            axisTick: { show: false },
                            splitLine: { show: false }
                        },
                        series: methods.map((method, index) => ({
                            name: method,
                            data: [values[index]],
                            type: 'bar',
                            stack: 'victory',
                            itemStyle: {
                                color: colors[index]
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                formatter: (params) => {
                                    const total = values.reduce((a, b) => a + b, 0);
                                    const percentage = ((params.value / total) * 100).toFixed(1);
                                    return percentage > 8 ? `${method}\n${params.value}` : '';
                                },
                                color: '#fff',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontWeight: 700,
                                fontSize: 12,
                                padding: [4, 8]
                            },
                            emphasis: {
                                itemStyle: {
                                    opacity: 0.9
                                }
                            }
                        }))
                    };
                } else {
                    // Pie/Doughnut chart configuration
                    const chartData = chartType === 'doughnut' || chartType === 'pie' ? chartDataRaw : [];
                    
                    // Calculate startAngle for doughnut charts to show smallest slice at top
                    let startAngle = 90; // Default for pie charts
                    if (chartType === 'doughnut') {
                        // Find the smallest value and its position
                        let minValue = Infinity;
                        let minIndex = 0;
                        chartData.forEach((item, index) => {
                            if (item.value < minValue) {
                                minValue = item.value;
                                minIndex = index;
                            }
                        });
                        
                        // Calculate cumulative angle up to the smallest slice
                        const total = chartData.reduce((sum, item) => sum + item.value, 0);
                        let cumulativeAngle = 0;
                        for (let i = 0; i < minIndex; i++) {
                            cumulativeAngle += (chartData[i].value / total) * 360;
                        }
                        // Position smallest slice at top (90 degrees)
                        startAngle = 90 + cumulativeAngle;
                    }
                    
                    // Different radius config for pie vs doughnut
                    const radius = chartType === 'doughnut' ? ['30%', '70%'] : '70%';
                    const labelConfig = chartType === 'doughnut' ? {
                        formatter: '{c}',
                        rich: {
                            c: {
                                color: 'rgba(248, 249, 250, 0.8)',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13,
                                textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                textShadowBlur: 3
                            }
                        },
                        position: 'inside',
                        padding: [4, 7]
                    } : {
                        formatter: (params) => {
                            return `{b|${params.name}}\n{c|${params.value} (${params.percent.toFixed(1)}%)}`;
                        },
                        rich: {
                            b: {
                                color: '#fff',
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontWeight: 700,
                                fontSize: 14,
                                textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                textShadowBlur: 4
                            },
                            c: {
                                color: 'rgba(248, 249, 250, 0.85)',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12,
                                textShadowColor: 'rgba(0, 0, 0, 0.9)',
                                textShadowBlur: 4
                            }
                        },
                        position: 'inside',
                        padding: [5, 10]
                    };
                    
                    option = {
                        backgroundColor: 'transparent',
                        grid: {
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: function(params) {
                                if (chartType === 'doughnut') {
                                    return `${params.name}: ${params.percent.toFixed(1)}%`;
                                } else {
                                    return `${params.name}: ${params.percent.toFixed(1)}%`;
                                }
                            },
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            borderColor: '#666',
                            textStyle: { color: '#fff' }
                        },
                        series: [{
                            type: 'pie',
                            radius: radius,
                            center: ['50%', '50%'],
                            startAngle: startAngle,
                            data: chartData,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            label: labelConfig,
                            itemStyle: {
                                borderColor: 'rgba(0, 0, 0, 0.3)',
                                borderWidth: 1
                            }
                        }]
                    };
                    
                    // Add center text for doughnut charts
                    if (chartType === 'doughnut') {
                        const centerText = wrapper.dataset.centerText || '';
                        if (centerText) {
                            const parts = centerText.split(' ');
                            const line1 = parts[0]; // e.g., "81"
                            const line2 = parts.slice(1).join(' '); // e.g., "games"
                            option.graphic = [{
                                type: 'text',
                                left: 'center',
                                top: '44%',
                                style: {
                                    text: line1,
                                    fill: 'rgba(248, 249, 250, 0.9)',
                                    fontFamily: "'Space Grotesk', sans-serif",
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    textAlign: 'center'
                                }
                            }, {
                                type: 'text',
                                left: 'center',
                                top: '51%',
                                style: {
                                    text: line2.toUpperCase(),
                                    fill: 'rgba(248, 249, 250, 0.9)',
                                    fontFamily: "'JetBrains Mono', monospace",
                                    fontSize: 11,
                                    textAlign: 'center'
                                }
                            }];
                        }
                    }
                }
                
                chart.setOption(option);
                window.addEventListener('resize', () => chart.resize());
            });
        });

        // Initialize monthly trends line chart
        const monthlyTrendsEl = document.getElementById('monthly-trends-chart');
        if (monthlyTrendsEl) {
            const monthlyChart = echarts.init(monthlyTrendsEl);

            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];

            // Extract win data for each player
            const carlosWins = monthsFull.map(m => STATS.monthly[m]?.wins?.Carlos || 0);
            const careyWins = monthsFull.map(m => STATS.monthly[m]?.wins?.Carey || 0);
            const jorgeWins = monthsFull.map(m => STATS.monthly[m]?.wins?.Jorge || 0);

            // Extract actual loss data from monthly stats
            const carlosLosses = monthsFull.map(m => STATS.monthly[m]?.losses?.Carlos || 0);
            const careyLosses = monthsFull.map(m => STATS.monthly[m]?.losses?.Carey || 0);
            const jorgeLosses = monthsFull.map(m => STATS.monthly[m]?.losses?.Jorge || 0);

            const option = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderColor: '#666',
                    textStyle: { color: '#fff', fontFamily: "'Inter', sans-serif" },
                    formatter: function(params) {
                        let result = `<div style="font-weight: 700; margin-bottom: 8px;">${params[0].axisValue}</div>`;
                        params.forEach(param => {
                            const label = param.seriesName.includes('Wins') ? 'wins' : 'losses';
                            result += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${param.color};"></span>
                                <span>${param.seriesName}: <strong>${param.value}</strong></span>
                            </div>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['Carlos Wins', 'Carlos Losses', 'Carey Wins', 'Carey Losses', 'Jorge Wins', 'Jorge Losses'],
                    top: 10,
                    textStyle: {
                        color: 'rgba(248, 249, 250, 0.8)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 11,
                        fontWeight: 600
                    },
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 12
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '15%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: months,
                    boundaryGap: false,
                    axisLabel: {
                        color: 'rgba(248, 249, 250, 0.6)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11
                    },
                    axisLine: {
                        lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    splitLine: { show: false }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'rgba(248, 249, 250, 0.6)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11
                    },
                    axisLine: { show: false },
                    splitLine: {
                        lineStyle: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                },
                series: [
                    // Carlos Wins
                    {
                        name: 'Carlos Wins',
                        type: 'line',
                        data: carlosWins,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Carlos,
                            width: 3
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Carlos,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 4 }
                        }
                    },
                    // Carlos Losses
                    {
                        name: 'Carlos Losses',
                        type: 'line',
                        data: carlosLosses,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Carlos,
                            width: 2,
                            type: 'dashed'
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Carlos,
                            borderWidth: 1,
                            borderColor: '#fff',
                            opacity: 0.6
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 3 }
                        }
                    },
                    // Carey Wins
                    {
                        name: 'Carey Wins',
                        type: 'line',
                        data: careyWins,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Carey,
                            width: 3
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Carey,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 4 }
                        }
                    },
                    // Carey Losses
                    {
                        name: 'Carey Losses',
                        type: 'line',
                        data: careyLosses,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Carey,
                            width: 2,
                            type: 'dashed'
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Carey,
                            borderWidth: 1,
                            borderColor: '#fff',
                            opacity: 0.6
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 3 }
                        }
                    },
                    // Jorge Wins
                    {
                        name: 'Jorge Wins',
                        type: 'line',
                        data: jorgeWins,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Jorge,
                            width: 3
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Jorge,
                            borderWidth: 2,
                            borderColor: '#fff'
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 4 }
                        }
                    },
                    // Jorge Losses
                    {
                        name: 'Jorge Losses',
                        type: 'line',
                        data: jorgeLosses,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: {
                            color: CONFIG.playerColors.Jorge,
                            width: 2,
                            type: 'dashed'
                        },
                        itemStyle: {
                            color: CONFIG.playerColors.Jorge,
                            borderWidth: 1,
                            borderColor: '#fff',
                            opacity: 0.6
                        },
                        emphasis: {
                            focus: 'series',
                            lineStyle: { width: 3 }
                        }
                    }
                ]
            };

            monthlyChart.setOption(option);
            window.addEventListener('resize', () => monthlyChart.resize());
        }

        // Initialize color performance charts for all players
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthsFull = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December'];

        const players = ['Carlos', 'Carey', 'Jorge'];
        const colorCharts = {};

        players.forEach(player => {
            const chartEl = document.getElementById(`${player.toLowerCase()}-color-chart`);
            if (!chartEl) return;

            const chart = echarts.init(chartEl);
            colorCharts[player] = chart;

            // Extract data from PLAYER_COLOR_STATS
            const playerData = PLAYER_COLOR_STATS[player];
            const whiteWins = monthsFull.map(m => playerData[m].white.wins);
            const whiteLosses = monthsFull.map(m => playerData[m].white.losses);
            const blackWins = monthsFull.map(m => playerData[m].black.wins);
            const blackLosses = monthsFull.map(m => playerData[m].black.losses);

            const colorOption = {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    borderColor: '#666',
                    textStyle: { color: '#fff', fontFamily: "'Inter', sans-serif" },
                    formatter: function(params) {
                        let result = `<div style="font-weight: 700; margin-bottom: 8px;">${params[0].axisValue}</div>`;
                        params.forEach(param => {
                            result += `<div style="display: flex; align-items: center; gap: 8px; margin: 4px 0;">
                                <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${param.color};"></span>
                                <span>${param.seriesName}: <strong>${param.value}</strong></span>
                            </div>`;
                        });
                        return result;
                    }
                },
                legend: {
                    data: ['White Wins', 'White Losses', 'Black Wins', 'Black Losses'],
                    top: 10,
                    textStyle: {
                        color: 'rgba(248, 249, 250, 0.8)',
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 11,
                        fontWeight: 600
                    },
                    itemWidth: 20,
                    itemHeight: 10,
                    itemGap: 12
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    top: '15%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: months,
                    boundaryGap: false,
                    axisLabel: {
                        color: 'rgba(248, 249, 250, 0.6)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11
                    },
                    axisLine: {
                        lineStyle: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    splitLine: { show: false }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'rgba(248, 249, 250, 0.6)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11
                    },
                    axisLine: { show: false },
                    splitLine: {
                        lineStyle: { color: 'rgba(255, 255, 255, 0.05)' }
                    }
                },
                series: [
                    {
                        name: 'White Wins',
                        type: 'line',
                        data: whiteWins,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: { color: CONFIG.chartColors.white, width: 3 },
                        itemStyle: { color: CONFIG.chartColors.white, borderWidth: 2, borderColor: '#10b981' },
                        emphasis: { focus: 'series', lineStyle: { width: 4 } }
                    },
                    {
                        name: 'White Losses',
                        type: 'line',
                        data: whiteLosses,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: { color: CONFIG.chartColors.white, width: 2, type: 'dashed' },
                        itemStyle: { color: CONFIG.chartColors.white, borderWidth: 1, borderColor: '#ef4444', opacity: 0.6 },
                        emphasis: { focus: 'series', lineStyle: { width: 3 } }
                    },
                    {
                        name: 'Black Wins',
                        type: 'line',
                        data: blackWins,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: { color: CONFIG.chartColors.black, width: 3 },
                        itemStyle: { color: CONFIG.chartColors.black, borderWidth: 2, borderColor: '#10b981' },
                        emphasis: { focus: 'series', lineStyle: { width: 4 } }
                    },
                    {
                        name: 'Black Losses',
                        type: 'line',
                        data: blackLosses,
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 6,
                        lineStyle: { color: CONFIG.chartColors.black, width: 2, type: 'dashed' },
                        itemStyle: { color: CONFIG.chartColors.black, borderWidth: 1, borderColor: '#ef4444', opacity: 0.6 },
                        emphasis: { focus: 'series', lineStyle: { width: 3 } }
                    }
                ]
            };

            chart.setOption(colorOption);
            window.addEventListener('resize', () => chart.resize());
        });

        // Add tab switching functionality
        const tabButtons = document.querySelectorAll('.color-tab');
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetPlayer = this.dataset.player;
                const playerColor = CONFIG.playerColors[targetPlayer];

                // Update button states
                tabButtons.forEach(btn => {
                    const btnColor = CONFIG.playerColors[btn.dataset.player];
                    if (btn === this) {
                        btn.classList.add('tab-button--active');
                        btn.style.background = playerColor;
                        btn.style.color = 'var(--color-bg-primary)';
                    } else {
                        btn.classList.remove('tab-button--active');
                        btn.style.background = '';
                        btn.style.color = '';
                    }
                });

                // Update content visibility
                document.querySelectorAll('.color-tab-content').forEach(content => {
                    if (content.dataset.player === targetPlayer) {
                        content.style.display = 'block';
                        // Resize chart when shown
                        if (colorCharts[targetPlayer]) {
                            colorCharts[targetPlayer].resize();
                        }
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });

    }

    animateCounters() {
        requestAnimationFrame(() => {
            const counters = document.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseFloat(counter.dataset.count);
                const decimals = counter.dataset.count.includes('.') ? 1 : 0;
                Utils.animateCounter(counter, target, decimals);
            });
        });
    }
}

// ===== START APP =====
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
