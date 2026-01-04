# Chess 2025 Statistics Dashboard - Development Guide

## Project Overview
Interactive statistics dashboard for 2025 Chess Championship featuring Carlos, Carey, and Jorge. Built with vanilla JavaScript, CSS3, and HTML5 following modern best practices.

---

## 📁 Project Structure

```
chess-stats-dashboard/
├── chess_2025_final.html          # Single-file version (RECOMMENDED)
├── chess_dashboard_final.html     # Modular HTML
├── styles.css                     # External stylesheet
├── app.js                         # JavaScript application
└── Chess_2025_-_Data.csv         # Source data (296 games)
```

---

## 🎨 Design System

### Color Palette
```css
--color-bg-primary: #0a0e27        /* Dark navy background */
--color-bg-secondary: #1a1f3a      /* Lighter navy */
--color-text-primary: #f8f9fa      /* White text */
--color-text-secondary: rgba(248, 249, 250, 0.7)  /* Muted white */
--color-accent-neutral: #9ca3af    /* Grey (neutral accent) */

/* Player Colors */
--color-carlos: #7c3aed            /* Purple */
--color-carey: #00d4ff             /* Cyan */
--color-jorge: #10b981             /* Green */
```

### Typography
- **Headings:** Space Grotesk (700)
- **Body:** Inter (400, 600, 700)
- **Monospace:** JetBrains Mono (600, 700)

### Spacing Scale
```css
--spacing-xs: 0.5rem    /* 8px */
--spacing-sm: 1rem      /* 16px */
--spacing-md: 1.5rem    /* 24px */
--spacing-lg: 2rem      /* 32px */
--spacing-xl: 3rem      /* 48px */
```

---

## 📊 Data Structure

### Statistics Object (STATS)
```javascript
{
  totalGames: 296,
  players: ["Carlos", "Carey", "Jorge"],
  
  playerStats: {
    Carlos: { totalGames, wins, losses, winRate },
    Carey: { ... },
    Jorge: { ... }
  },
  
  headToHead: {
    Carlos_vs_Carey: { total, player1, player2, player1Wins, player2Wins, draws },
    Carlos_vs_Jorge: { ... },
    Carey_vs_Jorge: { ... }
  },
  
  colorStats: { whiteWins, blackWins, draws },
  
  victoryMethods: { Checkmate, Resigned, Stalemate, Time, Resignation },
  
  brutality: {
    totalBrutalGames,
    byPlayer: { Carlos: {inflicted, suffered}, ... },
    topGames: [{ date, winner, loser, rating, note }, ...]
  },
  
  timeStats: {
    peakHour, peakHourGames,
    byPeriod: { Evening, Afternoon, Night, Morning }
  },
  
  sessions: {
    total, avgGames,
    epicSessions: [{ date, games, wins: {player: count} }, ...]
  },
  
  streaks: { Carlos, Carey, Jorge },
  
  monthly: { January: {games, wins}, ... },
  
  quarterly: { Q1: {games, wins}, ... }
}
```

---

## 🏗️ Architecture

### JavaScript Organization
```javascript
// 1. Configuration
const CONFIG = { playerColors, animationDuration, chartColors }

// 2. Data
const STATS = { /* all statistics */ }

// 3. Utilities
const Utils = {
  createElement(tag, className, content),
  animateCounter(element, target, decimals),
  formatDate(dateStr),
  getWinner(matchup)
}

// 4. Charts
const Charts = {
  createDoughnut(p1Wins, p2Wins, draws, color1, color2)
}

// 5. Components
const Components = {
  playerLegend(),
  overview(),
  playerCard(player, delay),
  headToHead(),
  brutality(),
  sessions()
}

// 6. Application
class App {
  init(), renderLegend(), render(), animateCounters()
}
```

### CSS Organization
1. CSS Variables
2. Reset & Base Styles
3. Layout (container, header, footer)
4. Grid System
5. Card Component
6. Utility Classes
7. Stat Numbers
8. Loading States
9. Animations
10. Responsive Breakpoints

---

## 🔧 Current Features

### ✅ Implemented
- [x] Tournament Overview (total games, sessions, streaks)
- [x] Player Statistics Cards (wins, losses, win rates)
- [x] Head-to-Head Records (doughnut charts)
- [x] Brutality Statistics (top 5 savage moments)
- [x] Epic Sessions (10+ game sessions)
- [x] Animated counters
- [x] SVG charts with gradients
- [x] Responsive grid layout
- [x] Hover effects
- [x] Player color coding

