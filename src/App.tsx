import { useState } from 'react';
import './App.scss';
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

  const changeMode = (newMode: ModeEnum) => {
    setMode(newMode);
  };

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
        <img
          src="/clock-svgrepo-com.svg"
          alt="Clock"
          className={mode === ModeEnum.Clock ? 'active' : undefined}
          onClick={() => changeMode(ModeEnum.Clock)}
        />
        <img
          src="/stopwatch-svgrepo-com.svg"
          alt="Stop_Watch"
          className={mode === ModeEnum.StopWatch ? 'active' : undefined}
          onClick={() => changeMode(ModeEnum.StopWatch)}
        />
        <img
          src="/timer-svgrepo-com.svg"
          alt="Timer"
          className={mode === ModeEnum.Timer ? 'active' : undefined}
          onClick={() => changeMode(ModeEnum.Timer)}
        />
      </header>

      <div className="main">{getModeContent()}</div>
    </div>
  );
}

export default App;
