#!/usr/bin/env python3
"""
Validation script to verify all calculated values in stats.json
"""
import csv
from collections import defaultdict
import json
import sys

# Read CSV
with open('Chess 2025 - Data.csv', 'r') as f:
    reader = csv.DictReader(f)
    games = list(reader)

# Load stats.json
with open('stats.json', 'r') as f:
    stats = json.load(f)

# Fixed player list (excluding 'Other')
players = ['Carey', 'Carlos', 'Jorge']
errors = []
warnings = []

# === SINGLE PASS CALCULATION ===
# Calculate all stats in one pass through the CSV
valid_games = 0
player_stats = defaultdict(lambda: {'totalGames': 0, 'wins': 0, 'losses': 0})
color_stats = {'whiteWins': 0, 'blackWins': 0, 'draws': 0}
victory_methods = defaultdict(int)
head_to_head = {}
brutality_stats = {'totalBrutalGames': 0, 'byPlayer': {}}

for player in players:
    brutality_stats['byPlayer'][player] = {'inflicted': 0, 'suffered': 0}

for game in games:
    white = game['Players [White]']
    black = game['Players [Black]']
    
    # Skip 'Other' players
    if white == 'Other' or black == 'Other':
        continue
    
    valid_games += 1
    winner_color = game['Winner']
    loss_type = game['Loss Type']
    brutality = int(game['Brutality']) if game['Brutality'] else 0
    
    # Determine actual winner
    if winner_color == 'White':
        winner = white
        loser = black
    elif winner_color == 'Black':
        winner = black
        loser = white
    else:
        winner = None
        loser = None
    
    # Player stats
    player_stats[white]['totalGames'] += 1
    player_stats[black]['totalGames'] += 1
    if winner:
        player_stats[winner]['wins'] += 1
        player_stats[loser]['losses'] += 1
    
    # Color stats
    if winner_color == 'Draw':
        color_stats['draws'] += 1
    elif winner_color == 'White':
        color_stats['whiteWins'] += 1
    else:
        color_stats['blackWins'] += 1
    
    # Victory methods
    if winner_color == 'Draw':
        victory_methods['Draw'] += 1
    else:
        victory_methods[loss_type] += 1
    
    # Head-to-head
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
    
    # Brutality stats
    if brutality > 0 and winner_color != 'Draw':
        brutality_stats['totalBrutalGames'] += 1
        brutality_stats['byPlayer'][winner]['inflicted'] += brutality
        brutality_stats['byPlayer'][loser]['suffered'] += brutality

print("=" * 80)
print("CHESS STATS VALIDATION REPORT")
print("=" * 80)
print()

# === BASIC COUNTS ===
print("1. BASIC COUNTS")
print("-" * 80)

total_match = valid_games == stats['totalGames']
status = "✓ PASS" if total_match else "✗ FAIL"
print(f"{status}: Total Games - Calculated: {valid_games}, In stats.json: {stats['totalGames']}")
if not total_match:
    errors.append(f"Total games mismatch: {valid_games} vs {stats['totalGames']}")

# Check players list
players_match = sorted(stats['players']) == sorted(players)
status = "✓ PASS" if players_match else "✗ FAIL"
print(f"{status}: Players - Calculated: {sorted(players)}, In stats.json: {sorted(stats['players'])}")
if not players_match:
    errors.append(f"Players mismatch: {sorted(players)} vs {sorted(stats['players'])}")

print()

# === PLAYER STATS ===
print("2. PLAYER STATS")
print("-" * 80)

player_errors = []
for player in sorted(players):
    calculated = player_stats[player]
    expected = stats['playerStats'][player]
    
    print(f"\n{player}:")
    
    # Total Games
    tg_match = calculated['totalGames'] == expected['totalGames']
    status = "✓" if tg_match else "✗"
    print(f"  {status} Total Games: {calculated['totalGames']} (expected {expected['totalGames']})")
    if not tg_match:
        player_errors.append(f"{player} total games: {calculated['totalGames']} vs {expected['totalGames']}")
    
    # Wins
    w_match = calculated['wins'] == expected['wins']
    status = "✓" if w_match else "✗"
    print(f"  {status} Wins: {calculated['wins']} (expected {expected['wins']})")
    if not w_match:
        player_errors.append(f"{player} wins: {calculated['wins']} vs {expected['wins']}")
    
    # Losses
    l_match = calculated['losses'] == expected['losses']
    status = "✓" if l_match else "✗"
    print(f"  {status} Losses: {calculated['losses']} (expected {expected['losses']})")
    if not l_match:
        player_errors.append(f"{player} losses: {calculated['losses']} vs {expected['losses']}")
    
    # Win Rate
    if calculated['totalGames'] > 0:
        calc_rate = round((calculated['wins'] / calculated['totalGames']) * 100, 1)
        exp_rate = expected['winRate']
        wr_match = calc_rate == exp_rate
        status = "✓" if wr_match else "✗"
        print(f"  {status} Win Rate: {calc_rate}% (expected {exp_rate}%)")
        if not wr_match:
            player_errors.append(f"{player} win rate: {calc_rate}% vs {exp_rate}%")

if player_errors:
    errors.extend(player_errors)

print()

# === COLOR STATS ===
print("3. COLOR STATS")
print("-" * 80)

for color_key in ['whiteWins', 'blackWins', 'draws']:
    calc = color_stats[color_key]
    exp = stats['colorStats'][color_key]
    match = calc == exp
    status = "✓" if match else "✗"
    print(f"{status} {color_key}: {calc} (expected {exp})")
    if not match:
        errors.append(f"{color_key} mismatch: {calc} vs {exp}")

print()

# === VICTORY METHODS ===
print("4. VICTORY METHODS")
print("-" * 80)

for method in sorted(set(list(victory_methods.keys()) + list(stats['victoryMethods'].keys()))):
    calc = victory_methods.get(method, 0)
    exp = stats['victoryMethods'].get(method, 0)
    match = calc == exp
    status = "✓" if match else "✗"
    print(f"{status} {method}: {calc} (expected {exp})")
    if not match:
        errors.append(f"{method} mismatch: {calc} vs {exp}")

print()

# === HEAD TO HEAD ===
print("5. HEAD TO HEAD")
print("-" * 80)

for key in sorted(head_to_head.keys()):
    calc = head_to_head[key]
    exp = stats['headToHead'].get(key, {})
    
    print(f"\n{key}:")
    
    for field in ['total', 'player1Wins', 'player2Wins', 'draws']:
        calc_val = calc[field]
        exp_val = exp.get(field, 0)
        match = calc_val == exp_val
        status = "✓" if match else "✗"
        print(f"  {status} {field}: {calc_val} (expected {exp_val})")
        if not match:
            errors.append(f"{key} {field}: {calc_val} vs {exp_val}")

print()

# === BRUTALITY STATS ===
print("6. BRUTALITY STATS")
print("-" * 80)


    print(f"  {status} Suffered: {calc['suffered']} (expected {exp['suffered']})")
    if not suffered_match:
        errors.append(f"{player} brutality suffered: {calc['suffered']} vs {exp['suffered']}")

print()

# === SUMMARY ===
print("=" * 80)
print("SUMMARY")
print("=" * 80)
print(f"Total Errors Found: {len(errors)}")
print(f"Total Warnings Found: {len(warnings)}")
print()

if errors:
    print("ERRORS:")
    for error in errors:
        print(f"  ✗ {error}")
    print()

if warnings:
    print("WARNINGS:")
    for warning in warnings:
        print(f"  ⚠ {warning}")
    print()

if not errors and not warnings:
    print("✓ All validations passed!")
else:
    sys.exit(1)
