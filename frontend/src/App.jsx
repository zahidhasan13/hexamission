import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="bg-slate-900 text-slate-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
