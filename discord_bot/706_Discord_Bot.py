"""
This is a discod bot for use in the 706 discord.

Author: Kyle Mahan
"""

import os

import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD = os.getenv('DISCORD_GUILD')

client = discord.Client()

@client.event
async def on_ready():
    # Connect to the specified Guilds (Servers)
    for guild in client.guilds:
        if guild.name == GUILD:
            break

    # Print a message for the server that you joined
    print(
        f'{client.user} is connected to the following guild:\n'
        f'{guild.name}(id: {guild.id})'
    )

    # Add in additional commands now

    # Example command to print server members
    members = '\n - '.join([member.name for member in guild.members])
    print(f'Guild Members:\n - {members}')

    # Trying to list the channels
    channels = '\n - '.join([channel.name for channel in guild.channel])

"""
# Trying a new client event to monitor messages in the dev channel
@client.event
async def on_message(message)
    if message.channel != "bot-dev"
        return
    
    elif
"""

client.run(TOKEN)