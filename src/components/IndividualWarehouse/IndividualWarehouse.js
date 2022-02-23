import React from "react";
import classes from "./IndividualWarehouse.module.css";
import { useSelector } from "react-redux";
import { Card, Typography, makeStyles } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { warehouseInfo } from "../warehouseInfo";

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
});

const IndividualWarehouse = () => {
  const style = useStyle();
  const params = useParams();

  const items = warehouseInfo.filter((item) => item.id == params.id).pop();
  console.log(items);
  return (
    <section>
      <div className={classes.container}>
        {
          <Card className={style.warehouseCard}>
            <div>
              <Typography>Name:{items.name}</Typography>
              <Typography>Code:{items.code}</Typography>
              <Typography>City:{items.city}</Typography>
              <Typography>Cluster:{items.cluster}</Typography>
              <Typography>Space-Available:{items.space_available}</Typography>
            </div>
          </Card>
        }
      </div>
    </section>
  );
};

export default IndividualWarehouse;