### 🚧 Not Yet Implemented
- [ ] Color Advantage Pie Chart (white/black/draw wins)
- [ ] Victory Methods Chart (checkmate/resigned/stalemate/time)
- [ ] Time of Day Statistics (peak hour breakdown)
- [ ] Monthly/Quarterly Toggle View
- [ ] Win Streak Details
- [ ] Session Duration Information
- [ ] Brutality Inflicted vs Suffered Comparison
- [ ] Interactive Filtering
- [ ] Search Functionality
- [ ] Export to PDF/Image

---

## 📝 Adding New Features

### Example: Adding Time of Day Component

**1. Add to Components object:**
```javascript
const Components = {
  // ... existing components
  
  timeOfDay() {
    const periods = STATS.timeStats.byPeriod;
    const total = Object.values(periods).reduce((a, b) => a + b, 0);
    
    const bars = Object.entries(periods).map(([period, count]) => {
      const percentage = ((count / total) * 100).toFixed(1);
      return `
        <div style="margin-bottom: 1rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
            <span>${period}</span>
            <span style="font-weight: 700;">${count}</span>
          </div>
          <div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px;">
            <div style="background: linear-gradient(90deg, var(--color-accent-neutral), #6b7280); 
                        height: 100%; width: ${percentage}%; border-radius: 4px;"></div>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="card animate-in" data-animate-delay="7">
        <h2 class="card__title">Gaming Hours</h2>
        <div class="text-center mb-md">
          <div class="stat-number stat-number--medium">${STATS.timeStats.peakHour % 12 || 12} PM</div>
          <div class="stat-label">Peak Hour (${STATS.timeStats.peakHourGames} games)</div>
        </div>
        ${bars}
      </div>
    `;
  }
}
```

**2. Add to render method:**
```javascript
render() {
  const html = `
    ${Components.overview()}
    ${STATS.players.map((player, i) => Components.playerCard(player, i + 1)).join('')}
    ${Components.headToHead()}
    ${Components.brutality()}
    ${Components.timeOfDay()}  // <-- ADD HERE
    ${Components.sessions()}
  `;
  this.appElement.innerHTML = html;
}
```

---

## 🎨 Styling Guidelines

### Component Card Structure
```html
<div class="card animate-in" data-animate-delay="N">
  <h2 class="card__title">Section Title</h2>
  <!-- Content -->
</div>
```

### Stat Number Pattern
```html
<div class="text-center">
  <div class="stat-number" data-count="VALUE">0</div>
  <div class="stat-label">Description</div>
</div>
```

