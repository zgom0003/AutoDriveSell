import React from 'react';
import { Navigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function AdminPage() {
    const isAdmin = true;  // Replace this with actual authentication check later

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div style={{ margin: '20px' }}>
            <h1>Admin Dashboard</h1>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography sx={{ fontSize: '1.25rem' }}>Admin Feature 1</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Content for Admin Feature 1. This is more detailed information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography sx={{ fontSize: '1.25rem' }}>Admin Feature 2</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Content for Admin Feature 2. This is more detailed information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography sx={{ fontSize: '1.25rem' }}>Admin Feature 3</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Content for Admin Feature 3. This is more detailed information.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default AdminPage;