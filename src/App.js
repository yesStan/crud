import React, { useState } from 'react';
import './App.css';

const initialValues = {
  userName: '',
  userSurname: '',
  userSalary: '',
};

function App() {
  const [userData, setUserData] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [editableUserData, setEditableUserData] = useState({
    isEdit: false,
    userIndex: null,
  });

  const handleRemoveClick = (index) => {
    setUsers(users.filter((user, userIndex) => userIndex !== index));
  };

  const isFilledFields =
    userData.userName && userData.userSurname && userData.userSalary;

  const handleSubmitUser = (e) => {
    e.preventDefault();

    if (isFilledFields) {
      if (editableUserData.isEdit) {
        const editedData = users;
        editedData.splice(editableUserData.userIndex, 1, userData);

        setUsers(editedData);

        setEditableUserData({
          isEdit: false,
          userIndex: null,
        });
      } else {
        setUsers((prevState) => [...prevState, userData]);
      }

      setUserData(initialValues);
    }
  };

  const handleCleanForm = () => {
    setUserData(initialValues);
    setEditableUserData({
      isEdit: false,
      userIndex: null,
    });
  };

  const handleEditClick = (user, index) => {
    setUserData(user);

    setEditableUserData({
      isEdit: true,
      userIndex: index,
    });
  };

  // console.log('user', users);

  return (
    <>
      <div className="nes-container with-title">
        <h3 className="title ">
          CREATE READ UPDATE DELETE 8-BIT TABLE{' '}
          <span className="snes-jp-logo"></span>
        </h3>
        <h1>
          Enjoy<i className="nes-icon is-medium heart"></i>{' '}
        </h1>
      </div>
      <div className=" App">
        <div className="wrapper">
          <div className="nes-container content">
            <table>
              <th>#</th>
              <th>UserName</th>
              <th>UserSurname</th>
              <th>UserSalary</th>
              <th>Actions</th>

              <tbody>
                {users.map((user, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{user.userName}</td>
                    <td>{user.userSurname}</td>
                    <td>{user.userSalary}</td>
                    <td>
                      <div>
                        <button
                          className="nes-btn is-success edit"
                          onClick={() => handleEditClick(user, index)}
                        >
                          edit
                        </button>
                        <button
                          className="nes-btn is-error remove"
                          onClick={() => handleRemoveClick(index)}
                        >
                          remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="inputs">
            <form onSubmit={handleSubmitUser} onReset={handleCleanForm}>
              <label for="name_field">Your name</label>
              <input
                placeholder="please type name"
                className="nes-field"
                id="name_field"
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    userName: e.target.value,
                  }))
                }
                value={userData.userName}
              />
              <label for="name_field2">Your surname</label>
              <input
                placeholder="type surname"
                className="nes-field"
                id="name_field2"
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    userSurname: e.target.value,
                  }))
                }
                value={userData.userSurname}
              />
              <label for="name_field3">Your salary</label>
              <input
                placeholder="type salary"
                className="nes-field"
                id="name_field3"
                onChange={(e) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    userSalary: e.target.value,
                  }))
                }
                value={userData.userSalary}
              />

              <div className="buttons">
                <button
                  // className="nes-btn is-success"
                  disabled={!isFilledFields}
                  type="submit"
                >
                  {editableUserData.isEdit ? 'Edit' : 'Add'}
                </button>
                <button className="nes-btn is-error" type="reset">
                  Clean
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
