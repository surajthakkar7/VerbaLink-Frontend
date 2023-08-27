import React from 'react';
import { Box, styled, Typography, Link } from '@mui/material';
import { Instagram, Email } from '@mui/icons-material';

const Container = styled(Box)`
    background-color: #f9f9f9;
    padding: 50px 0;
`;

const Wrapper = styled(Box)`
    max-width: 800px;
    margin: auto;
    text-align: center;
`;

const Heading = styled(Typography)`
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
`;

const Text = styled(Typography)`
    color: #666;
    font-size: 18px;
    line-height: 1.6;
    margin-top: 20px;
`;

const IconLink = styled(Link)`
    color: #FF5733;
    text-decoration: none;
    margin: 0 10px;
    transition: color 0.3s ease;

    &:hover {
        color: #E4402F;
    }
`;

const ContactUs = () => {
    return (
        <Container>
            <Wrapper>
                <Heading>Connect with Us</Heading>
                <Text>
                    Stay in the loop and connect with us for the latest updates and engaging discussions on social media:
                    <IconLink href="https://www.instagram.com/codeforinterview/" target="_blank">
                        <Instagram fontSize="inherit" />
                    </IconLink>
                    or send us an email:
                    <IconLink href="mailto:codeforinterview@gmail.com?Subject=Hello" target="_blank">
                        <Email fontSize="inherit" />
                    </IconLink>.
                </Text>
            </Wrapper>
        </Container>
    );
}

export default ContactUs;