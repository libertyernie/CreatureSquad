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

    advanceOne(first?: Batter | null): BasesResult {
        return new BasesResult(first, this.first, this.second, [this.third]);
    }

    advanceTwo(first?: Batter | null, second?: Batter | null) {
        return new BasesResult(first, second, this.first, [this.second, this.third]);
    }

    advanceThree(first?: Batter | null, second?: Batter | null, third?: Batter | null) {
        return new BasesResult(first, second, third, [this.first, this.second, this.third]);
    }

    advanceAll(batter: Batter) {
        return new BasesResult(null, null, null, [batter, this.first, this.second, this.third]);
    }
}

class BasesResult {
    readonly bases: Bases;
    readonly runs_scored: Batter[];

    constructor(
        first?: Batter | null,
        second?: Batter | null,
        third?: Batter | null,
        runs?: (Batter | null | undefined)[]
    ) {
        this.bases = new Bases(first, second, third);
        this.runs_scored = [];
        for (let b of runs || []) {
            if (b) this.runs_scored.push(b);
        }
    }
}

class PlateAppearanceResult {
    readonly batter: Batter;
    readonly resultType: PlateApperanceResultType;
    readonly resultTypeName: string;
    readonly basesResult: BasesResult;
    readonly out: boolean;

    constructor(batter: Batter, bases: Bases, br: PlateApperanceResultType) {
        this.batter = batter;
        this.resultType = br;
        switch (br) {
            case PlateApperanceResultType.Single:
            case PlateApperanceResultType.Single_ExtraBase:
                this.resultTypeName = "Hit";
                break;
            case PlateApperanceResultType.Double:
            case PlateApperanceResultType.Double_ExtraBase:
                this.resultTypeName = "Hit 2x";
                break;
            case PlateApperanceResultType.Triple:
                this.resultTypeName = "Hit 3x";
                break;
            case PlateApperanceResultType.HomeRun:
                this.resultTypeName = "Hit 4x";
                break;
            case PlateApperanceResultType.Walk:
            case PlateApperanceResultType.HitByPitch:
                this.resultTypeName = "Sneak";
                break;
            case PlateApperanceResultType.IntentionalWalk:
                this.resultTypeName = "Pass";
                break;
            case PlateApperanceResultType.SacrificeBunt:
                this.resultTypeName = "Sacrifice";
                break;
            case PlateApperanceResultType.Out_ExtraBase:
            case PlateApperanceResultType.Out:
                this.resultTypeName = "Miss";
                break;
        }
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
            case PlateApperanceResultType.IntentionalWalk:
                this.basesResult = bases.walk(batter);
                break;
            case PlateApperanceResultType.Out_ExtraBase:
            case PlateApperanceResultType.SacrificeBunt:
                // TODO: special behavior when a batter is at third base.
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
            default:
                throw new Error("Unrecognized result type");
        }
    }
}
