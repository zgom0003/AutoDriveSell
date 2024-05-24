import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Box, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

function AdminPage() {
    const isAdmin = true;  // Replace this with actual authentication check later

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    // Mock data for products
    const products = [
        { id: 1, name: 'Product 1', sales: 150 },
        { id: 2, name: 'Product 2', sales: 90 },
        { id: 3, name: 'Product 3', sales: 200 },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Typography variant="h4" gutterBottom component="div">
                Dashboard
            </Typography>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
                    <Typography variant="h6">Manage Products</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }}>
                            Add New Product
                        </Button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product ID</TableCell>
                                        <TableCell align="right">Product Name</TableCell>
                                        <TableCell align="right">Sales</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {product.id}
                                            </TableCell>
                                            <TableCell align="right">{product.name}</TableCell>
                                            <TableCell align="right">{product.sales}</TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="delete" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2-content" id="panel2-header">
                    <Typography variant="h6">Sales Updates</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Display and analyze sales data here. Include charts or detailed tables as needed.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export default AdminPage;