// Functions and methods for handling the priority as well as colors

// Object to make working with priority integers easier
export const Priority = {
    SOFORT_ERLEDIGEN: "3",
    EINPLANEN_UND_WOHLFUEHLEN: "2",
    GIB_ES_AB: "1",
    WEG_DAMIT: "0",
};


// Convert into priority
export function getPriority(important, urgent) {
    if (important && urgent) return Priority.SOFORT_ERLEDIGEN;
    if (important && !urgent) return Priority.EINPLANEN_UND_WOHLFUEHLEN;
    if (!important && urgent) return Priority.GIB_ES_AB;
    if (!important && !urgent) return Priority.WEG_DAMIT;
}

// Convert priority into object containing the importance and the urgency
export function resolvePriority(priority) {
    switch (priority) {
        case Priority.SOFORT_ERLEDIGEN:
            return {important: true, urgent: true};
        case Priority.EINPLANEN_UND_WOHLFUEHLEN:
            return {important: true, urgent: false};
        case Priority.GIB_ES_AB:
            return {important: false, urgent: true};
        default:
            return {important: false, urgent: false};
    }
}

// Get displaytext from priority integer
export function getPriorityText(priority) {
    switch (priority) {
        case Priority.SOFORT_ERLEDIGEN:
            return "Sofort erledigen";
        case Priority.EINPLANEN_UND_WOHLFUEHLEN:
            return "Einplanen & Wohlfühlen";
        case Priority.GIB_ES_AB:
            return "Gib es ab";
        case Priority.WEG_DAMIT:
            return "Weg damit";
    }
}

// Color handling

export const Color = {
    Accent: {
        GREEN: "#81B29A",
        YELLOW: "#F2CC8F",
        RED: "#E07A5F",
    },
};

export function getPriorityColor(priority) {
    switch (priority) {
        case Priority.SOFORT_ERLEDIGEN:
            return Color.Accent.RED;
        case Priority.EINPLANEN_UND_WOHLFUEHLEN:
            return Color.Accent.YELLOW;
        case Priority.GIB_ES_AB:
            return Color.Accent.YELLOW;
        case Priority.WEG_DAMIT:
            return Color.Accent.GREEN;
    }

}

