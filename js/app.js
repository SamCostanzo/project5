/*********************************************AWESOME STARTUP EMPLOYEE DIRECTORY******************************************/
const gallery = document.getElementById('gallery');
const card = gallery.getElementsByClassName('card');


// Using the fetch method to call the random user API and get 12 results or users back. Using forEach() to itterate over each person and put their info into the generateUserCard() function

// Helper function to make fetching data simpler. Gets data and converts to json
function fetchData(url){
    return fetch(url)
        .then(response => response.json())
}




fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(body => body.results)
    .then(results => {
        console.log(results);
        let globalUsersArray = [];
        globalUsersArray.push(results);
        // console.log(globalUsersArray);
        results.forEach(result => {
            generateUserCard(result.name.first + ' ' + result.name.last, result.picture.medium, result.email, result.location.city, result.location.state);
            // generateUserCard(result.name.first, result.name.last, result.picture.medium, result.email, result.location.city, result.location.state);
        })

        // Click event listner for modal window function call
        const gallery = document.getElementById('gallery');
        const card = gallery.getElementsByClassName('card');
        for (let i = 0; i < card.length; i++) {
            card[i].addEventListener('click', () => {
                // formating the birthday to display correctly on the modal window
                let dob_year = results[i].dob.date.slice(2, 4);
                let dob_month = results[i].dob.date.slice(5, 7);
                let dob_day = results[i].dob.date.slice(8, 10);                
                // Calling and passing in all the users info for the modal window
                generateModalWindow(results[i].name.first + ' ' + results[i].name.last, results[i].picture.medium, results[i].email, results[i].location.city, results[i].cell, results[i].location.street + ', ' + results[i].location.state + ' ' + results[i].location.postcode, 'Birthday: ' + dob_month + '/' + dob_day + '/' + dob_year); 
            });
        }
    })

    
/**********************************************************************FUNCTIONS********************************************************************/

// Helper function to make setting all the attributes below way more concice
function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

// Creating the search bar and appending it to the HTML
function createSearchBar(){
    // Creating form to hold search and submit inputs
    const form = document.createElement('form');
    setAttributes(form, {'action':'#', 'method':'get'});
    // Creating the forms input 'search' field
    const formInput = document.createElement('input');
    setAttributes(formInput, {'type':'search', 'id':'search-input', 'placeholder':'Find an employee!', "onFocus":"placeholder = ''"});
    // Creating the forms 'submit' input field
    const formSubmit = document.createElement('input');
    setAttributes(formSubmit, {'type':'submit', 'value':'Search', 'id':'Search-submit', 'class':'search-submit'});
    // Appending the two inputs to the form, and then to the HTML div
    form.appendChild(formInput);
    form.appendChild(formSubmit);
    $('.search-container').append(form);
}
createSearchBar();

// Generating a users info card. Can pass in their info as arguments. Uses the above helper function to set the attributes
// Going to try to redo this function with a template litteral. Commenting out for now
function generateUserCard(name, picture, email, city, state){
    // Create a 'card' to display a users info
    const cardDiv = document.createElement('div');
    setAttributes(cardDiv, {'class':'card'});
    // Create div for users img or profile picture
    const cardImageContainer = document.createElement('div');
    setAttributes(cardImageContainer, {'class':'card-img-container'});
    // Create img 
    const img = document.createElement('img');
    setAttributes(img, {'class':'card-img', 'src': picture, 'alt':'profile picture'});               // pass in profile picture
    $(cardImageContainer).append(img);
    $(cardDiv).append(cardImageContainer);
    // Create div for users info
    const cardInfoContainer = document.createElement('div');
    setAttributes(cardInfoContainer, {'class':'card-info-container'});
    // Create h3
    const h3 = document.createElement('h3');
    setAttributes(h3, {'id':'name', 'class':'card-name cap'});
    h3.textContent = name;                                                                           // Pass in name
    // Create p for email
    const p_email = document.createElement('p');
    setAttributes(p_email, {'class':'card-text'});
    p_email.textContent = email;                                                                     // Pass in email
    // Create p for city, state
    const p_city_state = document.createElement('p');
    setAttributes(p_city_state, {'class':'card-text cap'});
    p_city_state.textContent = city + ', ' + state;                                                  // pass in city, state
    // Append everything
    $(cardInfoContainer).append(h3);
    $(cardInfoContainer).append(p_email);
    $(cardInfoContainer).append(p_city_state);
    $(cardDiv).append(cardInfoContainer);
    $('.gallery').append(cardDiv);
}


