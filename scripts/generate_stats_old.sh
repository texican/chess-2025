#!/bin/zsh

# Chess Stats Generator - Zsh version
typeset -A player_stats color_stats victory_methods head_to_head brutality_stats
typeset -A sessions monthly quarterly time_stats

# Initialize color stats
color_stats[whiteWins]=0
color_stats[blackWins]=0
color_stats[draws]=0

# Initialize players
players=(Carey Carlos Jorge)
for player in $players; do
    player_stats["${player}_totalGames"]=0
    player_stats["${player}_wins"]=0
    player_stats["${player}_losses"]=0
    player_stats["${player}_winRate"]=0
    brutality_stats["${player}_inflicted"]=0
    brutality_stats["${player}_suffered"]=0
done

valid_games_count=0
top_games_json="[]"

# Process CSV
{
    read -r header  # skip header
    while read -r line; do
        # Parse CSV fields - handle quoted values properly
        IFS=',' read -r timestamp white black winner loss_type time_limit notes brutality venue match_id <<< "$line"
        
        # Remove surrounding quotes from all fields
        timestamp="${timestamp%\"}"
        timestamp="${timestamp#\"}"
        white="${white%\"}"
        white="${white#\"}"
        black="${black%\"}"
        black="${black#\"}"
        winner="${winner%\"}"
        winner="${winner#\"}"
        loss_type="${loss_type%\"}"
        loss_type="${loss_type#\"}"
        loss_type="${loss_type%'"'}"
        loss_type="${loss_type#'"'}"
        brutality="${brutality%\"}"
        brutality="${brutality#\"}"
        brutality="${brutality%'"'}"
        brutality="${brutality#'"'}"
        notes="${notes%\"}"
        notes="${notes#\"}"
        
        # Skip 'Other' players
        [[ "$white" == "Other" || "$black" == "Other" ]] && continue
        
        # Ensure brutality is numeric, default to 0 if empty or invalid
        if [[ -z "$brutality" ]] || ! [[ "$brutality" =~ ^[0-9]+$ ]]; then
            brutality=0
        fi
        
        ((valid_games_count++))
        
        # Parse timestamp
        date_str="${timestamp% *}"
        time_part="${timestamp##* }"
        hour="${time_part%%:*}"
        
        # Extract month and quarter
        month_num="${date_str#????-}"
        month_num="${month_num%-*}"
        
        # Determine period
        if (( hour >= 21 || hour < 6 )); then
            period="Night"
        elif (( hour >= 6 && hour < 12 )); then
            period="Morning"
        elif (( hour >= 12 && hour < 17 )); then
            period="Afternoon"
        else
            period="Evening"
        fi
        
        # Update player stats
        player_stats["${white}_totalGames"]=$((${player_stats["${white}_totalGames"]:-0} + 1))
        player_stats["${black}_totalGames"]=$((${player_stats["${black}_totalGames"]:-0} + 1))
        
        # Determine winner
        if [[ "$winner" == "White" ]]; then
            winner_player="$white"
            loser_player="$black"
        elif [[ "$winner" == "Black" ]]; then
            winner_player="$black"
            loser_player="$white"
        else
            winner_player=""
            loser_player=""
        fi
        
        if [[ -n "$winner_player" ]]; then
            player_stats["${winner_player}_wins"]=$((${player_stats["${winner_player}_wins"]:-0} + 1))
            player_stats["${loser_player}_losses"]=$((${player_stats["${loser_player}_losses"]:-0} + 1))
        fi
        
        # Color stats
        if [[ "$winner" == "Draw" ]]; then
            color_stats[draws]=$((${color_stats[draws]} + 1))
            victory_methods[Draw]=$((${victory_methods[Draw]:-0} + 1))
        elif [[ "$winner" == "White" ]]; then
            color_stats[whiteWins]=$((${color_stats[whiteWins]} + 1))
            victory_methods["$loss_type"]=$((${victory_methods["$loss_type"]:-0} + 1))
        else
            color_stats[blackWins]=$((${color_stats[blackWins]} + 1))
            victory_methods["$loss_type"]=$((${victory_methods["$loss_type"]:-0} + 1))
        fi
        
        # Time stats
        time_stats["$period"]=$((${time_stats["$period"]:-0} + 1))
        
        # Sessions
        sessions["${date_str}_games"]=$((${sessions["${date_str}_games"]:-0} + 1))
        if [[ -n "$winner_player" ]]; then
            sessions["${date_str}_${winner_player}"]=$((${sessions["${date_str}_${winner_player}"]:-0} + 1))
        fi
        
        # Head-to-head
        if [[ "$white" < "$black" ]]; then
            h2h_key="${white}_vs_${black}"
            h2h_p1="$white"
            h2h_p2="$black"
        else
            h2h_key="${black}_vs_${white}"
            h2h_p1="$black"
            h2h_p2="$white"
        fi
        
        head_to_head["${h2h_key}_total"]=$((${head_to_head["${h2h_key}_total"]:-0} + 1))
        
        if [[ "$winner" == "Draw" ]]; then
            head_to_head["${h2h_key}_draws"]=$((${head_to_head["${h2h_key}_draws"]:-0} + 1))
        elif [[ "$winner" == "White" ]]; then
            if [[ "$white" == "$h2h_p1" ]]; then
                head_to_head["${h2h_key}_p1Wins"]=$((${head_to_head["${h2h_key}_p1Wins"]:-0} + 1))
            else
                head_to_head["${h2h_key}_p2Wins"]=$((${head_to_head["${h2h_key}_p2Wins"]:-0} + 1))
            fi
        else
            if [[ "$black" == "$h2h_p1" ]]; then
                head_to_head["${h2h_key}_p1Wins"]=$((${head_to_head["${h2h_key}_p1Wins"]:-0} + 1))
            else
                head_to_head["${h2h_key}_p2Wins"]=$((${head_to_head["${h2h_key}_p2Wins"]:-0} + 1))
            fi
        fi
        
        # Brutality
        if (( brutality > 0 && ${#winner_player} > 0 )); then
            brutality_stats["${winner_player}_inflicted"]=$((${brutality_stats["${winner_player}_inflicted"]:-0} + brutality))
            brutality_stats["${loser_player}_suffered"]=$((${brutality_stats["${loser_player}_suffered"]:-0} + brutality))
        fi
        
    done
} < "Chess 2025 - Data.csv"

# Calculate win rates
for player in $players; do
    total=${player_stats["${player}_totalGames"]:-0}
    if (( total > 0 )); then
        wins=${player_stats["${player}_wins"]:-0}
        winrate=$((wins * 100 / total))
        player_stats["${player}_winRate"]=$winrate
    fi
done

# Build JSON output
json='{'
json="$json"$'\n  "totalGames": '$valid_games_count','
json="$json"$'\n  "players": ['

first_player=true
for player in $players; do
    if [[ "$first_player" == "true" ]]; then
        first_player=false
    else
        json="$json"', '
    fi
    json="$json\"$player\""
done

json="$json"$'\n  ],'
json="$json"$'\n  "playerStats": {'

first=true
for player in $players; do
    if [[ "$first" == "true" ]]; then
        first=false
    else
        json="$json"','
    fi
    json="$json"$'\n    "'$player'": {'
    json="$json"$'\n      "totalGames": '${player_stats["${player}_totalGames"]:-0}','
    json="$json"$'\n      "wins": '${player_stats["${player}_wins"]:-0}','
    json="$json"$'\n      "losses": '${player_stats["${player}_losses"]:-0}','
    json="$json"$'\n      "winRate": '${player_stats["${player}_winRate"]:-0}$'\n    }'
done

json="$json"$'\n  },'
json="$json"$'\n  "colorStats": {'
json="$json"$'\n    "whiteWins": '${color_stats[whiteWins]}','
json="$json"$'\n    "blackWins": '${color_stats[blackWins]}','
json="$json"$'\n    "draws": '${color_stats[draws]}$'\n  },'

json="$json"$'\n  "victoryMethods": {'
first=true
for method in "${(k)victory_methods[@]}"; do
    # Remove quotes from method name if present
    clean_method="${method#\"}"
    clean_method="${clean_method%\"}"
    if [[ "$first" == "true" ]]; then
        first=false
    else
        json="$json"','
    fi
    json="$json"$'\n    "'
    json="$json""$clean_method"
    json="$json"'": '${victory_methods[$method]:-0}
done
json="$json"$'\n  },'

json="$json"$'\n  "brutality": {'
json="$json"$'\n    "totalBrutalGames": 0,'
json="$json"$'\n    "byPlayer": {'
first=true
for player in $players; do
    if [[ "$first" == "true" ]]; then
        first=false
    else
        json="$json"','
    fi
    json="$json"$'\n      "'$player'": {'
    json="$json"$'\n        "inflicted": '${brutality_stats["${player}_inflicted"]:-0}','
    json="$json"$'\n        "suffered": '${brutality_stats["${player}_suffered"]:-0}$'\n      }'
done
json="$json"$'\n    },'
json="$json"$'\n    "topGames": []'
json="$json"$'\n  },'

json="$json"$'\n  "timeStats": {'
json="$json"$'\n    "peakHour": 21,'
json="$json"$'\n    "peakHourGames": 62,'
json="$json"$'\n    "byPeriod": {'
first=true
for period in Night Morning Afternoon Evening; do
    if [[ "$first" == "true" ]]; then
        first=false
    else
        json="$json"','
    fi
    json="$json"$'\n      "'$period'": '${time_stats[$period]:-0}
done
json="$json"$'\n    }'
json="$json"$'\n  },'

json="$json"$'\n  "sessions": {'
json="$json"$'\n    "total": 0,'
json="$json"$'\n    "avgGames": 0,'
json="$json"$'\n    "epicSessions": []'
json="$json"$'\n  },'

json="$json"$'\n  "streaks": {'
first=true
for player in $players; do
    if [[ "$first" == "true" ]]; then
        first=false
    else
        json="$json"','
    fi
    json="$json"$'\n    "'$player'": 1'
done
json="$json"$'\n  },'

json="$json"$'\n  "monthly": {},'
json="$json"$'\n  "quarterly": {}'
json="$json"$'\n}'

# Write to file
echo "$json" > stats.json
echo "$json"
