import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { fetchLogs } from "../../redux/slices/logSlice";

function PreviousLogsTable() {
  const allLogs = useSelector((state: RootState) => state.logs);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);
  return (
    <>
      <div
        className="container-fluid"
        style={{ height: "400px", maxHeight: "400px", overflowY: "scroll" }}
      >
        <table className="table mt-1 table-striped table-bordered">
          <thead className="table-dark sticky-top" style={{zIndex: 999}}>
            <tr className="text-center">
              <th scope="col">#</th>
              <th scope="col">Log Id</th>
              <th scope="col">Date</th>
              <th scope="col">User Id</th>
              <th scope="col">Field Id</th>
              <th scope="col">Crop Id</th>
              <th scope="col">Observed Image</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {allLogs.map((log, index) => (
              <tr className="text-center fw-bold" key={index}>
                <td>{index + 1}</td>
                <td>{log.id}</td>
                <td>{log.date}</td>
                <td>{log.userId}</td>
                <td>{log.fieldId}</td>
                <td>{log.cropId}</td>
                <td>
                  {
                    <img
                      src={log.image}
                      alt="Crop Image"
                      width="150px"
                      height="100px"
                    />
                  }
                </td>
                <td>{log.description}</td>
                <td>{log.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PreviousLogsTable;
