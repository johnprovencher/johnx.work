import Page from "components/Page"
import Header from "components/Header"
import JohnBox from "components/Johnx/JohnBox"
import { Box, Typography } from "@mui/material"
import Footer from "components/Footer"

const TOUPage = () => {

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
                    Welcome to johnx.works! These Terms of Use ("Terms") govern your access to and use of our website, located at [website URL], and any associated services (collectively referred to as the "Website"). By accessing or using the Website, you agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using the Website.
                    If you have any questions or concerns regarding these Terms, please contact us at [contact email].
                        </Typography>
                    </Box>
                    <Box sx={{ gridColumnStart: '2', gridColumnEnd: '4', display: 'inline-flex', flexDirection: 'column', gap: '1em' }}>
                        <Typography>
                    Acceptance of Terms By accessing or using the Website, you affirm that you are of legal age and have the legal capacity to enter into these Terms. If you are accessing the Website on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms. These Terms constitute a legally binding agreement between you and [Website Name].
Website Content The content provided on the Website, including but not limited to text, images, videos, and other materials, is for general informational purposes only. We strive to ensure the accuracy and reliability of the content, but we make no guarantees or warranties regarding the completeness, accuracy, or suitability of the information provided on the Website.
User Responsibilities a. Account Creation: In order to access certain features or services on the Website, you may be required to create an account. You agree to provide accurate and up-to-date information during the registration process, and to maintain the security and confidentiality of your account credentials. b. User Conduct: You agree to use the Website in compliance with applicable laws and regulations. You will not engage in any conduct that may disrupt or interfere with the functioning of the Website or infringe upon the rights of others. Furthermore, you will not attempt to gain unauthorized access to any portion of the Website or any associated systems or networks. c. User Content: If you contribute any content to the Website, such as comments, reviews, or submissions, you grant us a non-exclusive, royalty-free, worldwide license to use, reproduce, modify, adapt, and publish such content for the purpose of operating and improving the Website.
Intellectual Property The Website and its content, including but not limited to text, graphics, logos, icons, images, audio clips, and software, are the property of [Website Name] or its licensors and are protected by applicable intellectual property laws. You may not use, reproduce, distribute, or modify any of the content without prior written permission from the respective owner.
Third-Party Links The Website may contain links to third-party websites or resources. These links are provided for your convenience, and we have no control over the content or availability of such external sites. We do not endorse or assume any responsibility for the content, products, or services offered by third parties.
Disclaimer of Warranty The Website is provided on an "as is" and "as available" basis, without any warranties of any kind, whether express or implied. We make no representations or warranties regarding the reliability, accuracy, or availability of the Website or its content. Your use of the Website is at your own risk.
Limitation of Liability To the maximum extent permitted by law, [Website Name] and its affiliates, partners, officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, or consequential damages, including but not limited to loss of profits, data, or use, arising out of or in any way connected with the use of the Website or these Terms.
Modifications to the Terms We reserve the right to modify or update these Terms at any time, without prior notice. Any changes to the Terms will be effective immediately upon posting. Your continued use of the Website after the posting of any modifications constitutes your acceptance of the revised Terms.
Governing Law and Jurisdiction These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any legal actions or proceedings arising out of or relating to these Terms or the use of the Website shall be exclusively brought in the courts located within [Jurisdiction], and you consent to the personal jurisdiction of such courts.
Severability If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect.
Entire Agreement These Terms constitute the entire agreement between you and [Website Name] concerning the use of the Website, superseding any prior or contemporaneous agreements, communications, and proposals, whether oral or written.
                        </Typography>
                    </Box>
                </Box>
                <Footer />
            </Box>
        </Page>
    )
}

export default TOUPage
