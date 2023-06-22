FROM python:3.11.2-slim
WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8080

ENV PORT=8080
ENV HOST='0.0.0.0'

CMD [ "python3", "app.py"]