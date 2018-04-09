import React from 'react';
import PersonCard from '../components/PersonCard';
import PersonStore from '../stores/PersonStore';
import { observer } from 'mobx-react';

@observer
class IndexPage extends React.Component {
  constructor() {
    super();
    this.store = PersonStore;
    this.store.getPerson();
  }
  render() {
    return (
      <div>
        <div className="sv-row">
          <div className="sv-column sv-text-center">
            <h1>PERSONAGEM SORTEADO</h1>
          </div>
        </div>

        <div className="sv-row">
          <div className="sv-column" />
          <div className="sv-column">
            <PersonCard {...this.store.person} />
          </div>
          <div className="sv-column" />
        </div>
      </div>
    );
  }
}

export default IndexPage;
