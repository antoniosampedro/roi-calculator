import axios from 'axios';
import { RoiCalculatorInput, RoiCalculatorOutput } from '../types/roi';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const calculateRoi = async (input: RoiCalculatorInput): Promise<RoiCalculatorOutput> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/roicalculator/calculate`, input);
        return response.data;
    } catch (error) {
        console.error('Error calculating ROI:', error);
        throw error;
    }
}; 