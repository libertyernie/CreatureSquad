enum PlateApperanceResultType {
    Single,
    Single_ExtraBase,
    Double,
    Double_ExtraBase,
    Triple,
    HomeRun,
    Walk,
    HitByPitch,
    Out,
    Out_ExtraBase,
    IntentionalWalk,
    SacrificeBunt
}

interface SerializedBatterInfo extends OffensiveAverages {
    name: string;
    fullName?: string;
    thumbnail?: string;
    image?: string;
    bgcolor?: string;
    description?: string[];
}

class Batter {
    readonly name: string;
    readonly fullName: string;
    readonly averages: PlateAppearanceAverages;
    readonly bgcolor: string;

    readonly thumbnail: string;
    readonly image: string;
    readonly thumbnailBackgroundImage: string;

    readonly description?: string[];

    readonly ba: number;
    readonly obp: number;
    readonly slg: number;

    constructor(averages: SerializedBatterInfo, readonly altColor?: string) {
        this.name = averages.name;
        this.fullName = averages.fullName || this.name;
        this.averages = calculatePAAverages(averages);
        this.bgcolor = averages.bgcolor || `#${Batter.hashCode(this.name).toString(16).substr(-6)}`;
        
        this.thumbnail = averages.thumbnail || "images/default.png";
        this.image = averages.image || this.thumbnail;
        this.thumbnailBackgroundImage = `url('${this.thumbnail}')`;

        this.ba = averages.total_hits / averages.at_bats;
        this.obp = (averages.total_hits + averages.walks + averages.hit_by_pitch) / (averages.at_bats + averages.walks + averages.hit_by_pitch + averages.sacrifice_flies);
        this.slg = (this.averages.singles + 2 * averages.doubles + 3 * averages.triples + 4 * averages.home_runs) / averages.at_bats;

        if (averages.description) {
            this.description = averages.description;
        }
    }

    showDescription() {
        mainModel.viewModel().descriptionShownFor(this);
    }

    closeDescription() {
        mainModel.viewModel().descriptionShownFor(null);
        history.back();
    }

    private static hashCode(s: string) {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            let chr = s.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0;
        }
        return hash;
    }

    bat() {
        let total = this.averages.plate_appearances
            - this.averages.intentional_walks
            - this.averages.sacrifice_hits;

        let random = Math.random() * total;
        let x = 0;

        x += this.averages.singles;
        if (x >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Single_ExtraBase;
            } else {
                return PlateApperanceResultType.Single;
            }
        }

        x += this.averages.doubles;
        if (x >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Double_ExtraBase;
            } else {
                return PlateApperanceResultType.Double;
            }
        }

        x += this.averages.triples;
        if (x >= random) {
            return PlateApperanceResultType.Triple;
        }

        x += this.averages.home_runs;
        if (x >= random) {
            return PlateApperanceResultType.HomeRun;
        }

        x += this.averages.unintentional_walks;
        if (x >= random) {
            return PlateApperanceResultType.Walk;
        }

        x += this.averages.hit_by_pitch;
        if (x >= random) {
            return PlateApperanceResultType.HitByPitch;
        }

        x += this.averages.sacrifice_flies;
        if (x >= random) {
            return PlateApperanceResultType.Out_ExtraBase;
        }

        x += this.averages.other_outs;
        if (x >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Out_ExtraBase;
            } else {
                return PlateApperanceResultType.Out;
            }
        }

        throw new Error("Invalid probability");
    }
}