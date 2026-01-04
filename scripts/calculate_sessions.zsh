#!/bin/zsh

# Calculate epic session data with win breakdowns
csv_file="Chess 2025 - Data.csv"

# Declare associative arrays
typeset -A session_games
typeset -A session_wins_carlos
typeset -A session_wins_carey
typeset -A session_wins_jorge
typeset -A session_players

# Read CSV and process
tail -n +2 "$csv_file" | while IFS=',' read -r timestamp white black winner rest; do
    # Extract date (first part before space)
    date="${timestamp%% *}"

    # Skip invalid rows
    [[ -z "$winner" ]] && continue
    [[ "$white" == *"Other"* ]] && continue
    [[ "$black" == *"Other"* ]] && continue
    [[ "$white" == "$black" ]] && continue

    # Count games per date
    (( session_games[$date]++ ))

    # Track players
    session_players[$date]="${session_players[$date]} $white $black"

    # Count wins
    if [[ "$winner" == "White" ]]; then
        if [[ "$white" == "Carlos" ]]; then
            (( session_wins_carlos[$date]++ ))
        elif [[ "$white" == "Carey" ]]; then
            (( session_wins_carey[$date]++ ))
        elif [[ "$white" == "Jorge" ]]; then
            (( session_wins_jorge[$date]++ ))
        fi
    elif [[ "$winner" == "Black" ]]; then
        if [[ "$black" == "Carlos" ]]; then
            (( session_wins_carlos[$date]++ ))
        elif [[ "$black" == "Carey" ]]; then
            (( session_wins_carey[$date]++ ))
        elif [[ "$black" == "Jorge" ]]; then
            (( session_wins_jorge[$date]++ ))
        fi
    fi
done

# Output epic sessions (10+ games) sorted by game count
echo "["
first=true
for date games in ${(kv)session_games}; do
    if (( games >= 10 )); then
        carlos_wins=${session_wins_carlos[$date]:-0}
        carey_wins=${session_wins_carey[$date]:-0}
        jorge_wins=${session_wins_jorge[$date]:-0}
        hours=$(printf "%.2f" $((games * 15.0 / 60)))

        # Get unique players
        players=$(echo ${session_players[$date]} | tr ' ' '\n' | sort -u | tr '\n' ',' | sed 's/,$//' | sed 's/,/, /g')

        if [[ "$first" == true ]]; then
            first=false
        else
            echo ","
        fi

        echo -n "  {\"date\": \"$date\", \"games\": $games, \"players\": \"$players\", \"hours\": $hours, \"wins\": {\"Carlos\": $carlos_wins, \"Carey\": $carey_wins, \"Jorge\": $jorge_wins}}"
    fi
done | sort -t: -k2 -nr
echo ""
echo "]"
