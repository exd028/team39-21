# Welcome to Venture:

## Virtual Environment Setup:

### Commands to create virtual environment:

```
python -m venv env
```

#### or try

```
python3 -m venv env
```

### Commands to activate virtual environment:

#### On MacOS and Linux based systems:

```
source env/bin/activate
```

#### On Windows based systems:

```
(WINDOWS) = ./env/Scripts/activate
```

### Command to exit out of virtual environment:

```
deactivate
```

## Syncing dependencies:

### To sync dependencies, run this command in the activated virtual environment:

```
pipenv sync
```

## Running the website:
To run the website, change your database settings to the ones provided in website/settings.py and then:
```
python manage.py runserver 
```

Or create your own database settings in website/settings.py:
```
DATABASES = {
    settings here
}
```

## Running the frontend:
```
cd frontend
npm install
npm start
```

# team39-21
# team39-21
# team39-21
