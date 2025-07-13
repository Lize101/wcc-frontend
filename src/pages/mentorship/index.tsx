import { Typography, Button, Box, Grid, useMediaQuery } from '@mui/material';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

import {
  ColoredBox,
  FeedbackCard,
  MentorBecomeCard,
  FeedbackCardProps,
} from '@components';
import { MentorshipProgrammeData } from '@utils/types';
import { fetchData } from 'lib/api';
import theme from 'theme';

interface MentorshipPageProps {
  mentorship: MentorshipProgrammeData;
  error: string | null;
}

interface FeedbackSectionProps {
  title: string;
  feedbacks: FeedbackCardProps[];
}

const MentorshipPage = ({ mentorship }: MentorshipPageProps) => {
  return (
    <>
      <Grid
        container
        style={{
          background: '#F6FAFE',
          padding: useMediaQuery(theme.breakpoints.down(544))
            ? '35px 15px'
            : '160px 80px',
        }}
      >
        <MentorBecomeCard
          mentorOrMentee="mentor"
          topics={[
            'Want to extend your professional network',
            'Want to contribute to the community',
            'You are ready to share expertise',
            'You want to get a new perspective and learn from your mentees',
          ]}
          buttonUrl="https://docs.google.com/forms/d/e/1FAIpQLSdtf7-upMp1m5kJ4MSpexS-UwGJHhACEW-yPoEQoROHi4kVcg/viewform"
          buttonText={'Join as a mentor'}
        ></MentorBecomeCard>
        <MentorBecomeCard
          mentorOrMentee="mentee"
          topics={[
            'Want to start a career in software engineering',
            'Want to find a better job',
            'Want to be promoted at work',
            'Want to apply for a leadership position',
            'Need support in advancing your career',
          ]}
          buttonUrl="/mentors"
          buttonText={'Find a mentor'}
        ></MentorBecomeCard>
      </Grid>
      <FeedbackSection
        title={mentorship.feedbackSection.title}
        feedbacks={mentorship.feedbackSection.feedbacks}
      />
    </>
  );
};

const FeedbackSection: React.FC<FeedbackSectionProps> = ({
  title,
  feedbacks,
}) => {
  const [feedbacksDisplayed, setFeedbacksDisplayed] = useState<number>(3);
  const showMoreFeedbacks = () => {
    setFeedbacksDisplayed((prevCount) =>
      Math.min(prevCount + 3, feedbacks.length),
    );
  };
  return (
    <ColoredBox color={'#FFDEA6'}>
      <Box sx={{ display: 'grid', justifyItems: 'center', gap: '3rem' }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '24px', sm: '24px', md: '45px' },
            maxWidth: { xs: '361px', sm: '361px', md: '742px' },
            lineHeight: { xs: '32px', sm: '32px', md: '52px' },
            fontWeight: 600,
            paddingTop: '2rem',
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { sm: 'repeat(3, 1fr)', md: '' },
            gap: 2,
            gridTemplateRows: {
              sm: feedbacksDisplayed > 3 ? '1fr 1fr' : '',
              md: '',
            },
          }}
        >
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks
              .slice(0, feedbacksDisplayed)
              .map((feedback) => (
                <FeedbackCard
                  key={feedback.name}
                  name={feedback.name}
                  feedback={feedback.feedback}
                  mentee={feedback.mentee}
                  year={feedback.year}
                />
              ))
          ) : (
            <p>There‵s no feedback yet!</p>
          )}
        </Box>

        <Button
          onClick={showMoreFeedbacks}
          disabled={feedbacksDisplayed >= feedbacks.length}
          variant="outlined"
          sx={{
            borderRadius: '20px',
            border: '1px solid #71787E',
            color: '#1A4B66',
          }}
        >
          + Show more
        </Button>
      </Box>
    </ColoredBox>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetchData('mentorship/overview');

    return {
      props: {
        mentorship: response.data,
      },
    };
  } catch (error) {
    return {
      props: {
        data: null,
        error: error instanceof Error ? error.message : 'An error occurred',
      },
    };
  }
};

export default MentorshipPage;
