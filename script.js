const form = document.getElementById('resumeForm');
const resumeOutput = document.getElementById('resumeOutput');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Fill resume with form data
    document.getElementById('resName').innerText = document.getElementById('name').value;
    document.getElementById('resTitle').innerText = document.getElementById('title').value;
    document.getElementById('resContact').innerText = `Email: ${document.getElementById('email').value} | Phone: ${document.getElementById('phone').value}`;
    document.getElementById('resGitHub').innerHTML = `GitHub: <a href="${document.getElementById('github').value}" target="_blank">${document.getElementById('github').value}</a>`;
    document.getElementById('resSummary').innerText = document.getElementById('summary').value;
    document.getElementById('resEducation').innerText = document.getElementById('education').value;
    document.getElementById('resSkills').innerText = document.getElementById('skills').value;
    document.getElementById('resProjects').innerText = document.getElementById('projects').value;
    document.getElementById('resExperience').innerText = document.getElementById('experience').value;

    // Hide form and show resume
    form.style.display = 'none';
    resumeOutput.style.display = 'block';
});