### Color Usage Rules
1. **Grey (neutral)** - Use for general UI elements, borders, non-player-specific data
2. **Player Colors** - ONLY use for player-specific data (wins, H2H, brutality)
3. **Chart Colors** - White (#f8f9fa) for White pieces, Dark grey (#475569) for Black
4. Never mix player colors with neutral elements

---

## 🔄 Data Update Process

### Regenerating Statistics from CSV

```python
# Run this Python script to regenerate stats from updated CSV

import pandas as pd
import json

df = pd.read_csv('Chess_2025_-_Data.csv')
# Clean data
df = df.dropna(subset=['Winner'])
df = df[~df['Players [White]'].str.contains('Other', na=False)]
df = df[~df['Players [Black]'].str.contains('Other', na=False)]
df = df[df['Players [White]'] != df['Players [Black]']]

# Generate statistics...
# (See full script in project history)

# Save to JSON
with open('stats_data.json', 'w') as f:
    json.dump(stats, f, indent=2)
```

### Updating JavaScript
1. Copy JSON data from `stats_data.json`
2. Replace the `STATS` object in `app.js` (line ~15)
3. Test in browser
4. If single-file version: Regenerate with CSS + HTML + updated JS

---

## 🐛 Common Issues & Solutions

### Issue: Counters show 0 or NaN
**Solution:** Check `data-count` attribute is valid number
```javascript
// BAD
<div data-count="${undefined}">

// GOOD  
<div data-count="${value || 0}">
```

### Issue: Charts not rendering
**Solution:** Ensure SVG paths close properly and gradients have unique IDs
```javascript
// Each chart needs unique gradient IDs
<linearGradient id="grad${uniqueId}">
```

### Issue: Colors not updating
**Solution:** Check CSS custom properties are defined in `:root` and referenced correctly
```css
/* Define */
:root { --color-carlos: #7c3aed; }

/* Use */
.player { color: var(--color-carlos); }
```

### Issue: Layout breaking on mobile
**Solution:** Grid template uses `minmax` with mobile-first breakpoint
```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr));
```

---

## 🚀 Performance Optimization

### Current Optimizations
- ✅ `requestAnimationFrame` for counter animations
- ✅ CSS transitions over JavaScript animations
- ✅ Minimal DOM manipulation
- ✅ Font preconnect for faster loading
- ✅ Inline critical CSS (single-file version)

### Future Optimizations
- [ ] Lazy load charts (Intersection Observer)
- [ ] Virtual scrolling for long lists
- [ ] Service Worker for offline support
- [ ] Image optimization for any future graphics
- [ ] Code splitting for modular version

---

## 📱 Responsive Breakpoints

```css
/* Mobile: < 768px */
@media (max-width: 768px) {
  - Smaller padding
  - Smaller stat numbers
  - Single column grids
}

/* Tablet: 768px - 1024px */
- Auto-fit grid (2 columns typically)

/* Desktop: > 1024px */
- Max 3-4 columns
- Full feature display
```

---

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Feature Testing
- [ ] All counters animate correctly
- [ ] Doughnut charts render properly
- [ ] Hover effects work
- [ ] Player colors consistent
- [ ] Responsive layout adjusts
- [ ] No console errors
- [ ] Data accuracy verified

### Performance Testing
- [ ] Page load < 2 seconds
- [ ] Animations smooth (60fps)
- [ ] No layout shift
- [ ] Memory usage stable

---

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [SVG Path Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)

### Tools
- **Testing:** Browser DevTools, Lighthouse
- **Design:** Figma, Adobe Color
- **Version Control:** Git
- **Hosting:** GitHub Pages, Netlify, Vercel

---

## 🔮 Future Enhancements

### Phase 2 Features
1. **Interactive Charts**
   - Click to filter data
   - Zoom/pan capabilities
   - Tooltip on hover with detailed stats

2. **Advanced Analytics**
   - Opening move statistics
   - Time control analysis
   - Performance trends over time
   - Predictive win probability

3. **User Features**
   - Dark/light mode toggle
   - Custom color themes
   - Export reports (PDF/CSV)
   - Share individual stats

4. **Data Visualization**
   - Heatmaps for game frequency
   - Network graphs for player interactions
   - Timeline view of tournament
   - 3D visualizations

### Phase 3 Features
1. **Live Updates**
   - WebSocket integration
   - Real-time game tracking
   - Live leaderboard

2. **Social Features**
   - Player profiles
   - Achievement badges
   - Social sharing
   - Comments/notes

---

## 🤝 Contributing Guidelines

### Code Style
- Use ES6+ features
- Single quotes for strings
- 4-space indentation
- Meaningful variable names
- Comment complex logic

### Git Workflow
```bash
# Feature branch
git checkout -b feature/new-component

# Commit
git commit -m "feat: add victory methods chart"

# Push
git push origin feature/new-component
```

### Commit Message Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Examples:
- feat(charts): add victory methods pie chart
- fix(counters): resolve animation timing issue
- docs(readme): update installation instructions
```

---

## 📞 Contact & Support

### Project Maintainer
- Created: January 2026
- Stack: Vanilla JS, CSS3, HTML5
- Source Data: Chess_2025_-_Data.csv (296 games)

### Getting Help
1. Check this documentation
2. Review code comments
3. Test in browser console
4. Check browser compatibility

---

## 📄 License & Credits

### Data
- Chess tournament data from 2025 season
- Players: Carlos, Carey, Jorge
- 296 total games across 50 sessions

### Technologies
- HTML5, CSS3, JavaScript (ES6+)
- Google Fonts (Inter, Space Grotesk, JetBrains Mono)
- SVG for charts
- CSS Grid & Flexbox for layout

---

## 🎯 Quick Start for Developers

```bash
# 1. Open the dashboard
open chess_2025_final.html

# 2. Make changes to modular files
# - Edit styles.css for styling
# - Edit app.js for functionality
# - Edit chess_dashboard_final.html for structure

# 3. Rebuild single-file version
cat chess_dashboard_final.html > chess_2025_final.html
# (Include CSS between <style> tags)
# (Include JS between <script> tags)

# 4. Test
open chess_2025_final.html
```

---

**Last Updated:** January 2026  
**Version:** 2.0 (Best Practices Rewrite)  
**Status:** Production Ready ✅
