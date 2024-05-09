import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import RouterLink from 'next/link';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ITestResult } from '@/app/api';


export interface ResultListProps {
  results?: ITestResult[];
  sx?: SxProps;
}

export function ResultList({ results = [], sx }: ResultListProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Test Results" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Operator</TableCell>
              <TableCell>Trials</TableCell>
              <TableCell>Alarms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => {
              return (
                <TableRow hover key={result.operator}>
                  <TableCell>{result.operator}</TableCell>
                  <TableCell>{result.trial}</TableCell>
                  <TableCell>{result.alarm}</TableCell>
                  <TableCell>
                    <Button
                      component={RouterLink}
                      href={`/details/${result.operator}`}
                      endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
                      variant="contained"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
    </Card>
  );
}
