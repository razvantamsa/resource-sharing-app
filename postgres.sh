#!/bin/bash

# Run db container
docker run --rm \
  --name resource-sharing-db \
  -p 5432:5432 \
  -e POSTGRES_HOST_AUTH_METHOD=trust \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=resources_db \
  postgres:16
