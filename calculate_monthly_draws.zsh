#!/bin/zsh

# Calculate monthly draws for each player
csv_file="Chess 2025 - Data.csv"

# Declare associative arrays
typeset -A monthly_carlos_draws
typeset -A monthly_carey_draws
typeset -A monthly_jorge_draws

# Read CSV and process
tail -n +2 "$csv_file" | while IFS=',' read -r timestamp white black winner rest; do
    # Extract month from timestamp (format: M/D/YYYY ...)
    month="${timestamp%%/*}"

    # Skip invalid rows
    [[ -z "$winner" ]] && continue
    [[ "$white" == *"Other"* ]] && continue
    [[ "$black" == *"Other"* ]] && continue
    [[ "$white" == "$black" ]] && continue

    # Count draws per player per month
    if [[ "$winner" == "Draw" ]]; then
        # Both players get a draw
        if [[ "$white" == "Carlos" ]]; then
            (( monthly_carlos_draws[$month]++ ))
        elif [[ "$white" == "Carey" ]]; then
            (( monthly_carey_draws[$month]++ ))
        elif [[ "$white" == "Jorge" ]]; then
            (( monthly_jorge_draws[$month]++ ))
        fi

        if [[ "$black" == "Carlos" ]]; then
            (( monthly_carlos_draws[$month]++ ))
        elif [[ "$black" == "Carey" ]]; then
            (( monthly_carey_draws[$month]++ ))
        elif [[ "$black" == "Jorge" ]]; then
            (( monthly_jorge_draws[$month]++ ))
        fi
    fi
done

# Output JSON
echo "{"
echo "  \"Carlos\": {"
first=true
for month in {1..12}; do
    draws=${monthly_carlos_draws[$month]:-0}

    if [[ "$first" == true ]]; then
        first=false
    else
        echo ","
    fi

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

    echo -n "    \"$month_name\": $draws"
done
echo ""
echo "  },"

echo "  \"Carey\": {"
first=true
for month in {1..12}; do
    draws=${monthly_carey_draws[$month]:-0}

    if [[ "$first" == true ]]; then
        first=false
    else
        echo ","
    fi

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

    echo -n "    \"$month_name\": $draws"
done
echo ""
echo "  },"

echo "  \"Jorge\": {"
first=true
for month in {1..12}; do
    draws=${monthly_jorge_draws[$month]:-0}

    if [[ "$first" == true ]]; then
        first=false
    else
        echo ","
    fi

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

    echo -n "    \"$month_name\": $draws"
done
echo ""
echo "  }"
echo "}"
