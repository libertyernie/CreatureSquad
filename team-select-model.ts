interface TeamInfo {
    name: string;
    starters: SerializedBatterInfo[]
}

class TeamSelectModel {
    readonly teams: TeamInfo[];

    readonly team1: KnockoutObservable<TeamInfo | "random">;
    readonly team2: KnockoutObservable<TeamInfo | "random">;

    constructor(readonly onClose: (() => void), name1?: string, name2?: string) {
        this.teams = [team1, team2];
        this.team1 = ko.observable<TeamInfo | "random">("random");
        this.team2 = ko.observable<TeamInfo | "random">("random");
        // If custom teams exist in local storage, add them to the list
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
                    //this.team1(team);
                }
                const json2 = localStorage.getItem("team2");
                if (json2) {
                    const team: TeamInfo = { name: "Saved Team 2", starters: JSON.parse(json2) };
                    if (!team.starters.length) throw new Error("Saved team could not be loaded");
                    if (!team.name || this.teams.some(t => t.name == team.name)) {
                        team.name = "Saved Team 2";
                    }
                    this.teams.push(team);
                    //this.team2(team);
                }
            } catch (e) {
                console.error(e);
            }
        }
        // If the currently loaded teams are specified, mark them as checked
        if (name1) {
            const team = this.teams.filter(t => t.name == name1)[0];
            if (team) this.team1(team);
        }
        if (name2) {
            const team = this.teams.filter(t => t.name == name2)[0];
            if (team) this.team2(team);
        }
    }

    cancel() {
        this.onClose();
    }

    ok() {
        let team1 = this.team1();
        while (team1 === "random") {
            team1 = this.teams[Math.floor(Math.random() * this.teams.length)];
        }
        let team2 = this.team2();
        while (team2 === "random" || team2 === team1) {
            team2 = this.teams[Math.floor(Math.random() * this.teams.length)];
        }
        reloadViewModel(team1, team2);
        this.onClose();
    }
}