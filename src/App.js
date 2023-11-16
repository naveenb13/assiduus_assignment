import logo from './logo.svg';
import './App.css';
import Routes from './routes';
import { ThemeProvider } from '@mui/material';
import Theme from './theme';
import './assets/css/custom.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={Theme}>
        <Routes />
      </ThemeProvider>
    </div>
  );
}

export default App;
