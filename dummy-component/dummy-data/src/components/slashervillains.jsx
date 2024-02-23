import React from 'react';
import PropTypes from 'prop-types';

const SlasherVillainComponent = ({ villain }) => {
  return (
    <div className="villain">
      <h2>{villain.name}</h2>
      <p>Movies: {villain.movies.join(', ')}</p>
      <p>Description: {villain.description.physical_attributes}</p>
      <p>Weapons: {villain.weapons.join(', ')}</p>
      <p>Modus Operandi: {villain.modus_operandi}</p>
      <p>Motivation Background: {villain.motivation_background.background}</p>
      <p>Kill Count: {villain.kill_count}</p>
      <p>Weakness: {villain.weakness.psychological}</p>
    </div>
  );
};

SlasherVillainComponent.propTypes = {
  villain: PropTypes.shape({
    name: PropTypes.string.isRequired,
    movies: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.shape({
      physical_attributes: PropTypes.string.isRequired
    }).isRequired,
    weapons: PropTypes.arrayOf(PropTypes.string).isRequired,
    modus_operandi: PropTypes.string.isRequired,
    motivation_background: PropTypes.shape({
      background: PropTypes.string.isRequired
    }).isRequired,
    kill_count: PropTypes.number.isRequired,
    weakness: PropTypes.shape({
      psychological: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default SlasherVillainComponent;
