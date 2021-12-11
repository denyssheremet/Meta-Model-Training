const deletions = ["Simple Deletion", "Comparative Deletion", "Lack of Referential Index", "Unspecified Verb"];
const distortions = ["Nominalization", "Cause and Effect", "Complex Equivalence", "Mind Reading", "Lost Comparative"];
const generalizations = ["Universal Quantifiers", "Modal Operator of Necessity", "Modal Operator of Possibility", "Presupposition"];
const mappings = deletions.concat(distortions, generalizations);

var currentSentence = "";
var correctAnswer = "";

var currentMod = "";

var trainingDropdownOpen = false;
var dropdownShowing = false;
var activeMappings = [...mappings];


function showDropdown() {
    if (dropdownShowing) {
        document.getElementById("selectionDropdown").style.display = "none";
        chooseSentence();
    } else {
        document.getElementById("selectionDropdown").style.display = "block";
        document.getElementById("sentence").innerHTML = "";
    }
    dropdownShowing = !dropdownShowing;
}

function answerChosen(answer) {
    if (answer !== correctAnswer) {
        alert("Correct answer: " + correctAnswer);
    };
};

function chooseSentence() {
    correctAnswer = activeMappings[Math.floor(Math.random() * activeMappings.length)];
    currentSentence = metaModelSentences[correctAnswer].examples[Math.floor(Math.random() * metaModelSentences[correctAnswer].examples.length)]
    document.getElementById("sentence").innerHTML = currentSentence;
};

function selectMappings(selectedMapping) {
    let index = activeMappings.indexOf(selectedMapping);

    if (index != -1) {
        document.getElementById("dropdown:" + selectedMapping).style.color = "#1a1a1a";
        document.getElementById("dropdown:" + selectedMapping).style.fontWeight = "normal";
        document.getElementById("answer:" + selectedMapping).style.display = "none";
        activeMappings.splice(index, 1);
    } else {
        document.getElementById("dropdown:" + selectedMapping).style.color = "lightgoldenrodyellow";
        document.getElementById("dropdown:" + selectedMapping).style.fontWeight = "bold";
        document.getElementById("answer:" + selectedMapping).style.display = "block";
        activeMappings.push(selectedMapping);
    };
}

function makeDiv(divName, appendTo) {
    let div = document.createElement("div");
    div.id = divName;
    document.getElementById(appendTo).appendChild(div);
}

function makeH2(innerHTML, appendTo, id = "") {
    let h2 = document.createElement("h2");
    h2.innerHTML = innerHTML;
    h2.id = id;
    document.getElementById(appendTo).appendChild(h2);
}

function makeH3(innerHTML, appendTo, id = "") {
    let h3 = document.createElement("h3");
    h3.innerHTML = innerHTML;
    h3.id = id;
    document.getElementById(appendTo).appendChild(h3);
}

function makeAnswerButton(name, appendTo, func) {
    let btn = document.createElement("button");
    btn.id = "answer:" + name;
    btn.innerHTML = name;
    btn.className = "answerButton";
    btn.onclick = func;
    document.getElementById(appendTo).appendChild(btn);
}

function makeDropdownButton(name, appendTo) {
    let btn = document.createElement("button");
    btn.id = "dropdown:" + name;
    btn.className = "dropdownBtn";
    btn.innerHTML = name;
    btn.onclick = function () { selectMappings(name); };
    document.getElementById(appendTo).appendChild(btn);
}

function makeTextArea(id, appendTo) {
    let ta = document.createElement("textarea");
    ta.id = id;
    document.getElementById(appendTo).appendChild(ta);
};

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function randFromList(listFrom, amount) {
    const shuffled = shuffle(listFrom);

    while (shuffled.length < amount) {
        shuffled.push("");
    }

    return shuffled.slice(0, amount);
};

function getRandSubmodalities(amount) {
    let randMod = randFromList(Object.keys(modalities1), 1)[0];
    let randSubmod = randFromList(modalities1[randMod], amount);

    document.getElementById("submods").innerHTML = randMod + ":";

    for (let i = 0; i < randSubmod.length; i++) {
        let p = document.createElement("p");
        p.innerHTML = randSubmod[i];
        document.getElementById("submods").appendChild(p);
    }
};

function getRandSentence(listFrom) {
    document.getElementById("sentence").innerHTML = listFrom[Math.floor(Math.random() * activeMappings.length)];
}

