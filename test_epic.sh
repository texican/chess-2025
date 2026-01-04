#!/bin/zsh

typeset -A sessions

{
    read -r header
    while read -r line; do
        IFS=',' read -r timestamp white black winner loss_type time_limit notes brutality venue match_id <<< "$line"
        timestamp="${timestamp%\"}"
        timestamp="${timestamp#\"}"
        white="${white%\"}"
        white="${white#\"}"
        
        [[ "$white" == "Other" ]] && continue
        
        date_str="${timestamp% *}"
        sessions["${date_str}_games"]=$((${sessions["${date_str}_games"]:-0} + 1))
    done
} < "Chess 2025 - Data.csv"

# Test epic logic
epic_json=""
first_epic=true

for session_key in "${(k)sessions[@]}"; do
    clean_key="${session_key#\"}"
    clean_key="${clean_key%\"}"
    
    if [[ "$clean_key" == *"_games" ]]; then
        date=${clean_key%_games}
        game_count=${sessions["$session_key"]:-0}
        game_count=$((game_count + 0))
        
        if (( game_count >= 10 )); then
            echo "EPIC FOUND: $date = $game_count games"
            if ! $first_epic; then
                epic_json="$epic_json,"
            fi
            first_epic=false
            epic_json="$epic_json{\"date\": \"$date\", \"games\": $game_count}"
        fi
    fi
done

echo "Final epic_json: '$epic_json'"
echo "Length: ${#epic_json}"
