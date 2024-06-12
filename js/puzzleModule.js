// puzzleModule.js

const PuzzleModule = (function() {
    const puzzles = {};

    function createPuzzle(puzzleId, encodedMessage, shift) {
        puzzles[puzzleId] = {
            encodedMessage,
            shift,
            solved: false,
        };
    }

    function checkGuess(puzzleId, guess) {
        if (!puzzles[puzzleId]) {
            throw new Error(`Puzzle with ID ${puzzleId} not found.`);
        }

        const { encodedMessage, shift } = puzzles[puzzleId];
        const decodedMessage = decodeCaesarCipher(encodedMessage, shift).toLowerCase();

        if (guess.toLowerCase() === decodedMessage) {
            puzzles[puzzleId].solved = true;
            localStorage.setItem(`${puzzleId}_solved`, 'true');
            return true;
        } else {
            return false;
        }
    }

    function isPuzzleSolved(puzzleId) {
        const solved = localStorage.getItem(`${puzzleId}_solved`);
        return solved === 'true';
    }

    function decodeCaesarCipher(str, shift) {
        return str.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                const lower = char.toLowerCase();

                if (lower >= 'a' && lower <= 'z') {
                    let shifted = code - shift;
                    if (lower === char) {
                        shifted = (shifted < 97) ? shifted + 26 : shifted;
                    } else {
                        shifted = (shifted < 65) ? shifted + 26 : shifted;
                    }
                    return String.fromCharCode(shifted);
                }
            }
            return char;
        }).join('');
    }

    return {
        createPuzzle,
        checkGuess,
        isPuzzleSolved,
        decodeCaesarCipher
    };
})();

