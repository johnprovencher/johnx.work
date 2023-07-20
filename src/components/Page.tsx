import { 
    Container, 
    Box 
} from "@mui/material"

interface Props {
  children: React.ReactNode
}

const Page = ({ children }: Props) => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <main>
                <Container sx={{maxWidth:'100%'}} maxWidth={false}>
                    {children}
                </Container>
            </main>
        </Box>
    )
}

export default Page
