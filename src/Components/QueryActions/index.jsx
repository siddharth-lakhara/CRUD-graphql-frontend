import React from 'react';
import PropTypes from 'prop-types';
import {
  ListAllUsers, CreateUser, DeleteUser, UpdateUser,
} from './allActions';


import './styles.css';

const QueryActions = ({ fetchResults }) => (
  <div className="query-actions">
    <ListAllUsers fetchResults={fetchResults} />
    <CreateUser fetchResults={fetchResults} />
    <UpdateUser fetchResults={fetchResults} />
    <DeleteUser fetchResults={fetchResults} />
  </div>
);

QueryActions.propTypes = {
  fetchResults: PropTypes.func.isRequired,
};

export default QueryActions;
