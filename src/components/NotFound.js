import React from 'react';
import { Typography } from '@mui/material';

function NotFound() {
  return (
    <div className="not-found">
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you're looking for doesn't exist.
      </Typography>
    </div>
  );
}

export default NotFound;
