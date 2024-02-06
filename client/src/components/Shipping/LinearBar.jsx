import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearDeterminate({ targetValue }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= targetValue) {
          clearInterval(timer);
          return targetValue;
        }
        return Math.min(oldProgress + 10, targetValue);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [targetValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" color='secondary' value={progress} />
    </Box>
  );
}