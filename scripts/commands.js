// Simple test command
export const PING_COMMAND = {
  name: 'ping',
  description: 'pong',
  // chat command (see https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)
  type: 1,
};

export const HELLO_COMMAND = {
    name: 'hello',
    description: 'Says hello to you',
    type: 1,
};

// Command with permission restrictions
export const BAN_COMMAND = {
    name: 'ban',
    description: 'Bans a user from the server.',
    type: 1,
    // This command will be restricted to users with the 'Ban Members' permission
    default_member_permissions: '4', // Ban Members permission bit
    options: [
        {
            name: 'user',
            description: 'The user to ban',
            type: 6, // USER type
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the ban',
            type: 3, // STRING type
            required: false,
        }
    ]
};

export const MUTE_COMMAND = {
    name: 'mute',
    description: 'Mutes a user for a specified duration.',
    type: 1,
    // This command will be restricted to users with the 'Moderate Members' permission
    default_member_permissions: '1099511627776', // Moderate Members permission bit
    options: [
        {
            name: 'user',
            description: 'The user to mute',
            type: 6, // USER type
            required: true,
        },
        {
            name: 'duration',
            description: 'Duration of the mute (e.g., 1h, 1d, 7d)',
            type: 3, // STRING type
            required: true,
        },
        {
            name: 'reason',
            description: 'The reason for the mute',
            type: 3, // STRING type
            required: false,
        }
    ]
};

// Public command
export const JAM_COMMAND = {
    name: 'jam',
    description: 'Creates a Spotify Jam session.',
    type: 1,
    options: [
        {
            name: 'topic',
            description: 'The topic or genre for the jam session',
            type: 3, // STRING type
            required: false,
        }
    ]
};
