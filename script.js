document.getElementById("resumeForm").addEventListener("submit", function(e){

e.preventDefault()

const name = document.getElementById("name").value
const title = document.getElementById("title").value
const email = document.getElementById("email").value
const phone = document.getElementById("phone").value
const github = document.getElementById("github").value

const summary = document.getElementById("summary").value
const education = document.getElementById("education").value
const skills = document.getElementById("skills").value
const projects = document.getElementById("projects").value
const experience = document.getElementById("experience").value

document.getElementById("resName").innerText = name
document.getElementById("resTitle").innerText = title
document.getElementById("resContact").innerText = email + " | " + phone
document.getElementById("resGitHub").innerText = github

document.getElementById("resSummary").innerText = summary
document.getElementById("resEducation").innerText = education
document.getElementById("resSkills").innerText = skills
document.getElementById("resProjects").innerText = projects
document.getElementById("resExperience").innerText = experience

document.getElementById("resumeOutput").style.display = "block"

})
