#!/bin/zsh

typeset -A sessions

# Simulate the session collection
sessions["2025-01-10_games"]=3
sessions["2025-01-11_games"]=2
sessions["2025-02-15_games"]=5

# Check what's in the array
echo "Sessions array:"
for key in "${(k)sessions[@]}"; do
    echo "  Key: $key = ${sessions[$key]}"
done

# Try iteration
total=0
for key in "${(k)sessions[@]}"; do
    if [[ "$key" == *"_games" ]]; then
        count=${sessions["$key"]}
        echo "Found: $key = $count"
        ((total += count))
    fi
done
echo "Total: $total"
