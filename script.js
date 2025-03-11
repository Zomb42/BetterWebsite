document.addEventListener('DOMContentLoaded', function() {
    

    const readMoreBtn = document.getElementById('read-more-btn');
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const moreContent = document.getElementById('more-content');
            if (moreContent.classList.contains('collapse')) {
                moreContent.classList.remove('collapse');
                readMoreBtn.textContent = 'Read Less';
            } else {
                moreContent.classList.add('collapse');
                readMoreBtn.textContent = 'Read More';
            }
        });
    }

    const detailsBtns = document.querySelectorAll('.details-btn');
    detailsBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const details = document.getElementById(projectId + '-details');
            
            if (details.classList.contains('collapse')) {
                details.classList.remove('collapse');
                this.textContent = 'Hide Details';
            } else {
                details.classList.add('collapse');
                this.textContent = 'View Details';
            }
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            //Can send to server but not now
            
            const formSuccess = document.getElementById('form-success');
            formSuccess.classList.remove('d-none');
            
            contactForm.reset();
            
            setTimeout(function() {
                formSuccess.classList.add('d-none');
            }, 5000);
        });
    }
});