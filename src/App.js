import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Warehouses from "./components/Warehouses/Warehouses";
import { getDatabase, ref, get, child } from "firebase/database";
import { warehouseAction } from "./store/store";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `warehouse/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch(warehouseAction.updateWarehouses(data));
          console.log(data);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
        window.location.reload();
      });
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <Warehouses />
    </div>
  );
}

export default App;
