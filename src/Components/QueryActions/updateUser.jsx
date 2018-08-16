import React from 'react';
import { gql, graphql } from 'react-apollo';
import validateInput from './utils/validateInput';
import renderErrors from './utils/renderErrors';

const updateUserRequest = gql`
  mutation($userName: String!, $email: String!) {
    updateUser(userName: $userName, email: $email) {
      ok
      errors {
        path
        message
      }
    }
}
`;

class updateUser extends React.Component {
  state = {
    userName: '',
    email: '',
  };

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
      const { ok, errors } = response.data.updateUser;
      if (ok) {
        fetchResults(
          <div className="ok"> User updated succesfully!</div>,
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
    const { userName, email } = this.state;
    const { handleChange, sendRequest } = this;
    return (
      <div className="createUser-main">
        <input
          type="text"
          name="userName"
          value={userName}
          placeholder="Enter new user name"
          onChange={handleChange}
          className="createUser-input"
        />
        <input
          type="text"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={handleChange}
          className="createUser-input"
        />
        <button
          type="button"
          className="createUser-submit"
          onClick={sendRequest}
        >
          Update User
        </button>
      </div>

    );
  }
}

export default graphql(updateUserRequest)(updateUser);
