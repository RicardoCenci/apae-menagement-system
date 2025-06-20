ifeq ($(OS),Windows_NT)
    DOCKER_COMPOSE := docker compose
    COPY_CMD := copy
    SHELL := cmd.exe
else
    DOCKER_COMPOSE := $(shell if docker compose version > /dev/null 2>&1; then echo "docker compose"; else echo "docker-compose"; fi)
    COPY_CMD := cp
    SHELL := /bin/sh
endif

%:
	@echo "No rule to make target '$@'"

up:
	$(DOCKER_COMPOSE) up -d --build

down:
	$(DOCKER_COMPOSE) down

setup: up
	@composer install
	@$(COPY_CMD) .env.example .env
	@php artisan key:generate
	@php artisan jwt:secret --force
	@php artisan migrate:fresh
	@npm install

clean:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
