deploy: git-pull
	docker-compose --env-file .env  up --build -d

force-deploy: git-pull
	docker-compose --env-file .env  up -d --build --force-recreate

force-deploy-no-cache: git-pull
	docker-compose --env-file .env  build
	docker-compose --env-file .env  up -d --force-recreate

start-dev:
	yarn run start:dev

install:
	yarn install

start-dev-docker:
	docker-compose -f docker-compose.dev.yaml --project-name radio_crestin_frontend_dev up  --build --force-recreate

git-pull:
	git pull origin main;
