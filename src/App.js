import { Link } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <br></br><br></br>
      <Link to="/page1">Page 1</Link>
      <br></br><br></br>
      <Link to="/page2">Page 2</Link>

    </div>
  );
}

export default App;