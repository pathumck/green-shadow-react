import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { createUser, updateUser } from "../../redux/slices/usersSlice";
import User from "../../modals/User";

function UserDetailsModal(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [validate, setValidate] = useState<{
    status: number | null;
    message: string;
  }>();

  const updateOrDeleteId = useSelector(
    (state: RootState) => state.updateOrDelete
  );
  const user = useSelector((state: RootState) =>
    state.users.find((user) => user.id === updateOrDeleteId)
  );

  useEffect(() => {
    if (props.text.title === "Update") {
      setUsername(user?.username || "");
      setPassword("");
      setRePassword("");
      setRole(user?.role || "");
      setValidate({ status: null, message: "" });
    } else {
      setUsername("");
      setPassword("");
      setRePassword("");
      setRole("");
      setValidate({ status: null, message: "" });
    }
  }, [updateOrDeleteId, props.text.title]);

  const validateForm = (): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!username || !emailRegex.test(username)) {
      setValidate({ status: 1, message: "Input a valid username." });
      return false;
    }
    if (!password || !passwordRegex.test(password)) {
      setValidate({ status: 2, message: "Input a valid password." });
      return false;
    }
    if (
      !rePassword ||
      !passwordRegex.test(rePassword) ||
      password !== rePassword
    ) {
      setValidate({ status: 3, message: "Match the password." });
      return false;
    }
    if (!role) {
      setValidate({ status: 4, message: "Select a role." });
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    setValidate({ status: null, message: "" });
    if (props.text.title === "Add") {
      const user = new User("", username, password, role);
      await dispatch(createUser(user)).unwrap();
    } else {
      const updatedUser = new User(user?.id || "", username, password, role);
      dispatch(updateUser(updatedUser)).unwrap();
    }

    setUsername("");
    setPassword("");
    setRePassword("");
    setRole("");
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
            <div className="modal-body" style={{ height: "300px" }}>
              <div className="row">
                <div className="col-12">
                  <label>User Name</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    className={
                      validate?.status && validate.status === 1
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {validate?.status && validate.status === 1 && (
                    <label className="text-danger fw-bold">
                      {validate.message}
                    </label>
                  )}
                </div>
                <div className="col-12">
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    className={
                      validate?.status && validate.status === 2
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {validate?.status && validate.status === 2 && (
                    <label className="text-danger fw-bold">
                      {validate.message}
                    </label>
                  )}
                </div>

                <div className="col-12">
                  <label>Password</label>
                  <input
                    onChange={(e) => setRePassword(e.target.value)}
                    value={rePassword}
                    type="password"
                    className={
                      validate?.status && validate.status === 3
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  />
                  {validate?.status && validate.status === 3 && (
                    <label className="text-danger fw-bold">
                      {validate.message}
                    </label>
                  )}
                </div>

                <div className="col-12">
                  <label>Role</label>
                  <select
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                    className={
                      validate?.status && validate.status === 4
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                  >
                    <option value="" selected disabled>
                      Select a role
                    </option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SCIENTIST">SCIENTIST</option>
                  </select>
                  {validate?.status && validate.status === 4 && (
                    <label className="text-danger fw-bold">
                      {validate.message}
                    </label>
                  )}
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
