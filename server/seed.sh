#!/bin/bash
rm -rf TheHopeAppapi/migrations
rm db.sqlite3
python3 manage.py migrate
python3 manage.py makemigrations TheHopeAppapi
python3 manage.py migrate TheHopeAppapi
python3 manage.py loaddata users
python3 manage.py loaddata tokens
python3 manage.py loaddata categories
python3 manage.py loaddata posts
python3 manage.py loaddata comments
python3 manage.py loaddata contacts
python3 manage.py loaddata rehab