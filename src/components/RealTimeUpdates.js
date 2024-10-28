import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import moment from 'moment';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

function RealTimeUpdates() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchRecentTransactions();
    const interval = setInterval(fetchRecentTransactions, 5000); 

    return () => clearInterval(interval);
  }, []);

  const fetchRecentTransactions = () => {
    axios
      .get('/recent-transactions')
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recent transactions:', error);
      });
  };

  return (
    <div className="real-time-updates">
      <Typography variant="h4" gutterBottom>
        Recent Transactions
      </Typography>
      <List>
        {transactions.map((tx) => (
          <ListItem key={tx._id}>
            <ListItemText
              primary={`${tx.type.toUpperCase()} of ${tx.amount}`}
              secondary={moment(tx.date).format('YYYY-MM-DD HH:mm:ss')}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default RealTimeUpdates;
