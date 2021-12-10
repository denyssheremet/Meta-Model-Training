const deletions = ["Simple Deletion", "Comparative Deletion", "Lack of Referential Index", "Unspecified Verb"];
const distortions = ["Nominalization", "Cause and Effect", "Complex Equivalence", "Mind Reading", "Lost Comparative"];
const generalizations = ["Universal Quantifiers", "Modal Operator of Necessity", "Modal Operator of Possibility", "Presupposition"];
const mappings = deletions.concat(distortions, generalizations);

var currentSentence = "";
var currentMapping = "";

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
    if (answer !== currentMapping) {
        alert("Wrong Answer! \nCorrect answer: " + currentMapping);
    };
    chooseSentence();
};

function chooseSentence() {
    currentMapping = activeMappings[Math.floor(Math.random() * activeMappings.length)];
    currentSentence = metaModelSentences[currentMapping].examples[Math.floor(Math.random() * metaModelSentences[currentMapping].examples.length)]
    document.getElementById("sentence").innerHTML = currentSentence;
};

function selectMappings(selectedMapping) {
    var index = activeMappings.indexOf(selectedMapping);

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

function makeH2(innerHTML, appendTo) {
    let h2 = document.createElement("h2");
    h2.innerHTML = innerHTML;
    document.getElementById(appendTo).appendChild(h2);
}

function makeAnswerButton(name, appendTo) {
    let btn = document.createElement("button");
    btn.id = "answer:" + name;
    btn.innerHTML = name;
    btn.className = "mappingButton";
    btn.onclick = function () { answerChosen(name); };
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

window.addEventListener("load", function () {
    document.getElementById("title").innerHTML = "Meta Model Trainer 1 (Beginner)";

    var h2 = document.createElement("h2");
    h2.id = "sentence";
    document.getElementById("topDiv").appendChild(h2);


    // generate Buttons for different answers
    makeDiv("deletionButtons", "bottomDiv", "Deletion");
    makeH2("Deletions", "deletionButtons");
    makeDiv("deletionDropdown", "selectionDropdown", "");
    for (let i = 0; i < deletions.length; i++) {
        makeAnswerButton(deletions[i], "deletionButtons");
        makeDropdownButton(deletions[i], "deletionDropdown");
    }
    makeDiv("distortionButtons", "bottomDiv", "Distortion");
    makeH2("Distortions", "distortionButtons");
    makeDiv("distortionDropdown", "selectionDropdown", "");
    for (let i = 0; i < distortions.length; i++) {
        makeAnswerButton(distortions[i], "distortionButtons");
        makeDropdownButton(distortions[i], "distortionDropdown");
    }
    makeDiv("generalizationButtons", "bottomDiv", "Generalization");
    makeH2("Generalizations", "generalizationButtons");
    makeDiv("generalizationDropdown", "selectionDropdown", "");
    for (let i = 0; i < generalizations.length; i++) {
        makeAnswerButton(generalizations[i], "generalizationButtons");
        makeDropdownButton(generalizations[i], "generalizationDropdown");
    }
    chooseSentence();
});