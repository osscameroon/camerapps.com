# Configuration and run of camerapps backend


## General

- Make sure to have python >= 3.6 and that venv or virtualenv is available
- Clone and go inside the project dir
- Create the virtual environment `python3.6 -m venv venv`
- Activate it `source venv/bin/activate`
- install the requirements `pip install -r requirements.txt`
- Migrate the database `python manage.py makemigrations`
- `python manage.py migrate`
- Create a superuser `python manage.py createsuperuser`


## Development

- Start the server `python manage.py runserver`
- open your browser to http://localhost:8000/api/docs/


## Production

- Generate staticfiles `python manage.py collectstatic`
- Create a postgres/mysql database https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04
- edit camerapps/settings.py and comment the database configuration of sqlite to database configuration of postgres accorting to the database your setup
- Create a service via systemd or supervisor. The command line to start is

`/path/to/the/project/venv/bin/gunicorn camerapps.wsgi:application -w 1 -b unix:/tmp/camerapps-backend.sock`

- Depending of the service controler your user systemd/supervisord configure the logs to be able to see any error
- Activate the service and check the logs `sudo systemctl enable your-service & sudo systemctl start your-service` or `sudo supervisorctl reread & ssudo upervisorctl update`
- Create a nginx configuration like this

```
upstream camerappsbackend {
    server unix:/tmp/camerapps-backend.sock;
}

server {
    server_name camerapps.com;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root /path/to/the/project/backend;
    }

    location / {
        include proxy_params;
        proxy_set_header X-Forwarded-SSL 'on';
        proxy_set_header X-Forwarded-Protocol $scheme;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Referer $http_referer;
        add_header Referer $http_referer;
    }


    listen 80;

}

```

- Check if any error `sudo nginx -t`
- if all ok, Reload nginx `sudo systemctl reload nginx`
