enum PlateApperanceResultType {
    Single,
    Single_ExtraBase,
    Double,
    Double_ExtraBase,
    Triple,
    HomeRun,
    Walk,
    HitByPitch,
    SacrificeFly,
    Out,
    Out_ExtraBase,
    IntentionalWalk,
    SacrificeBunt
}

class Batter {
    readonly averages: PlateAppearanceAverages;
    bgcolor: string;

    readonly ba: number;
    readonly ops: number;
    readonly slg: number;

    constructor(
        readonly name: string,
        averages: OffensiveAverages
    ) {
        this.averages = calculateAverages(averages);
        this.bgcolor = "#" + Batter.hashCode(name).toString(16).substr(-6);

        this.ba = averages.total_hits / averages.at_bats;
        this.ops = (averages.total_hits + averages.walks + averages.hit_by_pitch) / (averages.at_bats + averages.walks + averages.hit_by_pitch + averages.sacrifice_flies);
        this.slg = (this.averages.singles + 2 * averages.doubles + 3 * averages.triples + 4 * averages.home_runs) / averages.at_bats;
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
        let walk = 0;

        walk += this.averages.singles;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Single_ExtraBase;
            } else {
                return PlateApperanceResultType.Single;
            }
        }

        walk += this.averages.doubles;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Double_ExtraBase;
            } else {
                return PlateApperanceResultType.Double;
            }
        }

        walk += this.averages.triples;
        if (walk >= random) {
            return PlateApperanceResultType.Triple;
        }

        walk += this.averages.home_runs;
        if (walk >= random) {
            return PlateApperanceResultType.HomeRun;
        }

        walk += this.averages.unintentional_walks;
        if (walk >= random) {
            return PlateApperanceResultType.Walk;
        }

        walk += this.averages.hit_by_pitch;
        if (walk >= random) {
            return PlateApperanceResultType.HitByPitch;
        }

        walk += this.averages.sacrifice_flies;
        if (walk >= random) {
            return PlateApperanceResultType.SacrificeFly;
        }

        walk += this.averages.other_outs;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                return PlateApperanceResultType.Out_ExtraBase;
            } else {
                return PlateApperanceResultType.Out;
            }
        }

        throw new Error("Invalid probability");
    }
}