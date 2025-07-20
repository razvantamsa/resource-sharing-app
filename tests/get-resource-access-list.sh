#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <resource_id>"
    exit 1
fi

RESOURCE_ID="$1"
curl -X GET "http://localhost:3000/resource/${RESOURCE_ID}/access-list"