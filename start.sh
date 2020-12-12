#!/bin/bash

echo "starting start script"

echo "moving .env"

cp .env build/.env

echo "making build database folder"

mkdir build/database/db

echo "moving database"

cp database/db/sigalei.sqlite build/database/db/sigalei.sqlite

echo "serving app"

yarn start
