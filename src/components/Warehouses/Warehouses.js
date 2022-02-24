import React from "react";
import classes from "./Warehouses.module.css";
import {
  Card,
  Typography,
  makeStyles,
  CardActionArea,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  // warehouseCard: {
  //   margin: "auto",
  //   // marginBottom: "20px",
  //   // width: "400px",
  //   padding: "5px",
  //   textAlign: "left",
  //   cursor: "pointer",
  //   transition: "all .2s",

  //   "&:hover": {
  //     transform: "scale(1.05)",
  //     boxShadow: "0px 5px 5px rgba(0,0,0,.2)",
  //   },
  // },
  warehouseCard: {
    textAlign: "start",
    padding: 50,
    width: 200,
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 4px 10px rgba(0,0,0,.2)",
    },
  },
  cardActionArea: {
    color: "#ccc",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transition: "all .3s",

    "&:hover": {
      transform: "scale(1.03)",
      webkitTransform: "scale(1.03)",
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
    <section className={classes.warehouses}>
      <div className={classes.innerContainer}>
        <Grid
          container
          rowGap="30px"
          columnGap="40px"
          justifyContent="center"
          className={classes.warehouseContainer}
        >
          {warehouseData.length > 0 &&
            warehouseData.map((warehouse) => {
              return (
                warehouse.name
                  .toLowerCase()
                  .includes(warehouseNameSearch.toLowerCase()) && (
                  <Grid item key={warehouse.id}>
                    <Link
                      to={`/warehouse/${warehouse.id}`}
                      className={classes.warehouseLink}
                    >
                      <CardActionArea className={style.cardActionArea}>
                        <Card className={style.warehouseCard}>
                          <div>
                            <Typography variant="subtitle1">
                              Name:{warehouse.name}
                            </Typography>
                            <Typography variant="subtitle1">
                              Code:{warehouse.code}
                            </Typography>
                            <Typography variant="subtitle1">
                              City:{warehouse.city}
                            </Typography>
                            <Typography variant="subtitle1">
                              Cluster:{warehouse.cluster}
                            </Typography>
                            <Typography variant="subtitle1">
                              Space-Available:{warehouse.space_available}
                            </Typography>
                          </div>
                        </Card>
                      </CardActionArea>
                    </Link>
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

/*

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
                      <Link to={`/warehouse/${cur.id}`} className={classes.warehouseCardLink} >
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

        */
