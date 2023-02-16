import { useState } from 'react';
import './App.css';
import Clock from './components/Clock';
import StopWatch from './components/StopWatch';
import Timer from './components/Timer';

enum ModeEnum {
  Clock,
  StopWatch,
  Timer,
}

function App() {
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.Clock);

  const getModeContent = () => {
    switch (mode) {
      case ModeEnum.StopWatch:
        return <StopWatch />;
      case ModeEnum.Timer:
        return <Timer />;
      default:
        return <Clock />;
    }
  };

  

  return (
    <div className="App">
      <header className="header">
        <img src="/clock-svgrepo-com.svg" alt="Clock" className="active" />
        <img src="/stopwatch-svgrepo-com.svg" alt="Stop_Watch" />
        <img src="/timer-svgrepo-com.svg" alt="Timer" />
      </header>

      {getModeContent()}
    </div>
  );
}

export default App;
