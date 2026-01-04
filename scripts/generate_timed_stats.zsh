#!/bin/zsh

# Chess Timed Games Statistics Generator
# Analyzes only games with Time Limit specified

INPUT_FILE="Chess 2025 - Data.csv"
OUTPUT_FILE="timed_stats.txt"

echo "Chess 2025 - Timed Games Statistics" > "$OUTPUT_FILE"
echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Count total timed games (excluding header, games with non-empty Time Limit column)
TIMED_GAMES=$(awk -F',' 'NR>1 && $6!="" {print}' "$INPUT_FILE" | wc -l | tr -d ' ')
TOTAL_GAMES=$(tail -n +2 "$INPUT_FILE" | wc -l | tr -d ' ')

echo "Total games in dataset: $TOTAL_GAMES" >> "$OUTPUT_FILE"
echo "Timed games: $TIMED_GAMES" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Extract timed games to temporary file
awk -F',' 'NR==1 {print} NR>1 && $6!="" && $2!~"Other" && $3!~"Other" && $2!=$3 {print}' "$INPUT_FILE" > /tmp/timed_games.csv

echo "PLAYER STATISTICS (Timed Games Only)" >> "$OUTPUT_FILE"
echo "-------------------------------------" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Analyze each player
for PLAYER in "Carlos" "Carey" "Jorge"; do
    # Games as White
    GAMES_WHITE=$(awk -F',' -v p="$PLAYER" 'NR>1 && $2==p {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

    # Games as Black
    GAMES_BLACK=$(awk -F',' -v p="$PLAYER" 'NR>1 && $3==p {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

    # Total games
    TOTAL_PLAYER_GAMES=$((GAMES_WHITE + GAMES_BLACK))

    # Wins (White wins + Black wins)
    WINS_AS_WHITE=$(awk -F',' -v p="$PLAYER" 'NR>1 && $2==p && $4=="White" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    WINS_AS_BLACK=$(awk -F',' -v p="$PLAYER" 'NR>1 && $3==p && $4=="Black" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    TOTAL_WINS=$((WINS_AS_WHITE + WINS_AS_BLACK))

    # Losses
    LOSSES=$((TOTAL_PLAYER_GAMES - TOTAL_WINS))

    # Win rate
    if [ $TOTAL_PLAYER_GAMES -gt 0 ]; then
        WIN_RATE=$(echo "scale=1; $TOTAL_WINS * 100 / $TOTAL_PLAYER_GAMES" | bc)
    else
        WIN_RATE="0.0"
    fi

    # Wins on time
    WINS_ON_TIME_WHITE=$(awk -F',' -v p="$PLAYER" 'NR>1 && $2==p && $4=="White" && $5=="Time" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    WINS_ON_TIME_BLACK=$(awk -F',' -v p="$PLAYER" 'NR>1 && $3==p && $4=="Black" && $5=="Time" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    WINS_ON_TIME=$((WINS_ON_TIME_WHITE + WINS_ON_TIME_BLACK))

    # Losses on time
    LOSSES_ON_TIME_WHITE=$(awk -F',' -v p="$PLAYER" 'NR>1 && $2==p && $4=="Black" && $5=="Time" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    LOSSES_ON_TIME_BLACK=$(awk -F',' -v p="$PLAYER" 'NR>1 && $3==p && $4=="White" && $5=="Time" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
    LOSSES_ON_TIME=$((LOSSES_ON_TIME_WHITE + LOSSES_ON_TIME_BLACK))

    echo "$PLAYER:" >> "$OUTPUT_FILE"
    echo "  Total timed games: $TOTAL_PLAYER_GAMES" >> "$OUTPUT_FILE"
    echo "  Wins: $TOTAL_WINS" >> "$OUTPUT_FILE"
    echo "  Losses: $LOSSES" >> "$OUTPUT_FILE"
    echo "  Win rate: ${WIN_RATE}%" >> "$OUTPUT_FILE"
    echo "  Games as White: $GAMES_WHITE" >> "$OUTPUT_FILE"
    echo "  Games as Black: $GAMES_BLACK" >> "$OUTPUT_FILE"
    echo "  Wins on time: $WINS_ON_TIME" >> "$OUTPUT_FILE"
    echo "  Losses on time: $LOSSES_ON_TIME" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "HEAD-TO-HEAD (Timed Games Only)" >> "$OUTPUT_FILE"
echo "--------------------------------" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Carlos vs Carey
C1="Carlos"
C2="Carey"
H2H_GAMES=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C1_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="White") || (($2==p2 && $3==p1) && $4=="Black")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C2_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="Black") || (($2==p2 && $3==p1) && $4=="White")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
DRAWS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) && $4=="Draw" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

echo "$C1 vs $C2:" >> "$OUTPUT_FILE"
echo "  Total games: $H2H_GAMES" >> "$OUTPUT_FILE"
echo "  $C1 wins: $C1_WINS" >> "$OUTPUT_FILE"
echo "  $C2 wins: $C2_WINS" >> "$OUTPUT_FILE"
echo "  Draws: $DRAWS" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Carlos vs Jorge
C1="Carlos"
C2="Jorge"
H2H_GAMES=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C1_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="White") || (($2==p2 && $3==p1) && $4=="Black")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C2_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="Black") || (($2==p2 && $3==p1) && $4=="White")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
DRAWS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) && $4=="Draw" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

