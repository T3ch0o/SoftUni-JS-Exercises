function makeCard(face, suit) {
    let cards = {
        face,
        suit,
        cardFaces: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
        cardSuits: ['S', 'H', 'D', 'C'],
        toString: () => `${cards.face}${cards.suit}`
    };

    if (!cards.cardFaces.includes(face) || !cards.cardSuits.includes(suit)) {
        throw new Error('Invalid face or suit');
    }

    cards.suit = suit === 'S' ? '\u2660' : suit === 'H' ? '\u2665' : suit === 'D' ? '\u2666' : '\u2663';

    return cards;
}

let card = makeCard('2', 'D');

console.log('' + card);