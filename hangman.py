import random

WORDS = [
    ("butterfly", "Nature"),
    ("mountain", "Outdoors"),
    ("keyboard", "Everyday things"),
    ("pineapple", "Food"),
    ("telescope", "Science"),
    ("jazz", "Music"),
    ("compass", "Travel"),
    ("volcano", "Nature"),
    ("pancake", "Food"),
    ("library", "Places"),
    ("dolphin", "Animals"),
    ("rainbow", "Nature"),
    ("backpack", "Everyday things"),
    ("astronaut", "Science"),
    ("pumpkin", "Food"),
    ("bicycle", "Travel"),
    ("whistle", "Everyday things"),
    ("strawberry", "Food"),
    ("penguin", "Animals"),
    ("thunder", "Weather"),
]

STAGES = [
    """
     +---+
     |   |
         |
         |
         |
    ========
    """,
    """
     +---+
     |   |
     O   |
         |
         |
    ========
    """,
    """
     +---+
     |   |
     O   |
     |   |
         |
    ========
    """,
    """
     +---+
     |   |
     O   |
    /|   |
         |
    ========
    """,
    """
     +---+
     |   |
     O   |
    /|\\  |
         |
    ========
    """,
    """
     +---+
     |   |
     O   |
    /|\\  |
    /    |
    ========
    """,
    """
     +---+
     |   |
     O   |
    /|\\  |
    / \\  |
    ========
    """,
]


def play_game():
    word, category = random.choice(WORDS)
    guessed_letters = set()
    misses = 0
    max_misses = len(STAGES) - 1

    print("\n  H A N G M A N")
    print("  Category:", category)

    while misses < max_misses:
        print(STAGES[misses])
        print("  Word:", " ".join(letter if letter in guessed_letters else "_" for letter in word))
        print(f"  Misses: {misses}/{max_misses}")
        print("  Guessed:", " ".join(sorted(guessed_letters)) or "none")

        guess = input("\n  Guess one letter: ").strip().lower()
        if len(guess) != 1 or not guess.isalpha():
            print("  Enter one letter from A to Z.\n")
            continue
        if guess in guessed_letters:
            print("  You already tried that letter.\n")
            continue

        guessed_letters.add(guess)
        if guess not in word:
            misses += 1
            print("  Not in the word.\n")
            continue

        if all(letter in guessed_letters for letter in word):
            print(STAGES[misses])
            print("  Word:", word)
            print("  You got it!\n")
            return

        print("  Good guess!\n")

    print(STAGES[max_misses])
    print("  The word was:", word)
    print("  Better luck next time!\n")


def main():
    while True:
        play_game()
        again = input("  Play again? (y/n): ").strip().lower()
        if again not in {"y", "yes"}:
            print("  Thanks for playing!")
            break


if __name__ == "__main__":
    main()
