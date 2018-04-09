import React from 'react';

function PersonCard(person) {
  return (
    <div className="sv-card sv-bg-color--black-1" style={{ width: '260px' }}>
      <header>
        <h1 className="sv-color--yellow-500 sv-text-center"> {person.name} </h1>
      </header>
      <main>
        <div style={{ backgroundSize: 'cover' }} className={`person${person.id}`} />
      </main>
    </div>
  );
}

export default PersonCard;
