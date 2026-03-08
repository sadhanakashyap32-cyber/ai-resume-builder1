function generateResume(){

var name = document.getElementById("name").value;
var branch = document.getElementById("branch").value;
var gmail = document.getElementById("gmail").value;
var skills = document.getElementById("skills").value;
var experience = document.getElementById("experience").value;

var resume = "<h2>" + name + "</h2>" +
"<p><b>Branch:</b> " + branch + "</p>" +
"<p><b>Gmail:</b> " + gmail + "</p>" +
"<p><b>Skills:</b> " + skills + "</p>" +
"<p><b>Experience:</b> " + experience + "</p>";

document.getElementById("output").innerHTML = resume;

}