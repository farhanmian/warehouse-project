import React, { useEffect, useState } from "react";
import classes from "./Warehouses.module.css";
import {
  Card,
  Typography,
  makeStyles,
  CardActionArea,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ClickAwayListener,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";

const useStyle = makeStyles({
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
  filterBtn: {
    padding: "5px 10px",
    boxShadow: "0 3px 3px rgba(0,0,0,.1)",
    "&:hover": {
      boxShadow: "0 3px 7px rgba(0,0,0,.2)",
    },
  },
  filterBtnText: {
    marginRight: 3,
  },
  arrowDownIcon: {
    transition: "all .2s",
  },
  rotate: {
    transform: "rotate(180deg)",
  },
  formControl: {
    width: 150,
    height: 30,
    "& >div": {
      marginTop: 0,
    },
  },
});

const Warehouses = () => {
  const style = useStyle();
  const warehouseData = useSelector((state) => state.warehouses.warehouses);
  const [showFilter, setShowFilter] = useState(false);
  const [filterData, setFilterData] = useState();
  const [city, setCity] = useState("");
  const [cluster, setCluster] = useState("");
  const [spaceAvailable, setSpaceAvailable] = useState("");

  const warehouseNameSearch = useSelector(
    (state) => state.warehouseSearch.name
  );

  useEffect(() => {
    const cityData = warehouseData.map((warehouse) => warehouse.city);
    const clusterData = warehouseData.map((warehouse) => warehouse.cluster);
    const spaceAvailableData = warehouseData.map(
      (warehouse) => warehouse.space_available
    );

    const data = {
      city: cityData,
      cluster: clusterData,
      space_available: spaceAvailableData,
    };
    setFilterData(data);
  }, [warehouseData]);

  const handleChange = (e, id) => {
    console.log(id);
    if (id === "city") {
      setCity(e.target.value);
    }
    if (id === "cluster") {
      setCluster(e.target.value);
    }
    if (id === "space_available") {
      setSpaceAvailable(e.target.value);
    }
  };

  return (
    <section className={classes.warehouses}>
      <div className={classes.innerContainer}>
        <div className={classes.warehouseFilterContainer}>
          <Button
            variant="contained"
            color="primary"
            className={style.filterBtn}
            disableElevation
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <Typography variant="subtitle1" className={style.filterBtnText}>
              Filter
            </Typography>
            <ArrowDropDown
              className={`${style.arrowDownIcon} ${
                showFilter ? style.rotate : ""
              }`}
            />
          </Button>

          {showFilter && (
            <div className={classes.filter}>
              {filterData &&
                Object.keys(filterData).map((data) => {
                  console.log(data);
                  return (
                    <div key={data} className={classes.filterItem}>
                      <Typography>{data} :</Typography>
                      <FormControl className={style.formControl}>
                        <Select
                          labelId="demo-simple-select-label"
                          value={
                            data === "space_available"
                              ? spaceAvailable
                              : data === "city"
                              ? city
                              : cluster
                          }
                          label="Age"
                          onChange={(e) => handleChange(e, data)}
                        >
                          <MenuItem id={data} value={""}>
                            All
                          </MenuItem>
                          {filterData[data].map((item, i) => {
                            return (
                              <MenuItem id={data} key={i} value={item}>
                                {item}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <Grid
          container
          rowGap="30px"
          columnGap="40px"
          justifyContent="center"
          className={classes.warehouseContainer}
        >
          {warehouseData.length > 0 ? (
            warehouseData.map((warehouse) => {
              return (
                warehouse.name
                  .toLowerCase()
                  .includes(warehouseNameSearch.toLowerCase()) &&
                warehouse.city.includes(city) &&
                warehouse.cluster.includes(cluster) &&
                warehouse.space_available
                  .toString()
                  .includes(spaceAvailable) && (
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
            })
          ) : (
            <Loading />
          )}
        </Grid>
      </div>
    </section>
  );
};

export default Warehouses;
