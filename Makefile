run-migration:
	npm run migration:run

gen-mg-cooking-duration:
	npm run migration:generate -- src/migrations/create_cooking_duration

cre-mg-cooking-duration-data:
	npm run migration:create -- src/migrations/cooking_duration-data
