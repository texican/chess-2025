# Chess 2025 Statistics Dashboard - Development Guide

## Project Overview
Interactive statistics dashboard for 2025 Chess Championship featuring Carlos, Carey, and Jorge. Built with vanilla JavaScript, CSS3, and HTML5 following modern best practices.

---

## 📁 Project Structure

```
chess-stats-dashboard/
├── index.html                     # Main HTML file
├── styles.css                     # External stylesheet
├── app.js                         # JavaScript application (large file with all data + components)
├── Chess_2025_-_Data.csv         # Source data (296 games)
└── chess_2025_stats_EXAMPLE.html # Example/backup file
```

**Note:** The project uses modular files (HTML, CSS, JS) rather than single-file versions.

---

## 🎨 Design System

### Color Palette
```css
/* Base Colors */
--color-bg-primary: #000000        /* Pure black background */
--color-bg-secondary: #1a1a1a      /* Dark grey secondary */
--color-text-primary: #f8f9fa      /* White text */
--color-text-secondary: rgba(248, 249, 250, 0.7)  /* Muted white */
--color-accent-neutral: #6b7280    /* Grey (neutral accent) */

/* Player Colors */
--color-carlos: #7c3aed            /* Purple */
--color-carey: #00d4ff             /* Cyan */
--color-jorge: #10b981             /* Green */

/* Background Layers */
--bg-card-default: #1a1a1a
--bg-card-hover: #242424
--bg-nested-light: rgba(26, 26, 26, 0.6)
--bg-nested-dark: rgba(0, 0, 0, 0.2)
--bg-nested-hover: rgba(0, 0, 0, 0.35)

/* Border Colors */
--border-card: #2a2a2a
--border-card-hover: #3a3a3a
--border-divider: rgba(255, 255, 255, 0.1)
--border-accent-width: 3px

/* Border Radius */
--radius-sm: 6px
--radius-md: 8px
--radius-lg: 10px
--radius-xl: 12px
```

### Typography
- **Headings:** Space Grotesk (600, 700)
- **Body:** Inter (400, 600, 700)
- **Monospace:** JetBrains Mono (600, 700)
- **Title Sizes:**
  - `--title-section: clamp(1rem, 2vw, 1.2rem)`
  - `--title-subsection: clamp(1rem, 2vw, 1.1rem)`
  - `--title-card: clamp(0.85rem, 1.5vw, 0.9rem)`

### Spacing Scale
```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2.5rem    /* 40px */

/* Card Padding */
--card-padding: var(--spacing-md)
--card-padding-lg: 1.25rem
```

---

## 📊 Data Structure

### Statistics Objects

#### STATS (Main Statistics)
```javascript
{
  totalGames: 296,
  players: ["Carey", "Carlos", "Jorge"],  // Order matters for display

  playerStats: {
    Carlos: { totalGames, wins, losses, winRate },
    Carey: { totalGames, wins, losses, winRate },
    Jorge: { totalGames, wins, losses, winRate }
  },

  headToHead: {
    Carey_vs_Carlos: { total, player1, player2, player1Wins, player2Wins, draws },
    Carlos_vs_Jorge: { total, player1, player2, player1Wins, player2Wins, draws },
    Carey_vs_Jorge: { total, player1, player2, player1Wins, player2Wins, draws }
  },

  colorStats: { whiteWins, blackWins, draws },

  victoryMethods: { Draw, Time, Resigned, Checkmate },

  brutality: {
    totalBrutalGames,
    byPlayer: {
      Carlos: { inflicted, suffered },
      Carey: { inflicted, suffered },
      Jorge: { inflicted, suffered }
    },
    topGames: [{ date, winner, loser, rating, note }, ...]
  },

  timeStats: {
    peakHour, peakHourGames,
    byPeriod: { Night, Morning, Afternoon, Evening }
  },

  sessions: {
    total, avgGames,
    epicSessions: [{
      date, games, players, hours,
      wins: { Carlos, Jorge, Carey }
    }, ...]
  },

  streaks: { Carey, Carlos, Jorge },

  monthly: {
    January: { games, wins: {Carlos, Carey, Jorge}, losses: {Carlos, Carey, Jorge} },
    // ... all 12 months
  },

  quarterly: {
    Q1: { games, wins: {Carlos, Carey, Jorge} },
    // ... Q1-Q4
  }
}
```

