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

echo "Looking for epic sessions (10+ games):"
for session_key in "${(k)sessions[@]}"; do
    clean_key="${session_key#\"}"
    clean_key="${clean_key%\"}"
    
    if [[ "$clean_key" == *"_games" ]]; then
        date=${clean_key%_games}
        game_count=${sessions["$session_key"]:-0}
        if (( game_count >= 10 )); then
            echo "Found epic session: $date with $game_count games"
        fi
    fi
done | sort -t: -k2 -rn
