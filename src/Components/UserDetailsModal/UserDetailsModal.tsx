import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createUser, updateUser } from "../../redux/slices/usersSlice";
import User from "../../modals/User";

function UserDetailsModal(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const dispatch = useDispatch<AppDispatch>();

  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const user = useSelector((state: RootState) =>
    state.users.find((user) => user.id === updateOrDeleteId)
  );

  useEffect(() => {
    if (props.text.title === "Update") {
      setUsername(user?.username || "");
      setPassword(user?.password || "");
      setRole(user?.role || "");
    } else {
      setUsername("");
      setPassword("");
      setRole("");
    }
  }, [updateOrDeleteId, props.text.title]);

  const handleSignup = async () => {
    if (props.text.title === "Add") {
      const user = new User("", username, password, role);
      dispatch(createUser(user));
    } else {
      const updatedUser = new User(user?.id || "", username, password, role);
      dispatch(updateUser(updatedUser));
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="user"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" style={{ maxWidth: "300px" }}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.text.title + " User"}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" style={props.text.title === "Update" ? {height: "280px"} : {height: "220px"}}>
              <div className="row">
                <div className="col-12">
                  <label>User Name</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="col-12">
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="form-control"
                  />
                </div>
                {props.text.title === "Update" && (
                  <div className="col-12">
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className="form-control"
                  />
                </div>
                )}
                <div className="col-12">
                  <label>Role</label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    className="form-control"
                  >
                    <option value="" selected disabled>
                      Select a role
                    </option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={handleSignup}
                type="button"
                className="btn btn-primary"
              >
                {props.text.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetailsModal;
