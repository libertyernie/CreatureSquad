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
                likes: b.likes,
                dislikes: b.dislikes,
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

    save() {
        reloadViewModel(JSON.parse(this.json1()), JSON.parse(this.json2()));
        this.onClose();
    }
}