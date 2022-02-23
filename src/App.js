import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Warehouses from "./components/Warehouses/Warehouses";

function App() {
  // useEffect(() => {
  //   fetch("https://drive.google.com/file/d/1lePlZg-_dXxq4u7Zwt_AFcNm4ryypfTJ")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  return (
    <div className="App">
      <Navigation />
      <Warehouses />
    </div>
  );
}

export default App;
