import React, { useEffect, useReducer, useState } from "react";
import classes from "./IndividualWarehouse.module.css";
import { Typography, makeStyles, TextField, Button } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { Edit } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
const db = getDatabase();

const useStyle = makeStyles({
  warehouseCard: {
    margin: "auto",
    marginTop: "50px",
    // width: "400px",
    padding: "5px",
    textAlign: "left",
    cursor: "pointer",
    boxShadow: "0px 5px 5px rgba(0,0,0,.2)",
  },
  innercard: {
    borderRadius: "4px",
    boxShadow: " 0px 2px 7px rgba(0, 0, 0, 0.2)",
    transition: "all .2s",
    "&:active": {
      boxShadow: " 0px 1px 5px rgba(0, 0, 0, 0.1)",
    },
  },
  profileDataFieldKey: {
    width: "max-content",
    marginRight: 30,
    fontWeight: 500,
  },
  textField: {
    "& > *": {
      "&> *": {
        fontWeight: 300,
      },
    },
  },
  noPointerEvent: {
    pointerEvents: "none",
  },
  editIcon: {
    fill: "#fff",
  },
  btn: {
    textTransform: "capitalize",
    "&:hover": {
      boxShadow: "1px 3px 5px rgba(0,0,0,.1)",
    },
    "&:active": {
      boxShadow: "none",
    },
  },
  activeIcon: {
    boxShadow: "none",
    backgroundImage:
      "linear-gradient(to right bottom, #ebe2e6, #f8f1f4, #e2e2e2)",
    transition: "all .3s",
    "& > svg": {
      fill: "#000",
    },
    "&:hover": {
      boxShadow: "none",
    },
    "&:avtive": {
      boxShadow: "none",
    },
  },
});

const warehouseReducerFn = (state, action) => {
  if (action.type === "replaceData") {
    return {
      name: action.data.name,
      code: action.data.code,
      city: action.data.city,
      cluster: action.data.cluster,
      space_available: action.data.space_available,
      id: action.data.id,
      is_live: action.data.is_live,
      is_registered: action.data.is_registered,
      type: action.data.type,
    };
  }
  if (action.type === "name") {
    return { ...state, name: action.value };
  }
  if (action.type === "code") {
    return { ...state, code: action.value };
  }
  if (action.type === "city") {
    return { ...state, city: action.value };
  }
  if (action.type === "cluster") {
    return { ...state, cluster: action.value };
  }
  if (action.type === "space_available") {
    return { ...state, space_available: action.value };
  }
};

const IndividualWarehouse = () => {
  const style = useStyle();
  const params = useParams();
  const [warehouseState, dispatchWarehouseUpdateFn] = useReducer(
    warehouseReducerFn,
    false
  );
  const [isChangesAllow, setIsChangesAllow] = useState(false);
  const [doesDataChanged, setdoesDataChanged] = useState(false);
  const [warehousePrevData, setWarehousePrevData] = useState(warehouseState);
  const specificWarehouseInfo = useSelector(
    (state) => state.warehouses.warehouses
  );

  useEffect(() => {
    if (specificWarehouseInfo.length === 0) return;
    const fetchedData = specificWarehouseInfo
      .filter((item) => item.id == params.id)
      .pop();
    fetchedData &&
      dispatchWarehouseUpdateFn({ type: "replaceData", data: fetchedData });
    setWarehousePrevData(fetchedData);
  }, [specificWarehouseInfo.length]);

  console.log("specific");

  const arrayOfFields = ["name", "code", "city", "cluster", "space_available"];

  console.log(warehousePrevData);

  const saveChangesHandler = () => {
    setWarehousePrevData(warehouseState);
    setIsChangesAllow(false);
    const id = warehouseState.id - 1;
    const updateWarehouseData = async () => {
      set(ref(db, "warehouse/" + id), warehouseState)
        .then(() => {
          // Data saved successfully!
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          // The write failed...
          console.log("The write failed...");
        });
    };
    updateWarehouseData();
  };
  const cancelChangesHandler = () => {
    setIsChangesAllow(false);
    dispatchWarehouseUpdateFn({ type: "replaceData", data: warehousePrevData });
  };

  const onTextFieldChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setdoesDataChanged(true);

    dispatchWarehouseUpdateFn({ type: key, value: value });
  };

  return (
    <section>
      <div className={`${classes.box} ${classes.userInfoContainer}`}>
        {!isChangesAllow && (
          <span
            className={`${classes.editIcon} ${
              isChangesAllow ? style.activeIcon : ""
            }`}
            onClick={() => {
              setIsChangesAllow(true);
            }}
          >
            <Edit className={style.editIcon} />
          </span>
        )}

        {/* text fields */}
        {arrayOfFields.map((field) => {
          return (
            <div key={field} className={classes.profileDataField}>
              <Typography className={style.profileDataFieldKey} variant="body1">
                {field.replace("_", " ")} :
              </Typography>
              <TextField
                id={field}
                type="text"
                className={`${style.textField} ${
                  !isChangesAllow ? style.noPointerEvent : ""
                }`}
                value={warehouseState[field]}
                variant="outlined"
                size="small"
                onChange={onTextFieldChange}
                disabled={field === "email" ? true : !isChangesAllow}
              />
            </div>
          );
        })}

        {isChangesAllow && (
          <div className={classes.userProfileInfoBtn}>
            <Button
              variant="contained"
              disableElevation
              className={style.btn}
              color="primary"
              disabled={!doesDataChanged}
              onClick={saveChangesHandler}
            >
              Save Changes
            </Button>
            <Button
              variant="contained"
              disableElevation
              className={style.btn}
              color="secondary"
              onClick={cancelChangesHandler}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default IndividualWarehouse;
