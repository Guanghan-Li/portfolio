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
    const phrases = ["intelligent systems.", "full-stack applications.", "ML-driven solutions.", "scalable architectures."];
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

    // Create a grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'skills-grid-text';

    skills.forEach(skill => {
        // Create skill card
        const card = document.createElement('div');
        card.className = 'skill-text-card';

        // Title (Text Only)
        const title = document.createElement('p');
        title.className = 'skill-text-name';
        title.textContent = skill.name;
        card.appendChild(title);

        gridContainer.appendChild(card);
    });

    container.appendChild(gridContainer);
}

// Helper function to get emoji icons for technologies without Devicon support
function getEmojiIcon(skill) {
    const emojiMap = {
        'XGBoost': '🚀',
        'LightGBM': '⚡',
        'Model Deployment': '🚢',
        'Transformers': '🤖',
        'Hugging Face': '🤗',
        'LangChain': '🦜', // LangChain logo is a bird/chain, parrot is close
        'Prompt Engineering': '✍️',
        'SciPy': '�',
        'Seaborn': '�',
        'Feature Engineering': '⚙️',
        'SHAP': '�',
        'A/B Testing': '⚖️',
        'RESTful APIs': '🌐',
        'WebSockets': '🔌',
        'LLM Fine-tuning (LoRA, PEFT)': '🧠'
    };

    return emojiMap[skill] || null;
}

// Helper function to map skills to Devicon classes
function getIconClass(skill) {
    const iconMap = {
        // Languages
        'Python': 'devicon-python-plain colored',
        'JavaScript': 'devicon-javascript-plain colored',
        'Java': 'devicon-java-plain colored',
        'C++': 'devicon-cplusplus-plain colored',
        'SQL': 'devicon-mysql-plain colored', // Using MySQL as generic SQL icon
        'R': 'devicon-r-original colored',
        'HTML/CSS': 'devicon-html5-plain colored',
        'PHP': 'devicon-php-plain colored',
        'TypeScript': 'devicon-typescript-plain colored',

        // Web & Backend
        'React': 'devicon-react-original colored',
        'Node.js': 'devicon-nodejs-plain colored',
        'FastAPI': 'devicon-fastapi-plain colored',
        'GraphQL': 'devicon-graphql-plain colored',

        // Machine Learning
        'TensorFlow': 'devicon-tensorflow-original colored',
        'PyTorch': 'devicon-pytorch-original colored',
        'Scikit-learn': 'devicon-scikitlearn-plain colored',
        'Keras': 'devicon-keras-plain colored',

        // Data Science
        'Pandas': 'devicon-pandas-original colored',
        'NumPy': 'devicon-numpy-original colored',
        'Matplotlib': 'devicon-matplotlib-plain colored',
        'Plotly': 'devicon-plotly-plain colored',

        // Databases
        'PostgreSQL': 'devicon-postgresql-plain colored',
        'MySQL': 'devicon-mysql-plain colored',
        'MongoDB': 'devicon-mongodb-plain colored',
        'SQLite': 'devicon-sqlite-plain colored',
        'SQLAlchemy': 'devicon-sqlalchemy-plain colored',

        // Cloud & DevOps
        'AWS (EC2, S3, Lambda, SageMaker, RDS)': 'devicon-amazonwebservices-plain-wordmark colored',
        'Docker': 'devicon-docker-plain colored',
        'Git': 'devicon-git-plain colored',
        'GitHub': 'devicon-github-original'
    };

    return iconMap[skill] || 'devicon-devicon-plain';
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
