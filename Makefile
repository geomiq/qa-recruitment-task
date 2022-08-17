# Commands which do not create any artifacts i.e. files.
.PHONY: help stop

# Variables.
GREEN := "'\033[0;32m'"
COLOR_OFF := "'\033[0m'"

help: ## List the available commands.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

start: ## Setup the local environment.
	cp -n backend/.env.example backend/.env
	docker-compose up -d webserver
	docker-compose exec backend composer install
	docker-compose exec backend php artisan key:generate
	docker-compose exec backend php artisan migrate
	docker-compose run --rm frontend npm install
	docker-compose up -d frontend
	@echo "$(GREEN)"
	@echo "Local Frontend server: http://localhost:8080"
	@echo "Local Backend server: http://localhost:8000$(COLOR_OFF)"
logs: ## Show the backend debug log.
	docker-compose logs -f --tail=150 backend
refresh: ## Destroy and then recreate containers.
	docker-compose down
	docker-compose up -d
destroy: ## Remove all containers and volumes.
	docker-compose down -v --remove-orphans
