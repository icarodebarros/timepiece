import { useState } from 'react';
import './App.css';
import Clock from './components/clock';

enum ModeEnum {
  Clock,
  StopWatch,
  Timer,
}

function App() {
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.Clock);

  const getModeContent = () => {
    switch(mode) {
      // case ModeEnum.StopWatch: return <StopWatch />;
      // case ModeEnum.Timer: return <Timer />;
      default: return <Clock />;
    }
  }

  return <div className="App">{getModeContent()}</div>;
}

export default App;
