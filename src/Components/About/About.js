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

    
      
<div className="aboutContainer" style={{display: "flex", flexWrap:"wrap", justifyContent: "space-between", margin: "2%"}}>
    <div style={{width: "100%", display: "flex", justifyContent:"center", marginBottom: "2%"}}>
    <h1 style={{textAlign:"center", fontSize:"2.5rem"}}>
        Meet the Team
    </h1>

    </div>
    
    <div className="firstFive" style={{display:"flex", justifyContent:"space-evenly", width:"100%", marginBottom: "2%"}}>

        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image="https://i.ibb.co/bNGHS3B/Screen-Shot-2020-04-03-at-4-10-14-PM.png"
            title="aja"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                Aja
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Blanco
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Front End Developer
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
           UX/UI Designer
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="large" color="primary" onClick={() => window.open('https://ajablanco.me')}>
            View Portfolio
            </Button>
        </CardActions>
        </Card>

        <Card className={classes.root}>
            <CardActionArea>
            <CardMedia
                className={classes.media}
                image="https://i.ibb.co/Lg9GTkT/Screen-Shot-2020-04-03-at-4-08-42-PM.png"
                title="anthony"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                Anthony
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                Kawa
                 </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                Front End Developer
                </Typography>
            </CardContent>
            </CardActionArea>
            <CardActions>
            <Button size="large" color="primary">
                View Portfolio
            </Button>
            </CardActions>
        </Card>

        <Card className={classes.root}>
    <CardActionArea>
    <CardMedia
        className={classes.media}
        image="https://i.ibb.co/87j9C3V/Screen-Shot-2020-04-03-at-4-08-48-PM.png"
        title="chris"
    />
    <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        Christopher
        </Typography>
        <Typography gutterBottom variant="h5" component="h2">
                Giroux
            </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Front End Developer
        </Typography>
    </CardContent>
    </CardActionArea>
    <CardActions>
    <Button size="large" color="primary">
        View Portfolio
    </Button>
    </CardActions>
    </Card>



        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://i.ibb.co/ftN52rV/Screen-Shot-2020-04-03-at-4-09-12-PM.png"
            title="dustin"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Dustin
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Meyers
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Project Lead
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="large" color="primary">
            View Portfolio
        </Button>
        </CardActions>
        </Card>

        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://i.ibb.co/D9kKx23/Screen-Shot-2020-04-03-at-4-09-18-PM.png"
            title="dylan"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Dylan 
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Collins
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Front End Developer
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="large" color="primary">
            View Portfolio
        </Button>
        </CardActions>
        </Card>


        
    </div>

    <div className="secondFive" style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>    
        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://i.ibb.co/56FwcGs/Screen-Shot-2020-04-03-at-4-08-54-PM.png"
            title="josiah"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Josiah
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Roa
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Front End Developer
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="large" color="primary">
            View Portfolio
        </Button>
        </CardActions>
        </Card>

        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://i.ibb.co/x1CXDz8/Screen-Shot-2020-04-03-at-4-09-00-PM.png"
            title="rudy"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Rudy
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Goldhaber
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Front End Developer
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="large" color="primary">
            View Portfolio
        </Button>
        </CardActions>
        </Card>
            
        <Card className={classes.root}>
        <CardActionArea>
        <CardMedia
            className={classes.media}
            image="https://i.ibb.co/wRJBNcx/Screen-Shot-2020-04-03-at-4-09-05-PM.png"
            title="shun"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            Shun
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
               Chiang
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            Front End Developer 
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
           UX/UI Designer
            </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Button size="large" color="primary">
            View Portfolio
        </Button>
        </CardActions>
        </Card>
            
        <Card className={classes.root}>
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="https://i.ibb.co/dWQpC8P/Screen-Shot-2020-04-03-at-4-09-25-PM.png"
    title="suffyan"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Suffyan
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
                Tariq
            </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
    UX/UI Designer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="large" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>
    
        <Card className={classes.root}>
   
<CardActionArea>
  <CardMedia
    className={classes.media}
    image="https://i.ibb.co/gVMsY7F/Screen-Shot-2020-04-03-at-5-07-03-PM.png"
    title="zahid"
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
      Zahid
    </Typography>
    <Typography gutterBottom variant="h5" component="h2">
                Khawaja
            </Typography>
    <Typography variant="body2" color="textSecondary" component="p">
      Front End Developer
    </Typography>
  </CardContent>
</CardActionArea>
<CardActions>
  <Button size="large" color="primary">
    View Portfolio
  </Button>
</CardActions>
</Card>
    </div>


</div>

  );    
}