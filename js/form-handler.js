document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

async function handleSubmit(event) {
    event.preventDefault();

    const status = document.getElementById('form-status');
    const data = new FormData(event.target);

    // For now, we'll just simulate a success since we don't have the backend ID yet
    // In production, this would be a fetch call to Formspree/EmailJS

    status.innerHTML = "Thanks for your message! I'll get back to you soon.";
    event.target.reset();

    /* 
    // Example Formspree implementation:
    fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks for your message!";
            form.reset();
        } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
        }
    });
    */
}
