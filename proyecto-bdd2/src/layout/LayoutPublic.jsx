import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const LayoutPublic = () => {
  return (
    <>
      <NavBar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutPublic;
