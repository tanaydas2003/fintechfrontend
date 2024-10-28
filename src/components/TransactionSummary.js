// src/components/TransactionSummary.js
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { Grid, Paper, Typography } from '@mui/material';

function TransactionSummary() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios
      .get('/summary')
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.error('Error fetching summary:', error);
      });
  }, []);

  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className="transaction-summary">
      <Typography variant="h4" gutterBottom>
        Transaction Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="summary-card">
            <Typography variant="h6">Total Volume</Typography>
            <Typography variant="h5">{summary.totalVolume}</Typography>
          </Paper>
        </Grid>
        {/* Repeat for other metrics */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="summary-card">
            <Typography variant="h6">Average Amount</Typography>
            <Typography variant="h5">{summary.averageAmount.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} className="summary-card">
            <Typography variant="h6">Total Transactions</Typography>
            <Typography variant="h5">{summary.totalTransactions}</Typography>
          </Paper>
        </Grid>
        {/* Add cards for successCount, pendingCount, failedCount */}
      </Grid>
    </div>
  );
}

export default TransactionSummary;
