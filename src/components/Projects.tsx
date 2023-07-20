import { Box, Alert, Typography, Link } from "@mui/material"
import { Project } from "utils/types"
import ProjectPreview from "components/ProjectPreview"
import Loading from "components/Loading"
import useProjects from "hooks/useProjects"
import JohnBox from "./Johnx/JohnBox"
import { Block } from "@mui/icons-material"

const Projects = () => {
    const { loading, error, data } = useProjects()

    return (
        <Box sx={{maxWidth:'1400px'}}>
            <Box>
                {
                    loading ?
                        (
                            <Box marginTop={10}>
                                <Loading/>
                            </Box>
                        ) 
                        :
                        error ?
                            (
                                <Box marginTop={10}>
                                    <Alert severity="error">
                                        Error loading projects
                                    </Alert>
                                </Box>
                            ) 
                            :
                            data?.projects?.length > 0 ?
                                (
                                    <Box sx={{ display: 'grid', position: 'relative', gridGap: '2em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
                                        '@media screen and (max-width: 465px)': {
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                                        }
                                    }}>
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <ProjectPreview
                                                        project={project}
                                                        showDescription
                                                    />
                                                ))
                                            )
                                        }
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <ProjectPreview
                                                        project={project}
                                                        showDescription
                                                    />
                                                ))
                                            )
                                        }
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <ProjectPreview
                                                        project={project}
                                                        showDescription
                                                    />
                                                ))
                                            )
                                        }
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <ProjectPreview
                                                        project={project}
                                                        showDescription
                                                    />
                                                ))
                                            )
                                        }
                                        {
                                            data?.projects && (
                                                data.projects.map((project: Project) => (
                                                    <ProjectPreview
                                                        project={project}
                                                        showDescription
                                                    />
                                                ))
                                            )
                                        }
                                    </Box>
                                ) 
                                :
                                data?.projects?.length === 0 ? 
                                    (
                                        <Box marginTop={10}>
                                            <Alert severity="info">
                                                No projects found
                                            </Alert>
                                        </Box>
                                    )
                                    :
                                    null
                }
            </Box>
            <Box py={4} sx={{ display: 'grid', position: 'relative', gridGap: '2em', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', '@media screen and (max-width: 465px)': {gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' } }}>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                    <Typography fontSize={16} fontWeight={800} sx={{color:"rgba(255,255,255,0.5)"}}>
                        SUBSCRIBE FOR UPDATES   
                    </Typography>
                    <Box sx={{ display: 'inline-flex', gap:'8px', '@media screen and (max-width: 465px)': {flexDirection: 'column', alignItems: 'flex-start' } }}>
                        <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
                            johnprovencher@gmail.com
                        </JohnBox>
                        <JohnBox onClick={() => window.location.href="mailto:johnprovencher@gmail.com" }>
                            subscribe
                        </JohnBox>
                    </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                    <Typography fontSize={16} fontWeight={800} sx={{color:"rgba(255,255,255,0.5)"}}>
                            FOLLOW
                    </Typography>
                    <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'2px' }}>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                INSTAGRAM
                            </Typography>
                        </Link>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                TWITTER
                            </Typography>
                        </Link>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                THREADS
                            </Typography>
                        </Link>
                    </Box>
                </Box>
                <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'1em', justifyContent:'space-between' }}>
                    <Box sx={{ display: 'inline-flex', gap:'8px' }}>
                        <Typography fontSize={16} fontWeight={800} sx={{ color:"rgba(255,255,255,0.5)", display: 'inline-block'}}>
                            POWERED BY
                        </Typography>
                        <Typography fontSize={16} fontWeight={800} sx={{ display: 'inline-block'}}>
                            ART BLOCKS ENGINE
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'inline-flex', flexDirection: 'column', gap:'2px' }}>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                VIEW ETHERSCAN CONTRACT
                            </Typography>
                        </Link>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                TERMS OF USE
                            </Typography>
                        </Link>
                        <Link href={`/`} underline="hover">
                            <Typography fontSize={16} fontWeight={800}>
                                PRIVACY POLICY
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Projects
