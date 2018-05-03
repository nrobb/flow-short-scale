/**
 * Namespace
 */
var FLOW_SCALE = FLOW_SCALE || {};

/**
 * FLOW_SCALE.onFormSubmit - buids a .csv file from the form answers
 *
 * @param  {string} condition the experimental condition
 */
FLOW_SCALE.onFormSubmit = function(condition) {
  var csv = condition + ",";
  var items = 0;
  // items 1 - 13 (including two dummy questions)
  for (var i = 0; i < 105; i++) {
    if (document.FKS.elements[i].checked == true) {
      items++;
      console.log(document.FKS.elements[i].value)
      csv += document.FKS.elements[i].value;
      csv += ","
    }
  }
  // item 14
  for (i = 0; i < 7; i++) {
    if (document.FKS.i14[i].checked == true) {
      items++;
      csv += document.FKS.i14[i].value;
      csv += ","
    }
  }
  // item 15
  for (i = 0; i < 7; i++) {
    if (document.FKS.i15[i].checked == true) {
      items++;
      csv += document.FKS.i15[i].value;
      csv += ","
    }
  }
  // item 16 (gender)
  for (i = 0; i < 2; i++) {
    if (document.FKS.i16[i].checked == true) {
      items++;
      csv += document.FKS.i16[i].value;
      csv += ",";
    }
  }
  // item 17 (weekly game play duration)
  if (document.FKS.i17.value !== "void") {
    items++;
    csv += document.FKS.i17.value;
    csv += ",";
  }
  // item 18 (month)
  if (document.FKS.i18.value !== "void") {
    items++;
    csv += document.FKS.i18.value;
    csv += ",";
  }
  // item 19 (year)
  if (document.FKS.i19.value !== "void") {
    items++;
    csv += document.FKS.i19.value;
    csv += ",";
  }
  if (items != 21) {
    console.log(items)
    alert("Please answer all items...");
  } else {
    var completionCode = FLOW_SCALE.getCompletionCode();
    FLOW_SCALE.showCompletionCode(completionCode);
    FLOW_SCALE.saveData(completionCode, condition, csv);
  }
}

/**
 * FLOW_SCALE - saves the participant's data to the server
 *
 * @param  {type} csv the csv file of the participant's responses
 */
FLOW_SCALE.saveData = function(completionCode, condition, csv) {
  var velocityData = FLOW_SCALE.getVelocityData();
  var scoreData = FLOW_SCALE.getScoreData();
  var scoreDataFile = completionCode + "," + csv + scoreData;
  var velocityDataFile = completionCode + "," + velocityData;
  firebase.storage().ref().child(condition).child(completionCode + ".csv").putString(scoreDataFile).then(function(snapshot) {
    console.log(scoreDataFile);
  });
  if (velocityData) {
    firebase.storage().ref().child("velocityData").child(completionCode + ".csv").putString(velocityDataFile).then(function(snapshot) {
      console.log(velocityDataFile);
    });
  }
;}

/**
 * FLOW_SCALE.getVelocityData - gets the participant's velocity data from localStorage (DDA only)
 *
 * @return {string}  the velocity data as a .csv file
 */
FLOW_SCALE.getVelocityData = function() {
  var velocityData = localStorage.getItem("velocities");
  return velocityData;
}

/**
 * FLOW_SCALE.getScoreData - gets the participant's velocity data from localStorage (DDA only)
 *
 * @return {string}  the score data as a .csv file
 */
FLOW_SCALE.getScoreData = function() {
  var scoreData = localStorage.getItem("score");
  return scoreData;
}

/**
 * FLOW_SCALE.showCompletionCode - shows the completion code and a copy button
 *
 * @param  {type} completionCode the participant's competion code
 */
FLOW_SCALE.showCompletionCode = function(completionCode) {
  // hide the submit-reset buttons
  var divToHide = document.getElementById("submit-reset");
  divToHide.style.display = "none";
  // thank you message
  var para = document.createElement("H2");
  var text = document.createTextNode(
    "Thank you. Your responses were sucessfully submitted. Your completion " +
    "code is displayed in the text box below. You should now copy the code, " +
    "and return to Amazon Mechanical Turk, where you should enter the code " +
    "to finish your assignment. Once this window is closed, you will not be " +
    "able to access the completion code again, so make sure to copy it before you close this window."
  );
  para.appendChild(text);
  // completion code in text area
  var code = document.createElement("TEXTAREA");
  code.value = completionCode;
  code.readOnly = true;
  var div = document.getElementById("display-code");
  div.appendChild(para);
  div.appendChild(code);
  // add a copy button
  var copyButton = document.createElement("BUTTON");
  copyButton.innerHTML = "Copy code to clipboard"
  div.appendChild(copyButton);
  window.scroll(0, 500);
  copyButton.addEventListener('click', function(event) {
    code.select();
    try {
      var success = document.execCommand('copy');
      if (!success) {
        alert("Oops, something went wrong. Please copy the code manually. Your code is: " + completionCode);
      }
    } catch (err) {
      alert("Oops, something went wrong. Please copy the code manually. Your code is: " + completionCode);
    }
  });
}

/**
 * FLOW_SCALE.getCompletionCode - gets a unique completion code from the survey
 *
 * @return {type}  description
 */
FLOW_SCALE.getCompletionCode = function() {
  var date = new Date();
  var participant = firebase.database().ref("participants").push(date.toUTCString());
  console.log(date.toUTCString());
  var rawCode = participant.getKey();
  var completionCode = rawCode.slice(1);
  return completionCode;
}
