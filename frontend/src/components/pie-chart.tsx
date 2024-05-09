'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { ApexOptions } from 'apexcharts';
import { Chart } from '@/components/chart';


export interface TrafficProps {
    title: string;
    chartSeries: number[];
    labels: string[];
    sx?: SxProps;
}

export function PieChart({ title, chartSeries, labels, sx }: TrafficProps): React.JSX.Element {
    const chartOptions = useChartOptions(labels);

    return (
        <Card sx={sx}>
            <CardHeader title={title} />
            <CardContent>
                <Stack spacing={2}>
                    <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
                        {chartSeries.map((item, index) => {
                            const label = labels[index];

                            return (
                                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                                    <Typography>{label}</Typography>
                                    <Typography color="text.secondary" variant="subtitle2">
                                        {item}%
                                    </Typography>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

function useChartOptions(labels: string[]): ApexOptions {
    const theme = useTheme();

    return {
        chart: { background: 'transparent' },
        dataLabels: { enabled: false },
        labels,
        legend: { show: false },
        plotOptions: { pie: { expandOnClick: false } },
        states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
        stroke: { width: 0 },
        theme: { mode: theme.palette.mode },
        tooltip: { fillSeriesColor: false },
    };
}
