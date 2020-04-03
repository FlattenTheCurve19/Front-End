import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  return (
      <div className="aboutContainer">
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="src/images/aja.png"
          title="aja"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Aja Blanco
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Front End Developer
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          View Portfolio
        </Button>
      </CardActions>
    </Card>

    <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="src/images/anthony.png"
            title="anthony"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Anthony Kawa
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Front End Developer
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            View Portfolio
          </Button>
        </CardActions>
      </Card>

    <Card className={classes.root}>
    <CardActionArea>
    <CardMedia
        className={classes.media}
        image="src/images/chris.png"
        title="chris"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        Christopher Giroux
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Front End Developer
        </Typography>
    </CardContent>
    </CardActionArea>
    <CardActions>
    <Button size="small" color="primary">
        View Portfolio
    </Button>
    </CardActions>
    </Card>

<Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/dustin.png"
    title="dustin"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Dustin Meyers
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Project Lead
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>

<Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/dylan.png"
    title="dylan"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Dylan Collins
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>


<Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/josiah.png"
    title="josiah"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Josiah Roa
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>


<Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/rudy.png"
    title="rudy"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Rudy Goldhaber
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>
    
<Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/shun.png"
    title="shun"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Shun Chiang
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>
    
    <Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="src/images/suffyan.png"
    title="suffyan"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Suffyan Tariq
    </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="small" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>
</div>
  );
}