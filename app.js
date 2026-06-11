import 'dotenv/config';
import express from 'express';

import { InteractionType, InteractionResponseType } from 'discord-interactions';
import { VerifyDiscordRequest, saveHttpImage } from './utils.js';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));
const SAVE_IMG_PATH = "/tmp/desktop-serve-image"
const APPROVED = [];

app.post('/interactions', async function (req, res) {
    const {type, data} = req.body;

    if (type === InteractionType.PING) {
        return res.send({ type: InteractionResponseType.PONG });
    }

    console.log(req.body);

    if (type === InteractionType.APPLICATION_COMMAND) {
        const { name } = data;

        if (name === 'setdesktop') {
            console.log(req.body.data.resolved.attachments)
		    for (const [key, attachment] of Object.entries(req.body.data.resolved.attachments)) {
                console.log(`Attachment ${key} processing (${attachment.url}}`); 
                saveHttpImage(attachment.url, SAVE_IMG_PATH);
            }

    		return res.send({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `woof!`,
                }
            })
        }
    }
})

app.get("/background", async function (req, res) {
    console.log(`Serving desktop-serve-image to ${req.ip}`);
    
	for (const k in APPROVED) {
		if (k == req.ip) { 
			res.download(SAVE_IMG_PATH);
		} else {
			console.log('403: Source Address Unknown / Not Authorized');
			res.status(403).send('Access Denied');
		};
	}

	res.download(SAVE_IMG_PATH);
})

app.listen(port, () => {
    console.log('Listening on port', port)
})
