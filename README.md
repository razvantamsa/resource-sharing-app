# Resource Sharing System

## Objective

Design and implement a basic access control system that enables resources to be shared with:

- **Individual users**
- **Groups of users**
- **Everyone in the system**

The system should support efficient access checks and be easily extendable for reporting purposes.



## Potential Improvements

- Add API endpoints for managing users, groups, and resources (POST/DELETE operations).
- Implement access control endpoints for administrators to grant or revoke access.
- Integrate authentication using API keys.
- Use materialized views for complex queries, refreshing them only when users, groups, resources, or their relationships change.
- Implement a **circuit breaker** mechanism to gracefully handle scenarios when the PostgreSQL database is unavailable, preventing repeated failed attempts and allowing the system to recover automatically when the database is back online.

## How to Use

1. **Install Dependencies**  
    Run `make setup` to install all required dependencies using `pnpm`.

2. **Start the Application**  
    Run `make start` to:
    - Start the database container
    - Wait for postgresql to become healthy
    - Apply database seeding
    - Run the server

3. **Test Endpoints**  
    Use the `curl` commands found under the `tests` directory to interact with and test the API endpoints.

4. **View Database Schema**  
    Check the `docs/svg` directory for SVG diagram illustrating the current database schema.

5. **Stop and Reset**  
    Run `make stop` to stop the containers. The setup uses no persistence, so each start provides a clean slate for testing.