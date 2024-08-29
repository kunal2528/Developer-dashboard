import './App.css';
import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar';
import Sidebar from './pages/Sidebar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
