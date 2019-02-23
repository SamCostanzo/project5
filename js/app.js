/*********************************************AWESOME STARTUP EMPLOYEE DIRECTORY******************************************/


// // Connecting and getting a random user from the given API
// fetch('https://randomuser.me/api/')  //Fetches the API's url
//     .then(response => response.json())   //Turns that response into json
//     .then(data => console.log(data.results));   //Logs the "results" of that data. This is the data we can work with. A random user.


// Just for testing. Logging the array of people from the API
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    .then(body => console.log(body))

// Using the fetch method to call the random user API and get 12 results or users back. Using forEach() to itterate over each person and put their info into the generateUserCard() function
fetch('https://randomuser.me/api/?results=12')
    .then(response => response.json())
    // .then(body => console.log(body))
    .then(body => body.results)
    .then(results => {
        results.forEach(result => {
            generateUserCard(result.name.first + ' ' + result.name.last, result.picture.medium, result.email, result.location.city, + ', ' + result.location.state);
        });
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
    setAttributes(formInput, {'type':'search', 'id':'search-input', 'placeholder':'Search...'});
    // Creating the forms 'submit' input field
    const formSubmit = document.createElement('input');
    setAttributes(formSubmit, {'type':'submit', 'value':'&#x1F50D;', 'id':'Search-submit', 'class':'search-submit'});
    // Appending the two inputs to the form, and then to the HTML div
    form.appendChild(formInput);
    form.appendChild(formSubmit);
    $('.search-container').append(form);
}
createSearchBar();



// Generating a users info card. Can pass in their info as arguments. Uses the above helper function to set the attributes
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

// createUserCard('Sam Costanzo', 'https://randomuser.me/api/portraits/women/11.jpg', 'samcostanzo25@gmail.com', 'Syracuse', 'New York');











