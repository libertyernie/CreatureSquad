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
