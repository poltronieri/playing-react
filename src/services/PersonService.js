import axios from 'axios';

let peopleId = Math.floor(Math.random() * 5 + 1);
const PersonService = {
  getPersonData() {
    return axios.get(`http://localhost:8080/peoples/${peopleId}`);
    // return axios.get(`https://swapi.co/api/people/1/`);
  },
};

export default PersonService;