#### PLAYER_COLOR_STATS (Color Performance by Month)
```javascript
{
  Carlos: {
    "January": {
      white: { wins, losses, draws },
      black: { wins, losses, draws }
    },
    // ... all 12 months
    summary: {
      white: { games, wins, losses, draws, winRate },
      black: { games, wins, losses, draws, winRate }
    }
  },
  // Carey and Jorge follow same structure
}
```

---

## 🏗️ Architecture

### JavaScript Organization
```javascript
// 1. Configuration
const CONFIG = {
  playerColors: { Carlos, Carey, Jorge },
  animationDuration: 2000,
  chartColors: { white, black, draw }
}

// 2. Data
const STATS = { /* main statistics object */ }
const PLAYER_COLOR_STATS = { /* color performance by player/month */ }

// 3. Utilities
const Utils = {
  createElement(tag, className, content),
  animateCounter(element, target, decimals),
  formatDate(dateStr),
  getWinner(matchup)
}

// 4. Charts (Uses ECharts library)
const Charts = {
  initVictoryMethods(elementId),
  initPlayerDistribution(elementId),
  initWhiteVsBlack(elementId),
  initTimedGames(elementId)
}

// 5. Components (10 major sections)
const Components = {
  overview(),           // Hero stats with total games
  playerStats(),        // Individual player statistics
  gameAnalytics(),      // Victory methods & color analysis charts
  headToHead(),         // H2H matchup doughnut charts
  timedGames(),         // Time of day analysis with ECharts
  yearTimeline(),       // Monthly/Quarterly timeline with tabs
  brutality(),          // Savage moments & brutality rankings
  playerHighlights(),   // Player-specific epic sessions (folder tabs)
  colorPerformance(),   // White/Black performance by player (folder tabs)
  sessions()            // Epic sessions (10+ games)
}

// 6. Application
class App {
  constructor()
  init()
  render()
  animateCounters()
  initCharts()
}

// 7. Initialization
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
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

### ✅ Fully Implemented Components
1. **Overview Section** - Hero stats with gradient background, total games in massive text, 5 stat cards (player wins, brutal games, win streak)
2. **Player Statistics** - 3 cards showing total games, wins, losses, win rate for each player
3. **Game Analytics** - ECharts visualizations for:
   - Victory Methods (pie chart)
   - Player Game Distribution (pie chart)
   - White vs Black Wins (doughnut chart)
4. **Head-to-Head** - 3 doughnut charts showing matchup records with draws
5. **Timed Games** - Peak hour analysis with ECharts bar chart showing games by hour
6. **Year Timeline** - Monthly/Quarterly toggle view with tab buttons
7. **Brutality Rankings** - Horizontal bar charts comparing inflicted vs suffered
8. **Savage Moments** - Top 5 brutal games with ratings and notes
9. **Player Highlights** - Folder tab interface showing epic sessions per player
10. **Color Performance** - Folder tab interface showing white/black win rates by player
11. **Epic Sessions** - Grid of 12 sessions with 10+ games, showing date, game count, hours, winner breakdown

### ✅ Technical Features
- [x] Animated counters with requestAnimationFrame
- [x] ECharts integration (CDN loaded)
- [x] Responsive grid layout with container queries
- [x] Folder tab UI pattern (custom implementation)
- [x] Toggle buttons for timeline view
- [x] Hover effects with transforms
- [x] Player color coding throughout
- [x] Mobile-responsive (extensive media queries)
- [x] Gradient backgrounds and text
- [x] Nested card patterns with background layers

### 🚧 Potential Enhancements
- [ ] Interactive chart filtering (click to drill down)
- [ ] Search/filter functionality
- [ ] Export to PDF/Image
- [ ] Additional time-based visualizations
- [ ] Performance trend lines
- [ ] Opening move statistics

---

## 📊 ECharts Integration

This project uses **ECharts 5.4.3** (loaded from CDN) for advanced data visualizations.

### ECharts Setup
```html
<!-- In index.html -->
<script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"></script>
```

### Chart Initialization Pattern
```javascript
// In Charts object
initVictoryMethods(elementId) {
    const chart = echarts.init(document.getElementById(elementId));

    const option = {
        backgroundColor: 'transparent',
        tooltip: { trigger: 'item' },
        legend: { ... },
        series: [{
            type: 'pie',  // or 'bar', 'line', etc.
            data: [ ... ],
            // ... chart configuration
        }]
    };

    chart.setOption(option);

    // Handle responsive resize
    window.addEventListener('resize', () => chart.resize());
}
```

### Current ECharts Implementations
1. **Victory Methods** (`#victoryMethodsChart`) - Pie chart
2. **Player Distribution** (`#playerDistChart`) - Pie chart
3. **White vs Black** (`#whiteVsBlackChart`) - Doughnut chart
4. **Timed Games** (`#timedGamesChart`) - Bar chart with time-of-day data

