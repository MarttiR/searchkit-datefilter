#!/usr/bin/env bash

# Bail on errors.
set -e

SCRIPT_DIR=$(dirname "$(readlink -f "$BASH_SOURCE")")

: ${CONTAINER_NAME:="datefilter_demo_es"}
: ${ES_CONFIG:="/usr/share/elasticsearch/config/elasticsearch.yml"}
: ${ES_HOST:="localhost"}
: ${ES_PORT:="9300"}

# Start a docker container.
echo "Starting ES container."
docker run -p $ES_PORT:9200 -e "discovery.type=single-node" -d --name $CONTAINER_NAME docker.elastic.co/elasticsearch/elasticsearch:6.3.2

# Write ES settings.
echo "Writing ES config to $ES_CONFIG."
docker exec -i $CONTAINER_NAME dd of=$ES_CONFIG < $SCRIPT_DIR/data/elasticsearch.yml

# Restart container.
echo "Restarting container."
docker restart $CONTAINER_NAME

# Wait until ES is available.
printf "Waiting for elasticsearch to become available."
until curl -s -o /dev/null -XGET "http://$ES_HOST:$ES_PORT/_search"; do
  >&2 printf "."
  sleep 1
done

>&2 printf "ready."

# Delete index (if it exists).
# printf "Attempting to delete previous index."
# curl -s -S -XDELETE "http://$ES_HOST:$ES_PORT/events"

# Create mapping for data. Note the trailing slash.
printf "\n\nCreating mapping."
curl --silent --show-error --output /dev/null -XPUT "http://$ES_HOST:$ES_PORT/events/" -H 'Content-Type: application/json' --data-binary @$SCRIPT_DIR/data/calendar-mappings.json

# Insert data.
printf "\n\nInserting data."
curl --silent --show-error --output /dev/null -XPOST "http://$ES_HOST:$ES_PORT/_bulk" -H 'Content-Type: application/json' --data-binary @$SCRIPT_DIR/data/calendar-data.ndjson

printf "\n\nElasticsearch setup done, next: 'npm run demo'.\n\n"
