import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IIssue } from '@/app/api';
import { Link } from '@mui/material';


const statusMap = {
    "": { label: 'Pending', color: 'warning' },
    "confirmed": { label: 'confirmed', color: 'primary' },
    "fixed": { label: 'fixed', color: 'success' },
  } as const;

export interface IssueListProps {
  issues: IIssue[];
  sx?: SxProps;
}

export function IssueList({ issues, sx }: IssueListProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardHeader title="Issues" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>Operator</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((issue) => {
            const { label, color } = statusMap[issue.status] ?? { label: 'Unknown', color: 'default' };
              return (
                <TableRow hover key={issue.operator}>
                  <TableCell>{issue.operator}</TableCell>
                  <TableCell><Link href={issue.link}>{issue.link}</Link></TableCell>
                  <TableCell>
                    <TableCell>
                        <Chip color={color} label={label} size="small" />
                    </TableCell>
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
