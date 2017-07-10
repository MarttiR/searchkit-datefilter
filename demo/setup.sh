#!/bin/bash

# Bail on errors.
set -e

: ${CONTAINER_NAME:="datefilter_demo_es"}
: ${ES_CONFIG:="/usr/share/elasticsearch/config/elasticsearch.yml"}
: ${ES_HOST:="localhost"}
: ${ES_PORT:="9300"}

# Start a docker container.
echo "Starting ES container."
docker run -p $ES_PORT:9200 -d --name $CONTAINER_NAME elasticsearch:2.4.4

# Write ES settings.
echo "Writing ES config to $ES_CONFIG."
docker exec -i $CONTAINER_NAME dd of=$ES_CONFIG < ./data/elasticsearch.yml

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
curl -s -S -o /dev/null -XPUT "http://$ES_HOST:$ES_PORT/events/" --data-binary @data/calendar-mappings.json

# Insert data.
printf "\n\nInserting data."
curl -s -S -o /dev/null -XPOST "http://$ES_HOST:$ES_PORT/_bulk" --data-binary @data/calendar-data.ndjson

printf "\n\nElasticsearch setup done, next: 'npm run demo'.\n\n"
