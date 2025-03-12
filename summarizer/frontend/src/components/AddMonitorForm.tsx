import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { addSite } from '../lib/api';

interface AddMonitorFormProps {
  onSuccess: () => void;
}

export default function AddMonitorForm({ onSuccess }: AddMonitorFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      await addSite({ url });
      setUrl('');
      onSuccess();
    } catch (error) {
      console.error('Error adding site:', error);
      setError('Failed to add site. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Site URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mr: 2 }}
        required
        placeholder="https://example.com"
      />
      <Button type="submit" variant="contained">
        Add Site to Monitor
      </Button>
      {error && (
        <Box color="error.main" sx={{ mt: 1 }}>
          {error}
        </Box>
      )}
    </Box>
  );
}