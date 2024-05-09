import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { CardItem } from '@/components/card-item';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Atom as AtomIcon } from '@phosphor-icons/react/dist/ssr/Atom';
import { Barricade as BarricadeIcon } from '@phosphor-icons/react/dist/ssr/Barricade';
import { IssueProgress } from '@/components/issue-progress';
import { getIssueStatus, getOperatorStatus, getTestResults } from './api';
import { ResultList } from '@/components/result-list';

export const metadata = { title: `Acto | Dashboard` } satisfies Metadata;

export default async function Page() {
  const [operatorStatus, issueStatus, testResults] = await Promise.all([getOperatorStatus(), getIssueStatus(), getTestResults()]);
  const { operators, trials, alarms } = operatorStatus;
  const { issues, fixed } = issueStatus;
  return (
    <Grid container spacing={3}>
      <Grid lg={3} sm={6} xs={12}>
        <CardItem sx={{ height: '100%' }} value={operators} title="Tested Operators" iconColor="var(--mui-palette-success-main)">
          <AtomIcon fontSize="var(--icon-fontSize-lg)" />
        </CardItem>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CardItem sx={{ height: '100%' }} value={trials} title="Total Trails">
          <BarricadeIcon fontSize="var(--icon-fontSize-lg)" />
        </CardItem>
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <CardItem sx={{ height: '100%' }} value={alarms} title="Total Alarms" iconColor="var(--mui-palette-error-main)">
          <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
        </CardItem>      
        </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <IssueProgress sx={{ height: '100%' }} total={issues} fixed={fixed}/>
      </Grid>

      <Grid md={12} xs={12}>
        <ResultList
          results={testResults}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
