import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const SET_DESKTOP = {
    name: "setdesktop",
    type: 1,
    description: "Set listener's desktop background",
    options: [
        {
            type: 11,
            name: "image",
            description: "Image to set listener desktop backgrounds to",
            required: true,
        },
    ],
    integration_types: [1],
    contexts: [2],
};

const ALL_COMMANDS = [
    SET_DESKTOP
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);