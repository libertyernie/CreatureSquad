class ColumnRunTally {
    readonly lastBatter: number;
    readonly inning: number;
    readonly f: false;

    constructor(previous?: number | ColumnRunTally, add?: number) {
        if (!previous) previous = 0;
        if (!add) add = 0;
        if (previous instanceof ColumnRunTally) {
            previous = previous.inning;
        }
        this.lastBatter = add;
        this.inning = previous + add;
    }
}

class TeamModel {
    readonly bases: KnockoutObservable<Bases>[];
    readonly runs: KnockoutObservable<number>;
    readonly newRuns: KnockoutObservable<ColumnRunTally>[];
    readonly outs: KnockoutObservable<number>;
    readonly newOuts: KnockoutObservable<boolean>[];

    readonly lineupIndex: KnockoutObservable<number>;
    readonly lastBunted: KnockoutObservable<boolean>;

    readonly batter: KnockoutComputed<Batter>;
    readonly baserunners: KnockoutComputed<number>;
    readonly lastBatter: KnockoutComputed<Batter | null>;
    readonly lineupByNextBatter: KnockoutComputed<Batter[]>;
    readonly newRunsCount: KnockoutComputed<number>;
    readonly newOutsCount: KnockoutComputed<number>;
    readonly outPercentage: KnockoutComputed<string>;

    readonly ai: KnockoutObservable<boolean>;

    constructor(readonly lineup: Batter[]) {
        this.bases = [];
        for (let i = 0; i < 10; i++) {
            this.bases.push(ko.observable(new Bases()));
        }
        this.runs = ko.observable(0);
        this.newRuns = [];
        for (let i = 0; i < 10; i++) {
            this.newRuns.push(ko.observable(new ColumnRunTally()));
        }
        this.outs = ko.observable(0);
        this.newOuts = [];
        for (let i = 0; i < 10; i++) {
            this.newOuts.push(ko.observable(false));
        }

        this.lineupIndex = ko.observable(0);
        this.lastBunted = ko.observable(false);

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
        this.lastBatter = ko.pureComputed(() => lineup[(this.lineupIndex() - 1) % lineup.length]);
        this.lineupByNextBatter = ko.pureComputed(() => {
            let l = lineup.slice();
            let x = l.splice(0, this.lineupIndex() % lineup.length);
            l = l.concat(x);
            return l;
        });
        this.newRunsCount = ko.pureComputed(() => {
            let tally = 0;
            for (let observable of this.newRuns) {
                tally += observable().lastBatter || 0;
            }
            return tally;
        });
        this.newOutsCount = ko.pureComputed(() => {
            return this.newOuts.filter(n => n()).length;
        });
        this.outPercentage = ko.pureComputed(() => {
            return (Math.min(1, this.outs() / 30) * 100) + "%";
        });
        this.ai = ko.observable(false);
    }

    bat() {
        if (this.outs() >= 30) return;

        this.lastBunted(false);
        //this.newRuns.forEach(o => o(new ColumnRunTally()));
        this.newOuts.forEach(o => o(false));
        
        let i = 0;
        for (let column of this.bases) {
            let result = new PlateAppearanceResult(this.batter(), column(), this.batter().bat());
            column(this.processResult(result));
            this.newRuns[i](new ColumnRunTally(this.newRuns[i](), result.basesResult.runs_scored.length));
            this.newOuts[i](result.out);
            i++;
        }
        this.lineupIndex(this.lineupIndex() + 1);
    }

    bunt() {
        if (this.outs() >= 30) return;

        this.lastBunted(true);
        //this.newRuns.forEach(o => o(new ColumnRunTally()));
        this.newOuts.forEach(o => o(false));
        
        let i = 0;
        for (let column of this.bases) {
            let r = Math.random() < 0.5
                ? PlateApperanceResultType.SacrificeBunt
                : PlateApperanceResultType.Out;
            let result = new PlateAppearanceResult(this.batter(), column(), r);
            column(this.processResult(result));
            this.newRuns[i](new ColumnRunTally(this.newRuns[i](), result.basesResult.runs_scored.length));
            this.newOuts[i](result.out);
            i++;
        }
        this.lineupIndex(this.lineupIndex() + 1);
    }

    private shouldBunt() {
        if (this.ai() && this.outs() < 30) {
            let battingNewRuns = 0;
            let battingNewOuts = 0;
            for (let i = 0; i < 8; i++) {
                for (let column of this.bases) {
                    let predictedResult = new PlateAppearanceResult(this.batter(), column(), this.batter().bat());
                    battingNewRuns += predictedResult.basesResult.runs_scored.length;
                    if (predictedResult.out) battingNewOuts++;
                }
            }
            battingNewRuns /= 8;
            battingNewOuts /= 8;
            if (battingNewOuts + this.outs() < 30) {
                return false;
            }

            let buntingNewRuns = 0;
            for (let i = 0; i < 8; i++) {
                for (let column of this.bases) {
                    let predictedResult = new PlateAppearanceResult(this.batter(), column(), PlateApperanceResultType.SacrificeBunt);
                    buntingNewRuns += predictedResult.basesResult.runs_scored.length / 2;
                }
            }
            buntingNewRuns /= 8;
            return battingNewRuns < buntingNewRuns;
        }
    }

