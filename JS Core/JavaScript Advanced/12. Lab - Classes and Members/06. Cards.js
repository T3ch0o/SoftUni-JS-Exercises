let myModule = (function(){
    let Suits = {
        SPADES: '\u2660',
        HEARTS: '\u2660',
        DIAMONDS: '\u2666',
        CLUBS: '\u2663',
    };

    const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    class Card {
        constructor(face, suit) {
            this.face = face;
            this.suit = suit;
        }

        get suit() {
            return this._suit;
        }

        set suit(suit) {
            if (!Object.keys(Suits).map(k => Suits[k]).includes(suit)) {
                throw new Error('Invalid suit');
            }

            this._suit = suit;
        }

        get face() {
            return this._face;
        }
        set face(face) {
            if (!validFaces.includes(face)) {
                throw new Error('Invalid face');
            }

            this._face = face;
        }

        toString() {
            return this.face + this.suit;
        }
    }

    return {
        Suits: Suits,
        Card: Card
    }
}());




let card = new myModule.Card('3', myModule.Suits.CLUBS);

console.log(card.toString());
