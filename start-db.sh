set -e

source ./.env

SERVER=$POSTGRES_SERVER_NAME;
USER=$POSTGRES_USER
PW=$POSTGRES_PASSWORD;
DB=$POSTGRES_DB;
PORT=$POSTGRES_PORT;

echo "echo Removendo instancia antiga [$SERVER] e iniciando uma nova instacia de [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$PW \
  -e POSTGRES_USER=$USER \
  -e POSTGRES_PASSWORD=$PW \
  -e POSTGRES_DB=$DB \
  -p $PORT:$PORT \
  -d postgres