import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { Site, listSites } from '../lib/api';

export default function SitesList() {
  const [sites, setSites] = useState<Site[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSites = async () => {
    setIsLoading(true);
    try {
      const data = await listSites();
      console.log('Fetched sites data:', data); // Debug log
      setSites(data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      setSites([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleList = async () => {
    const newVisibleState = !isVisible;
    setIsVisible(newVisibleState);
    if (newVisibleState) {
      await fetchSites();
    }
  };

  // Refresh sites when component receives a new key
  useEffect(() => {
    if (isVisible) {
      fetchSites();
    }
  }, [isVisible]);

  return (
    <Box sx={{ mb: 4 }}>
      <Button 
        variant="outlined" 
        onClick={handleToggleList}
        sx={{ mb: 2 }}
      >
        {isVisible ? 'Hide Monitored Sites' : 'Show Monitored Sites'}
      </Button>

      {isLoading && <Typography>Loading...</Typography>}

      {isVisible && !isLoading && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>URL</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites.length > 0 ? (
                  sites.map((site) => (
                    <TableRow key={site.id}>
                      <TableCell>{site.id}</TableCell>
                      <TableCell>{site.url}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No sites found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Debug Panel */}
          <Box sx={{ mt: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
            <pre style={{ margin: 0 }}>
              {JSON.stringify({
                sitesCount: sites.length,
                isLoading,
                isVisible,
                sites: sites
              }, null, 2)}
            </pre>
          </Box>
        </>
      )}
    </Box>
  );
}