import React from "react";
import classes from "./Warehouses.module.css";
import { Card, Typography, makeStyles } from "@material-ui/core";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  warehouseCard: {
    margin: "auto",
    // marginBottom: "20px",
    // width: "400px",
    padding: "5px",
    textAlign: "left",
    cursor: "pointer",
    transition: "all .2s",

    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 5px 5px rgba(0,0,0,.2)",
    },
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

const Warehouses = () => {
  const style = useStyle();
  const warehouseData = useSelector((state) => state.warehouses.warehouses);

  const warehouseNameSearch = useSelector(
    (state) => state.warehouseSearch.name
  );

  return (
    <section>
      <div className={classes.container}>
        <Grid container columnGap="50px" justifyContent="center" rowGap="40px">
          {warehouseData.length > 0 &&
            warehouseData.map((cur, i) => {
              return (
                cur.name
                  .toLowerCase()
                  .includes(warehouseNameSearch.toLowerCase()) && (
                  <Grid
                    key={i}
                    className={`${classes.gridInfoItem} ${style.innercard}`}
                    item
                    md={6}
                    sm={6}
                    xs={12}
                  >
                    <Card className={style.warehouseCard}>
                      <Link to={`/warehouse/${cur.id}`}>
                        <div>
                          <Typography>Name:{cur.name}</Typography>
                          <Typography>Code:{cur.code}</Typography>
                          <Typography>City:{cur.city}</Typography>
                          <Typography>Cluster:{cur.cluster}</Typography>
                          <Typography>
                            Space-Available:{cur.space_available}
                          </Typography>
                        </div>
                      </Link>
                    </Card>
                  </Grid>
                )
              );
            })}
        </Grid>
      </div>
    </section>
  );
};

export default Warehouses;
