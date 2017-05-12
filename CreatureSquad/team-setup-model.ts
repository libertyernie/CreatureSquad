class TeamSetupModel {
    json1: KnockoutObservable<string>;
    json2: KnockoutObservable<string>;

    constructor(team1: TeamModel, team2: TeamModel, readonly onClose: (() => void)) {
        const map: ((b: Batter) => SerializedBatterInfo) = b => {
            return {
                name: b.name,
                thumbnail: b.thumbnail,
                image: b.image,
                description: b.description,
                ...calculateOAverages(b.averages)
            };
        };
        let arr1 = team1.lineup.map(map);
        let arr2 = team2.lineup.map(map);
        this.json1 = ko.observable(JSON.stringify({ starters: arr1 }, undefined, 4));
        this.json2 = ko.observable(JSON.stringify({ starters: arr2 }, undefined, 4));
    }

    cancel() {
        this.onClose();
    }

    reset() {
        reloadViewModel(team1, team1);
        this.onClose();
        if (confirm("Would you also like to clear the previously set custom teams so they don't load next time?")) {
            localStorage.removeItem("team1");
            localStorage.removeItem("team2");
        }
    }

    save() {
        localStorage.setItem("team1", this.json1());
        localStorage.setItem("team2", this.json2());
        reloadViewModel(JSON.parse(this.json1()), JSON.parse(this.json2()));
        this.onClose();
    }
}