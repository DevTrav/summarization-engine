import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Monitor, getStatus, checkMonitor } from '../lib/api';

export default function MonitorList() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  const fetchStatus = async () => {
    try {
      const data = await getStatus();
      // Ensure data is an array before setting it
      setMonitors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching monitors:', error);
      setMonitors([]);
    }
  };

  const handleCheck = async (id: string) => {
    try {
      await checkMonitor(id);
      fetchStatus(); // Refresh the list after checking
    } catch (error) {
      console.error('Error checking monitor:', error);
    }
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Checked</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(monitors) && monitors.map((monitor) => (
            <TableRow key={monitor.id}>
              <TableCell>{monitor.name}</TableCell>
              <TableCell>{monitor.url}</TableCell>
              <TableCell>{monitor.status}</TableCell>
              <TableCell>{new Date(monitor.lastChecked).toLocaleString()}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleCheck(monitor.id)}>
                  <RefreshIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}