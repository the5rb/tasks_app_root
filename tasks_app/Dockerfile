FROM python:3.10-slim


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        libc-dev \
        postgresql-client \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /tasks_app

COPY requirements.txt /tasks_app/
RUN pip install --no-cache-dir -r requirements.txt

COPY . /tasks_app/

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]