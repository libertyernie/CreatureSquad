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

    constructor(readonly lineup: Batter[]) {
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

        this.batter = ko.pureComputed(() => lineup[this.lineupIndex() % lineup.length]);
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

    constructor(team1: Batter[], team2: Batter[]) {
        this.team1 = new TeamModel(team1);
        this.team2 = new TeamModel(team2);
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
    let batters1 = team1.starters.map(x => new Batter(x));
    var el = document.body;
    var viewModel = new ViewModel(batters1, batters1);
    ko.applyBindings(viewModel, el);
};