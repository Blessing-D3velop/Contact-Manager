
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];


let container = document.querySelector('.js-add-contact-container');
let addContactButtons = document.querySelectorAll('.js-add-contact-button');
let backdrop = document.querySelector('.js-backdrop');
let cardsContainer = document.querySelector('.js-cards-grid');

let saveToStorage = () =>{
  localStorage.setItem('contacts', JSON.stringify(contacts));
    
}


// Function to render cards
function renderContacts() {
  cardsContainer.innerHTML = '';

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let html = `
      <div class="card-container">
        <div class ="first-line">
          <p class ="name-image">
            <img src="Icons/icons8-contact-24.png" alt="contact-icon" class="name-icon">
          </p>
          <p class = "name-text">
            ${contact.name}
          </p>
        </div>

        <div class="second-line">
          <p class="phone-image">
            <img src="Icons/icons8-phone-24.png" alt="phone-icon" class="phone-icon">      
          </p>
          <p class="phone-text">
            ${contact.phone}
          </p>
        </div>

        <div class="third-line">
          <p class="email-image">
            <img src="Icons/icons8-email-24.png" alt="email-icon" class="email-icon">
          </p>
          <p class="email-text">
          ${contact.email}
          </p>
        </div>


        <div class="container-card-buttton">
          <button class="edit-button js-edit-button">
            <img src="Icons/icons8-edit.svg" alt="edit-icon" class="edit-icon">
            Edit
          </button>
          <button class="delete-button js-delete-button">
            <img src="Icons/icons8-delete.svg" alt="delete icon" class="delete-icon">
            Delete
          </button>
        </div>
      </div>

  `;
    cardsContainer.innerHTML += html;
  };
    // Show or hide empty state
  const emptyState = document.querySelector('.js-empty-state');
  if (contacts.length > 0) {
    emptyState.style.display = 'none';
  } else {
    emptyState.style.display = 'block';
  }
  //-Delete Card
let deleteButton = document.querySelectorAll('.js-delete-button');

for(let i = 0; i < deleteButton.length; i++){
  deleteButton[i].addEventListener('click', () =>{
    contacts.splice(i, 1);
    saveToStorage();
    renderContacts();
  })
}

}

// Open form
for (let i = 0; i < addContactButtons.length; i++) {
  addContactButtons[i].addEventListener('click', () => {
    backdrop.style.display = 'block';
    let html = `
      <div class="contact-form">
        <div class="contact-headding-container">
          <p class="contact-headding">Add New Contact</p>
        </div>

        <p class="label">Name *</p>
        <input type="text" placeholder="John Doe" class="name-input js-inputName" required>
        <p class="label">Phone *</p>
        <input type="text" placeholder="+27 000 000 0000" class="phone-input js-inputPhone" required>
        <p class="label">Email *</p>
        <input type="text" placeholder="John@example.com" class="email-input js-inputEmail" required>

        <div class="form-buttons">
          <button class="add-button">Add</button>
          <button class="cancel-button">Cancel</button>
        </div>

        <p class="js-output"></p>
      </div>
    `;
    container.innerHTML = html;

    // Cancel button
    document.querySelector('.cancel-button').addEventListener('click', () => {
      container.innerHTML = '';
      backdrop.style.display = 'none';
    });

    // Add button
    const addContactTwo = document.querySelector('.add-button');
    let output = document.querySelector('.js-output');

    addContactTwo.addEventListener('click', () => {
      let name = document.querySelector('.js-inputName').value;
      let email = document.querySelector('.js-inputEmail').value;
      let phone = document.querySelector('.js-inputPhone').value;

      output.textContent = '';

      if (!name.trim()) {
        output.textContent = 'Invalid Name';
        return;
      } else if (!email.includes('@')) {
        output.textContent = 'Invalid Email';
        return;
      } else if (!phone || phone.replace(/\D/g,'').length !== 11) {
        output.textContent = 'Phone number must be 10 digits';
        return;
      }

      contacts.push({name, email, phone});
      container.innerHTML = '';
      backdrop.style.display = 'none';

      saveToStorage();
      renderContacts();




    });
  });
};
renderContacts();

