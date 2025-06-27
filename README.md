# APAE Management System

## Overview

This web application is developed by Computer Science and Software Development students as part of a Project Development class. This project applies modern software development methodologies including Scrum and Design Thinking to create a real-world solution for the regional APAE institution.

### About APAE

APAE (Association of Parents and Friends of Exceptional Children) is a Brazilian network of organizations that provides services including:

- **Educational Services**: Special education, resource rooms, and inclusive education programs
- **Social Assistance**: Family support programs and psychosocial guidance
- **Healthcare**: Medical, physiotherapy, speech therapy, occupational therapy, and psychological services
- **Sports & Cultural Activities**: Programs promoting social integration and inclusion
- **Legal Support**: Rights advocacy and legal assistance for people with disabilities

Learn more about APAE: [Federação Nacional das APAEs](https://apaebrasil.org.br/)

## Setup

### Prerequisites

- PHP >= 8.3
- Composer
- Node.js >= 18.x
- npm or yarn
- Docker
- Make

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RicardoCenci/apae-management-system.git
cd apae-management-system
```

2. Setup the project (installs dependencies, configures environment, runs migrations):
```bash
make setup
```

3. Start the development servers:
```bash
# Terminal 1: Laravel backend
php artisan serve

# Terminal 2: Vite frontend
npm run dev
```

The application will be available at `http://localhost:8000`

## Team

### Contributors

- **Ricardo Cenci Fabris**  
  GitHub: [@RicardoCenci](https://github.com/RicardoCenci)
