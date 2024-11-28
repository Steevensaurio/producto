import Menu from "../components/Menu";
import NavBar from "../components/Molecules/NavBar";

const Home = () => {
    return (
        <div className="flex flex-col h-screen">
          <NavBar />
          <div className="flex flex-1 overflow-hidden">
            <Menu />
            <div className="flex-1 overflow-auto">
                <h1>Hola Mundo</h1>
            </div>
          </div>
        </div>
      );
}

export default Home