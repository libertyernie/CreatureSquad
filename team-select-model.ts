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
        this.team1 = ko.observable(team1);
        this.team2 = ko.observable(team2);
        // If the currently loaded teams are specified, mark them as checked
        if (name1) {
            const team = this.teams.filter(t => t.name == name1)[0];
            if (team) this.team1(team);
        }
        if (name2) {
            const team = this.teams.filter(t => t.name == name2)[0];
            if (team) this.team2(team);
        }
        // If custom teams exist in local storage, add them to the list and select them
        if (window.localStorage) {
            try {
                const json1 = localStorage.getItem("team1");
                if (json1) {
                    const team: TeamInfo = { name: "Saved Team 1", starters: JSON.parse(json1) };
                    if (!team.starters.length) throw new Error("Saved team could not be loaded");
                    if (!team.name || this.teams.some(t => t.name == team.name)) {
                        team.name = "Saved Team 1";
                    }
                    this.teams.push(team);
                    this.team1(team);
                }
                const json2 = localStorage.getItem("team2");
                if (json2) {
                    const team: TeamInfo = { name: "Saved Team 2", starters: JSON.parse(json2) };
                    if (!team.starters.length) throw new Error("Saved team could not be loaded");
                    if (!team.name || this.teams.some(t => t.name == team.name)) {
                        team.name = "Saved Team 2";
                    }
                    this.teams.push(team);
                    this.team2(team);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }

    cancel() {
        this.onClose();
    }

    ok() {
        reloadViewModel(this.team1(), this.team2());
        this.onClose();
    }
}