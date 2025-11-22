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
    console.log('Skills container:', container);
    console.log('Skills data:', skills);
    if (!container) return;

    // Create a grid container for all categories
    const gridContainer = document.createElement('div');
    gridContainer.className = 'skills-grid';

    skills.forEach(category => {
        // Create category card
        const categoryCard = document.createElement('div');
        categoryCard.className = 'skill-category-card';

        // Add category title
        const categoryTitle = document.createElement('h4');
        categoryTitle.className = 'skill-category-title';
        categoryTitle.textContent = category.category;
        categoryCard.appendChild(categoryTitle);

        // Create skills list
        const list = document.createElement('ul');
        list.className = 'skills-list-icons';

        category.skills.forEach(skill => {
            const li = document.createElement('li');

            // Check if we should use emoji instead of icon
            const emojiIcon = getEmojiIcon(skill);
            if (emojiIcon) {
                // Use emoji
                const iconSpan = document.createElement('span');
                iconSpan.className = 'skill-emoji-icon';
                iconSpan.textContent = emojiIcon;
                li.appendChild(iconSpan);
            } else {
                // Use Devicon
                const icon = document.createElement('i');
                icon.className = getIconClass(skill);
                li.appendChild(icon);
            }

            // Add skill name
            const skillName = document.createElement('span');
            skillName.textContent = skill;
            li.appendChild(skillName);

            list.appendChild(li);
        });

        categoryCard.appendChild(list);
        gridContainer.appendChild(categoryCard);
        console.log('Added skills category:', category.category);
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
        'LangChain': '🔗',
        'Prompt Engineering': '💭',
        'SciPy': '📊',
        'Seaborn': '📈',
        'Feature Engineering': '🔧',
        'SHAP': '📉',
        'A/B Testing': '🧪',
        'RESTful APIs': '🔌',
        'WebSockets': '🔌'
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
        'SQL': 'devicon-azuresqldatabase-plain colored',
        'R': 'devicon-r-original colored',
        'HTML/CSS': 'devicon-html5-plain colored',
        'PHP': 'devicon-php-plain colored',
        'TypeScript': 'devicon-typescript-plain colored',

        // Web & Backend
        'React': 'devicon-react-original colored',
        'Node.js': 'devicon-nodejs-plain colored',
        'FastAPI': 'devicon-fastapi-plain',
        'GraphQL': 'devicon-graphql-plain colored',
        'RESTful APIs': 'devicon-swagger-plain colored',
        'WebSockets': 'devicon-socketio-original',

        // Machine Learning
        'TensorFlow': 'devicon-tensorflow-original colored',
        'PyTorch': 'devicon-pytorch-original colored',
        'Scikit-learn': 'devicon-scikitlearn-plain colored',
        'XGBoost': 'devicon-python-plain colored', // No XGBoost icon, use Python
        'LightGBM': 'devicon-python-plain colored', // No LightGBM icon, use Python
        'Keras': 'devicon-keras-plain colored',
        'Model Deployment': 'devicon-docker-plain colored', // Use Docker as deployment icon

        // NLP & LLMs
        'Transformers': 'devicon-python-plain colored',
        'Hugging Face': 'devicon-python-plain colored',
        'LangChain': 'devicon-python-plain colored',
        'LLM Fine-tuning (LoRA, PEFT)': 'devicon-pytorch-original colored',
        'Prompt Engineering': 'devicon-openai-plain',

        // Data Science
        'Pandas': 'devicon-pandas-plain colored',
        'NumPy': 'devicon-numpy-plain colored',
        'SciPy': 'devicon-python-plain colored',
        'Matplotlib': 'devicon-matplotlib-plain colored',
        'Seaborn': 'devicon-python-plain colored',
        'Plotly': 'devicon-plotly-plain colored',
        'Feature Engineering': 'devicon-python-plain colored',
        'SHAP': 'devicon-python-plain colored',
        'A/B Testing': 'devicon-python-plain colored',

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
