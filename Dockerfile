FROM denoland/deno:latest as base

WORKDIR /app

COPY . .

RUN deno cache src/main.ts

CMD ["run", "--allow-env", "--allow-net", "src/main.ts"]