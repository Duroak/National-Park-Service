const apiKey = 'QTiE7JbAAoXVtreuFH0lmCJUp3DGImQvg8ej0ggN';
const searchUrl = 'https://developer.nps.gov/api/v1/parks';
const cors = 'https://cors-anywhere.herokuapp.com/';


function formatQueryParams(parameter) {
    const queryItems = Object.keys(parameter).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameter[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i < responseJson.data.length & i < maxResults; i++) {
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].url}</p>
            <p>${responseJson.data[i].description}'</p>
            </li>`
          )};
    $('#results').removeClass('hidden');
}

function getParks(query, maxResults=10) {
    const parameter = {
        api_key: apiKey,
        q: query,
    };

    const queryString = formatQueryParams(parameter)
    const url = cors + searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function submitForm() {
    $('form').submit(event => {
    event.preventDefault();
    const parkName = $('#js-search-park').val();
    //const stateName = $('#state').val();
    const maxResults = $('#js-max-results').val();
    getParks(parkName, maxResults);
    })
}

$(submitForm); 