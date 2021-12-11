

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

var modalityNeutralSentences =
    `
I walked to the supermarket to get the tomatoes
He waited for a long time before the deer came in to call him
You went to the flower store and left empty handed
He walked towards her, smiled and kissed her hand
He told them to fuck off and stepped back on his bike
Tim stabbed Tom and drove him to the hospital
They yelled at the dog, who had just barked at the little girl
The square was empty; only a cat walked across it
She hit the shark with his surfboard while screaming for help
The man would climb mountains and dance naked on top of them
He explained the problem to the kid, emphasising that it could not be solved. 
He regretting drinking a whole bottle of rum and declaring his love to the maiden the night before
The sun set on the village as the market closed up
With the storm brewing, she tried to make it to the harbour in time
He slammed the book on the desk and looked at the class
She laughed and looked away
They went to the club and danced their feet off for three hours
The old man got up from his chair and fetched a bowl of chips
He grabbed the kid and swam to the surface
The building was about to collapse and one woman was still in there scrambling for her stuff
He walked out of the door, closed it behind him and started to cry
This was his first time in a baseball match and he missed his first catch, dropping the ball on the floor
The arrow missed the mark and landed in a passing chicken
I packed my bag and quickly left the dormitory
`

var modalities = {
    visual: ["association", "size", "motion", "colour", "brightness", "distance", "focus", "clarity", "location"],
    audio: ["location", "tonality", "tempo", "pitch", "intensity", "clarity", "volume", "rhythm"],
    kinesthetic: ["location", "vibration", "movement", "pressure", "shape", "size", "temperature", "direction", "steadiness", "taste", "smell"],
}

var modalities1 = {
    Visual: ["Association (associated or dissociated)", "Size (large or small)", "Motion (still or moving, slideshow or movie)", "Colour (colour or black and white)", "Brightness (bright or dark)", "Distance (near or far)", "Focus (focused or unfocused)", "Clarity (clear or fuzzy)", "Location (top, bottom, left, or right)"],
    Audio: ["Location (mono, stereo, surround)", "Tonality (flat or engaging)", "Tempo/Pace (slow or fast)", "Pitch (high or low)", "Intensity (intense or soft)", " Clarity (clear or fuzzy)", "Volume (loud or soft)", "Rhythm (regular or irregular)"],
    Kinesthetic: ["Location (Where do you feel it?)", "Vibration (Is it still or pulsing?)", "Movement (Is it still or moving?)", "Pressure (Is there any pressure? If so, is it light or intense?)", "Shape (What shape is it?)", "Size (How big is it?)", "Temperature (Does it have a temperature?)", "Direction (Does it have a direction? If so describe it.)", "Steadiness (Is it steady or intermittent?)", "Taste / Smell (Sweet, Sour, Salt, Bitter.)", "Smell (Aroma, Fragrance, Essence, Pungence.)"],
}


// turn string of sentences in modalities into arrrays
for (var [key, value] of Object.entries(enrichedLanguageSentences)) {
    enrichedLanguageSentences[key] = value.split("\n").slice(1, -1);
    for (let i = 0; i < enrichedLanguageSentences[key].length; i++) {
        enrichedLanguageSentences[key][i] = enrichedLanguageSentences[key][i].trim();
    }
};

// turn string of neutral sentences into arrays
modalityNeutralSentences = modalityNeutralSentences.split("\n").slice(1, -1);
for (let i = 0; i < modalityNeutralSentences.length; i++) {
    modalityNeutralSentences[i] = modalityNeutralSentences[i].trim();
}

console.log(enrichedLanguageSentences);