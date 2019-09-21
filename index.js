'use strict';

//get results from API
function getResults(searchUser) {
    fetch(`https://api.github.com/users/${searchUser}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.message);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
        $('#js-error-message').text('Something went wrong');
    });
}

//display each result
function displayResults (responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    let maxResults = $('#js-max-results').val();
    for (let i = 0; i < responseJson.length & i < maxResults; i++) {
        $('#results-list').append(
          `<li><h3>${responseJson[i].name}:<br><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></h3></li>`  
        )};
    $('#results').removeClass('hidden');
}

//watch for submit even
function watchForm() {
    $('#js-form').submit(event => {
        event.preventDefault();
        const searchUser = $('#js-search-user').val();
        getResults(searchUser);
    });
}

$(watchForm);