### ECharts Best Practices
- Always set `backgroundColor: 'transparent'` to match dark theme
- Use player colors from CONFIG for consistency
- Add resize listeners for responsive behavior
- Initialize charts AFTER DOM render in `App.initCharts()`
- Place chart containers with explicit IDs in component HTML

---

## 🗂️ Folder Tab Pattern

Custom UI pattern for showing player-specific data in tabbed interface.

### HTML Structure
```html
<div class="folder-tabs-container">
    <h2 class="folder-tabs-title">Section Title</h2>
    <div style="display: flex; gap: 0.5rem;">
        <button class="folder-tab folder-tab--active"
                data-player="Carlos"
                style="--tab-color: var(--color-carlos);">
            <div class="folder-tab-label">Carlos</div>
        </button>
        <!-- Repeat for other players -->
    </div>
</div>

<div class="folder-content" data-active-player="Carlos">
    <!-- Content for active player -->
</div>
```

### JavaScript Event Handling
```javascript
// Add click handlers to tabs
document.querySelectorAll('.folder-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
        const player = e.currentTarget.dataset.player;
        const container = e.currentTarget.closest('.section');

        // Update active tab
        container.querySelectorAll('.folder-tab').forEach(t =>
            t.classList.remove('folder-tab--active')
        );
        e.currentTarget.classList.add('folder-tab--active');

        // Update content
        const content = container.querySelector('.folder-content');
        content.dataset.activePlayer = player;
        content.innerHTML = generateContentForPlayer(player);
    });
});
```

### Styling Features
- Uses CSS custom property `--tab-color` for player-specific coloring
- Active tab connects visually to content area via border
- Inactive tabs are semi-transparent (opacity: 0.4)
- Hover effects on inactive tabs
- Border-top of content area changes color based on active player

### Current Implementations
1. **Player Highlights** - Shows epic sessions filtered by player
2. **Color Performance** - Shows white/black stats by player with monthly breakdown

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

### Styling Philosophy
This project uses a **hybrid CSS approach** combining utility classes with inline styles for maximum flexibility:
- **CSS Classes** - Structural layout, reusable patterns, animations
- **Inline Styles** - Component-specific values, dynamic data-driven styling, one-off adjustments

### When to Use Each Approach

#### Use CSS Classes For:
- Layout structure (`.card`, `.grid`)
- Text utilities (`.text-center`, `.mb-md`)
- Reusable patterns (`.stat-number`, `.stat-label`)
- Animations (`.animate-in`)
- Responsive behavior

#### Use Inline Styles For:
- Colors (especially player-specific and data-driven)
- Widths/heights based on data percentages
- Margins/padding for specific spacing needs
- Flexbox/grid values unique to a component
- Dynamic gradients and transforms
- Font sizes/weights for emphasis

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

