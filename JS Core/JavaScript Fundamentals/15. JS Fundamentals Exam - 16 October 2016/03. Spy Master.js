function spyMaster(input){

    function decode(str){
        return str
            .replace(/!/g,'1')
            .replace(/%/g,'2')
            .replace(/#/g,'3')
            .replace(/\$/g,'4')
            .toLowerCase();
    }

    function createMatcher(str){
        let modifiedStr = str.split('')
            .map(a=>'['+a.toLowerCase()+a.toUpperCase()+']')
            .join('');
        return new RegExp('((?:^| )'+ modifiedStr + ' +)([A-Z!%$#]{8,})([ .,]|$)','g');
    }

    let output =[];
    let specialKey = input.shift();
    let matcher = createMatcher(specialKey);
    for (let line of input){
        let modifiedLine = line;
        while(match = matcher.exec(line)){
            modifiedLine = modifiedLine
                .replace(match[0], match[1] + decode(match[2])+match[3]);
        }

        output.push(modifiedLine);
    }

    console.log(output.join('\n'));
}

spyMaster(['specialKey',
'In this text the specialKey HELLOWORLD! is correct, but the following specialKey $HelloWorl#d and spEcIaLKEy HOLLOWORLD1 are not, while SpeCIaLkeY   SOM%%ETH$IN and SPECIALKEY ##$$##$$ are!']
);