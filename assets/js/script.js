'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

//contact form

// Function to check if the user is on a mobile device
function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}


// Function to send a WhatsApp message on mobile
function sendWhatsAppMessage(senderName, message) {
  const phoneNumber = '+918769018313'; // Replace with the recipient's phone number
  window.open(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent("Hello i am "+ senderName + ", and i have a query regarding :- " + message)}`, '_blank');

  // If the WhatsApp app is not available, open WhatsApp Web on desktop
  setTimeout(function() {
    if (!document.hidden) {
      // If the user hasn't switched apps or tabs, open WhatsApp Web
      sendWhatsAppWebMessage(senderName, message);
    }
  }, 2000); // Check if the user switches back after 1 second
}


// Function to send a WhatsApp message on browser
function sendWhatsWebMessage(senderName, message) {
  const phoneNumber = '+918769018313'; // Replace with the recipient's phone number
  window.open(`https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent("Hello i am "+ senderName + ", and i have a query regarding :- " + message)}`, '_blank');
}

// Function to send an email via Gmail
function sendEmail(senderEmail, senderName, message) {
  const receiverEmail = 'amanbhargava1998@gmail.com'; // Replace with your email address
  const subject = `Message from ${senderName}`;
  const body = `Sender's Email: ${senderEmail}\n\nMessage: ${message}`;
  
  const mailtoUrl = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  const newWindow = window.open(mailtoUrl, 'EmailWindow');
  
  if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
    // If the email window fails to open, show an error alert
    alert('Error: Unable to send email. Please try again later.');
  }
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  
  const senderName = document.getElementById('senderName').value;
  const senderEmail = document.getElementById('senderEmail').value;
  const message = document.getElementById('message').value;

  if (isMobileDevice()) {
    // If on a mobile device, send a WhatsApp message
    sendWhatsAppMessage(senderName, message);
  } else {
    // If not on a mobile device, check WhatsApp Web availability
    if (confirm('Would you like to open WhatsApp Web?')) {
      sendWhatsWebMessage(senderName, message);
    } else {
      // If user declines WhatsApp Web, send an email
      sendEmail(senderEmail, senderName, message);
    }
  }
}

// Add a submit event listener to the form element
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', handleSubmit);
