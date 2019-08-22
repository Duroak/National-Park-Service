const apiKey = 'LlrteiC7PMks7GxaigrFBQPWj31TeaVuzNO0Qrjz';
const searchUrl = 'developer.nps.gov/api/v1';

function formatQueryParams(parameter) {
    const queryItems = Object.keys(parameter).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(parameter[key])}`)
    return queryItems.join('&');
}

function results() {

}

function getParks(query, maxResults=10) {
    const parameter = {
        q: query,
        s
    };

    const queryString = formatQueryParams(parameter)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => console.log(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function submitForm() {
    $('form').submit(event => {
    event.preventDefault();
    const parkName = $('#js-park').val();
    const stateName = $('#state').val();
    const maxResults = $('#js-max-results').val();
    getParks( maxResults);
    })
}