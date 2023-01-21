# Medbikri_Backend

Medbikri Backend Assessment - using youtube data api v3

## API

##### GET /

- request
- response: An html file, which allows to search for a particular video

##### PUT /video -- searches for a video stored in DB

- request
  - body: { titleofvideo, descriptionofvideo }
- response:
  - status: 200, body: {data}
  - status: 404, body: { message: 'not found' }

##### GET /multiplevideos?page=1 --get stored videos in DB in paginated form sorted in published date

- request
  - query: page -- by default value is 1
- response:
  - status: 200, body: {data}
  - status: 404, body: { message: 'not found' }

## .env setup

## Postgres DB config requires these fields in .env

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

## PORT and Response data per page

LIST_PER_PAGE=10
PORT=8080

## Youtube Data API key

API_KEY=

## URL and SEARCH Query

URLENDPOINT="https://www.googleapis.com/youtube/v3/search?key="
SEARCHEDQUERY=

## Setup

## Installation

```bash
$ npm install
```

## Running the app

```bash
# start server
$ npm run start

# development
$ npm run dev
```
