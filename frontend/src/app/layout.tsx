import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@/components/theme-provider';

import '@/styles/global.css';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-default)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minHeight: '100%',
          }}
        >
          <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
            <main>
              <Container maxWidth="xl" sx={{ py: '64px' }}>
                {children}
              </Container>
            </main>
          </Box>
        </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}
