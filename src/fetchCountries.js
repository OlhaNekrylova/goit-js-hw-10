export const fetchCountries = (name) => {
    // return fetch ()
    // .then(response => response.json(),
    // ); 
    const options = {

    }

    const url = `https://restcountries.com/v2/all?fullText=true&capital=&population=&flags.svg=&languages=&`;

    fetch(url, options)
    .then(response => response.json())
    .then(console.log());
}