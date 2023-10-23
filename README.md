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

## Improvements

Some of the following were not implemented due to time constraints

First improvement for the app would be to move the generation of the bills to the background. A library such a celery could be useful to not only move the process to the backgroun but to also schedule it to run evry day early in the morning.

Second improvement would be to add authentication, the auth User model that is included in the django admin module was used as the application User model (renamed as Investor). This makes it easier to implement JWT authentication using the library `rest_framework_simplejwt`.

Third improvement would be to add pagination to the list methods of each endpoint. Currently the response is flexible and accounts for the inclusion of pagination further down the line of the development.

The frontend can be improved upon by using a state management library.
