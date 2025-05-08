import React from 'react';
import { Grid as MuiGrid, GridProps as MuiGridProps } from '@mui/material';

interface CustomGridProps extends Omit<MuiGridProps, 'component'> {
    children: React.ReactNode;
    item?: boolean;
    container?: boolean;
    xs?: number;
    md?: number;
    spacing?: number;
}

export const Grid: React.FC<CustomGridProps> = ({ children, ...props }) => {
    return (
        <MuiGrid component="div" {...props}>
            {children}
        </MuiGrid>
    );
};

export default Grid; 