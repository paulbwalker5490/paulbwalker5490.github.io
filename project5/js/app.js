'use strict';

// Declare variables
const cardContent = document.querySelector('.card-content');
const myModal = document.getElementById('myModal');
const modalInfo = document.getElementsByClassName('modal-info');
const modal = document.getElementsByClassName('modal');
const modalDisplay = document.querySelector('.modal-display');
const header = document.querySelector('.masthead');




// Simple display function add class and removes class to show modal. el is shorthand for element.
const showModalFunc = (el) => {
  el.classList.remove('is-hidden');
  el.classList.add('is-flex-display');
}

// Simple display function add class and removes class to hide. el is shorthand for element.
const removeModalFunc = (el) => {
  el.classList.remove('is-flex-display');
  el.classList.add('is-hidden');
}


/* I USED THIS PLACEHOLDER TO BUILD THE SEARCH FORM ------------ */

// <form class="search-form">
//   <input class="search" for="search" type="search" onkeyup="filterEmployee()" placeholder="Search..">
//   <button class="search-btn" onkeyup="clearFilter()" type="reset">Search</button>
// </form>

const form = document.createElement('form');
header.appendChild(form);
form.classList.add('search-form');
const formInput = document.createElement('input');
formInput.type = 'search';
formInput.classList.add('search');
formInput.setAttribute('onkeyup', 'filterEmployee()');
formInput.placeholder = 'Enter name or username';
form.appendChild(formInput);
const button = document.createElement('button');
form.appendChild(button);
button.classList.add('search-btn');
button.setAttribute('onkeyup', 'clearFilter()');
button.type = 'reset';
button.textContent = 'filter';






/* FETCH FUNCTIONS ----------------------------------------------- */

// This function assign the .then(response => response.json())
function fetchData(url) {
  return fetch(url)
    .then(res => res.json())
}


/* HELPER FUNCTIONS ---------------------------------------------- */

// Used IIFE to place in the browser when page loads
  (function generateResults() {

    // You call the function fetchData to call .then(res => res.json) then chain data method
    fetchData('https://randomuser.me/api/?nat=us,gb&results=12')

    // .then(data => console.log(data.results)) 
    .then(data => {
      // use listEmployee to store the fetch data for later use.
      const listEmployee = data.results;
      data.results.map(employees => {
        cardContent.innerHTML += `
                            <div class="card">
                                <img class="avatar" src="${ employees.picture.large }" alt="Avatar">
                                <div class="container">
                                  <h4 class="name">${ employees.name.first}  ${ employees.name.last }</h4>
                                  <p class="email">${ employees.email }</p>
                                  <p class="city">${ employees.location.city }</p>
                                </div>
                            </div>
                            `;
      });
      const card = document.querySelectorAll('.card');
      // Place this function to bridge employeeDetail function.
      employeeDetail(listEmployee, card);
  })
})();  

  
  /* MODAL --------------------------------------------------------- */


// Create the modal and assign to browser

const employeeDetail = ( listEmployee, card) => {
  const modalDisplay = document.querySelector('.modal-display');
  const modal = document.querySelectorAll('.modal');
  const generateModal = listEmployee.map(employees =>  `
      <div class="modal is-hidden">
        <div class="modal-content">        
          <div class="modal-info">
            <span class="close">&times;</span>
                <img src="${ employees.picture.large }" class="modal-avatar cf" alt="Avatar">
                <div class="modal-text">
                  <h4 class="fullname">${ employees.name.first}  ${ employees.name.last }</h4>
                  <p class="email">${ employees.email }</p>
                  <p class="city">${ employees.location.city }</p>
                </div>
                <div class="arrow cf">
                  <span class="prev">&#10094;</span>
                  <span class="next">&#10095;</span>
                </div> 
                <div class="modal-more-info">
                  <h4 class="cell">${ employees.cell }</h4>
                  <p class="address">${ employees.location.street }, 
                                     ${ employees.location.state } 
                                    ${ employees.location.postcode }
                  </p>
                  <p class="dob">Birthday: ${ employees.dob.date.slice(0, 10) }</p>
                </div>
            </div>
        </div>
      </div> 
    `).join('');
    modalDisplay.innerHTML = generateModal;
    // use function to bridge between function
    modalDetails(card, listEmployee);
  }

/* FILTER THROUGH EMPLOYEES ---------------------------------------------------------- */

  // Add eventListener to the form field and preventDefault to submit form
  function filterEmployee() {
    // Declare variables
    const input = document.querySelector('input');
    const filter = input.value.toUpperCase();
    let name = document.querySelectorAll('.name');
    const heading4 = document.querySelectorAll('h4')
    const card = document.querySelectorAll('.card');
    const btn = document.querySelector('button');


    // Loop through all employees name, and hide those who don't match the search query
    for (let i = 0; i < card.length; i++) {
      if (name[i].textContent.toUpperCase().includes(filter)) {
        showModalFunc(card[i]);
      } else {
        removeModalFunc(card[i]);
      }
      const clearFilter = (e) => {
        e.preventDefault();
        input.value = '';
      }
    }
  }



/* MODAL DISPLAY & UI ---------------------------------------------------------------------*/
// this function closes modal as well as go through the employees.

function modalDetails (card, listEmployee) {
  for (let i = 0; i < card.length; i++) { 
    const closeX = modal[i].querySelector('.close');
    const ltMark = modal[i].querySelector('.prev'); 
    const gtMark = modal[i].querySelector('.next');
    card[i].addEventListener('click', () => {
      showModalFunc(modal[i]);
    });
    closeX.addEventListener('click', () => {
      removeModalFunc(modal[i]);
    });
  
    ltMark.addEventListener('click', () => {
        if(modal[i].className !== 'is-hidden') {
         window.setTimeout(() => {
          removeModalFunc(modal[i]);
         }, 500);
          showModalFunc(modal[i].previousElementSibling);
        }
    });

    gtMark.addEventListener('click', () => {
        if(modal[i].className !== 'is-hidden') {
         window.setTimeout(() => {
          removeModalFunc(modal[i]);
         }, 500);
          showModalFunc(modal[i].nextElementSibling);
        }
    });
  }

}
