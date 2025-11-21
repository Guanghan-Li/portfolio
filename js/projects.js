document.addEventListener('DOMContentLoaded', () => {
    fetchProjects();
});

let allProjects = [];

async function fetchProjects() {
    try {
        const response = await fetch('data/projects.json');
        allProjects = await response.json();
        renderProjects(allProjects);
        setupFilters();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    container.innerHTML = ''; // Clear existing

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <div class="project-image" style="margin-bottom: 20px; border-radius: 4px; overflow: hidden;">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: auto; object-fit: cover;" loading="lazy">
            </div>
            <div class="project-top">
                <div class="folder-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-folder"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <div class="project-links">
                    ${project.github_link ? `<a href="${project.github_link}" target="_blank" aria-label="GitHub Link"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>` : ''}
                    ${project.live_demo ? `<a href="${project.live_demo}" target="_blank" aria-label="External Link"><svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>` : ''}
                </div>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <div class="project-desc">
                <p>${project.short_description}</p>
            </div>
            <ul class="project-tech-list">
                ${project.tech_stack.map(tech => `<li>${tech}</li>`).join('')}
            </ul>
        `;

        container.appendChild(card);
    });
}

function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            if (filterValue === 'All') {
                renderProjects(allProjects);
            } else {
                const filtered = allProjects.filter(p => p.category.includes(filterValue));
                renderProjects(filtered);
            }
        });
    });
}
