# Makefile for managing Postgres container and hydrating DB

.PHONY: start stop shell

setup:
	. ~/.nvm/nvm.sh && nvm install 20 && nvm use 20 && pnpm install --frozen-lockfile

start:
	docker run --rm -d \
	  --name resource-sharing-db \
	  -p 5432:5432 \
	  -e POSTGRES_HOST_AUTH_METHOD=trust \
	  -e POSTGRES_USER=postgres \
	  -e POSTGRES_DB=resources_db \
	  postgres:16

	sleep 5

	npx prisma migrate dev --name init

	echo "🚀 Ran DB Initialization Script Successfully!!! 🚀"

	pnpm dev

stop:
	docker stop resource-sharing-db || true

hydrate: run
	sleep 3
	PGPASSWORD=postgres psql -h localhost -U postgres -d resources_db -f hydrate.sql

shell:
	docker exec -it resource-sharing-db psql -U postgres -d resources_db
