#!/bin/bash

# TITLE="" SEASON="" EPISODE="" DESCRIPTION="" OWNER="" TOKEN=""

API="http://localhost:4741"
URL_PATH="/anime"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "anime": {
      "title": "'"${TITLE}"'",
      "season": "'"${SEASON}"'",
      "episode": "'"${EPISODE}"'",
      "description": "'"${DESCRIPTION}"'",
      "owner": "'"${OWNER}"'"
    }
  }'

echo
