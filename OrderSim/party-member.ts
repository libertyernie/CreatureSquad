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
            return {
                bases: new Bases(batter, this.second, this.third),
                runs_scored: 0
            };
        } else if (this.second == null) {
            return {
                bases: new Bases(batter, this.first, this.third),
                runs_scored: 0
            };
        } else if (this.third == null) {
            return {
                bases: new Bases(batter, this.second, this.third),
                runs_scored: 0
            };
        } else {
            return {
                bases: new Bases(batter, this.second, this.third),
                runs_scored: 1
            };
        }
    }

    advanceOne(first?: Batter): BasesResult {
        console.log("1");
        return {
            bases: new Bases(first, this.first, this.second),
            runs_scored: this.third ? 1 : 0
        };
    }

    advanceTwo(first?: Batter, second?: Batter) {
        console.log("2");
        return {
            bases: new Bases(first, second, this.first),
            runs_scored: (this.second ? 1 : 0) + (this.third ? 1 : 0)
        };
    }

    advanceThree(first?: Batter, second?: Batter, third?: Batter) {
        console.log("3");
        return {
            bases: new Bases(first, second, third),
            runs_scored: (this.first ? 1 : 0) + (this.second ? 1 : 0) + (this.third ? 1 : 0)
        };
    }

    advanceAll() {
        console.log("4");
        return {
            bases: new Bases(),
            runs_scored: (this.first ? 1 : 0) + (this.second ? 1 : 0) + (this.third ? 1 : 0) + 1
        };
    }

    getCount() {
        return (this.first ? 1 : 0) + (this.second ? 1 : 0) + (this.third ? 1 : 0);
    }
}

interface BasesResult {
    bases: Bases;
    runs_scored: number;
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
                this.basesResult = bases.advanceAll();
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
                    runs_scored: 0
                };
                this.out = true;
                break;
        }
    }
}

