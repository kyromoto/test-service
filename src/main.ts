import { Logger } from '@onjara/optic'
import { Router } from '@oak/oak/router'
import { Application } from '@oak/oak/application'
import { oakCors as cors } from "@tajpouria/cors";

const logger = new Logger();
const app = new Application();
const router = new Router();

const PORT = Deno.env.get("PORT") || 8000



logger.info('init application')


router.get("/", (ctx) => {
    ctx.response.status = 200
    ctx.response.body = "Hello World"
})

router.get("/hello/:name", (ctx) => {

    try {

        if (!ctx.params.name) {
            throw new Error("name is required")
        }

        ctx.response.status = 200
        ctx.response.body = `Hello ${ctx.params.name}`   

    } catch (error: any) {
        ctx.response.status = 400
        ctx.response.body = error.message || error
    }

})

router.get("/health", (ctx) => {
    ctx.response.status = 200
    ctx.response.body = "OK"
})


app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
    logger.info(`Listening on http://localhost:${PORT}`)
})

app.addEventListener('error', (error) => {
    logger.error(error.message)
})


await app.listen({ port: PORT })