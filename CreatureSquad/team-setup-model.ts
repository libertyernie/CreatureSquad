class TeamSetupModel {
    json1: string;
    json2: string;

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
        this.json1 = JSON.stringify(arr1, undefined, 4);
        this.json2 = JSON.stringify(arr2, undefined, 4);
    }

    cancel() {
        this.onClose();
    }

    save() {
        this.onClose();
    }
}