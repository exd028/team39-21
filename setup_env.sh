echo DEBUG=0 >> .env
echo DB_ENGINE=django.db.backends.postgresql_psycopg2 >> .env
echo DATABASE=postgres >> .env

echo SECRET_KEY=$SECRET_KEY >> .env
echo ENV_API_SERVER=http://159.65.85.226
echo DB_DATABASE=$DATABASE_NAME >> .env
echo DB_USER=$DATABASE_USER >> .env
echo DB_PASSWORD=$DATABASE_PASS >> .env
echo DB_HOST=$DATABASE_HOST >> .env
echo DB_PORT=25060 >> .env
echo WEB_IMAGE=$IMAGE:web  >> .env
echo NGINX_IMAGE=$IMAGE:nginx  >> .env
echo CI_REGISTRY_USER=$CI_REGISTRY_USER   >> .env
echo CI_JOB_TOKEN=$CI_JOB_TOKEN  >> .env
echo CI_REGISTRY=$CI_REGISTRY  >> .env
echo IMAGE=$CI_REGISTRY/$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME >> .env
echo ENV_API_SERVER=$ENV_API_SERVER >> .env


