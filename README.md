# FISCAL ROI Calculator

A web application that calculates Return on Investment (ROI) for FISCAL Technologies' Statement Reconciliation solution. This application helps demonstrate value to prospects during sales processes and assists in setting realistic expectations during customer onboarding.

## Features

- Core ROI calculator for Statement Reconciliation
- Two output modes:
  - Sales view (focused on demonstrating financial value)
  - CSM view (focused on customer onboarding and goal setting)
- Interactive input controls for key parameters
- Visual representation of ROI metrics
- Export functionality for results

## Technology Stack

- Frontend: React.js with Material-UI
- Backend: .NET 9 with C# API
- Containerization: Docker
- Deployment: Azure App Service

## Prerequisites

- .NET 9 SDK
- Node.js 18 or later
- Docker and Docker Compose

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd roi-calculator
   ```

2. Run the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will start both the frontend and backend services:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

3. Alternatively, you can run the services separately:

   Backend:
   ```bash
   cd FiscalRoiCalculator.API
   dotnet run
   ```

   Frontend:
   ```bash
   cd fiscal-roi-calculator-client
   npm install
   npm start
   ```

## Development

### Backend

The backend is built with .NET 9 Preview and provides the following endpoints:
- POST /api/roicalculator/calculate - Calculate ROI based on input parameters

### Frontend

The frontend is built with React and Material-UI, providing a modern and responsive user interface. Key components:
- RoiCalculator: Main calculator component with input form
- RoiResults: Results display component with charts and metrics

## Deployment

The application is containerized and can be deployed to Azure App Service or Azure Container Instances. The Docker configuration is included in the repository.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited. 