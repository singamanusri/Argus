import { useState } from "react";
function getColor(severity) {
  if (severity === "critical") return "red";
  if (severity === "medium") return "orange";
  if (severity === "low") return "green";
  return "gray";
}

function App() {
const [selectedAlert, setSelectedAlert] = useState(null);
const [ipReport, setIpReport] = useState(null);
  const alerts = [
     {
      id: "ALT-1001",
      title: "Unusual login time detected",
      severity: "critical",
      ioc: "185.220.101.47",
    },
    {
      id: "ALT-1002",
      title: "Multiple failed login attempts",
      severity: "medium",
      ioc: "user: r.mehta",
    },
    {
      id: "ALT-1003",
      title: "New device connected to network",
      severity: "low",
      ioc: "AA:BB:CC:11:22:33",
    },
  ];
async function checkIP(ip) {
  const response = await fetch(`/api/check-ip?ip=${ip}`);
  const data = await response.json();
  setIpReport(data.data);
}
  return (
    <div>
      <h1>Argus</h1>
      <p>A hundred eyes. Zero blind spots.</p>

      <h2>Alerts</h2>
      {alerts.map((alert) => (
  <div
    key={alert.id}
    onClick={() => {
      setSelectedAlert(alert);
      setIpReport(null);
      if (alert.iocType === "ip" || /^\d+\.\d+\.\d+\.\d+$/.test(alert.ioc)) {
        checkIP(alert.ioc);
      }
    }}
    style={{
      border: "1px solid " + getColor(alert.severity),
      padding: "10px",
      margin: "10px 0",
      cursor: "pointer",
    }}
  >
    <p>{alert.title}</p>
    <p style={{ color: getColor(alert.severity) }}>
      Severity: {alert.severity}
    </p>
    <p>IOC: {alert.ioc}</p>
  </div>
))}
          
      {selectedAlert && (
  <div style={{ marginTop: "20px", padding: "10px", border: "2px solid white" }}>
    <h3>Alert Details</h3>
    <p>ID: {selectedAlert.id}</p>
    <p>Title: {selectedAlert.title}</p>
    <p>Severity: {selectedAlert.severity}</p>
    <p>IOC: {selectedAlert.ioc}</p>
  </div>
)}
    </div>
  );
}

export default App;