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
        document.getElementById("myDropdown").style.display = "none";
    } else {
        document.getElementById("myDropdown").style.display = "block";
    }
    dropdownShowing = !dropdownShowing;

}



function answerChosen(answer) {
    if (answer === currentMapping) {
        alert("Correct Answer!");
    } else {
        alert("Wrong Answer! \nCorrect answer: " + currentMapping);
    };
    chooseSentence();
};

function chooseSentence() {
    currentMapping = mappings[Math.floor(Math.random() * mappings.length)];
    currentSentence = metaModelSentences[currentMapping].examples[Math.floor(Math.random() * metaModelSentences[currentMapping].examples.length)]
    document.getElementById("sentence").innerHTML = currentSentence;
};

function selectMappings(selectedMapping) {
    console.log(selectedMapping);

    var index = activeMappings.indexOf(selectedMapping);
    if (index != -1) {
        document.getElementById("dropdown:" + selectedMapping).style.backgroundColor = "gray";
        document.getElementById("answer:" + selectedMapping).style.display = "none";
        activeMappings.splice(index, 1);

    } else {
        document.getElementById("dropdown:" + selectedMapping).style.backgroundColor = "cyan";
        document.getElementById("answer:" + selectedMapping).style.display = "block";
        activeMappings.push(selectedMapping);
    };
    console.log(activeMappings);
}


window.addEventListener("load", function () {

    //Add dropdown buttons
    for (var i = 0; i < mappings.length; i++) {
        let btn = document.createElement("button");
        btn.id = "dropdown:" + mappings[i];
        btn.className = "dropdownBtn";
        console.log(btn.id);
        btn.innerHTML = mappings[i];
        btn.onclick = function () { selectMappings(btn.innerHTML); };
        document.getElementById("myDropdown").appendChild(btn);
    }

    // generate Buttons for different answers
    for (let i = 0; i < deletions.length; i++) {
        let btn = document.createElement("button");
        btn.id = "answer:" + deletions[i];
        btn.innerHTML = deletions[i];
        btn.className = "mappingButton";
        btn.onclick = function () { answerChosen(deletions[i]); };
        document.getElementById("deletionButtons").appendChild(btn);
    }
    for (let i = 0; i < distortions.length; i++) {
        let btn = document.createElement("button");
        btn.id = "answer:" + distortions[i];
        btn.innerHTML = distortions[i];
        btn.className = "mappingButton";
        btn.onclick = function () { answerChosen(distortions[i]); };
        document.getElementById("distortionButtons").appendChild(btn);
    }
    for (let i = 0; i < generalizations.length; i++) {
        let btn = document.createElement("button");
        btn.id = "answer:" + generalizations[i];
        btn.innerHTML = generalizations[i];
        btn.className = "mappingButton";
        btn.onclick = function () { answerChosen(generalizations[i]); };
        document.getElementById("generalizationButtons").appendChild(btn);
    }
    chooseSentence();
});