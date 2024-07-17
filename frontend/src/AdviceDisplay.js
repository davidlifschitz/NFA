// frontend/src/AdviceDisplay.js

import React from 'react';

const AdviceDisplay = ({ advice, error }) => {
  return (
    <div>
      {error && (
        <div style={{ color: 'red' }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {advice && (
        <div>
          <h2>Advice:</h2>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
};

export default AdviceDisplay;