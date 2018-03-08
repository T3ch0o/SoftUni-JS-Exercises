function printDeckOfCards(cards) {
    function makeCard(face, suit) {
        let card = {
            face,
            suit,
            cardFaces: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
            cardSuits: ['S', 'H', 'D', 'C'],
            toString: () => `${card.face}${card.suit}`
        };

        if (!card.cardFaces.includes(face) || !card.cardSuits.includes(suit)) {
            throw new Error('Invalid face or suit');
        }

        card.suit = suit === 'S' ? '\u2660' : suit === 'H' ? '\u2665' : suit === 'D' ? '\u2666' : '\u2663';

        return card;
    }

    let output = '';

    for (let card of cards) {
        if (card.length !== 3) {
            card = card.split('');
        } else {
            card = [card[0] + card[1], card[2]];
        }

        try {
            output += `${makeCard(card[0], card[1]).toString()} `
        } catch (err) {
            return console.log(`Invalid card: ${card[0]}${card[1]}`)
        }
    }

    return console.log(output.trim());
}

printDeckOfCards(['5S', '3D', 'QD', '1C']);