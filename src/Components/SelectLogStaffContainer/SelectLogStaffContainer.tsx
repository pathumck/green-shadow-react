import "./SelectLogStaffContainer.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { updateUserId } from "../../redux/slices/logDataSlice";

function SelectLogStaffContainer() {
  const dispatch = useDispatch<AppDispatch>();
  dispatch(updateUserId(localStorage.getItem("userId")));
  const userId = useSelector((state: RootState) => state.logData.userId);
  return (
    <>
      <h6 className="log-staff-id-title fw-bold">User ID : {userId}</h6>
    </>
  );
}

export default SelectLogStaffContainer;
