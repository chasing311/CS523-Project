import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';

import { CardItem } from '@/components/card-item';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';
import { Hockey as HockeyIcon } from '@phosphor-icons/react/dist/ssr/Hockey';
import { ShieldSlash as ShieldSlashIcon } from '@phosphor-icons/react/dist/ssr/ShieldSlash';
import { Lightbulb as LightbulbIcon } from '@phosphor-icons/react/dist/ssr/Lightbulb';
import { getOperatorTestDetails } from '@/app/api';
import { PieChart } from '@/components/pie-chart';
import { IssueList } from '@/components/issue-list';

export const metadata = { title: `Acto | Details` } satisfies Metadata;

export default async function Page({ params }: { params: { operator: string } }) {
    const details = await getOperatorTestDetails(params.operator);
    const { alarm, crash, health, cases = {}, fields = {}, issues = [] } = details?.[0] ?? details;

    return (
        <Grid container spacing={3}>
            <Grid lg={3} sm={6} xs={12}>
                <CardItem sx={{ height: '100%' }} value={alarm} title="Alarms">
                    <ReceiptIcon fontSize="var(--icon-fontSize-lg)" />
                </CardItem>
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <CardItem sx={{ height: '100%' }} value={crash} title="Crash" iconColor="var(--mui-palette-error-main)">
                    <HockeyIcon fontSize="var(--icon-fontSize-lg)" />
                </CardItem>
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <CardItem sx={{ height: '100%' }} value={health} title="Health" iconColor="var(--mui-palette-success-main)">
                    <ShieldSlashIcon fontSize="var(--icon-fontSize-lg)" />
                </CardItem>
            </Grid>
            <Grid lg={3} sm={6} xs={12}>
                <CardItem sx={{ height: '100%' }} value={issues?.length} title="Issues" iconColor="var(--mui-palette-warning-main)">
                    <LightbulbIcon fontSize="var(--icon-fontSize-lg)" />
                </CardItem>
            </Grid>
            <Grid md={12} xs={12}>
                <PieChart title="Testcases" chartSeries={Object.values(cases)} labels={Object.keys(cases)} sx={{ height: '100%' }} />
            </Grid>
            <Grid md={12} xs={12}>
                <PieChart title="Fields" chartSeries={Object.values(fields)} labels={Object.keys(fields)} sx={{ height: '100%' }} />
            </Grid>

            <Grid md={12} xs={12}>
                <IssueList
                    issues={issues}
                    sx={{ height: '100%' }}
                />
            </Grid>
        </Grid>
    );
}
