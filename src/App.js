import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";

import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import * as types from "./redux/actionTypes";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const cardStyles = makeStyles((theme) => ({
  root: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "45ch",
    },
  },
}));
const gridStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
function App() {
  const classes = useStyles();
  const grid = gridStyles();
  const cardStyle = cardStyles();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [expanded, setExpanded] = useState(false);
  const [cardValue, setCardValue] = useState("");
  const { recipes } = useSelector((state) => state.data);
  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query });
  }, [query]);
  const handleExpandClick = (i) => {
    setExpanded(!expanded);
    setCardValue(i);
  };
  return (
    <div className="App">
      <p>Recipe</p>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ width: "88px", height: "55px" }}
          onClick={updateSearch}
        >
          Search
        </Button>
      </form>
      <Grid container className={grid.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((item, i) => (
                <Grid key={i} item>
                  <Card className={cardStyle.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={cardStyle.avatar}
                        >
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.recipe.label}
                      subheader={
                        <span>
                          <DirectionsRunIcon />
                          {item.recipe.calories}
                        </span>
                      }
                    />
                    <CardMedia
                      className={cardStyle.media}
                      image={item.recipe.image}
                      title={item.recipe.calories}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      ></Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <IconButton
                        className={clsx(cardStyle.expand, {
                          [cardStyle.expandOpen]: expanded,
                        })}
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={i === cardValue && expanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph variant="h5">Ingredient:</Typography>
                        {item.recipe.ingredients.map((item)=>(
                          <Typography paragraph>{item.text}</Typography>
                        ))}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
