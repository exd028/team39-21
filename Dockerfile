FROM python:3.8.3-alpine

WORKDIR /venture
ADD ./requirements.txt /app/website/


RUN pip install --upgrade pip
RUN pip install gunicorn
RUN pip install --requirement /app/website/requirements.txt


ADD ./website /app/website
