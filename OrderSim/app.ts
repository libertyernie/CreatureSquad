const Lineup = [new Batter("Dexter Fowler", {
    at_bats: 456,
    walks: 79,
    hit_by_pitch: 11,
    sacrifice_hits: 1,
    sacrifice_flies: 4,
    total_hits: 126,
    doubles: 25,
    triples: 7,
    home_runs: 13,
    intentional_walks: 0
}), new Batter("Kris Bryant", {
    at_bats: 603,
    walks: 75,
    hit_by_pitch: 18,
    sacrifice_hits: 0,
    sacrifice_flies: 3,
    total_hits: 176,
    doubles: 35,
    triples: 3,
    home_runs: 39,
    intentional_walks: 5 
}), new Batter("Anthony Rizzo", {
    at_bats: 583,
    walks: 74,
    hit_by_pitch: 16,
    sacrifice_hits: 0,
    sacrifice_flies: 3,
    total_hits: 170,
    doubles: 43,
    triples: 4,
    home_runs: 32,
    intentional_walks: 8
}), new Batter("Ben Zobrist", {
    at_bats: 523,
    walks: 96,
    hit_by_pitch: 4,
    sacrifice_hits: 4,
    sacrifice_flies: 4,
    total_hits: 142,
    doubles: 31,
    triples: 3,
    home_runs: 18,
    intentional_walks: 6
}), new Batter("Addison Russell", {
    at_bats: 525,
    walks: 55,
    hit_by_pitch: 12,
    sacrifice_hits: 0,
    sacrifice_flies: 6,
    total_hits: 125,
    doubles: 25,
    triples: 3,
    home_runs: 21,
    intentional_walks: 6
}), new Batter("Jorge Soler", {
    at_bats: 227,
    walks: 31,
    hit_by_pitch: 3,
    sacrifice_hits: 0,
    sacrifice_flies: 3,
    total_hits: 54,
    doubles: 9,
    triples: 0,
    home_runs: 12,
    intentional_walks: 0
}), new Batter("Jason Heyward", {
    at_bats: 530,
    walks: 54,
    hit_by_pitch: 5,
    sacrifice_hits: 1,
    sacrifice_flies: 2,
    total_hits: 122,
    doubles: 27,
    triples: 1,
    home_runs: 7,
    intentional_walks: 0
}), new Batter("Miguel Montero", {
    at_bats: 241,
    walks: 38,
    hit_by_pitch: 3,
    sacrifice_hits: 0,
    sacrifice_flies: 2,
    total_hits: 52,
    doubles: 8,
    triples: 1,
    home_runs: 8,
    intentional_walks: 5
}), new Batter("Jon Lester", {
    at_bats: 59,
    walks: 6,
    hit_by_pitch: 0,
    sacrifice_hits: 10,
    sacrifice_flies: 0,
    total_hits: 6,
    doubles: 3,
    triples: 0,
    home_runs: 0,
    intentional_walks: 0
})];

class ViewModel {
    readonly bases: KnockoutObservable<Bases>;
    readonly runs: KnockoutObservable<number>;
    readonly outs: KnockoutObservable<number>;
    readonly inning: KnockoutObservable<number>;

    readonly lineupIndex: KnockoutObservable<number>;
    readonly batter: KnockoutComputed<Batter>;
    readonly lastResult: KnockoutObservable<string>;

    constructor() {
        this.bases = ko.observable(new Bases());
        this.runs = ko.observable(0);
        this.outs = ko.observable(0);
        this.inning = ko.observable(1);

        this.lineupIndex = ko.observable(0);
        this.batter = ko.pureComputed(() => Lineup[this.lineupIndex() % Lineup.length]);
        this.lastResult = ko.observable("-");
    }

    bat() {
        let result1 = this.batter().bat();
        this.lastResult(`${this.batter().name} - ${PlateApperanceResultType[result1]}`);
        let result = new PlateAppearanceResult(this.batter(), this.bases(), result1);
        this.bases(result.basesResult.bases);
        if (result.out) {
            this.outs(this.outs() + 1);
        }
        if (this.outs() >= 3) {
            this.bases(new Bases());
            this.outs(0);
            this.inning(this.inning() + 1);
        } else {
            if (result.basesResult.runs_scored.length > 0) {
                this.runs(this.runs() + result.basesResult.runs_scored.length);
                for (let scored of result.basesResult.runs_scored) {
                    this.lastResult(`${this.lastResult()}, ${scored.name} scored`);
                }
            }
        }
        this.lineupIndex(this.lineupIndex() + 1);
    }
}

window.onload = () => {
    var el = document.body;
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel, el);
};