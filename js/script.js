const GITHUB_USERNAME = 'yourusername';

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const repos = await response.json();
        const repoList = document.getElementById('githubRepos');
        repoList.innerHTML = '';

        if (repos.length === 0) {
            repoList.innerHTML = '<li>📭 No public repositories yet.</li>';
            return;
        }

        repos.forEach(repo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
                ${repo.description ? `<br><small>${repo.description}</small>` : ''}
            `;
            repoList.appendChild(li);
        });
    } catch (error) {
        document.getElementById('githubRepos').innerHTML = 
            '<li>⚠️ Could not load repositories. Check your internet connection.</li>';
    }
}

const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('status');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    statusMsg.textContent = '✅ Message sent successfully! Thank you!';
    statusMsg.className = 'success';
    
    this.reset();
    
    setTimeout(() => {
        statusMsg.textContent = '';
        statusMsg.className = '';
    }, 5000);
});

window.addEventListener('load', fetchGitHubRepos);
