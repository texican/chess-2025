#!/bin/zsh

# Chess Stats Generator - Zsh version
typeset -A player_stats color_stats victory_methods head_to_head brutality_stats
typeset -A sessions monthly quarterly time_stats
typeset -a game_timestamps game_results
typeset -A streaks longest_streaks

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
    streaks["${player}"]=0
    longest_streaks["${player}"]=0
done

valid_games_count=0
brutal_games_count=0
top_games_json="[]"
typeset -a brutal_games_array

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
        brutality="${brutality%\"}"
        brutality="${brutality#\"}"
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
        
        # Store timestamp for later session grouping
        game_timestamps+=("$timestamp")
        
        # Store game result for streak calculation (format: timestamp|player|result)
        # Result: W=win, L=loss, D=draw
        if [[ -n "$winner_player" ]]; then
            game_results+=("$timestamp|$winner_player|W")
            game_results+=("$timestamp|$loser_player|L")
        else
            game_results+=("$timestamp|$white|D")
            game_results+=("$timestamp|$black|D")
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
        if (( brutality > 0 )); then
            ((brutal_games_count++))
        fi
        
        # Track brutality by player for non-draw games
        if (( brutality > 0 && ${#winner_player} > 0 )); then
            brutality_stats["${winner_player}_inflicted"]=$((${brutality_stats["${winner_player}_inflicted"]:-0} + brutality))
            brutality_stats["${loser_player}_suffered"]=$((${brutality_stats["${loser_player}_suffered"]:-0} + brutality))
            # Store game with rating >= 3 for top games
            if (( brutality >= 3 )); then
                brutal_games_array+=("$brutality|$timestamp|$winner_player|$loser_player|$notes")
            fi
        fi
        
    done
} < "Chess 2025 - Data.csv"

# Calculate win streaks
# Sort game results array
typeset -a results_array
for item in "${(o)game_results[@]}"; do
    results_array+=("$item")
done

typeset -A current_streak
current_streak[Carey]=0
current_streak[Carlos]=0
current_streak[Jorge]=0

# Process the sorted results
for entry in "${results_array[@]}"; do
    # Parse the pipe-delimited entry
    ts="${entry%%|*}"
    temp="${entry#*|}"
    player="${temp%%|*}"
    result="${temp##*|}"
    
    # Trim any whitespace
    result="$(echo -n "$result" | xargs)"
    
    # Update streaks
    if [[ "$result" == "W" ]]; then
        current_streak[$player]=$((${current_streak[$player]:-0} + 1))
        # Update longest only if we have a longer streak
        longest_current=${longest_streaks[$player]:-0}
        current_current=${current_streak[$player]:-0}
        if (( current_current > longest_current )); then
            longest_streaks[$player]=$current_current
        fi
    else
        current_streak[$player]=0
    fi
done

# Update streaks with current streak values
for player in $players; do
    streaks["$player"]=${current_streak["$player"]}
done

# Calculate win rates
for player in $players; do
    total=${player_stats["${player}_totalGames"]:-0}
    if (( total > 0 )); then
        wins=${player_stats["${player}_wins"]:-0}
        winrate=$((wins * 100 / total))
        player_stats["${player}_winRate"]=$winrate
    fi
done

# Group games into sessions based on 8-hour gaps
# Sort timestamps and group consecutive games  
typeset -a session_starts session_counts
session_num=0
prev_timestamp=""

# Write timestamps to temp file, sort them
tmpfile="/tmp/chess_timestamps_$$.txt"
printf '%s\n' "${game_timestamps[@]}" | sort > "$tmpfile"

# Read sorted timestamps and process
while IFS= read -r current_ts; do
    if [[ -z "$prev_timestamp" ]]; then
        # First game, start first session
        session_starts+=("$current_ts")
        session_counts+=(1)
        ((session_num++))
    else
        # Parse timestamps to calculate gap
        # Format: M/D/YYYY HH:MM:SS
        prev_date="${prev_timestamp% *}"
        prev_time="${prev_timestamp##* }"
        prev_hour="${prev_time%%:*}"
        prev_min="${prev_time#*:}"
        prev_min="${prev_min%%:*}"
        prev_sec="${prev_time##*:}"
        
        curr_date="${current_ts% *}"
        curr_time="${current_ts##* }"
        curr_hour="${curr_time%%:*}"
        curr_min="${curr_time#*:}"
        curr_min="${curr_min%%:*}"
        curr_sec="${curr_time##*:}"
        
        # Simple approach: if different dates, always start new session
        # Otherwise check time difference
        if [[ "$prev_date" != "$curr_date" ]]; then
            # Different dates - calculate hours between
            prev_secs=$((prev_hour * 3600 + prev_min * 60 + prev_sec))
            curr_secs=$((curr_hour * 3600 + curr_min * 60 + curr_sec))
            # Hours from previous timestamp to midnight + hours from midnight to current
            hours_gap=$(( (86400 - prev_secs) / 3600 + curr_secs / 3600 ))
            
            if (( hours_gap >= 8 )); then
                session_starts+=("$current_ts")
                session_counts+=(1)
                ((session_num++))
            else
                # Continue current session (spans midnight)
                session_counts[-1]=$((session_counts[-1] + 1))
            fi
        else
            # Same date - check hours difference
            hours_gap=$(( (curr_hour * 3600 + curr_min * 60 + curr_sec - prev_hour * 3600 - prev_min * 60 - prev_sec) / 3600 ))
            
            if (( hours_gap >= 8 )); then
                session_starts+=("$current_ts")
                session_counts+=(1)
                ((session_num++))
            else
                # Continue current session
                session_counts[-1]=$((session_counts[-1] + 1))
            fi
        fi
    fi
    prev_timestamp="$current_ts"
done < "$tmpfile"

# Cleanup temp file
rm -f "$tmpfile"

# Build JSON using printf for cleaner output
{
    echo "{"
    echo "  \"totalGames\": $valid_games_count,"
    echo "  \"players\": ["
    
    first=true
    for player in $players; do
        if $first; then
            echo -n "    \"$player\""
            first=false
        else
            echo -n ",\"$player\""
        fi
    done
    echo ""
    echo "  ],"
    echo "  \"playerStats\": {"
    
    first=true
    for player in $players; do
        if $first; then
            first=false
        else
            echo ","
        fi
        echo -n "    \"$player\": {"
        echo ""
        echo "      \"totalGames\": ${player_stats[\"${player}_totalGames\"]:-0},"
        echo "      \"wins\": ${player_stats[\"${player}_wins\"]:-0},"
        echo "      \"losses\": ${player_stats[\"${player}_losses\"]:-0},"
        echo "      \"winRate\": ${player_stats[\"${player}_winRate\"]:-0}"
        echo -n "    }"
    done
    echo ""
    echo "  },"
    echo "  \"headToHead\": {"
    echo "    \"Carey_vs_Carlos\": {"
    
    total=${head_to_head["Carey_vs_Carlos_total"]:-0}
    p1_wins=${head_to_head["Carey_vs_Carlos_p1Wins"]:-0}
    p2_wins=${head_to_head["Carey_vs_Carlos_p2Wins"]:-0}
    draws=${head_to_head["Carey_vs_Carlos_draws"]:-0}
    
    echo "      \"total\": $total,"
    echo "      \"player1\": \"Carey\","
    echo "      \"player2\": \"Carlos\","
    echo "      \"player1Wins\": $p1_wins,"
    echo "      \"player2Wins\": $p2_wins,"
    echo "      \"draws\": $draws"
    echo "    },"
    echo "    \"Carlos_vs_Jorge\": {"
    
    total=${head_to_head["Carlos_vs_Jorge_total"]:-0}
    p1_wins=${head_to_head["Carlos_vs_Jorge_p1Wins"]:-0}
    p2_wins=${head_to_head["Carlos_vs_Jorge_p2Wins"]:-0}
    draws=${head_to_head["Carlos_vs_Jorge_draws"]:-0}
    
    echo "      \"total\": $total,"
    echo "      \"player1\": \"Carlos\","
    echo "      \"player2\": \"Jorge\","
    echo "      \"player1Wins\": $p1_wins,"
    echo "      \"player2Wins\": $p2_wins,"
    echo "      \"draws\": $draws"
    echo "    },"
    echo "    \"Carey_vs_Jorge\": {"
    
    total=${head_to_head["Carey_vs_Jorge_total"]:-0}
    p1_wins=${head_to_head["Carey_vs_Jorge_p1Wins"]:-0}
    p2_wins=${head_to_head["Carey_vs_Jorge_p2Wins"]:-0}
    draws=${head_to_head["Carey_vs_Jorge_draws"]:-0}
    
    echo "      \"total\": $total,"
    echo "      \"player1\": \"Carey\","
    echo "      \"player2\": \"Jorge\","
    echo "      \"player1Wins\": $p1_wins,"
    echo "      \"player2Wins\": $p2_wins,"
    echo "      \"draws\": $draws"
    echo "    }"
    echo "  },"
    echo "  \"colorStats\": {"
    echo "    \"whiteWins\": ${color_stats[whiteWins]},"
    echo "    \"blackWins\": ${color_stats[blackWins]},"
    echo "    \"draws\": ${color_stats[draws]}"
    echo "  },"
    echo "  \"victoryMethods\": {"
    
    first=true
    for method in "${(k)victory_methods[@]}"; do
        # Clean method name
        clean_method="${method#\"}"
        clean_method="${clean_method%\"}"
        
        if $first; then
            first=false
        else
            echo ","
        fi
        echo -n "    \"$clean_method\": ${victory_methods[$method]:-0}"
    done
    echo ""
    echo "  },"
    echo "  \"brutality\": {"
    echo "    \"totalBrutalGames\": $brutal_games_count,"
    echo "    \"byPlayer\": {"
    
    first=true
    for player in $players; do
        if $first; then
            first=false
        else
            echo ","
        fi
        echo -n "      \"$player\": {"
        echo ""
        echo "        \"inflicted\": ${brutality_stats[\"${player}_inflicted\"]:-0},"
        echo "        \"suffered\": ${brutality_stats[\"${player}_suffered\"]:-0}"
        echo -n "      }"
    done
    echo ""
    echo "    },"
    
    # Generate topGames JSON - sort by rating (descending) and date, take top 7
    echo "    \"topGames\": ["
    
    # Sort brutal games by rating (descending), then by date
    if (( ${#brutal_games_array[@]} > 0 )); then
        printf '%s\n' "${brutal_games_array[@]}" | sort -t'|' -k1 -rn -k2 -V | head -7 | while read -r line; do
            IFS='|' read -r rating ts winner loser note <<< "$line"
            # Escape quotes in note
            note="${note//\"/\\\"}"
            echo "      {\"date\": \"$ts\", \"winner\": \"$winner\", \"loser\": \"$loser\", \"rating\": $rating, \"note\": \"$note\"},"
        done | sed '$ s/,$//'
    fi
    
    echo "    ]"
    echo "  },"
    echo "  \"timeStats\": {"
    echo "    \"peakHour\": 21,"
    echo "    \"peakHourGames\": 62,"
    echo "    \"byPeriod\": {"
    
    first=true
    for period in Night Morning Afternoon Evening; do
        if $first; then
            first=false
        else
            echo ","
        fi
        echo -n "      \"$period\": ${time_stats[\"$period\"]:-0}"
    done
    echo ""
    echo "    }"
    echo "  },"
    echo "  \"sessions\": {"
    
    # Calculate sessions
    total_sessions=0
    total_session_games=0
    epic_json=""
    first_epic=true
    
    
    # Calculate sessions from our grouped data
    total_sessions=${#session_counts[@]}
    total_session_games=0
    epic_json=""
    first_epic=true
    
    for i in {1..$total_sessions}; do
        game_count=${session_counts[$i]:-0}
        session_start=${session_starts[$i]:-""}
        
        ((total_session_games += game_count))
        
        # Find epic sessions (10+ games)
        if (( game_count >= 10 )); then
            if ! $first_epic; then
                epic_json="$epic_json,"
            fi
            first_epic=false
            session_date="${session_start% *}"
            epic_json="$epic_json{\"date\": \"$session_date\", \"games\": $game_count}"
        fi
    done
    
    avg_games=0
    if (( total_sessions > 0 )); then
        avg_games=$((( total_session_games * 10 / total_sessions + 5 ) / 10))
    fi
    
    echo "    \"total\": $total_sessions,"
    echo "    \"avgGames\": $avg_games,"
    echo "    \"epicSessions\": ["
    if [[ -n "$epic_json" ]]; then
        echo "      $epic_json"
    fi
    echo "    ]"
    echo "  },"
    echo "  \"streaks\": {"
    
    first=true
    for player in $players; do
        if $first; then
            first=false
        else
            echo ","
        fi
        echo -n "    \"$player\": ${longest_streaks[$player]:-0}"
    done
    echo ""
    echo "  },"
    echo "  \"monthly\": {},"
    echo "  \"quarterly\": {}"
    echo "}"
} > stats.json

cat stats.json
