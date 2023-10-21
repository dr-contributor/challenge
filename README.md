# Challenge

## Requirements

- Docker desktop installed

## Setup

Run in a terminal from the root folder, the following command:
```
docker-compose up
```

Afterwards, open a new terminal and run the following commands:
```
docker-compose run archimed-api python manage.py createsuperuser --no-input
docker-compose run archimed-api python manage.py loaddata seed
```

This will build the api, front end and populate the database.

## Assumptions

The User model that comes with the django admin module will be used as investor model.

For the invoice (capital bill), the same structure as the example was used, but with the addition of the list of bills each with a short description that mentions the purpose of the charge, i.e. subscription bill or fees bill.
