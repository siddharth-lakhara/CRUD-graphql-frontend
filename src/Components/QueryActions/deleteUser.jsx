import React from 'react';
import { gql, graphql } from 'react-apollo';
import { validateUserName as validateInput } from './utils/validateInput';
import renderErrors from './utils/renderErrors';

const deleteUserRequest = gql`
  mutation($userName: String!) {
    deleteUser(userName: $userName) {
      ok
      errors {
        path
        message
      }
    }
}
`;

class DeleteUser extends React.Component {
  state = {
    userName: '',
  };

  sendRequest = async () => {
    const { userName } = this.state;
    const { mutate, fetchResults } = this.props;
    const v = validateInput({
      userName,
    });
    if (!v.error) {
      const response = await mutate({
        variables: { userName },
      });
      const { ok, errors } = response.data.deleteUser;
      if (ok) {
        fetchResults(
          <div className="ok"> User succesfully deleted!</div>,
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
    const { userName } = this.state;
    const { handleChange, sendRequest } = this;
    return (
      <div className="createUser-main">
        <input
          type="text"
          name="userName"
          value={userName}
          placeholder="Enter User Name"
          onChange={handleChange}
          className="createUser-input"
        />
        <button
          type="button"
          className="createUser-submit"
          onClick={sendRequest}
        >
          Delete User
        </button>
      </div>

    );
  }
}

export default graphql(deleteUserRequest)(DeleteUser);