    auto() {
        if (this.shouldBunt()) {
            this.bunt();
        } else {
            this.bat();
        }
    }

    private processResult(result: PlateAppearanceResult) {
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
        
        this.lastBunted(false);
        this.newRuns.forEach(o => o(new ColumnRunTally()));
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
    readonly battingTeam: KnockoutObservable<TeamModel | null>;
    readonly inning: KnockoutObservable<number>;
    readonly final: KnockoutObservable<boolean>;

    readonly descriptionShownFor: KnockoutObservable<Batter | null>;
    readonly teamSetupModel: KnockoutObservable<TeamSetupModel | null>;

    private aiInterval: number;

    constructor(team1: Batter[], team2: Batter[]) {
        this.team1 = new TeamModel(team1);
        this.team2 = new TeamModel(team2);
        this.team2.ai(true);
        this.battingTeam = ko.observable(this.team1);
        this.inning = ko.observable(1);
        this.final = ko.observable(false);

        this.descriptionShownFor = ko.observable(null);
        this.teamSetupModel = ko.observable(null);

        this.descriptionShownFor.subscribe(newValue => {
            if (newValue) location.href = "#popup";
        });
        this.teamSetupModel.subscribe(newValue => {
            if (newValue) location.href = "#popup";
        });

        window.addEventListener("popstate", e => {
            if (location.hash != "#popup") {
                this.descriptionShownFor(null);
                this.teamSetupModel(null);
            }
        });

        this.team2.runs.subscribe(() => this.team2WinCheck());
    }

    team2WinCheck() {
        if (this.inning() >= 5 && this.team2.runs() > this.team1.runs()) {
            // This team has enough runs to win - stop the AI and skip the rest of the inning
            clearInterval(this.aiInterval);
            this.nextInning();
        }
    }

    nextInning() {
        if (this.battingTeam() === this.team1) {
            this.team1.reset();
            this.battingTeam(this.team2);
        } else {
            if (this.inning() < 5 || this.team1.runs() == this.team2.runs()) {
                this.team2.reset();
                this.battingTeam(this.team1);
                this.inning(this.inning() + 1);
            } else {
                //this.battingTeam(null);
                this.final(true);
                return;
            }
        }

        const teamB = this.battingTeam();
        if (teamB && teamB.ai()) {
            this.aiInterval = setInterval(() => this.auto(teamB), 500);
            this.team2WinCheck();
        }
    }

    auto(team: TeamModel) {
        team.auto();
        if (!team.ai() || team.outs() >= 30) {
            clearInterval(this.aiInterval);
        }
    }

    startOver() {
        this.team1.reset();
        this.team1.runs(0);
        this.team1.lineupIndex(0);
        this.team2.reset();
        this.team2.runs(0);
        this.team2.lineupIndex(0);
        this.battingTeam(this.team1);
        this.inning(1);
        this.final(false);
    }

    teamSetup() {
        this.teamSetupModel(new TeamSetupModel(this.team1, this.team2, () => {
            this.teamSetupModel(null);
        }));
    }

    about() {

    }
}

var mainModel: {
    viewModel: KnockoutObservable<ViewModel>;
    battingTeam: KnockoutComputed<TeamModel | null>;
} = {
    viewModel: ko.observable<ViewModel>(),
    battingTeam: ko.pureComputed(() => mainModel.viewModel().battingTeam())
};

function reloadViewModel(t1: TeamInfo, t2: TeamInfo) {
    const colors = [
        "#eee",
        "#ddd",
        "#ccc",
        "#bbb",
        "#aaa",
        "#888",
        "#666",
        "#444",
        "#222"
    ];
    const batters1 = t1.starters.map((x, y) => new Batter(x, colors[y % colors.length]));
    const batters2 = t2.starters.map((x, y) => new Batter(x, colors[y % colors.length]));
    mainModel.viewModel(new ViewModel(batters1, batters2));
}

window.onload = () => {
    let t1 = team1;
    let t2 = team2;
    if (window.localStorage) {
        const json1 = localStorage.getItem("team1");
        if (json1) t1 = JSON.parse(json1);
        const json2 = localStorage.getItem("team2");
        if (json2) t2 = JSON.parse(json2);
    }

    var el = document.body;
    ko.applyBindings(mainModel, el);
    reloadViewModel(t1, t2);
};