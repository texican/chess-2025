#!/bin/zsh

typeset -A sessions

# Read from CSV
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

# Show all sessions
echo "Total sessions collected: ${#sessions[@]}"
echo "Sample keys:"
count=0
for key in "${(k)sessions[@]}"; do
    echo "  $key = ${sessions[$key]}"
    ((count++))
    [[ $count -ge 5 ]] && break
done
