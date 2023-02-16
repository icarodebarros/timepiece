import { useEffect, useState } from 'react';

export default function Clock() {
  const [clockValue, setClockValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setClockValue(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='clock-container'>
      <h1>{clockValue.toLocaleTimeString()}</h1>
      <p>{clockValue.toLocaleDateString()}</p>
    </div>
  );
}
