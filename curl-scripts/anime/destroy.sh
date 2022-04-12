#!/bin/bash

# ID="" TOKEN=""

API="http://localhost:4741"
URL_PATH="/anime"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo
