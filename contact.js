document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verzamel form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            
            // Hier kun je later de verzending naar een backend toevoegen
            console.log('Form submitted:', data);
            
            // Toon bevestiging
            alert('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.');
            
            // Reset form
            this.reset();
        });
    }
});
