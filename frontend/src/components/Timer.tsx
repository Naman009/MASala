
import { useState, useEffect } from 'react';

interface TimerProps {
  initialTime: number;
}

export function Timer({ initialTime }: TimerProps) {
  const [minutes, setMinutes] = useState(initialTime);
  
  // Format time to always show two digits
  const formatTime = (time: number): string => {
    return time.toString().padStart(2, '0');
  };

  return (
    <div className="flex items-center justify-center rounded-md px-4 py-2" style={{ backgroundColor: "#F9B872" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-food-green mr-2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span className="font-mono text-food-brown font-bold text-xl">
        {formatTime(minutes)} min
      </span>
    </div>
  );
}
