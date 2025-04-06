import React from 'react';
import './LogsModal.css'; // optional, for styling

const LogsModal = ({ logs, fullJson, onClose }) => {
  const handleViewRaw = () => {
    const blob = new Blob([JSON.stringify(fullJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agent Logs</h2>
        <div className="logs-container">
          {logs.map((log, index) => (
            <div key={index} className="log-card">
              <h3>Log #{index + 1}</h3>
              <p><strong>Name:</strong> {log.name}</p>
              <p><strong>Status:</strong> {log.status}</p>
              <p><strong>Latency:</strong> {log.latency}s</p>
              <p><strong>Run Type:</strong> {log.run_type}</p>
              <p><strong>Start:</strong> {log.start_time}</p>
              <p><strong>End:</strong> {log.end_time}</p>
              <p><strong>Input:</strong> <pre>{JSON.stringify(log.input, null, 2)}</pre></p>
              <p><strong>Output:</strong> <pre>{JSON.stringify(log.output, null, 2)}</pre></p>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button onClick={handleViewRaw}>View Raw JSON</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LogsModal;
