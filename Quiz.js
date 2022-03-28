let baseAddress = 'http://localhost:3000/';

function getQuakesByMagRange() {

    fetch(`${baseAddress}getData`)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
getQuakesByMagRange();