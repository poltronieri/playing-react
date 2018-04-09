import { observable, action, runInAction, toJS } from 'mobx';
import PersonService from '../services/PersonService';

class PersonStore {
  @observable person = [];

  @action
  getPerson() {
    PersonService.getPersonData()
      .then(response => {
        runInAction('Carrega os dados da pessoa', () => {
          this.person = response.data;
        });
      })
      .catch(response => {
        console.error(response);
      });
  }
}

export default new PersonStore();
