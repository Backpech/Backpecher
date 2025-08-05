// This is a mock service to simulate fetching data from the Discord API.
// In a real application, you would use the DISCORD_BOT_TOKEN from your .env.local
// to make authenticated requests to the actual Discord API.

export type User = {
  name: string;
  avatar: string;
  roles: string[];
  initial: string;
};

// Mock function to simulate fetching users from a Discord server
export async function getUsersFromDiscord(): Promise<User[]> {
  // In a real implementation, you'd use a library like discord.js or fetch
  // to get this data from the Discord API.
  console.log('Fetching users from Discord API...');
  
  // Simulating a network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      name: 'BytePioneer',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Admin', 'Developer', 'Early Supporter'],
      initial: 'BP',
    },
    {
      name: 'CodeWrangler',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Moderator', 'Gamer'],
      initial: 'CW',
    },
    {
      name: 'PixelMaverick',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Member', 'Designer', 'Music Enthusiast'],
      initial: 'PM',
    },
    {
      name: 'SynthWave',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Member', 'Gamer'],
      initial: 'SW',
    },
      {
      name: 'DataGuardian',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Moderator', 'VIP'],
      initial: 'DG',
    },
    {
      name: 'GlitchArtist',
      avatar: 'https://placehold.co/100x100.png',
      roles: ['Member', 'Artist'],
      initial: 'GA',
    },
  ];
}
