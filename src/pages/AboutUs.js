import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-color: #FCE4EC; /* Very light pastel pink background */
    width: 100%;
    height: 40vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Wrapper = styled(Box)`
    padding: 40px;
`;

const Section = styled(Box)`
    margin-top: 40px;
`;

const Text = styled(Typography)`
    color: #333;
    font-size: 18px;
    line-height: 1.6;
`;

const Strong = styled('strong')`
    color: #FF5733;
`;

const IconLink = styled(Link)`
    margin-left: 15px;
    color: #FF5733;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: #E4402F;
    }
`;

const AboutUs = () => {

    return (
        <Box>
            <Banner>
                <Typography variant="h2" style={{ fontFamily: 'Georgia, serif', color: '#333', textAlign: 'center' }}>
                    Welcome to <Strong>Verbalink</Strong>
                </Typography>
            </Banner>
            <Wrapper>
                <Text variant="h5">
                    Your digital destination for diverse discussions and engaging content. Whether it's music, movies, sports, tech, or fashion,
                    Verbalink has something for everyone.
                </Text>
                <Section style={{ textAlign: 'center' }}>
                    <Typography variant="h4">Our Mission</Typography>
                    <Text variant="h6">
                        Our mission is to encourage free-flowing ideas and thriving conversations. We believe in
                        the power of words to inspire and entertain. Join us on this journey of discovery and expression.
                    </Text>
                </Section>
                <Section style={{ marginTop: '30px' }}>
                    <Typography variant="h4">Connect with Us</Typography>
                    <Text variant="h6" style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
                        Reach out to us on: 
                        <IconLink href="https://github.com/surajthakkar7/" target="_blank">
                            <GitHub fontSize="inherit" />
                        </IconLink>
                        
                         or send us an email:
                        <IconLink href="mailto:surajthakkar30@gmail.com?Subject=Hello" target="_blank">
                            <Email fontSize="inherit" />
                        </IconLink>

                    </Text>
                </Section>
            </Wrapper>
        </Box>
    );
}

export default AboutUs;