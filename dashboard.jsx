import "./Dashboard.css";
import Navbar from "./Navbar";

function CounselorDashboard() {
    return (
        <>
        <Navbar />

            <div className="Dashboard-interface">
                <h1 className="DashHeader">Counselor Dashboard</h1>
                <div className="Activity-Btns">
                    <button className="Activity-Btn">Student Reports</button>
                    <button className="Activity-Btn">View Student</button>
                    <button className="Activity-Btn">Mark Attendance</button>
                </div>
            </div>
        </>
    );
};

export default CounselorDashboard;