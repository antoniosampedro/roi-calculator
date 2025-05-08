import React from 'react';
import {
    Box,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import Grid from './CustomGrid';
import { RoiCalculatorOutput } from '../types/roi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RoiResultsProps {
    results: RoiCalculatorOutput;
    isSalesView: boolean;
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(value / 100);
};

const RoiResults: React.FC<RoiResultsProps> = ({ results, isSalesView }) => {
    const chartData = results.yearlyProjections.map((projection, index) => ({
        year: `Year ${index + 1}`,
        savings: projection,
    }));

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                ROI Analysis Results
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Total Cost Savings"
                                secondary={formatCurrency(results.totalCostSavings)}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="3-Year ROI"
                                secondary={formatPercentage(results.threeYearRoi)}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="Payback Period"
                                secondary={`${results.paybackPeriod} months`}
                            />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <ListItemText
                                primary="ROI Multiple"
                                secondary={`${results.roiMultiple}x`}
                            />
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={6}>
                    <List>
                        {isSalesView ? (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Expected Credits Found"
                                        secondary={formatCurrency(results.expectedCreditsFound)}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Expected Credit Value"
                                        secondary={formatCurrency(results.expectedCreditValue)}
                                    />
                                </ListItem>
                            </>
                        ) : (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary="Missing Invoice Projections"
                                        secondary={formatCurrency(results.missingInvoiceProjections)}
                                    />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText
                                        primary="Implementation Milestones"
                                        secondary={results.implementationMilestones.join(', ')}
                                    />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        3-Year Savings Projection
                    </Typography>
                    <Box sx={{ width: '100%', height: 300 }}>
                        <ResponsiveContainer>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="year" />
                                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                                <Tooltip
                                    formatter={(value: number) => [formatCurrency(value), 'Savings']}
                                />
                                <Bar dataKey="savings" fill="#2196f3" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default RoiResults; 