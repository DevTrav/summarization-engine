import { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { createPing } from '../lib/api';

interface AddMonitorFormProps {
  onSuccess: () => void;
}

export default function AddMonitorForm({ onSuccess }: AddMonitorFormProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createPing({ name, url });
    setName('');
    setUrl('');
    onSuccess();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField
        label="Monitor Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mr: 2 }}
        required
      />
      <TextField
        label="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        sx={{ mr: 2 }}
        required
      />
      <Button type="submit" variant="contained">
        Add Monitor
      </Button>
    </Box>
  );
}