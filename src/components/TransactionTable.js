import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import moment from 'moment';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  TableContainer,
  Paper,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    dateRange: '',
    type: '',
    status: '',
    search: '',
    startDate: '',
    endDate: '',
    sortField: 'date',
    sortOrder: 'desc',
  });
  const [pagination, setPagination] = useState({
    totalTransactions: 0,
    totalPages: 0,
  });
  const [error, setError] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const fetchTransactions = () => {
    if (filters.search) {
      // Fetch transaction by ID
      axios
        .get(`/transactions/${filters.search}`)
        .then((response) => {
          setTransactions([response.data]); 
          setPagination({
            totalTransactions: 1,
            totalPages: 1,
          });
          setError('');
        })
        .catch((error) => {
          console.error('Error fetching transaction by ID:', error);
          setTransactions([]); // Clear the table
          if (error.response && error.response.status === 404) {
            setError('Transaction not found.');
          } else {
            setError('Failed to load transaction. Please try again.');
          }
        });
    } else {
      const params = {
        page: filters.page,
        limit: filters.limit,
        sortField: filters.sortField,
        sortOrder: filters.sortOrder,
      };

      if (filters.type) params.type = filters.type;
      if (filters.status) params.status = filters.status;
      if (filters.startDate || filters.endDate) {
        params.dateRange = `${filters.startDate || ''},${filters.endDate || ''}`;
      }

      axios
        .get('/transactions', { params })
        .then((response) => {
          setTransactions(response.data.transactions);
          setPagination({
            totalTransactions: response.data.totalTransactions,
            totalPages: response.data.totalPages,
          });
          setError('');
        })
        .catch((error) => {
          console.error('Error fetching transactions:', error);
          setError('Failed to load transactions. Please try again.');
        });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, 
    }));
  };

  const handleDateChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1,
    }));
  };

  const handlePageChange = (event, newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage + 1,
    }));
  };

  const handleRowsPerPageChange = (event) => {
    setFilters((prev) => ({
      ...prev,
      limit: parseInt(event.target.value, 10),
      page: 1,
    }));
  };

  const handleSort = (field) => {
    setFilters((prev) => ({
      ...prev,
      sortField: field,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  };

  return (
    <div className="transaction-table">
      <h3>Transactions</h3>
      {/* Filters */}
      <Grid container spacing={2} className="filters">
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Search by ID"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth disabled={!!filters.search}>
            <InputLabel>Type</InputLabel>
            <Select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              label="Type"
            >
              <MenuItem value="">All Types</MenuItem>
              <MenuItem value="credit">Credit</MenuItem>
              <MenuItem value="debit">Debit</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth disabled={!!filters.search}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              label="Status"
            >
              <MenuItem value="">All Statuses</MenuItem>
              <MenuItem value="successful">Successful</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} md={1.5}>
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            value={filters.startDate}
            fullWidth
            disabled={!!filters.search}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={1.5}>
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            value={filters.endDate}
            fullWidth
            disabled={!!filters.search} 
          />
        </Grid>
      </Grid>
      {error && <div className="error">{error}</div>}
      {/* Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '20px' }}>
        <TableContainer
          sx={{
            maxHeight: 440,
            overflowX: 'auto',
          }}
        >
          <Table
            stickyHeader
            aria-label="transactions table"
            sx={{
              minWidth: isMobile ? 600 : 'auto',
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  onClick={() => handleSort('_id')}
                  style={{
                    minWidth: 150,
                    cursor: 'pointer',
                    backgroundColor: '#343a40',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  ID{' '}
                  {filters.sortField === '_id'
                    ? filters.sortOrder === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('amount')}
                  style={{
                    minWidth: 150,
                    cursor: 'pointer',
                    backgroundColor: '#343a40',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  Amount{' '}
                  {filters.sortField === 'amount'
                    ? filters.sortOrder === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </TableCell>
                <TableCell
                  onClick={() => handleSort('date')}
                  style={{
                    minWidth: 150,
                    cursor: 'pointer',
                    backgroundColor: '#343a40',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  Date{' '}
                  {filters.sortField === 'date'
                    ? filters.sortOrder === 'asc'
                      ? '↑'
                      : '↓'
                    : ''}
                </TableCell>
                <TableCell
                  style={{
                    minWidth: 150,
                    backgroundColor: '#343a40',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  style={{
                    minWidth: 150,
                    backgroundColor: '#343a40',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={tx._id}>
                  <TableCell style={{ minWidth: 150 }}>
                    <Link to={`/transactions/${tx._id}`}>{tx._id}</Link>
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>{tx.amount}</TableCell>
                  <TableCell style={{ minWidth: 150 }}>
                    {moment(tx.date).format('YYYY-MM-DD')}
                  </TableCell>
                  <TableCell style={{ minWidth: 150 }}>{tx.type}</TableCell>
                  <TableCell style={{ minWidth: 150 }}>{tx.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!filters.search && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pagination.totalTransactions}
            rowsPerPage={filters.limit}
            page={filters.page - 1}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Paper>
    </div>
  );
}

export default TransactionTable;
