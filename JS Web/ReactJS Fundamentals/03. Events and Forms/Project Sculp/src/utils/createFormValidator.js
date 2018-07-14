let validationFunc = (
    pokemonName,
    pokemonImg,
    pokemonInfo
) => {
    let validPokemonName = (() => {
        const pokemonNameRegex = new RegExp(
            /^([A-Za-z]+\s#[0-9]{3})$/
        );

        return pokemonNameRegex.test(pokemonName);
    })();

    let validImgUrl = (() => {
        return pokemonImg.startsWith('http');
    })();

    let validInfo = (() => {
        return pokemonInfo.length !== 0;
    })();

    return {
        validPokemonName,
        validImgUrl,
        validInfo
    }
};

export default validationFunc;