### Inline Style Patterns

#### Flexbox Layout
```html
<!-- Horizontal layout with space-between -->
<div style="display: flex; justify-content: space-between; align-items: center;">
  <span>Label</span>
  <span style="font-weight: 700;">Value</span>
</div>

<!-- Centered column layout -->
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
  <span>Item 1</span>
  <span>Item 2</span>
</div>
```

#### Grid Layout
```html
<!-- Two-column grid -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
  <div>Column 1</div>
  <div>Column 2</div>
</div>

<!-- Three-column auto-fit grid -->
<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

#### Player-Specific Styling
```html
<!-- Player name with color -->
<span style="color: ${CONFIG.playerColors[player]}; font-weight: 700;">
  ${player}
</span>

<!-- Player stat with gradient background -->
<div style="background: linear-gradient(135deg, ${color1}, ${color2});
            padding: 1rem; border-radius: 8px;">
  Content
</div>
```

#### Progress Bars
```html
<!-- Background container -->
<div style="background: rgba(255,255,255,0.1); height: 8px; border-radius: 4px; overflow: hidden;">
  <!-- Filled portion -->
  <div style="background: linear-gradient(90deg, var(--color-accent-neutral), #6b7280);
              height: 100%; width: ${percentage}%; border-radius: 4px;
              transition: width 0.3s ease;"></div>
</div>
```

#### Typography Emphasis
```html
<!-- Large emphasized number -->
<div style="font-size: 2.5rem; font-weight: 700; line-height: 1;">
  ${value}
</div>

<!-- Small secondary text -->
<div style="font-size: 0.875rem; color: var(--color-text-secondary); margin-top: 0.25rem;">
  Description
</div>

<!-- Monospace data display -->
<span style="font-family: 'JetBrains Mono', monospace; font-weight: 600;">
  ${data}
</span>
```

#### Spacing & Margins
```html
<!-- Bottom margin -->
<div style="margin-bottom: 1rem;">Content</div>

<!-- Top padding -->
<div style="padding-top: 1.5rem;">Content</div>

<!-- All-around padding with responsive consideration -->
<div style="padding: 1rem;">Content</div>
```

#### Chart Segment Labels
```html
<!-- Small labels with conditional rendering -->
${percentage >= 5 ? `
  <text x="${x}" y="${y}"
        style="fill: white; font-size: 14px; font-weight: 700;
               text-anchor: middle; dominant-baseline: middle;
               pointer-events: none;">
    ${Math.round(percentage)}%
  </text>
` : ''}
```

### Color Usage Rules
1. **Grey (neutral)** - Use `var(--color-accent-neutral)` for general UI elements, borders, non-player-specific data
2. **Player Colors** - ONLY use `CONFIG.playerColors[player]` or CSS variables for player-specific data (wins, H2H, brutality)
3. **Chart Colors** - White (`#f8f9fa`) for White pieces, Dark grey (`#475569`) for Black pieces
4. **Text Colors** - `var(--color-text-primary)` for main text, `var(--color-text-secondary)` for muted text
5. Never mix player colors with neutral elements

### Responsive Inline Style Patterns
For responsive behavior, prefer CSS classes over inline media queries:

```html
<!-- BAD: Inline media queries are hard to maintain -->
<div style="font-size: 2rem; @media (max-width: 768px) { font-size: 1.5rem; }">

<!-- GOOD: Use CSS classes for responsive behavior -->
<div class="stat-number stat-number--large">

<!-- ACCEPTABLE: Mobile-first inline sizing -->
<div style="font-size: clamp(1.5rem, 4vw, 2.5rem);">
```

### Common Inline Style Combinations

#### Card Section Header
```html
<div style="display: flex; justify-content: space-between; align-items: center;
            margin-bottom: 1rem; padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);">
  <h3 style="font-size: 1.125rem; font-weight: 700; margin: 0;">Title</h3>
  <span style="color: var(--color-text-secondary); font-size: 0.875rem;">Subtitle</span>
</div>
```

