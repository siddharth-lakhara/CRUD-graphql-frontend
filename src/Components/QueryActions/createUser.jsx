import React from 'react';
import { gql, graphql } from 'react-apollo';

import renderErrors from './utils/renderErrors';
import validateInput from './utils/validateInput';

const createUserRequest = gql`
  mutation($userName: String!, $email: String!) {
    createUser(userName: $userName, email: $email) {
      ok
      errors {
        path
        message
      }
    }
}
`;

class CreateUser extends React.Component {
  state = {
    userName: '',
    email: '',
  }

  sendRequest = async () => {
    const { userName, email } = this.state;
    const { mutate, fetchResults } = this.props;
    const v = validateInput({
      userName,
      email,
    });
    if (!v.error) {
      const response = await mutate({
        variables: { userName, email },
      });
      const { ok, errors } = response.data.createUser;
      if (ok) {
        fetchResults(
          <div className="ok"> User succesfully created!</div>,
        );
      } else {
        fetchResults(
          <div className="error">
            {renderErrors(errors)}
          </div>,
        );
      }
    } else {
      fetchResults(
        <div className="error">
          Error:
          {' '}
          {v.error.message}
        </div>,
      );
    }
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { handleChange, sendRequest } = this;
    return (
      <div className="createUser-main">
        <input
          type="text"
          name="userName"
          placeholder="Enter User Name"
          onChange={handleChange}
          className="createUser-input"
        />
        <input
          type="text"
          name="email"
          placeholder="Enter email"
          onChange={handleChange}
          className="createUser-input"
        />
        <button
          type="button"
          className="createUser-submit"
          onClick={sendRequest}
        >
          Create User

        </button>
      </div>

    );
  }
}

export default graphql(createUserRequest)(CreateUser);
