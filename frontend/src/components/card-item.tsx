import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export interface CartItemProps {
    sx?: SxProps;
    value: number;
    title: string;
    children: React.ReactNode;
    iconColor?: string
}

export function CardItem(props: CartItemProps): React.JSX.Element {
    const { value, sx, title, children, iconColor = "var(--mui-palette-primary-main)" } = props;
    return (
        <Card sx={sx}>
            <CardContent>
                <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                    <Stack spacing={1}>
                        <Typography color="text.secondary" variant="overline">
                            {title}
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                    </Stack>
                    <Avatar sx={{ backgroundColor: iconColor, height: '56px', width: '56px' }}>
                        {children}
                    </Avatar>
                </Stack>
            </CardContent>
        </Card>
    );
}