// chooses a random enriched sentence, and appends it to document.getElementById("sentence")
function chooseRandEnrichedSentence() {
    let randMod = randFromList(Object.keys(enrichedLanguageSentences), 1)[0];
    correctAnswer = randMod;
    let randES = randFromList(enrichedLanguageSentences[randMod], 1)[0];

    document.getElementById("sentence").innerHTML = randES;
};

// starts Meta Model Trainer 1
function startMetaModelTrainer1() {
    clearIndex();
    document.getElementById("title").innerHTML = "Meta Model Trainer 1 (Beginner)";
    makeH2("", "topDiv", "sentence");


    // generate Buttons for different answers
    makeDiv("deletionButtons", "bottomDiv", "Deletion");
    makeH2("Deletions", "deletionButtons");
    makeDiv("deletionDropdown", "selectionDropdown", "");
    for (let i = 0; i < deletions.length; i++) {
        makeAnswerButton(deletions[i], "deletionButtons", function () { answerChosen(deletions[i]); chooseSentence();});
        makeDropdownButton(deletions[i], "deletionDropdown");
    }
    makeDiv("distortionButtons", "bottomDiv", "Distortion");
    makeH2("Distortions", "distortionButtons");
    makeDiv("distortionDropdown", "selectionDropdown", "");
    for (let i = 0; i < distortions.length; i++) {
        makeAnswerButton(distortions[i], "distortionButtons", function () { answerChosen(distortions[i]); chooseSentence();});
        makeDropdownButton(distortions[i], "distortionDropdown");
    }
    makeDiv("generalizationButtons", "bottomDiv", "Generalization");
    makeH2("Generalizations", "generalizationButtons");
    makeDiv("generalizationDropdown", "selectionDropdown", "");
    for (let i = 0; i < generalizations.length; i++) {
        makeAnswerButton(generalizations[i], "generalizationButtons", function () { answerChosen(generalizations[i]); chooseSentence();});
        makeDropdownButton(generalizations[i], "generalizationDropdown");
    }
    chooseSentence();
};

function startEnrichedLanguageTrainer1() {
    document.getElementById("title").innerHTML = "Enriched Language Trainer 1 (Beginner)";
    document.getElementById("bottomDiv").style.display = "flex";
    document.getElementById("bottomDiv").style.margin = "100px";
    makeH2("", "topDiv", "sentence");
    chooseRandEnrichedSentence();

    makeAnswerButton("Visual", "bottomDiv", function () { answerChosen("visual"); chooseRandEnrichedSentence();})
    makeAnswerButton("Audio", "bottomDiv", function () { answerChosen("audio"); chooseRandEnrichedSentence();})
    makeAnswerButton("Kinesthetic", "bottomDiv", function () { answerChosen("kinesthetic"); chooseRandEnrichedSentence();})

}

function startEnrichedLanguageTrainer2() {
    document.getElementById("title").innerHTML = "Enriched Language Trainer 2 (Advanced)";
    makeH2("", "topDiv", "sentence");
    makeH3("", "topDiv", "submods");
    makeTextArea("textarea", "bottomDiv");

    getRandSubmodalities(3);
    getRandSentence(modalityNeutralSentences);

    let textarea = document.getElementById("textarea");

    textarea.onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            document.getElementById("textarea").value = "";
            getRandSubmodalities(3);
            getRandSentence(modalityNeutralSentences);
        }
    };
};

// Clears index.html so another Trainer can be started.
function clearIndex() {
    document.getElementById("topDiv").innerHTML = "";
    document.getElementById("bottomDiv").innerHTML = "";
    document.getElementById("title").innerHTML = "";
};

function showTrainings() {
    if (trainingDropdownOpen) {
        document.getElementById("trainingDropdown").style.display = "none";
    } else {
        document.getElementById("trainingDropdown").style.display = "grid";
    }
    trainingDropdownOpen = !trainingDropdownOpen;
};

function selectTraining(trainingCode) {
    showTrainings();
    clearIndex();
    switch (trainingCode) {
        case "MMT1": startMetaModelTrainer1();
            break;
        case "ELT1": startEnrichedLanguageTrainer1();
            break;
        case "ELT2": startEnrichedLanguageTrainer2();
            break;
    }
}

window.addEventListener("load", function () {
    startEnrichedLanguageTrainer1();
    // startMetaModelTrainer1();
});

