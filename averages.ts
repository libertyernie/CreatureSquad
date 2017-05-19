interface TraditionalStatistics {
    at_bats: number;
    total_hits: number;
    doubles: number;
    triples: number;
    home_runs: number;
    walks: number;
    hit_by_pitch: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    intentional_walks: number;
}

interface PlateAppearanceAverages {
    singles: number;
    doubles: number;
    triples: number;
    home_runs: number;
    intentional_walks: number;
    unintentional_walks: number;
    hit_by_pitch: number;
    sacrifice_hits: number;
    sacrifice_flies: number;
    other_outs: number;
}

type Statistics = TraditionalStatistics | Partial<PlateAppearanceAverages>;

function getPlateApperances(a: PlateAppearanceAverages) {
    return a.singles + a.doubles + a.triples + a.home_runs
        + a.intentional_walks + a.unintentional_walks + a.hit_by_pitch
        + a.sacrifice_hits + a.sacrifice_flies + a.other_outs;
}

function isTraditionalStatistics(o: Statistics): o is TraditionalStatistics {
    return "at_bats" in o;
}

function isPlateAppearanceAverages(o: Statistics): o is Partial<PlateAppearanceAverages> {
    return !("at_bats" in o);
}

function fillMissing(a: Partial<PlateAppearanceAverages>): PlateAppearanceAverages {
    return {
        singles: 0,
        doubles: 0,
        triples: 0,
        home_runs: 0,
        intentional_walks: 0,
        unintentional_walks: 0,
        hit_by_pitch: 0,
        sacrifice_hits: 0,
        sacrifice_flies: 0,
        other_outs: 0,
        ...a
    };
}

function calculateTradStats(p: Partial<PlateAppearanceAverages>): TraditionalStatistics {
    const a = fillMissing(p);
    const total_hits = a.singles + a.doubles + a.triples + a.home_runs;
    const walks = a.intentional_walks + a.unintentional_walks;
    return {
        at_bats: total_hits + a.other_outs,
        total_hits: total_hits,
        doubles: a.doubles,
        triples: a.triples,
        home_runs: a.home_runs,
        walks: walks,
        hit_by_pitch: a.hit_by_pitch,
        sacrifice_hits: a.sacrifice_hits,
        sacrifice_flies: a.sacrifice_flies,
        intentional_walks: a.intentional_walks
    };
}

function calculatePAAverages(a: TraditionalStatistics): PlateAppearanceAverages {
    return {
        singles: a.total_hits - a.doubles - a.triples - a.home_runs,
        doubles: a.doubles,
        triples: a.triples,
        home_runs: a.home_runs,
        intentional_walks: a.intentional_walks,
        unintentional_walks: a.walks - a.intentional_walks,
        hit_by_pitch: a.hit_by_pitch,
        sacrifice_hits: a.sacrifice_hits,
        sacrifice_flies: a.sacrifice_flies,
        other_outs: a.at_bats - a.total_hits
    };
}
