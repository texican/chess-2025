#!/bin/zsh

typeset -A sessions

# Read from CSV and collect sessions like the script does
{
    read -r header
    while read -r line; do
        IFS=',' read -r timestamp white black winner loss_type time_limit notes brutality venue match_id <<< "$line"
        
        # Remove quotes
        timestamp="${timestamp%\"}"
        timestamp="${timestamp#\"}"
        white="${white%\"}"
        white="${white#\"}"
        
        [[ "$white" == "Other" ]] && continue
        
        date_str="${timestamp% *}"
        sessions["${date_str}_games"]=$((${sessions["${date_str}_games"]:-0} + 1))
    done
} < "Chess 2025 - Data.csv"

# Check sessions
echo "Top sessions by game count:"
for session_key in "${(k)sessions[@]}"; do
    clean_key="${session_key#\"}"
    clean_key="${clean_key%\"}"
    
    if [[ "$clean_key" == *"_games" ]]; then
        date=${clean_key%_games}
        game_count=${sessions["$session_key"]:-0}
        if (( game_count >= 10 )); then
            echo "EPIC: $date = $game_count games"
        fi
    fi
done | sort -k3 -rn | head -5
