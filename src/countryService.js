const url = 'https://restcountries.com/v2/name/{name}';

export const fetchCountries = (name) => {
    const options = `${name}`;
    return fetch(url, options).then(res => res.json());
};