echo "$C1 vs $C2:" >> "$OUTPUT_FILE"
echo "  Total games: $H2H_GAMES" >> "$OUTPUT_FILE"
echo "  $C1 wins: $C1_WINS" >> "$OUTPUT_FILE"
echo "  $C2 wins: $C2_WINS" >> "$OUTPUT_FILE"
echo "  Draws: $DRAWS" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Carey vs Jorge
C1="Carey"
C2="Jorge"
H2H_GAMES=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C1_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="White") || (($2==p2 && $3==p1) && $4=="Black")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
C2_WINS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && ((($2==p1 && $3==p2) && $4=="Black") || (($2==p2 && $3==p1) && $4=="White")) {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
DRAWS=$(awk -F',' -v p1="$C1" -v p2="$C2" 'NR>1 && (($2==p1 && $3==p2) || ($2==p2 && $3==p1)) && $4=="Draw" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

echo "$C1 vs $C2:" >> "$OUTPUT_FILE"
echo "  Total games: $H2H_GAMES" >> "$OUTPUT_FILE"
echo "  $C1 wins: $C1_WINS" >> "$OUTPUT_FILE"
echo "  $C2 wins: $C2_WINS" >> "$OUTPUT_FILE"
echo "  Draws: $DRAWS" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "VICTORY METHODS (Timed Games)" >> "$OUTPUT_FILE"
echo "-----------------------------" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Count each loss type
awk -F',' 'NR>1 {print $5}' /tmp/timed_games.csv | sort | uniq -c | sort -rn | while read count method; do
    echo "  $method: $count" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"
echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "COLOR ADVANTAGE (Timed Games)" >> "$OUTPUT_FILE"
echo "-----------------------------" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

WHITE_WINS=$(awk -F',' 'NR>1 && $4=="White" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
BLACK_WINS=$(awk -F',' 'NR>1 && $4=="Black" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')
DRAW_GAMES=$(awk -F',' 'NR>1 && $4=="Draw" {print}' /tmp/timed_games.csv | wc -l | tr -d ' ')

if [ $TIMED_GAMES -gt 0 ]; then
    WHITE_PCT=$(echo "scale=1; $WHITE_WINS * 100 / $TIMED_GAMES" | bc)
    BLACK_PCT=$(echo "scale=1; $BLACK_WINS * 100 / $TIMED_GAMES" | bc)
    DRAW_PCT=$(echo "scale=1; $DRAW_GAMES * 100 / $TIMED_GAMES" | bc)
else
    WHITE_PCT="0.0"
    BLACK_PCT="0.0"
    DRAW_PCT="0.0"
fi

echo "  White wins: $WHITE_WINS (${WHITE_PCT}%)" >> "$OUTPUT_FILE"
echo "  Black wins: $BLACK_WINS (${BLACK_PCT}%)" >> "$OUTPUT_FILE"
echo "  Draws: $DRAW_GAMES (${DRAW_PCT}%)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "TIMED GAME SESSIONS" >> "$OUTPUT_FILE"
echo "-------------------" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Group by date and count games
awk -F',' 'NR>1 {split($1, a, " "); print a[1]}' /tmp/timed_games.csv | sort | uniq -c | sort -rn > /tmp/sessions.txt

TOTAL_SESSIONS=$(cat /tmp/sessions.txt | wc -l | tr -d ' ')
if [ $TOTAL_SESSIONS -gt 0 ]; then
    AVG_GAMES=$(awk '{sum+=$1; count++} END {printf "%.1f", sum/count}' /tmp/sessions.txt)
else
    AVG_GAMES="0.0"
fi

echo "Total sessions with timed games: $TOTAL_SESSIONS" >> "$OUTPUT_FILE"
echo "Average timed games per session: $AVG_GAMES" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Epic sessions (5+ timed games)
EPIC_SESSIONS=$(awk '$1>=5 {print}' /tmp/sessions.txt | wc -l | tr -d ' ')
if [ $EPIC_SESSIONS -gt 0 ]; then
    echo "Sessions with 5+ timed games: $EPIC_SESSIONS" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "Top sessions:" >> "$OUTPUT_FILE"
    awk '$1>=5 {print}' /tmp/sessions.txt | head -10 | while read count date; do
        echo "  $date: $count games" >> "$OUTPUT_FILE"
    done
    echo "" >> "$OUTPUT_FILE"
fi

echo "====================================" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "Statistics saved to $OUTPUT_FILE"
echo ""
echo "Summary:"
echo "  Total games: $TOTAL_GAMES"
echo "  Timed games: $TIMED_GAMES"
echo "  Percentage timed: $(echo "scale=1; $TIMED_GAMES * 100 / $TOTAL_GAMES" | bc)%"

# Display the output file
cat "$OUTPUT_FILE"

# Cleanup
rm -f /tmp/timed_games.csv /tmp/sessions.txt
