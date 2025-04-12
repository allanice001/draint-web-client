import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import styles from './progress-bar.module.scss';

function LinearProgressWithLabel(props) {
  return (
    <Box
      display="flex"
      height="30px"
      alignItems="center"
      justifyContent="center"
    >
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" color="primary" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProgressBar({ progress = 0 }) {
  // const [progressCount, setProgress] = React.useState(progress);

  return (
    <div className={styles.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  );
}
