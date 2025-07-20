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