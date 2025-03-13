'use client';

import PageLayout from '@/components/PageLayout';
import AddMonitorForm from '@/components/AddMonitorForm';
import SitesList from '@/components/SitesList';
import { useState } from 'react';

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddSuccess = () => {
    console.log('Site added, refreshing list...'); // Debug log
    setRefreshKey(prev => prev + 1);
  };

  return (
    <PageLayout>
      <AddMonitorForm onSuccess={handleAddSuccess} />
      <SitesList key={refreshKey} />
    </PageLayout>
  );
}