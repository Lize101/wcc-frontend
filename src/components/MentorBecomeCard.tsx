import { Grid, Typography, useMediaQuery, Button } from '@mui/material';
import React from 'react';

import theme from 'theme';

import { GradientBorderDivider } from './GradientBorderDivider';

interface MentorBecomeCardProps {
  mentorOrMentee: string;
  topics: string[];
  buttonText: string;
  buttonUrl: string;
}

export const MentorBecomeCard = ({
  mentorOrMentee,
  topics,
  buttonText,
  buttonUrl,
}: MentorBecomeCardProps) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid
      style={{
        padding: '15px',
      }}
      item
      xs={12}
      sm={6}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: '#181C20',
          lineHeight: '44px',
        }}
        variant="h4"
      >
        Become a {mentorOrMentee}
      </Typography>
      <GradientBorderDivider
        height="4px"
        width="80%"
        margin={isMobile ? '12px 0' : 'auto auto  15px 0'}
        gradientColors="linear-gradient(to right, #84B1D0, #FFDEA6, #FFB59D)"
      />
      <Typography variant={'h5'}>
        You should become a {mentorOrMentee} if you:
      </Typography>

      <ol>
        {topics.map((topic: any, index: number) => (
          <li
            style={{ fontSize: '24px' }}
            key={`become-${mentorOrMentee}-topic-${index}`}
          >
            <Typography variant="h5">{topic}</Typography>
          </li>
        ))}
      </ol>
      <Button
        target="_blank"
        variant="contained"
        sx={{
          backgroundColor: '#226488',
          borderRadius: '25px',
          fontSize: '20px',
        }}
        href={buttonUrl}
      >
        {buttonText}
      </Button>
    </Grid>
  );
};
