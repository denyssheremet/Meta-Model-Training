

var enrichedLanguageSentences = {

    visual: `
        I saw the apple.
        The apple lay there.
        The ball was huge. 
        She waved at me.
        The skies were orange.
        The light was really bright.
        There was a person waving at me from far away.
        When we made eye contact, it felt like we were the only people in the room.
        Everything seemed fuzzy that day. 
        She was sitting to the left of me.
    `,

    audio: `
        Her voice echoed from all walls of the room.
        It was the end of the day and my voice had become completely monotone.
        To make sure everyone understood me, I spoke very slowly.
        When I heard her voice, I immediately noticed how high pitched her voice was. 
        And then I told her the secret in a very soft voice. 
        It was difficult to hear what she was saying.
        He was probably not aware of how loudly he was speaking.
        He spoke with long pauses that gave a clear rhythm to his speech.
    `,

    kinesthetic: `
        I felt something in my chest.
        My head was buzzing.
        The meeting moved on slowly. 
        I tapped her shoulder lightly.
        It felt like trying to put a round peg in a square hole.
        This conversation felt small in comparison to the one we had last week.
        The temperature in the room was rising.
        It feels like in this meeting we moved the project in the right direction.
        During the whole presentation, I felt shaky. 
        It was a sweet conversation.
        It smelled as if we were in a bakery.
    `,
};

var modalities = {
    visual: ["association", "size", "motion", "colour", "brightness", "distance", "focus", "clarity", "location"],
    audio: ["location", "tonality", "tempo", "pitch", "intensity", "clarity", "volume", "rhythm"],
    kinesthetic: [ "location", "vibration", "movement", "pressure", "shape", "size", "temperature", "direction", "steadiness", "taste", "smell"],
}


for (var [key, value] of Object.entries(enrichedLanguageSentences)) {
    enrichedLanguageSentences[key] = value.split("\n").slice(1, -1);
    for (let i = 0; i < enrichedLanguageSentences[key].length; i++) {
        enrichedLanguageSentences[key][i] = enrichedLanguageSentences[key][i].trim();
    }
};


console.log(enrichedLanguageSentences);