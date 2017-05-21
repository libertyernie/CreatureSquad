interface TeamInfo {
    name: string;
    starters: SerializedBatterInfo[]
}

class TeamSelectModel {
    readonly teams: TeamInfo[];

    readonly team1: KnockoutObservable<TeamInfo>;
    readonly team2: KnockoutObservable<TeamInfo>;

    constructor(readonly onClose: (() => void), name1?: string, name2?: string) {
        this.teams = [team1, team2];
        this.team1 = ko.observable(this.teams.filter(t => name1 && t.name == name1)[0] || team1);
        this.team2 = ko.observable(this.teams.filter(t => name2 && t.name == name2)[0] || team2);
    }

    cancel() {
        this.onClose();
    }

    ok() {
        console.log(this.team1());
        console.log(this.team2());
        reloadViewModel(this.team1(), this.team2());
        this.onClose();
    }
}