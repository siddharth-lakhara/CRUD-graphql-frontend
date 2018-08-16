import React from 'react';

const renderErrors = errors => errors.map(item => (
  <div key={item.path} className="allUsers-render">
    <div className="allUsers-userName">
      <strong>Path:</strong>
      {' '}
      {item.path}
    </div>
    <div className="allUsers-email">
      <strong>Message:</strong>
      {' '}
      {item.message}
    </div>
  </div>
));

export default renderErrors;
