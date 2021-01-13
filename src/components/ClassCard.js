import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from './CardHead';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    width: 300,
    borderRadius: '0.5rem'
  },
});

export default function ClassCard({ classId, classTitle, classCode, classProf, classImage }) {
  const classes = useStyles();
  
  const [deadlines, setDeadlines] = React.useState([]);

  React.useEffect(() => {
    fetch(`https://daigler20.addu.edu.ph/webservice/rest/server.php?wstoken=94af31d03904c082e05c8066bc504e55&wsfunction=core_course_get_contents&courseid=${classId}&moodlewsrestformat=json`)
      .then(response => response.json())
      .then(data => {
        const includedMods = ['assign', 'quiz'];
        data.forEach((section) => {
          section.modules.forEach((module) => {
            if (module.completion === 0 && includedMods.includes(module.modname)) {
              setDeadlines((prev) => {
                if (!prev.find((x) => x.id === module.id)) {
                  return [...prev, module];
                }
                return prev;
              });
            }
          })
        })
      })
  }, [classId])

  return (
    <Card className={classes.root} variant="outlined">
      <CardActionArea>
        <CardMedia
          height={140}
          image={classImage}
          classTitle={classTitle}
          classCode={classCode}
          classProf={classProf}
        />
        <CardContent style={{ height: 170 }}>
          <ul style={{ margin: 0 }}>
            { deadlines.map((deadline) => (
              <Typography key={deadline.id} variant="body2" component="li">{deadline.name}</Typography>
            )) }
          </ul>
        </CardContent>
      </CardActionArea>
      <Divider />
      <CardActions>
        <Grid container justify="flex-end">
          <Grid item>
            <Button size="small" color="primary">
              Open Class
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}