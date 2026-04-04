function generateResume(){

let name = document.getElementById("name").value;
let title = document.getElementById("title").value;
let email = document.getElementById("email").value;
let phone = document.getElementById("phone").value;
let github = document.getElementById("github").value;

let summary = document.getElementById("summary").value;
let education = document.getElementById("education").value;
let skills = document.getElementById("skills").value;
let projects = document.getElementById("projects").value;
let experience = document.getElementById("experience").value;

document.getElementById("resName").innerText = name;
document.getElementById("resTitle").innerText = title;
document.getElementById("resContact").innerText = email + " | " + phone;
document.getElementById("resGitHub").innerText = github;

document.getElementById("resSummary").innerText = summary;
document.getElementById("resEducation").innerText = education;
document.getElementById("resSkills").innerText = skills;
document.getElementById("resProjects").innerText = projects;
document.getElementById("resExperience").innerText = experience;

document.getElementById("resumeOutput").style.display = "block";

}


