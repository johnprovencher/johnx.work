import Page from "components/Page"
import Header from "components/Header"
import JohnBox from "components/Johnx/JohnBox"
import { Box, Typography } from "@mui/material"
import Footer from "components/Footer"

const PrivacyPage = () => {
    return (
        <Page>
            <Header>
                <JohnBox> 
                    terms of use
                </JohnBox>
            </Header>
            <Box sx={{px: '24px', maxWidth:'1400px'}}>
                <Box sx={{ display: 'grid', position: 'relative', gridGap: '2em', paddingBottom: '4em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                    '@media screen and (max-width: 465px)': {
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    }
                }}>
                    <Box>
                        <Typography>
                            Privacy Policy
                            Effective Date: [Date]
                            This Privacy Policy was last updated on [Date].
                        </Typography>
                    </Box>
                    <Box sx={{ gridColumnStart: '2', gridColumnEnd: '4', display: 'inline-flex', flexDirection: 'column', gap: '1em' }}>
                        <Typography>
                            This Privacy Policy governs the manner in which [Website Name] collects, uses, maintains, and discloses information collected from users (referred to as "User" or "Users") of the [website URL] website ("Website"). This Privacy Policy applies to the Website and all products and services offered by [Website Name].

Information Collection [Website Name] does not collect any personal information from Users, such as names, email addresses, or any other identifying information when they visit or interact with the Website.
Cookies and Tracking Technologies The Website does not use cookies or any other tracking technologies to collect or store information about Users.
Use of Information Since no personal information is collected, [Website Name] does not use any information for any purpose.
Disclosure of Information As no personal information is collected, there is no information to disclose to third parties.
Data Security [Website Name] employs reasonable data security measures to ensure the protection of User information. However, since no personal information is collected, there is no personal data at risk.
Links to Third-Party Websites The Website may contain links to third-party websites for Users' convenience. However, [Website Name] has no control over the content or practices of these websites. Therefore, this Privacy Policy does not apply to any third-party websites that may be linked from the Website. Users should review the privacy policies of these third-party websites before providing any personal information.
Changes to this Privacy Policy [Website Name] reserves the right to update or modify this Privacy Policy at any time without prior notice. Users are encouraged to check this page periodically for any changes. The date of the most recent revision will be indicated at the top of this Privacy Policy.
Your Acceptance of these Terms By using the Website, you signify your acceptance of this Privacy Policy. If you do not agree with this Privacy Policy, please refrain from using the Website.
Contacting Us If you have any questions about this Privacy Policy or the practices of this Website, please contact us at [contact email].
                        </Typography>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Page>
    )
}

export default PrivacyPage
