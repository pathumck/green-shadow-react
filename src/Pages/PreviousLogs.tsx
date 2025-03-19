import PageTitle from "../Components/PageTitle/PageTitle";
import { SiReadthedocs } from "react-icons/si";
import PreviousLogsTable from "../Components/PreviousLogsTable/PreviousLogsTable";
import NavBar from "../Components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function PreviousLogs() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  return (
    <>
      <NavBar />
      <PageTitle
        title="Previous Logs"
        icon={<SiReadthedocs className="align-baseline" size={22} />}
      />
      <PreviousLogsTable />
    </>
  );
}

export default PreviousLogs;
