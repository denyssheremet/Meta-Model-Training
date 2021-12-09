const deletions = ["Simple Deletion", "Comparative Deletion", "Lack of Referential Index", "Unspecified Noun", "Unspecified Verb"];
const distortions = ["Nominalization", "Cause and Effect", "Mind Reading", "Complex Equivalence", "Lost Comparative"];
const generalizations = ["Universal Quantifiers", "Modal Operator of Necessity", "Modal Operator of Possibility", "Presupposition"];
const mappings = deletions.concat(distortions, generalizations);
const mappingTypes = [deletions, distortions, generalizations];


window.addEventListener("load", function () {

    // generate Buttons for different answers
    for (let i = 0; i < deletions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = deletions[i];
        btn.className = "mappingButton";
        document.getElementById("deletionButtons").appendChild(btn);
    }
    for (let i = 0; i < distortions.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = distortions[i];
        btn.className = "mappingButton";
        document.getElementById("distortionButtons").appendChild(btn);
    }
    for (let i = 0; i < generalizations.length; i++) {
        let btn = document.createElement("button");
        btn.innerHTML = generalizations[i];
        btn.className = "mappingButton";
        document.getElementById("generalizationButtons").appendChild(btn);
    }


});