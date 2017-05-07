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

class TeamModel {
    readonly bases: KnockoutObservable<Bases>[];
    readonly runs: KnockoutObservable<number>;
    readonly newRuns: KnockoutObservable<number>[];
    readonly outs: KnockoutObservable<number>;
    readonly newOuts: KnockoutObservable<boolean>[];

    readonly lineupIndex: KnockoutObservable<number>;
    readonly lastResult: KnockoutObservable<PlateAppearanceResult | null>;

    readonly batter: KnockoutComputed<Batter>;
    readonly baserunners: KnockoutComputed<number>;
    readonly newRunsCount: KnockoutComputed<number>;
    readonly newOutsCount: KnockoutComputed<number>;

    constructor() {
        this.bases = [];
        for (let i = 0; i < 10; i++) {
            this.bases.push(ko.observable(new Bases()));
        }
        this.runs = ko.observable(0);
        this.newRuns = [];
        for (let i = 0; i < 10; i++) {
            this.newRuns.push(ko.observable(0));
        }
        this.outs = ko.observable(0);
        this.newOuts = [];
        for (let i = 0; i < 10; i++) {
            this.newOuts.push(ko.observable(false));
        }

        this.lineupIndex = ko.observable(0);
        this.lastResult = ko.observable(null);

        this.batter = ko.pureComputed(() => Lineup[this.lineupIndex() % Lineup.length]);
        this.baserunners = ko.pureComputed(() => {
            let tally = 0;
            for (let observable of this.bases) {
                let b = observable();
                if (b.first) tally++;
                if (b.second) tally++;
                if (b.third) tally++;
            }
            return tally;
        });
        this.newRunsCount = ko.pureComputed(() => {
            let tally = 0;
            for (let observable of this.newRuns) {
                tally += observable();
            }
            return tally;
        });
        this.newOutsCount = ko.pureComputed(() => {
            return this.newOuts.filter(n => n()).length;
        });
    }

    bat() {
        if (this.outs() >= 30) return;

        this.newRuns.forEach(o => o(0));
        this.newOuts.forEach(o => o(false));
        
        let i = 0;
        for (let column of this.bases) {
            let result = new PlateAppearanceResult(this.batter(), column(), this.batter().bat());
            column(this.processResult(result));
            this.newRuns[i](result.basesResult.runs_scored.length);
            this.newOuts[i](result.out);
            i++;
        }
        this.lineupIndex(this.lineupIndex() + 1);
    }

    bunt() {
        if (this.outs() >= 30) return;

        this.newRuns.forEach(o => o(0));
        this.newOuts.forEach(o => o(false));
        
        let i = 0;
        for (let column of this.bases) {
            let r = Math.random() < 0.5
                ? PlateApperanceResultType.SacrificeBunt
                : PlateApperanceResultType.Out;
            let result = new PlateAppearanceResult(this.batter(), column(), r);
            column(this.processResult(result));
            this.newRuns[i](result.basesResult.runs_scored.length);
            this.newOuts[i](result.out);
            i++;
        }
        this.lineupIndex(this.lineupIndex() + 1);
    }

    private processResult(result: PlateAppearanceResult) {
        this.lastResult(result);
        if (result.out) {
            this.outs(this.outs() + 1);
        }
        if (/*this.outs() < 30 &&*/ result.basesResult.runs_scored.length > 0) {
            this.runs(this.runs() + result.basesResult.runs_scored.length);
        }
        return result.basesResult.bases;
    }

    reset() {
        while (this.outs() < 30) {
            this.outs(this.outs() + 1);
            this.lineupIndex(this.lineupIndex() + 1);
        }

        this.lastResult(null);
        this.newRuns.forEach(o => o(0));
        this.newOuts.forEach(o => o(false));
        for (let column of this.bases) {
            column(new Bases());
        }
        this.outs(0);
    }
}

class ViewModel {
    readonly team1: TeamModel;
    readonly team2: TeamModel;
    readonly battingTeam: KnockoutObservable<TeamModel>;
    readonly inning: KnockoutObservable<number>;

    constructor() {
        this.team1 = new TeamModel();
        this.team2 = new TeamModel();
        this.battingTeam = ko.observable(this.team1);
        this.inning = ko.observable(1);
    }

    nextInning() {
        this.battingTeam().reset();
        if (this.battingTeam() === this.team1) {
            this.battingTeam(this.team2);
        } else {
            this.battingTeam(this.team1);
            this.inning(this.inning() + 1);
        }
    }
}

window.onload = () => {
    var el = document.body;
    var viewModel = new ViewModel();
    ko.applyBindings(viewModel, el);
};