import React from 'react';

import Header from './components/Header';
import ClassCard from './components/ClassCard';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';

function App() {
  const theme = useTheme();

  const [classes, setClasses] = React.useState([]);

  React.useEffect(() => {
    fetch('https://daigler20.addu.edu.ph/webservice/rest/server.php?wstoken=94af31d03904c082e05c8066bc504e55&wsfunction=core_enrol_get_users_courses&userid=1039&moodlewsrestformat=json')
      .then(response => response.json())
      .then(data => {
        setClasses(data);
      })
  }, []);

  const ClassList = () => classes.map((entry) => {
    return (
      <Grid item key={entry.id}>
        <ClassCard
          classId={entry.id}
          classImage={entry.overviewfiles && entry.overviewfiles.length ? `${entry.overviewfiles[0].fileurl}?token=94af31d03904c082e05c8066bc504e55` : "/defaultImage.png"}
          classTitle={entry.displayname}
          classCode={entry.shortname}
        />
      </Grid>
    );
  })

  return (
    <div style={{ overflowX: 'hidden' }}>
      <Header />
      <Grid container spacing={2} style={{ margin: theme.spacing(2) }} alignItems="center">
        <ClassList />
      </Grid>
    </div>
  );
}

export default App;
