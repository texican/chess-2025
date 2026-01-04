#!/bin/zsh

# Calculate monthly losses for each player
csv_file="Chess 2025 - Data.csv"

# Declare associative arrays
typeset -A monthly_carlos_losses
typeset -A monthly_carey_losses
typeset -A monthly_jorge_losses

# Read CSV and process
tail -n +2 "$csv_file" | while IFS=',' read -r timestamp white black winner rest; do
    # Extract month from timestamp (format: M/D/YYYY ...)
    month="${timestamp%%/*}"

    # Skip invalid rows
    [[ -z "$winner" ]] && continue
    [[ "$white" == *"Other"* ]] && continue
    [[ "$black" == *"Other"* ]] && continue
    [[ "$white" == "$black" ]] && continue

    # Count losses per player per month
    if [[ "$winner" == "White" ]]; then
        # Black player lost
        if [[ "$black" == "Carlos" ]]; then
            (( monthly_carlos_losses[$month]++ ))
        elif [[ "$black" == "Carey" ]]; then
            (( monthly_carey_losses[$month]++ ))
        elif [[ "$black" == "Jorge" ]]; then
            (( monthly_jorge_losses[$month]++ ))
        fi
    elif [[ "$winner" == "Black" ]]; then
        # White player lost
        if [[ "$white" == "Carlos" ]]; then
            (( monthly_carlos_losses[$month]++ ))
        elif [[ "$white" == "Carey" ]]; then
            (( monthly_carey_losses[$month]++ ))
        elif [[ "$white" == "Jorge" ]]; then
            (( monthly_jorge_losses[$month]++ ))
        fi
    fi
done

# Output JSON
echo "{"
echo "  \"Carlos\": {"
first=true
for month in {1..12}; do
    losses=${monthly_carlos_losses[$month]:-0}

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

    echo -n "    \"$month_name\": $losses"
done
echo ""
echo "  },"

echo "  \"Carey\": {"
first=true
for month in {1..12}; do
    losses=${monthly_carey_losses[$month]:-0}

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

    echo -n "    \"$month_name\": $losses"
done
echo ""
echo "  },"

echo "  \"Jorge\": {"
first=true
for month in {1..12}; do
    losses=${monthly_jorge_losses[$month]:-0}

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

    echo -n "    \"$month_name\": $losses"
done
echo ""
echo "  }"
echo "}"
