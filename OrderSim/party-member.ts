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

    constructor(batter: Batter, bases: Bases, br: BatterResult) {
        switch (br) {
            case BatterResult.Single:
                this.basesResult = bases.advanceOne(batter);
                break;
            case BatterResult.Single_ExtraBase:
                this.basesResult = bases.advanceTwo(batter);
                break;
            case BatterResult.Double:
                this.basesResult = bases.advanceTwo(null, batter);
                break;
            case BatterResult.Double_ExtraBase:
                this.basesResult = bases.advanceThree(null, batter);
                break;
            case BatterResult.Triple:
                this.basesResult = bases.advanceThree(null, null, batter);
                break;
            case BatterResult.HomeRun:
                this.basesResult = bases.advanceAll();
                break;
            case BatterResult.Walk:
            case BatterResult.HitByPitch:
                this.basesResult = bases.walk(batter);
                break;
            case BatterResult.SacrificeFly:
            case BatterResult.Out_ExtraBase:
                this.basesResult = bases.advanceOne(null);
                this.out = true;
                break;
            case BatterResult.Out:
                this.basesResult = {
                    bases: bases,
                    runs_scored: 0
                };
                this.out = true;
                break;
        }
    }
}

enum BatterResult {
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
    Out_ExtraBase
}

class Batter {
    private averages: PlateAppearanceAverages;
    bgcolor: string;

    constructor(
        readonly name: string,
        averages: OffensiveAverages
    ) {
        this.averages = calculateAverages(averages);
        this.bgcolor = "#" + Batter.hashCode(name).toString(16).substr(-6);
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

    bat(): BatterResult {
        let total = this.averages.plate_appearances
            - this.averages.intentional_walks
            - this.averages.sacrifice_hits;

        let random = Math.random() * total;
        let walk = 0;

        walk += this.averages.singles;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                console.log("Single (1st to 3rd)");
                return BatterResult.Single_ExtraBase;
            } else {
                console.log("Single");
                return BatterResult.Single;
            }
        }

        walk += this.averages.doubles;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                console.log("Double (score from 1st)");
                return BatterResult.Double_ExtraBase;
            } else {
                console.log("Double");
                return BatterResult.Double;
            }
        }

        walk += this.averages.triples;
        if (walk >= random) {
            console.log("Triple");
            return BatterResult.Triple;
        }

        walk += this.averages.home_runs;
        if (walk >= random) {
            console.log("Home run");
            return BatterResult.HomeRun;
        }

        walk += this.averages.unintentional_walks;
        if (walk >= random) {
            console.log("Walk");
            return BatterResult.Walk;
        }

        walk += this.averages.hit_by_pitch;
        if (walk >= random) {
            console.log("HBP");
            return BatterResult.HitByPitch;
        }

        walk += this.averages.sacrifice_flies;
        if (walk >= random) {
            console.log("Sac fly");
            return BatterResult.SacrificeFly;
        }

        walk += this.averages.other_outs;
        if (walk >= random) {
            if (Math.random() < 0.2) {
                console.log("Out (baserunners advance)");
                return BatterResult.Out_ExtraBase;
            } else {
                console.log("Out");
                return BatterResult.Out;
            }
        }

        throw new Error("Invalid probability");
    }
}
