#!/bin/zsh

# Calculate monthly statistics with win breakdowns
csv_file="Chess 2025 - Data.csv"

# Declare associative arrays for each month
typeset -A monthly_games
typeset -A monthly_carlos_wins
typeset -A monthly_carey_wins
typeset -A monthly_jorge_wins

# Read CSV and process
tail -n +2 "$csv_file" | while IFS=',' read -r timestamp white black winner rest; do
    # Extract month from timestamp (format: M/D/YYYY ...)
    month="${timestamp%%/*}"

    # Skip invalid rows
    [[ -z "$winner" ]] && continue
    [[ "$white" == *"Other"* ]] && continue
    [[ "$black" == *"Other"* ]] && continue
    [[ "$white" == "$black" ]] && continue

    # Count games per month
    (( monthly_games[$month]++ ))

    # Count wins per player per month
    if [[ "$winner" == "White" ]]; then
        if [[ "$white" == "Carlos" ]]; then
            (( monthly_carlos_wins[$month]++ ))
        elif [[ "$white" == "Carey" ]]; then
            (( monthly_carey_wins[$month]++ ))
        elif [[ "$white" == "Jorge" ]]; then
            (( monthly_jorge_wins[$month]++ ))
        fi
    elif [[ "$winner" == "Black" ]]; then
        if [[ "$black" == "Carlos" ]]; then
            (( monthly_carlos_wins[$month]++ ))
        elif [[ "$black" == "Carey" ]]; then
            (( monthly_carey_wins[$month]++ ))
        elif [[ "$black" == "Jorge" ]]; then
            (( monthly_jorge_wins[$month]++ ))
        fi
    fi
done

# Output JSON
echo "{"
first=true
for month in {1..12}; do
    games=${monthly_games[$month]:-0}

    if [[ "$first" == true ]]; then
        first=false
    else
        echo ","
    fi

    carlos_wins=${monthly_carlos_wins[$month]:-0}
    carey_wins=${monthly_carey_wins[$month]:-0}
    jorge_wins=${monthly_jorge_wins[$month]:-0}

    month_name=$(case $month in
        1) echo "January" ;;
        2) echo "February" ;;
        3) echo "March" ;;
        4) echo "April" ;;
        5) echo "May" ;;
        6) echo "June" ;;
        7) echo "July" ;;
        8) echo "August" ;;
        9) echo "September" ;;
        10) echo "October" ;;
        11) echo "November" ;;
        12) echo "December" ;;
    esac)

    echo -n "  \"$month_name\": {\"games\": $games, \"wins\": {\"Carlos\": $carlos_wins, \"Carey\": $carey_wins, \"Jorge\": $jorge_wins}}"
done
echo ""
echo "}"
