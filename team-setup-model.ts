class TeamSetupModel {
    json1: KnockoutObservable<string>;
    json2: KnockoutObservable<string>;

    constructor(team1: TeamModel, team2: TeamModel, readonly onClose: (() => void)) {
        const map: ((b: Batter) => SerializedBatterInfo) = b => {
            return {
                name: b.name,
                fullName: b.fullName === b.name ? undefined : b.fullName,
                thumbnail: b.thumbnail,
                image: b.image === b.thumbnail ? undefined : b.image,
                description: b.description,
                statistics: b.averages
            };
        };
        let arr1 = team1.lineup.map(map);
        let arr2 = team2.lineup.map(map);
        this.json1 = ko.observable(JSON.stringify(arr1, undefined, 4));
        this.json2 = ko.observable(JSON.stringify(arr2, undefined, 4));
    }

    swap() {
        const s = this.json1();
        this.json1(this.json2());
        this.json2(s);
    }

    cancel() {
        this.onClose();
    }

    reset() {
        reloadViewModel(team1, team2);
        this.onClose();
        if (window.localStorage && confirm("Would you also like to clear the previously set custom teams so they don't load next time?")) {
            localStorage.removeItem("team1");
            localStorage.removeItem("team2");
        }
    }

    save() {
        if (window.localStorage) {
            localStorage.setItem("team1", this.json1());
            localStorage.setItem("team2", this.json2());
        }
        reloadViewModel(
            { name: "Saved Team 1", starters: JSON.parse(this.json1()) },
            { name: "Saved Team 2", starters: JSON.parse(this.json2()) }
        );
        this.onClose();
    }
}