#### Data Grid Item
```html
<div style="display: flex; flex-direction: column; align-items: center;
            padding: 1rem; background: rgba(255,255,255,0.05);
            border-radius: 8px;">
  <div style="font-size: 1.5rem; font-weight: 700; color: ${playerColor};">
    ${value}
  </div>
  <div style="font-size: 0.75rem; color: var(--color-text-secondary);
              margin-top: 0.25rem; text-align: center;">
    ${label}
  </div>
</div>
```

#### Highlight Box
```html
<div style="background: rgba(255,255,255,0.05); padding: 1rem;
            border-radius: 8px; border-left: 3px solid ${color};">
  Content
</div>
```

### Best Practices
1. **Consistency** - Use the same spacing values (`0.25rem`, `0.5rem`, `1rem`, `1.5rem`)
2. **Readability** - Break long inline styles into multiple lines
3. **Variables** - Reference CSS variables with `var(--variable-name)` in inline styles
4. **Transitions** - Add smooth transitions for interactive elements
5. **Accessibility** - Ensure sufficient color contrast (4.5:1 minimum)
6. **Performance** - Avoid inline styles that trigger layout recalculations on scroll/resize

### Anti-Patterns to Avoid
```html
<!-- BAD: Mixing units -->
<div style="padding: 16px 1rem;">

<!-- GOOD: Consistent units -->
<div style="padding: 1rem;">

<!-- BAD: Hardcoded colors -->
<div style="color: #7c3aed;">

<!-- GOOD: CSS variables or CONFIG -->
<div style="color: var(--color-carlos);">

<!-- BAD: !important in inline styles -->
<div style="margin: 0 !important;">

<!-- GOOD: Proper specificity -->
<div style="margin: 0;">

<!-- BAD: Non-semantic inline styles -->
<div style="margin-left: 10px; margin-right: 10px;">

<!-- GOOD: Semantic shorthand -->
<div style="margin-inline: 0.625rem;">
```

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

## 📱 Responsive Design Strategy

### Breakpoints
```css
/* Mobile: ≤ 768px */
@media (max-width: 768px) {
  - Label toggles (desktop/mobile variants)
  - Reduced padding throughout
  - Column count adjustments
  - Font size reductions
}

/* Wide Mobile: 481px - 768px */
@media (min-width: 481px) and (max-width: 768px) {
  - Overview grid: 2 columns
}

/* Narrow Mobile: ≤ 480px */
@media (max-width: 480px) {
  - Overview grid: 2 columns (maintained)
  - Most grids collapse to single column
}

/* Desktop: ≥ 769px */
@media (min-width: 769px) {
  - Overview grid: 3 columns
  - Epic sessions: 2 columns
  - Full feature display
}
```

### Container Queries
Used for responsive text sizing in hero sections:
```css
.hero-stats-container {
  container-type: inline-size;
}

.total-games-number {
  font-size: clamp(4rem, 50cqw, 70cqw);  /* Container query units */
}

.overview-stat-value {
  font-size: clamp(5rem, 70cqw, 80cqw);  /* Scales with container */
}
```

### Label Toggle Pattern
Show/hide different text based on screen size:
```css
/* Desktop defaults */
.desktop-label { display: inline; }
.mobile-label { display: none; }

/* Mobile overrides */
@media (max-width: 768px) {
  .desktop-label { display: none; }
  .mobile-label { display: inline !important; }
}
```

Usage in HTML:
```html
<span class="desktop-label">Full Description Text</span>
<span class="mobile-label">Short</span>
```

### Mobile-Specific Adjustments (max-width: 768px)

#### Grid Changes
- `.timed-games-stats`: `repeat(2, 1fr)`
- `.quarterly-stats`: `repeat(2, 1fr)`
- `.player-highlights-grid`: `1fr` (single column)
- `.session-highlights-grid`: `repeat(2, 1fr)`
- `.savage-moments-grid`: `1fr` (single column)
- `.epic-sessions-grid`: `repeat(2, 1fr)`

