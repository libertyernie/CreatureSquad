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

interface SerializedBatterInfo {
    name: string;
    fullName?: string;
    thumbnail?: string;
    image?: string;
    bgcolor?: string;
    description?: string[];
    statistics: PlateAppearanceAverages | TraditionalStatistics;
}

class Batter {
    readonly name: string;
    readonly fullName: string;
    readonly averages: PlateAppearanceAverages | TraditionalStatistics;
    readonly bgcolor: string;

    readonly thumbnail: string;
    readonly image: string;
    readonly thumbnailBackgroundImage: string;

    readonly description?: string[];

    readonly ba: number;
    readonly obp: number;
    readonly slg: number;

    constructor(info: SerializedBatterInfo, readonly altColor?: string) {
        this.name = info.name;
        this.fullName = info.fullName || this.name;
        this.averages = info.statistics;
        this.bgcolor = info.bgcolor || `#${Batter.hashCode(this.name).toString(16).substr(-6)}`;
        
        this.thumbnail = info.thumbnail || "images/default.png";
        this.image = info.image || this.thumbnail;
        this.thumbnailBackgroundImage = `url('${this.thumbnail}')`;

        const a = isTraditionalStatistics(this.averages)
            ? this.averages
            : calculateTradStats(this.averages);
        this.ba = a.total_hits / a.at_bats;
        this.obp = (a.total_hits + a.walks + a.hit_by_pitch) / (a.at_bats + a.walks + a.hit_by_pitch + a.sacrifice_flies);
        this.slg = (a.total_hits + a.doubles + 2 * a.triples + 3 * a.home_runs) / a.at_bats;

        if (info.description) {
            this.description = info.description;
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
        const averages = isPlateAppearanceAverages(this.averages)
            ? this.averages
            : calculatePAAverages(this.averages);

        let total = averages.plate_appearances
            - averages.intentional_walks
            - averages.sacrifice_hits;

        let random = Math.random() * total;
        let x = 0;

        x += averages.singles;
        if (x >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Single_ExtraBase;
            } else {
                return PlateApperanceResultType.Single;
            }
        }

        x += averages.doubles;
        if (x >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Double_ExtraBase;
            } else {
                return PlateApperanceResultType.Double;
            }
        }

        x += averages.triples;
        if (x >= random) {
            return PlateApperanceResultType.Triple;
        }

        x += averages.home_runs;
        if (x >= random) {
            return PlateApperanceResultType.HomeRun;
        }

        x += averages.unintentional_walks;
        if (x >= random) {
            return PlateApperanceResultType.Walk;
        }

        x += averages.hit_by_pitch;
        if (x >= random) {
            return PlateApperanceResultType.HitByPitch;
        }

        x += averages.sacrifice_flies;
        if (x >= random) {
            return PlateApperanceResultType.Out_ExtraBase;
        }

        x += averages.other_outs;
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