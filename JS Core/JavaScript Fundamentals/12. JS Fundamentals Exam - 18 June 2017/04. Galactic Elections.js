function galacticElections(input) {
    let election = new Map();

    let totalVotes = 0;

    for (let ballot of input) {
        if (!election.has(ballot.system)) {
            election.set(ballot.system, new Map());
        }

        if (!election.get(ballot.system).has(ballot.candidate)) {
            election.get(ballot.system).set(ballot.candidate, 0);
        }

        let candidateSystemVotes = election.get(ballot.system).get(ballot.candidate);
        election.get(ballot.system).set(ballot.candidate, candidateSystemVotes + ballot.votes);
        totalVotes += ballot.votes;
    }

    for (let [system, candidates] of election) {
        election.set(system, new Map([...candidates].sort((a,b) => b[1] - a[1])));
    }

    let result = new Map();

    for (let [system, candidates] of election) {
        let winner = [...candidates.keys()][0];

        if (!result.has(winner)) {
            result.set(winner, new Map());
        }

        result.get(winner).set(system, [...candidates.values()].reduce((a, b) => a + b));
    }

    for (let [winner, system] of result) {
        result.set(winner, new Map([...system].sort((a, b) => b[1] - a[1])));
    }

    let winnersTotalVotes = new Map();

    for (let [winner, system] of result) {
        winnersTotalVotes.set(winner, [...system.values()].reduce((a, b) => a + b));
    }

    winnersTotalVotes = new Map([...winnersTotalVotes].sort((a, b) => b[1] - a[1]));

    let winnerName = [...winnersTotalVotes][0][0];
    let winnerVotes = [...winnersTotalVotes][0][1];
    let winnerPercentage = Math.floor((winnerVotes / totalVotes) * 100);

    if ([...winnersTotalVotes].length === 1) {
        console.log(`${winnerName} wins with ${winnerVotes} votes`);
        console.log(`${winnerName} wins unopposed!`);
        return;
    }

    let runnerUpName = [...winnersTotalVotes][1][0];
    let runnerUpPercentage = Math.floor(([...winnersTotalVotes][1][1] / totalVotes) * 100);

    if (winnerPercentage > 50) {
        console.log(`${winnerName} wins with ${winnerVotes} votes`);
        console.log(`Runner up: ${runnerUpName}`);
        for (const [system, votes] of result.get(runnerUpName)) {
            console.log(`${system}: ${votes}`);
        }
        return;
    }

    console.log(`Runoff between ${winnerName} with ${winnerPercentage}% and ${runnerUpName} with ${runnerUpPercentage}%`);
}

galacticElections([ { system: 'Tau',     candidate: 'Flying Shrimp', votes: 150 },
    { system: 'Tau',     candidate: 'Space Cow',     votes: 100 },
    { system: 'Theta',   candidate: 'Space Cow',     votes: 10 },
    { system: 'Sigma',   candidate: 'Space Cow',     votes: 200 },
    { system: 'Sigma',   candidate: 'Flying Shrimp', votes: 75 },
    { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
    { system: 'Omicron', candidate: 'Octocat',       votes: 75 } ]
);