FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get update -y

RUN apt-get install -y nodejs


COPY . .
RUN npm install 

EXPOSE 5677


ENTRYPOINT ["node","index.js"]

# docker build -t name . (publish kai liye)
# iske baad image aayegi jiske andar upar likhi sari confi hogi
