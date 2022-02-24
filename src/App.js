import { useEffect } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Warehouses from "./components/Warehouses/Warehouses";
import { getDatabase, ref, get, child } from "firebase/database";
import { warehouseAction } from "./store/store";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import IndividualWarehouse from "./components/IndividualWarehouse/IndividualWarehouse";

function App() {
  const dispatch = useDispatch();

  /**fetching warehouse data and updating appwide state*/
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `warehouse/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          dispatch(warehouseAction.updateWarehouses(data));
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
      <Route path="/">
        <Navigation />
      </Route>
      <Route path="/" exact>
        <Warehouses />
      </Route>
      <Route path="/warehouse/:id">
        <IndividualWarehouse />
      </Route>
    </div>
  );
}

export default App;
