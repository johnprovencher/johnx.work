import {
    Box,
    Typography,
    Link
} from "@mui/material"
import { Project } from "utils/types"
import { parseAspectRatio } from "utils/scriptJSON"
import Collapsible from "components/Collapsible"
import ProjectDate from "components/ProjectDate"
import TokenView from "components/TokenView"
import ProjectStatusBadge from "./ProjectStatusBadge"
import JohnDots from "./Johnx/JohnDots"

interface Props {
  project: Project
  width?: number
  showDescription?: boolean
}

const ProjectPreview = ({project, width=280, showDescription=false}: Props) => {
    if (!project) {
        return null
    }

    const token = project?.tokens[0]
    return (
        <Box>
            <Box sx={{position: 'relative'}}>
                <JohnDots />
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link href={`/project/${project.contract.id}/${project.projectId}`} underline="hover">
                        <Typography fontSize={16} fontWeight={800} pr={'1ch'} sx={{backgroundColor: 'black'}}>
                            {project.name}
                        </Typography>
                    </Link>
                    {
                        project.minterConfiguration && (
                            <ProjectDate
                                startTime={project.minterConfiguration?.startTime}
                            />
                        )
                    }
                    {
                        !project.minterConfiguration && (
                            <Typography fontSize={16} fontWeight={800} pl={'1ch'} sx={{backgroundColor: 'black'}}>
                                {project.artistName}
                            </Typography>
                        )
                    }
                </Box>
            </Box>
            <TokenView
                contractAddress={project.contract.id}
                width={300}
                tokenId={token?.tokenId}
                invocation={token?.invocation}
                aspectRatio={project.aspectRatio || parseAspectRatio(project.scriptJSON)}
            />
            {
                showDescription && (
                    <Box marginTop={2}>
                        <Collapsible content={project.description}/>
                    </Box>
                )
            }
        </Box>
    )
}

export default ProjectPreview
