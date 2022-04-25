FROM node

COPY ["package-lock.json","package.json","/home/Proyecto/"]

WORKDIR /home/Proyecto/

RUN npm install


COPY ["./Backend/","./Backend"]

WORKDIR /home/Proyecto/Backend

EXPOSE 8080

CMD ["npx","nodemon","/Backend/index.js"]