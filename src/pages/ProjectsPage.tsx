import Header from "components/Header"
import Page from "components/Page"
import Projects from "components/Projects"
import JohnBox from "components/Johnx/JohnBox"
import { useMediaQuery } from "usehooks-ts"

const ProjectsPage = () => {
    const isMobile = useMediaQuery('(max-width:465px)');
    const isSmallScreen = useMediaQuery('(max-width:1200px)');

    return (
        <Page>
            <Header>
                { 
                    !isMobile && (
                        <JohnBox> 
                            {
                                isSmallScreen
                                    ? 'welcome to johnx.work'
                                    : 'welcome to johnx.work, a home for on-chain generative art by john provencher...'
                            }
                        </JohnBox>
                    )
                }
            </Header>
            <Projects/>
        </Page>
    )
}

export default ProjectsPage