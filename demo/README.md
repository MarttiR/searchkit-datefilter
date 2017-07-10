# searchkit-datefilter demo

## Requirements

Recent version of Docker.

## Setup

Run:

```
./setup.sh
```

This will:

- Launch a docker container with elasticsearch 2.4 mapped to `localhost:9300` by default.
- Configure elasticsearch (allow CORS).
- Feed test data to elasticsearch.

Then:

```
npm run demo
```
