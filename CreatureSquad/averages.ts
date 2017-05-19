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

function getPlateApperances(a: PlateAppearanceAverages) {
    return a.singles + a.doubles + a.triples + a.home_runs
        + a.intentional_walks + a.unintentional_walks + a.hit_by_pitch
        + a.sacrifice_hits + a.sacrifice_flies + a.other_outs;
}

function isTraditionalStatistics(o: TraditionalStatistics | PlateAppearanceAverages): o is TraditionalStatistics {
    return "at_bats" in o;
}

function isPlateAppearanceAverages(o: TraditionalStatistics | PlateAppearanceAverages): o is PlateAppearanceAverages {
    return "plate_appearances" in o;
}

function calculateTradStats(a: PlateAppearanceAverages): TraditionalStatistics {
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
    const o = {
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
    return {
        plate_appearances: getPlateApperances(o),
        ...o
    }
}