#### Brutality Bars
- Name column width: `0` (hidden)
- Names shown above bars via `.brutality-mobile-name`
- Remove left margins and spacers

#### Timed Player Bars
- `.bar-header`: Column layout instead of row
- `.bar-name`: Full width
- `.bar-chart`: Full width horizontal

#### Folder Tabs
- Reduced padding: `0.5rem 1rem`
- Font size: `0.9rem`
- Flex wrap enabled

#### Session Cards
- Padding: `0.5rem 0.75rem`
- Content wraps with smaller gaps
- Font sizes reduced (0.7rem - 0.95rem)

### Clamp() Function Usage
Preferred for fluid responsive sizing:
```css
/* Title sizing */
font-size: clamp(1rem, 2vw, 1.2rem);
/* min: 1rem, preferred: 2vw, max: 1.2rem */

/* Header title */
font-size: clamp(2rem, 9vw + 1rem, 30rem);

/* Flexible spacing */
padding: clamp(0.5rem, 1.5vw, 1.5rem);
```

### Testing Checklist
- [ ] Test on iPhone (375px width)
- [ ] Test on iPad (768px width)
- [ ] Test on desktop (1400px+ width)
- [ ] Verify no horizontal scroll
- [ ] Check text doesn't overflow containers
- [ ] Ensure touch targets ≥ 44px
- [ ] Test folder tabs work on mobile
- [ ] Verify ECharts resize properly

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
- **ECharts 5.4.3** (loaded from CDN for advanced charts)
- CSS Grid & Flexbox for layout
- Container Queries for responsive text sizing
- CSS Custom Properties (CSS Variables)

---

## 🎯 Quick Start for Developers

```bash
# 1. Open the dashboard
open index.html

# 2. Make changes to modular files
# - Edit styles.css for styling
# - Edit app.js for functionality and data
# - Edit index.html for structure

# 3. Test in browser
open index.html
# Or use a local server:
python -m http.server 8000
# Then visit http://localhost:8000

# 4. Check browser console for errors
# Open DevTools (F12 or Cmd+Option+I)
```

### Important Files
- **index.html** - Main HTML structure, loads ECharts CDN
- **styles.css** - All styling (720 lines with extensive responsive design)
- **app.js** - LARGE file (~29,000+ tokens) containing:
  - CONFIG object
  - STATS object (all game statistics)
  - PLAYER_COLOR_STATS object (monthly color performance)
  - Utils functions
  - Charts functions (ECharts initialization)
  - Components object (10 major sections)
  - App class

### Working with app.js
**Warning:** app.js is a very large file. When making changes:
1. Use search (Cmd+F) to find specific functions/components
2. Make targeted edits rather than full rewrites
3. Test frequently to catch errors early
4. Consider using Read tool with offset/limit for specific sections

---

**Last Updated:** January 4, 2026
**Version:** 2.1 (Documentation Accuracy Update)
**Status:** Production Ready ✅

## 📋 Documentation Changelog

### v2.1 - January 4, 2026
- ✅ Updated project structure (removed references to non-existent files)
- ✅ Fixed color palette (pure black background, not navy)
- ✅ Updated spacing scale values (corrected from documentation)
- ✅ Added border radius variables documentation
- ✅ Documented PLAYER_COLOR_STATS object structure
- ✅ Updated JavaScript architecture (10 components, ECharts integration)
- ✅ Documented all 11 implemented components
- ✅ Added ECharts integration guide
- ✅ Added Folder Tab pattern documentation
- ✅ Expanded responsive design strategy with container queries
- ✅ Added comprehensive styling philosophy and inline style patterns
- ✅ Documented mobile-specific adjustments for all sections
- ✅ Updated Quick Start guide with correct file names
- ✅ Added warning about app.js file size

### v2.0 - January 2026
- Initial best practices rewrite
