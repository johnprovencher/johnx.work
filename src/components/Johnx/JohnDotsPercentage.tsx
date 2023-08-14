import { Box } from "@mui/material";

interface DotPercentageGroupProps {
    percentage: number;
}

const JohnDotsPercentage = ({ percentage }: DotPercentageGroupProps) => {
    const totalDots = 60; 
    const coloredDots = Math.floor(percentage * totalDots);

    const getColor = (dotIndex:number) => {
        return dotIndex < coloredDots ? 'white' : 'rgba(255,255,255,0.2)';
    };

    const generateDots = () => {
        const dots = [];

        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 2; j++) {
                const column = [];
                for (let k = 0; k < 3; k++) {
                    const dotIndex = i * 6 + j * 3 + k;
                    const color = getColor(dotIndex);
                    column.push(
                        <Box
                            key={k}
                            sx={{
                                position: 'relative',
                                backgroundColor: color,
                                borderRadius: '50%',
                                width: '3px',
                                height: '3px',
                            }}
                        />
                    );
                }
                row.push(
                    <Box
                        key={j}
                        sx={{
                            position: 'relative',
                            display: 'inline-flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            gap: '1.5px',
                        }}
                    >
                        {column}
                    </Box>
                );
            }
            dots.push(
                <Box
                    key={i}
                    sx={{
                        position: 'relative',
                        display: 'inline-flex',
                        gap: '2px',
                    }}
                >
                    {row}
                </Box>
            );
        }
        return dots;
    };

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex', gap: '4px' }}>
            {generateDots()}
        </Box>
    );
}

export default JohnDotsPercentage
