#!/bin/zsh

# Generate color statistics for all players from CSV
# This script processes the Chess 2025 - Data.csv file

# Player to analyze (pass as argument, default to Carlos)
PLAYER=${1:-Carlos}

echo "Processing $PLAYER color statistics..."

# Initialize arrays for monthly data
declare -A white_wins black_wins white_losses black_losses white_draws black_draws

# Month names
months=("January" "February" "March" "April" "May" "June" "July" "August" "September" "October" "November" "December")

# Initialize counters
for month in {1..12}; do
    white_wins[$month]=0
    black_wins[$month]=0
    white_losses[$month]=0
    black_losses[$month]=0
    white_draws[$month]=0
    black_draws[$month]=0
done

# Process CSV file
while IFS=, read -r timestamp white_player black_player winner loss_type time_limit notes brutality venue match_id; do
    # Skip header and games with "Other"
    if [[ "$white_player" == "Players [White]" ]] || [[ "$white_player" == *"Other"* ]] || [[ "$black_player" == *"Other"* ]]; then
        continue
    fi

    # Skip if no winner
    if [[ -z "$winner" ]]; then
        continue
    fi

    # Check if player played in this game
    if [[ "$white_player" != "$PLAYER" ]] && [[ "$black_player" != "$PLAYER" ]]; then
        continue
    fi

    # Extract month from timestamp (format: M/D/YYYY H:M:S)
    month=$(echo "$timestamp" | cut -d'/' -f1)

    # Determine player's color and result
    if [[ "$white_player" == "$PLAYER" ]]; then
        # Player played white
        if [[ "$winner" == "White" ]]; then
            ((white_wins[$month]++))
        elif [[ "$winner" == "Black" ]]; then
            ((white_losses[$month]++))
        elif [[ "$winner" == "Draw" ]]; then
            ((white_draws[$month]++))
        fi
    else
        # Player played black
        if [[ "$winner" == "Black" ]]; then
            ((black_wins[$month]++))
        elif [[ "$winner" == "White" ]]; then
            ((black_losses[$month]++))
        elif [[ "$winner" == "Draw" ]]; then
            ((black_draws[$month]++))
        fi
    fi
done < "Chess 2025 - Data.csv"

# Generate JavaScript object
echo ""
echo "// Copy this into app.js"
echo "const CARLOS_COLOR_STATS = {"

for month_num in {1..12}; do
    month_name="${months[$month_num]}"
    echo "  \"$month_name\": {"
    echo "    \"white\": {"
    echo "      \"wins\": ${white_wins[$month_num]},"
    echo "      \"losses\": ${white_losses[$month_num]},"
    echo "      \"draws\": ${white_draws[$month_num]}"
    echo "    },"
    echo "    \"black\": {"
    echo "      \"wins\": ${black_wins[$month_num]},"
    echo "      \"losses\": ${black_losses[$month_num]},"
    echo "      \"draws\": ${black_draws[$month_num]}"
    echo "    }"
    if [[ $month_num -lt 12 ]]; then
        echo "  },"
    else
        echo "  }"
    fi
done

echo "};"

# Print summary
echo ""
echo "// === SUMMARY ==="
total_white_wins=0
total_white_losses=0
total_white_draws=0
total_black_wins=0
total_black_losses=0
total_black_draws=0

for month in {1..12}; do
    ((total_white_wins += white_wins[$month]))
    ((total_white_losses += white_losses[$month]))
    ((total_white_draws += white_draws[$month]))
    ((total_black_wins += black_wins[$month]))
    ((total_black_losses += black_losses[$month]))
    ((total_black_draws += black_draws[$month]))
done

echo "// As White: $((total_white_wins + total_white_losses + total_white_draws)) games"
echo "//   Wins: $total_white_wins | Losses: $total_white_losses | Draws: $total_white_draws"
echo "// As Black: $((total_black_wins + total_black_losses + total_black_draws)) games"
echo "//   Wins: $total_black_wins | Losses: $total_black_losses | Draws: $total_black_draws"
