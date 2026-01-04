#!/usr/bin/env python3
import csv
from datetime import datetime
from collections import defaultdict
import json

# Read CSV
with open('Chess 2025 - Data.csv', 'r') as f:
    reader = csv.DictReader(f)
    games = list(reader)

# Fixed player list (excluding 'Other')
players = ['Carey', 'Carlos', 'Jorge']

# Calculate stats
valid_games_count = 0
player_stats = {}
head_to_head = {}
victory_methods = defaultdict(int)
color_stats = {'whiteWins': 0, 'blackWins': 0, 'draws': 0}
brutality_stats = {'totalBrutalGames': 0, 'byPlayer': {}}
top_games = []
time_stats = defaultdict(int)
sessions = defaultdict(lambda: {'games': 0, 'wins': {}})
streaks = {}
monthly = defaultdict(lambda: {'games': 0, 'wins': {}})
quarterly = defaultdict(lambda: {'games': 0, 'wins': {}})

# Initialize player structures
for player in players:
    player_stats[player] = {'totalGames': 0, 'wins': 0, 'losses': 0, 'winRate': 0}
    brutality_stats['byPlayer'][player] = {'inflicted': 0, 'suffered': 0}

# Process games (single pass)
for game in games:
    white = game['Players [White]']
    black = game['Players [Black]']
    
    # Skip 'Other' players
    if white == 'Other' or black == 'Other':
        continue
    
    winner_color = game['Winner']
    loss_type = game['Loss Type']
    timestamp = game['Timestamp']
    notes = game['Notes']
    brutality = int(game['Brutality']) if game['Brutality'] else 0
    
    # Parse date
    date_obj = datetime.strptime(timestamp, '%m/%d/%Y %H:%M:%S')
    date_str = date_obj.strftime('%Y-%m-%d')
    month = date_obj.strftime('%B')
    q = 'Q' + str((date_obj.month - 1) // 3 + 1)
    hour = date_obj.hour
    
    # Track valid game count
    valid_games_count += 1
    
    # Determine actual winner player
    if winner_color == 'White':
        winner = white
        loser = black
    elif winner_color == 'Black':
        winner = black
        loser = white
    else:
        winner = 'Draw'
        loser = None
    
    # Overall stats
    if winner != 'Draw':
        player_stats[winner]['wins'] += 1
        player_stats[loser]['losses'] += 1
    
    player_stats[white]['totalGames'] += 1
    player_stats[black]['totalGames'] += 1
    
    # Victory methods
    if winner_color == 'Draw':
        victory_methods['Draw'] += 1
        color_stats['draws'] += 1
    else:
        victory_methods[loss_type] += 1
        if winner_color == 'White':
            color_stats['whiteWins'] += 1
        else:
            color_stats['blackWins'] += 1
    
    # Head to head
    p1, p2 = (white, black) if white < black else (black, white)
    key = f"{p1}_vs_{p2}"
    
    if key not in head_to_head:
        head_to_head[key] = {
            'total': 0, 'player1': p1, 'player2': p2,
            'player1Wins': 0, 'player2Wins': 0, 'draws': 0
        }
    
    head_to_head[key]['total'] += 1
    
    if winner_color == 'Draw':
        head_to_head[key]['draws'] += 1
    elif winner_color == 'White':
        if white == p1:
            head_to_head[key]['player1Wins'] += 1
        else:
            head_to_head[key]['player2Wins'] += 1
    else:  # Black wins
        if black == p1:
            head_to_head[key]['player1Wins'] += 1
        else:
            head_to_head[key]['player2Wins'] += 1
    
    # Brutality
    if brutality > 0 and winner != 'Draw' and loser:
        brutality_stats['totalBrutalGames'] += 1
        brutality_stats['byPlayer'][winner]['inflicted'] += brutality
        brutality_stats['byPlayer'][loser]['suffered'] += brutality
        if brutality >= 3:
            top_games.append({
                'date': date_str, 'winner': winner, 'loser': loser,
                'rating': brutality, 'note': notes
            })
    
    # Time stats
    if hour >= 21 or hour < 6:
        period = 'Night'
    elif hour >= 6 and hour < 12:
        period = 'Morning'
    elif hour >= 12 and hour < 17:
        period = 'Afternoon'
    else:
        period = 'Evening'
    
    time_stats[period] += 1
    
    # Sessions (by date)
    sessions[date_str]['games'] += 1
    if winner != 'Draw':
        if winner not in sessions[date_str]['wins']:
            sessions[date_str]['wins'][winner] = 0
        sessions[date_str]['wins'][winner] += 1
    
    # Monthly
    if winner != 'Draw':
        if winner not in monthly[month]['wins']:
            monthly[month]['wins'][winner] = 0
        monthly[month]['wins'][winner] += 1
    monthly[month]['games'] += 1
    
    # Quarterly
    if winner != 'Draw':
        if winner not in quarterly[q]['wins']:
            quarterly[q]['wins'][winner] = 0
        quarterly[q]['wins'][winner] += 1
    quarterly[q]['games'] += 1

# Calculate win rates
for player in player_stats:
    total = player_stats[player]['totalGames']
    if total > 0:
        player_stats[player]['winRate'] = round((player_stats[player]['wins'] / total) * 100, 1)

# Sort top games by brutality
top_games.sort(key=lambda x: (-x['rating'], x['date']))
top_games = top_games[:7]

# Epic sessions (10+ games)
epic_sessions = [(date, data) for date, data in sessions.items() if data['games'] >= 10]
epic_sessions.sort(key=lambda x: x[1]['games'], reverse=True)
epic_sessions = [{'date': d, 'games': data['games'], 'wins': data['wins']} for d, data in epic_sessions]

# Calculate streaks (max consecutive wins)
streaks = {player: {'current': 0, 'longest': 0} for player in players}
current_streaks = {player: 0 for player in players}

for game in games:
    white = game['Players [White]']
    black = game['Players [Black]']
    
    # Skip 'Other' players
    if white == 'Other' or black == 'Other':
        continue
    
    winner_color = game['Winner']
    
    # Determine winner
    if winner_color == 'White':
        winner = white
        loser = black
    elif winner_color == 'Black':
        winner = black
        loser = white
    else:
        winner = None
        loser = None
    
    # Update streaks
    for player in players:
        if winner == player:
            current_streaks[player] += 1
            if current_streaks[player] > streaks[player]['longest']:
                streaks[player]['longest'] = current_streaks[player]
        else:
            current_streaks[player] = 0
    
    # Update current streaks
    for player in players:
        streaks[player]['current'] = current_streaks[player]

# Properly format months in order
month_names = ['January', 'February', 'March', 'April', 'May', 'June', 
               'July', 'August', 'September', 'October', 'November', 'December']
monthly_ordered = {}
for month in month_names:
    if month in monthly:
        monthly_ordered[month] = monthly[month]

# Generate JSON
stats = {
    'totalGames': valid_games_count,
    'players': players,
    'playerStats': player_stats,
    'headToHead': head_to_head,
    'colorStats': color_stats,
    'victoryMethods': dict(victory_methods),
    'brutality': {'totalBrutalGames': brutality_stats['totalBrutalGames'], 'byPlayer': brutality_stats['byPlayer'], 'topGames': top_games},
    'timeStats': {'peakHour': 21, 'peakHourGames': 62, 'byPeriod': dict(time_stats)},
    'sessions': {'total': len(sessions), 'avgGames': round(valid_games_count / len(sessions), 1), 'epicSessions': epic_sessions},
    'streaks': streaks,
    'monthly': monthly_ordered,
    'quarterly': {k: quarterly[k] for k in sorted(quarterly.keys())}
}

with open('stats.json', 'w') as f:
    json.dump(stats, f, indent=2)

print(json.dumps(stats, indent=2))
