const deletions = ["Simple Deletion", "Comparative Deletion", "Unspecified Noun", "Unspecified Verb"];
const distortions = ["Nominalization", "Cause and Effect", "Complex Equivalence", "Mind Reading", "Lost Comparative"];
const generalizations = ["Universal Quantifiers", "Modal Operator of Necessity", "Modal Operator of Possibility", "Presupposition"];
const mappings = deletions.concat(distortions, generalizations);

var currentSentence = "";
var correctAnswer = "";

var currentMod = "";

var trainingDropdownOpen = false;
var dropdownShowing = false;
var activeMappings = [...mappings];
var dropdownOptionSelected = "all";

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

function selectMappings(choice) {
    dropdownOptionSelected = choice;

    switch (dropdownOptionSelected) {
        case "deletion":
            activeMappings = [...deletions];
            break;
        case "distortion":
            activeMappings = [...distortions];
            break;
        case "generalization":
            activeMappings = [...generalizations];
            break;
        case "all":
            activeMappings = deletions.concat(distortions, generalizations);
            break;
    }
    showDropdown();

    // make buttons selected or unselected
    let allDropdownButtons = document.getElementsByClassName("dropdownButton");
    let selectedDropdownButtons = document.getElementsByClassName("dropdown:" + dropdownOptionSelected);
    let allAnswerButtons = document.getElementsByClassName("answerButton");
    let selectedAnswerButtons = document.getElementsByClassName("answer:" + dropdownOptionSelected);

    //make all answer- and dropdown buttons invisible
    for (let i = 0; i < allAnswerButtons.length; i++) {
        allAnswerButtons[i].style.display = "none";
        if (i < allDropdownButtons.length) {
            allDropdownButtons[i].style.color = "#1a1a1a";
            allDropdownButtons[i].style.fontWeight = "normal";
        }
    }
    //make the selected answer- and dropdown buttons visible again
    for (let i = 0; i < selectedAnswerButtons.length; i++) {
        selectedAnswerButtons[i].style.display = "block";
        if (i < selectedDropdownButtons.length) {
            selectedDropdownButtons[i].style.color = "lightgoldenrodyellow";
            selectedDropdownButtons[i].style.fontWeight = "bold";
        }
    }

    // if "all" selected, show all answerButtons.
    if (dropdownOptionSelected === "all") {
        //make all answer- and dropdown buttons visible
        for (let i = 0; i < allAnswerButtons.length; i++) {
            allAnswerButtons[i].style.display = "block";
        }
        document.getElementById("dropdown:all").style.color = "lightgoldenrodyellow";
        document.getElementById("dropdown:all").style.fontWeight = "bold";
    }
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

function makeAnswerButton(name, className, appendTo, func) {
    let btn = document.createElement("button");
    btn.id = "answer:" + name;
    btn.innerHTML = name;
    btn.className = "answerButton answer:" + className;
    btn.onclick = func;
    document.getElementById(appendTo).appendChild(btn);
}

function makeDropdownButton(name, func) {
    let btn = document.createElement("button");
    btn.id = "dropdown:" + name.toLowerCase();
    btn.className = "dropdownButton dropdown:" + name.toLowerCase();
    btn.innerHTML = name;
    btn.onclick = func;
    document.getElementById("selectionDropdown").appendChild(btn);
}

function makeTextArea(id, appendTo, placeholder = "", small = false) {
    let ta = document.createElement("textarea");
    ta.id = id;
    ta.placeholder = placeholder;
    if (small) {
        ta.style.minHeight = "0px";
        ta.style.margin="10px";
    }
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
    document.getElementById("sentence").innerHTML = listFrom[Math.floor(Math.random() * listFrom.length)];
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
    document.getElementById("selectionDropdown").innerHTML = "";
    document.getElementById("dropdown").style.display = "block";
    makeH2("", "topDiv", "sentence");

    makeDropdownButton("Deletion", function () { selectMappings("deletion"); });
    makeDropdownButton("Distortion", function () { selectMappings("distortion"); });
    makeDropdownButton("Generalization", function () { selectMappings("generalization"); });
    makeDropdownButton("All", function () { selectMappings("all"); });



    // generate Buttons for different answers
    makeDiv("deletionButtons", "bottomDiv", "Deletion");
    makeH2("Deletions", "deletionButtons");
    makeDiv("deletionDropdown", "selectionDropdown", "");
    for (let i = 0; i < deletions.length; i++) {
        makeAnswerButton(deletions[i], "deletion", "deletionButtons", function () { answerChosen(deletions[i]); chooseSentence(); });
        // makeDropdownButton(deletions[i], "deletionDropdown");
    }
    makeDiv("distortionButtons", "bottomDiv", "Distortion");
    makeH2("Distortions", "distortionButtons");
    makeDiv("distortionDropdown", "selectionDropdown", "");
    for (let i = 0; i < distortions.length; i++) {
        makeAnswerButton(distortions[i], "distortion", "distortionButtons", function () { answerChosen(distortions[i]); chooseSentence(); });
        // makeDropdownButton(distortions[i], "distortionDropdown");
    }
    makeDiv("generalizationButtons", "bottomDiv", "Generalization");
    makeH2("Generalizations", "generalizationButtons");
    makeDiv("generalizationDropdown", "selectionDropdown", "");
    for (let i = 0; i < generalizations.length; i++) {
        makeAnswerButton(generalizations[i], "generalization", "generalizationButtons", function () { answerChosen(generalizations[i]); chooseSentence(); });
        // makeDropdownButton(generalizations[i], "generalizationDropdown");
    }
    chooseSentence();
};

function startEnrichedLanguageTrainer1() {
    document.getElementById("title").innerHTML = "Enriched Language Trainer 1 (Beginner)";
    document.getElementById("bottomDiv").style.display = "flex";
    document.getElementById("bottomDiv").style.margin = "100px";
    makeH2("", "topDiv", "sentence");
    chooseRandEnrichedSentence();

    makeAnswerButton("Visual", "answerButton answer:visual", "bottomDiv", function () { answerChosen("visual"); chooseRandEnrichedSentence(); })
    makeAnswerButton("Audio", "answerButton answer:audio", "bottomDiv", function () { answerChosen("audio"); chooseRandEnrichedSentence(); })
    makeAnswerButton("Kinesthetic", "answerButton answer:kinesthetic", "bottomDiv", function () { answerChosen("kinesthetic"); chooseRandEnrichedSentence(); })

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

function startIntentionReframeTrainer1() {
    document.getElementById("title").innerHTML = "Intention Reframe Trainer 1";

    makeH2("a", "topDiv", "sentence");
    getRandSentence(negativeBehaviours);
    makeTextArea("textarea", "bottomDiv");

    for (let i = 0; i < basicNeeds.length; i++) {
        makeH3(basicNeeds[i], "bottomDiv");
    }

    document.getElementById("textarea").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        if (key == 13) {
            document.getElementById("textarea").value = "";
            getRandSentence(negativeBehaviours);
        }
    };

};

function startLogicalLevelsTrainer1() {
    document.getElementById("title").innerHTML = "Logical Levels Trainer 1";

    makeH2("a", "topDiv", "sentence");
    getRandSentence(negativeBehaviours);

    for (let i = 0; i < logicalLevels.length; i++) {
        makeTextArea("textarea" + (i+1), "bottomDiv", placeholder=logicalLevels[i], small = true);
    }

    document.getElementById("textarea6").onkeydown = function () {
        var key = event.keyCode || event.charCode;
        console.log("yes")
        if (key == 13) {
            for (let i = 0; i < logicalLevels.length; i++) {
                document.getElementById("textarea" + (i + 1)).value = "";
            }
            getRandSentence(negativeBehaviours);
        }
    };
}

// Clears index.html so another Trainer can be started.
function clearIndex() {
    document.getElementById("topDiv").innerHTML = "";
    document.getElementById("bottomDiv").innerHTML = "";
    document.getElementById("title").innerHTML = "";
    document.getElementById("dropdown").style.display = "none";
    dropdownOptionSelected = "all";
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
        case "IRT1": startIntentionReframeTrainer1();
            break;
        case "LLT1": startLogicalLevelsTrainer1();
            break;
    }
}

window.addEventListener("load", function () {
    clearIndex();
    // startEnrichedLanguageTrainer2();
    // startMetaModelTrainer1();
    // startIntentionReframeTrainer1();
    startLogicalLevelsTrainer1();
});

