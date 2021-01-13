import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  blackSheet: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    height: '100%',
    padding: theme.spacing(2),
    color: 'white'
  }
}));

export default function CardHead({ image, height, width, classTitle, classCode, classProf }) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root} style={{ height: height || 'auto', width: width || '100%', backgroundImage: `url("${image}")` }}>
      <div className={classes.blackSheet}>
        <Typography
          variant="h6"
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          dangerouslySetInnerHTML={{ __html: classTitle }}
        />
        <Typography
          variant="caption"
          component="p"
          style={{ marginBottom: theme.spacing(2) }}
          dangerouslySetInnerHTML={{ __html: classCode }}
        />
        <Typography variant="subtitle2">{classProf}</Typography>
      </div>
    </div>
  );
}