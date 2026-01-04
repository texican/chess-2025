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

# Check what's actually there
total_session_games=0
for session_key in "${(k)sessions[@]}"; do
    clean_key="${session_key#\"}"
    clean_key="${clean_key%\"}"
    
    if [[ "$clean_key" == *"_games" ]]; then
        game_count=${sessions["$session_key"]:-0}
        game_count=$((game_count + 0))
        ((total_session_games += game_count))
        
        if (( game_count >= 10 )); then
            echo "Found game count $game_count"
        fi
    fi
done
echo "Total session games: $total_session_games"
