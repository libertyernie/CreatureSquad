interface OffensiveAverages {
    at_bats: number;
    total_hits: number;
    doubles: number;
    triples: number;
    home_runs: number;
    walks: number;
    //double_plays: number;
    hit_by_pitch: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    intentional_walks: number;
}

interface PlateAppearanceAverages {
    plate_appearances: number;
    singles: number;
    doubles: number;
    triples: number;
    home_runs: number;
    intentional_walks: number;
    unintentional_walks: number;
    hit_by_pitch: number;
    //double_plays: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    other_outs: number;
}

function calculateAverages(a: OffensiveAverages): PlateAppearanceAverages {
    return {
        plate_appearances: a.at_bats + a.walks + a.hit_by_pitch + a.sacrifice_hits + a.sacrifice_flies,
        singles: a.total_hits - a.doubles - a.triples - a.home_runs,
        unintentional_walks: a.walks - a.intentional_walks,
        other_outs: a.at_bats - a.total_hits,
        ...a
    };
}

class Bases {
    constructor(
        readonly first?: Batter | null,
        readonly second?: Batter | null,
        readonly third?: Batter | null
    ) { }

    walk(batter: Batter) {
        if (this.first == null) {
            return new BasesResult(batter, this.second, this.third);
        } else if (this.second == null) {
            return new BasesResult(batter, this.first, this.third);
        } else if (this.third == null) {
            return new BasesResult(batter, this.first, this.second);
        } else {
            return new BasesResult(batter, this.first, this.second, [this.third]);
        }
    }

    advanceOne(first?: Batter): BasesResult {
        return new BasesResult(first, this.first, this.second, [this.third]);
    }

    advanceTwo(first?: Batter, second?: Batter) {
        return new BasesResult(first, second, this.first, [this.second, this.third]);
    }

    advanceThree(first?: Batter, second?: Batter, third?: Batter) {
        return new BasesResult(first, second, third, [this.first, this.second, this.third]);
    }

    advanceAll(batter: Batter) {
        return new BasesResult(null, null, null, [batter, this.first, this.second, this.third]);
    }
}

class BasesResult {
    readonly bases: Bases;
    readonly runs_scored: Batter[];

    constructor(first?: Batter, second?: Batter, third?: Batter, runs_scored?: Batter[]) {
        this.bases = new Bases(first, second, third);
        this.runs_scored = (runs_scored || []).filter(b => b != null);
    }
}

class PlateAppearanceResult {
    readonly basesResult: BasesResult;
    readonly out: boolean;

    constructor(batter: Batter, bases: Bases, br: PlateApperanceResultType) {
        switch (br) {
            case PlateApperanceResultType.Single:
                this.basesResult = bases.advanceOne(batter);
                break;
            case PlateApperanceResultType.Single_ExtraBase:
                this.basesResult = bases.advanceTwo(batter);
                break;
            case PlateApperanceResultType.Double:
                this.basesResult = bases.advanceTwo(null, batter);
                break;
            case PlateApperanceResultType.Double_ExtraBase:
                this.basesResult = bases.advanceThree(null, batter);
                break;
            case PlateApperanceResultType.Triple:
                this.basesResult = bases.advanceThree(null, null, batter);
                break;
            case PlateApperanceResultType.HomeRun:
                this.basesResult = bases.advanceAll(batter);
                break;
            case PlateApperanceResultType.Walk:
            case PlateApperanceResultType.HitByPitch:
                this.basesResult = bases.walk(batter);
                break;
            case PlateApperanceResultType.SacrificeFly:
            case PlateApperanceResultType.Out_ExtraBase:
                this.basesResult = bases.advanceOne(null);
                this.out = true;
                break;
            case PlateApperanceResultType.Out:
                this.basesResult = {
                    bases: bases,
                    runs_scored: []
                };
                this.out = true;
                break;
        }
    }
}

