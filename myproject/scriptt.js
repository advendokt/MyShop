document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const sections = document.querySelectorAll('.section');
    const reviewsList = document.getElementById('reviewsList');
    const reviewForm = document.getElementById('reviewForm');
    const starInputs = document.querySelectorAll('.star-input');
    const ratingInput = document.getElementById('ratingInput');
    const contactForm = document.getElementById('contactForm');
    const feedbackMessage = document.getElementById('feedbackMessage');

   
document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = button.getAttribute('data-section');
        if (sectionId) {
            showSection(sectionId);
        }
    });
});



    const showSection = (sectionId) => {
        const sectionToShow = document.getElementById(sectionId);
        if (sectionToShow) {
           
            sections.forEach(section => {
                section.classList.remove('active');
            });

            
            main.prepend(sectionToShow);

           
            sectionToShow.classList.add('active');
        }
    };
    const button = document.querySelector('a[data-section="repairServicesSection"]');
    button.addEventListener("click", function(event) {
        event.preventDefault();
        const targetSection = document.getElementById(this.getAttribute("data-section"));
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
        }
    });
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        try {
            
            const response = await fetch('a2vend0kt@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                
                contactForm.reset();
                
                feedbackMessage.textContent = 'Message sent successfully!';
                feedbackMessage.classList.remove('error');
                feedbackMessage.classList.add('success');
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            
            feedbackMessage.textContent = 'Failed to send message. Please try again later.';
            feedbackMessage.classList.remove('success');
            feedbackMessage.classList.add('error');
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
    
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
    
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });


    const addReview = (name, message, rating) => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review');

      
        const starColor = getStarColor(rating);

        reviewElement.innerHTML = `
            <strong>${name}</strong> (${getStars(rating, starColor)}): ${message}
        `;
        reviewsList.appendChild(reviewElement);
    };

    const getStarColor = (rating) => {
        
        if (rating >= 5) {
            return 'gold'; 
        } else if (rating >= 3 && rating < 5) {
            return 'yellow'; 
        } else {
            return 'grey'; 
        }
    };

    const getStars = (rating, color) => {
        const stars = '&#9733;'.repeat(rating); 
        return `<span style="color: ${color};">${stars}</span>`;
    };

    
    reviewForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const nameInput = document.getElementById('name');
        const messageInput = document.getElementById('message');
        const rating = parseInt(ratingInput.value);

        const name = nameInput.value.trim();
        const message = messageInput.value.trim();

        if (name && message && rating > 0) {
            addReview(name, message, rating);
            
            nameInput.value = '';
            messageInput.value = '';
            resetStars();
        } else {
            alert('Please fill out all fields and select a rating.');
        }
    });

    
    starInputs.forEach(star => {
        star.addEventListener('mouseover', handleStarHover);
        star.addEventListener('click', handleStarClick);
    });

    
    function handleStarHover(event) {
        const selectedRating = parseInt(event.target.getAttribute('data-rating'));
        highlightStars(selectedRating);
    }

    
    function handleStarClick(event) {
        const selectedRating = parseInt(event.target.getAttribute('data-rating'));

        
        ratingInput.value = selectedRating;

        
        starInputs.forEach(star => {
            star.classList.remove('highlight');
        });

        
        starInputs.forEach(star => {
            const starRating = parseInt(star.getAttribute('data-rating'));
            star.classList.toggle('highlight', starRating <= selectedRating);
        });
    }

   
    function resetStars() {
        starInputs.forEach(star => {
            star.classList.remove('highlight');
        });
        ratingInput.value = '';
    }

   
    showSection('infoSection');
});


const repairTable = document.getElementById('repairTable');
const tooltip = document.getElementById('tooltip');

repairTable.addEventListener('mouseover', function(event) {
    const target = event.target;

    if (target.tagName === 'TD' && target.hasAttribute('data-tooltip')) {
        const tooltipText = target.getAttribute('data-tooltip');
        tooltip.textContent = tooltipText;

        const rect = target.getBoundingClientRect();
        tooltip.style.top = `${rect.top + window.scrollY}px`;
        tooltip.style.left = `${rect.right + 10}px`;
        tooltip.style.display = 'block';
    }
});

repairTable.addEventListener('mouseout', function(event) {
    const relatedTarget = event.relatedTarget;

    if (!relatedTarget || !relatedTarget.closest('#tooltip')) {
        tooltip.style.display = 'none';
    }
});

function changeLanguage(lang) {
    let targetPage;

    
    if (lang === 'en') {
        targetPage = 'WEBda';
    } else if (lang === 'ru') {
        targetPage = 'WEBdaRUS'; 
    } else if (lang === 'et') {
        targetPage = 'WEBdaEST'; 
    }

    
    window.location.href = targetPage + '.html';
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 10);
}


function createFallingNumber() {
    const numberElement = document.createElement('div');
    numberElement.textContent = generateRandomNumber();
    numberElement.classList.add('falling-number');

    
    numberElement.style.setProperty('--random-x', Math.random());
    numberElement.style.setProperty('--fall-duration', `${Math.random() * 4 + 2}s`); 

    return numberElement;
}


function startNumberRain() {
    const numberRain = document.getElementById('numberRain');
    const headerWidth = document.querySelector('header').clientWidth;

   
    setInterval(() => {
        const fallingNumber = createFallingNumber();
        numberRain.appendChild(fallingNumber);

        
        setTimeout(() => {
            numberRain.removeChild(fallingNumber);
        }, 10000);
    }, 300);
}


window.onload = startNumberRain;



