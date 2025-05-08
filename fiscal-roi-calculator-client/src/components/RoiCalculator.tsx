import React, { useState } from 'react';
import {
    Box,
    Container,
    Paper,
    Typography,
    TextField,
    Switch,
    FormControlLabel,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import Grid from './CustomGrid';
import { RoiCalculatorInput, RoiCalculatorOutput } from '../types/roi';
import { calculateRoi } from '../services/api';
import RoiResults from './RoiResults';

const RoiCalculator: React.FC = () => {
    const [input, setInput] = useState<RoiCalculatorInput>({
        numberOfStatements: 0,
        annualSpend: 0,
        poMatchPercentage: 0,
        yearsSinceLastAudit: 0,
        isSalesView: true,
    });

    const [results, setResults] = useState<RoiCalculatorOutput | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (field: keyof RoiCalculatorInput) => (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.type === 'checkbox' 
            ? event.target.checked 
            : Number(event.target.value);
        
        setInput(prev => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const result = await calculateRoi(input);
            setResults(result);
        } catch (err) {
            setError('Failed to calculate ROI. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    FISCAL ROI Calculator
                </Typography>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Number of Statements"
                                    type="number"
                                    value={input.numberOfStatements}
                                    onChange={handleInputChange('numberOfStatements')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Annual Spend ($)"
                                    type="number"
                                    value={input.annualSpend}
                                    onChange={handleInputChange('annualSpend')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="PO Match Percentage"
                                    type="number"
                                    value={input.poMatchPercentage}
                                    onChange={handleInputChange('poMatchPercentage')}
                                    required
                                    inputProps={{ min: 0, max: 100 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Years Since Last Audit"
                                    type="number"
                                    value={input.yearsSinceLastAudit}
                                    onChange={handleInputChange('yearsSinceLastAudit')}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={input.isSalesView}
                                            onChange={handleInputChange('isSalesView')}
                                        />
                                    }
                                    label="Sales View"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    fullWidth
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Calculate ROI'}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                )}

                {results && <RoiResults results={results} isSalesView={input.isSalesView} />}
            </Box>
        </Container>
    );
};

export default RoiCalculator;