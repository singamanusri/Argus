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
  const [alertStatus, setAlertStatus] = useState({});
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
    <div style={{
      backgroundColor: "#0A0E14",
      color: "#E6EDF3",
      minHeight: "100vh",
      padding: "40px 20px",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "48px", margin: "0 0 10px 0" }}>Argus</h1>
        <p style={{ color: "#8B949E", margin: "0 0 20px 0" }}>A hundred eyes. Zero blind spots.</p>
        <h2 style={{ fontSize: "20px", fontWeight: "600" }}>Alerts</h2>
      </div>

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
            borderRadius: "8px",
            padding: "16px 20px",
            margin: "12px 0",
            cursor: "pointer",
            backgroundColor: "#12161F",
            textAlign: "center",
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
 <div style={{
  marginTop: "20px",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #2A2F3A",
  backgroundColor: "#12161F",
}}>
   
    <h3>Alert Details</h3>
          <p>ID: {selectedAlert.id}</p>
          <p>Title: {selectedAlert.title}</p>
          <p>Severity: {selectedAlert.severity}</p>
          <p>IOC: {selectedAlert.ioc}</p>
          <p>Status: {alertStatus[selectedAlert.id] || "open"}</p>
<div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
  <button
    onClick={() => setAlertStatus({ ...alertStatus, [selectedAlert.id]: "resolved" })}
    style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #3FB950", backgroundColor: "transparent", color: "#3FB950", cursor: "pointer" }}
  >
    Mark Resolved
  </button>
  <button
    onClick={() => setAlertStatus({ ...alertStatus, [selectedAlert.id]: "escalated" })}
    style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #E5484D", backgroundColor: "transparent", color: "#E5484D", cursor: "pointer" }}
  >
    Escalate to L2
  </button>
</div>
        </div>
      )}

      {ipReport && (
        <div style={{ marginTop: "10px" }}>
          <p>Abuse Confidence Score: {ipReport.abuseConfidenceScore}%</p>
          <p>Total Reports: {ipReport.totalReports}</p>
          <p>Country: {ipReport.countryCode}</p>
          <p>ISP: {ipReport.isp}</p>
          <p>Tor Exit Node: {ipReport.isTor ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default App;