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

echo "Testing matching logic:"
for session_key in "${(k)sessions[@]}"; do
    clean_key="${session_key#\"}"
    clean_key="${clean_key%\"}"
    
    echo "session_key='$session_key' clean_key='$clean_key' ends_with_games=$([[ "$clean_key" == *"_games" ]] && echo yes || echo no)"
done | head -5