// function generateUserCard(name, picture, email, city, state){
//     const html = `
//         <div class="card">
//         <div class="card-img-container">
//             <img class="card-img" src="${picture}" alt="profile picture">
//         </div>
//         <div class="card-info-container">
//             <h3 id="name" class="card-name cap">${name}</h3>
//             <p class="card-text">${email}</p>
//             <p class="card-text cap">${city}, ${state}</p>
//         </div>
//     </div>
//     `;
//     gallery.innerHTML = html;
// }

// Modal window function
function generateModalWindow(name, picture, email, city, phoneNumber, adress, dob){
    // Creating main container div
    const modalContainer = document.createElement('div');
    setAttributes(modalContainer, {'class':'modal-container'});
    // Creating modal div
    const modalDiv = document.createElement('div');
    setAttributes(modalDiv, {'class':'modal'});
    // Creating the X or exit button for the window
    const Xbutton = document.createElement('button');
    setAttributes(Xbutton, {'type':'button', 'id':'modal-close-btn', 'class':'modal-close-btn'});
    // Add strong on the button?
    Xbutton.textContent = 'X';
    // Creating div for modal-info-container
    const modalInfoContainer = document.createElement('div');
    setAttributes(modalInfoContainer, {'class':'modal-info-container'});
    // Creating the img or profile picture
    const img = document.createElement('img');
    setAttributes(img, {'class':'modal-img', 'src': picture, 'alt':'profile picture'});   // Pass in profile picture to src
    // Create h3 for the name
    const h3 = document.createElement('h3');
    setAttributes(h3, {'id':'name', 'class':'modal-name cap'});
    h3.textContent = name;   // Pass in name
    // Create p for email
    const p_email = document.createElement('p');
    setAttributes(p_email, {'class':'modal-text'});
    p_email.textContent = email;   // Pass in email       
    // Create p for city
    const p_city = document.createElement('p');
    setAttributes(p_city, {'class':'modal-text cap'});
    p_city.textContent = city;   // Pass in city     
    // Create <hr>
    const hr = document.createElement('hr');
    // Create p for phone number
    const p_phoneNumber = document.createElement('p');
    setAttributes(p_phoneNumber, {'class':'modal-text'});
    p_phoneNumber.textContent = phoneNumber;   // Pass in phone number   
    // Create p for fill adress
    const p_adress = document.createElement('p');
    setAttributes(p_adress, {'class':'modal-text'});
    p_adress.textContent = adress;   // Pass in adress   
    // Create p for DoB
    const p_dob = document.createElement('p');
    setAttributes(p_dob, {'class':'modal-text'});
    p_dob.textContent = dob;   // Pass in dob   
    
    // For exceeds grade. Adding the next and prev buttons for the window
    // Create the div 
    const modalButtonContainer = document.createElement('div');
    // setAttributes(modalButtonContainer, {'class':'modal-btn-container'});
    // // Create the two buttons
    // // Previous
    // const previous = document.createElement('button');
    // setAttributes(previous, {'type':'button', 'id':'modal-prev', 'class':'modal-prev btn'});
    // previous.textContent = 'Prev';
    // // Next
    // const next = document.createElement('button');
    // setAttributes(next, {'type':'button', 'id':'modal-next', 'class':'modal-next btn'});
    // next.textContent = 'Next';
    // Append to modal window
    // $(modalButtonContainer).append(previous);
    // $(modalButtonContainer).append(next);
    $(modalContainer).append(modalButtonContainer);

    

    // Append all the display elements to the first div modalInfoContainer
    $(modalInfoContainer).append(img);
    $(modalInfoContainer).append(h3);
    $(modalInfoContainer).append(p_email);
    $(modalInfoContainer).append(p_city);
    $(modalInfoContainer).append(hr);
    $(modalInfoContainer).append(p_phoneNumber);
    $(modalInfoContainer).append(p_adress);
    $(modalInfoContainer).append(p_dob);
    // Appending the info container div and the exit button to the modal div
    $(modalDiv).append(modalInfoContainer);
    $(modalDiv).append(Xbutton);
    // Finally, append all of that to the main container div for the modal window. Keep in mind the next and prev buttons need to be appended to this as well
    $(modalContainer).append(modalDiv);
    $(gallery).append(modalContainer);

    // Click event listener for the Xbutton to close the modal window
    Xbutton.addEventListener('click', () => {
        $('.modal-container').remove();
    });
}












