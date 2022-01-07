build:
	docker-compose build

up:
	yarn && docker-compose up -d
	@echo 🚀Runnning http://localhost:4000
	
ps:
	docker-compose ps

work:
	docker exec -it app bash

down:
	docker-compose down

stop:
	docker-compose stop

generate:
	yarn prisma:generate

lint:
	yarn fix