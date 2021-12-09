const deletions = ["Simple Deletion", "Comparative Deletion", "Lack of Referential Index", "Unspecified Verb"];
const distortions = ["Nominalization", "Cause and Effect", "Complex Equivalence", "Mind Reading", "Lost Comparative"];
const generalizations = ["Universal Quantifiers", "Modal Operator of Necessity", "Modal Operator of Possibility", "Presupposition"];
const mappings = deletions.concat(distortions, generalizations);
const mappingTypes = [deletions, distortions, generalizations];
var currentSentence = "";
var currentMapping = "";


function answerChosen(answer) {
    if (answer === currentMapping) {
        alert("Correct Answer!");
    } else {
        alert("Wrong Answer! \nCorrect answer: " + currentMapping );
    };
    chooseSentence();
};

function chooseSentence() {
    currentMapping = mappings[Math.floor(Math.random() * mappings.length)];
    currentSentence = metaModelSentences[currentMapping].examples[Math.floor(Math.random() * metaModelSentences[currentMapping].examples.length)]
    document.getElementById("sentence").innerHTML = currentSentence;
};

window.addEventListener("load", function () {

    // generate Buttons for different answers
    for (let i = 0; i < deletions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = deletions[i];
        btn.className = "mappingButton";
        btn.onclick = function() { answerChosen(deletions[i]); };
        document.getElementById("deletionButtons").appendChild(btn);
    }
    for (let i = 0; i < distortions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = distortions[i];
        btn.className = "mappingButton";
        btn.onclick = function() { answerChosen(distortions[i]); };
        document.getElementById("distortionButtons").appendChild(btn);
    }
    for (let i = 0; i < generalizations.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = generalizations[i];
        btn.className = "mappingButton";
        btn.onclick = function() { answerChosen(generalizations[i]); };
        document.getElementById("generalizationButtons").appendChild(btn);
    }
    chooseSentence();
});