import React from 'react';
import { gql, withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

const allUsersQuery = gql`
  query {
    allUsers {
      userName
      email
    }
  }
`;

const renderResults = (results) => {
  const userItem = results.map(item => (
    <div key={item.userName} className="allUsers-render">
      <div className="allUsers-userName">
        <strong>UserName:</strong>
        {' '}
        {item.userName}
      </div>
      <div className="allUsers-email">
        <strong>email:</strong>
        {' '}
        {item.email}
      </div>
    </div>
  ));
  return userItem;
};

const ListAllUsers = ({ client, fetchResults }) => {
  const fetchUsers = async () => {
    const response = await client.query({
      query: allUsersQuery,
    });
    const { allUsers } = response.data;
    const results = renderResults(allUsers);
    fetchResults(results);
  };
  return (
    <button type="button" onClick={fetchUsers}>List all users</button>
  );
};

ListAllUsers.propTypes = {
  client: PropTypes.object,
  fetchResults: PropTypes.func.isRequired,
};

export default withApollo(ListAllUsers);
