document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    // Toggle theme on click
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Navigation Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fetch and Render Data
    fetchData();

    // Typing Animation
    const typingText = document.getElementById('typing-text');
    const phrases = ["intelligent systems.", "scalable web apps.", "data pipelines.", "user-centric products."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    // Scroll Reveal
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden-section');
        observer.observe(section);
    });
});

async function fetchData() {
    try {
        // Fetch Skills
        const skillsResponse = await fetch('data/skills.json');
        const skillsData = await skillsResponse.json();
        renderSkills(skillsData);

        // Fetch Experience
        const expResponse = await fetch('data/experience.json');
        const expData = await expResponse.json();
        renderExperience(expData);

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    if (!container) return;

    skills.forEach(category => {
        const list = document.createElement('ul');
        list.className = 'skills-list';

        // Add category title if needed, or just list skills
        // For this design, we'll just list the skills in a clean grid
        // But let's respect the category structure

        category.skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            list.appendChild(li);
        });

        container.appendChild(list);
    });
}

function renderExperience(experience) {
    const container = document.getElementById('experience-container');
    if (!container) return;

    experience.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';

        card.innerHTML = `
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <span class="job-company">@ ${job.company}</span>
                </div>
                <span class="job-duration">${job.duration}</span>
            </div>
            <ul class="job-details">
                ${job.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
            </ul>
        `;

        container.appendChild(card);
    });
}
