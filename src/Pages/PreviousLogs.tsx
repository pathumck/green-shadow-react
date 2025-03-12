import PageTitle from "../Components/PageTitle/PageTitle";
import { SiReadthedocs } from "react-icons/si";
import PreviousLogsTable from "../Components/PreviousLogsTable/PreviousLogsTable";
import NavBar from "../Components/NavBar/NavBar";
function PreviousLogs() {
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
