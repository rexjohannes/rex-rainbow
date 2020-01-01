const Discord = require('discord.js');
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const colors = ["FF0D00","FF2800","FF3D00","FF4F00","FF5F00","FF6C00","FF7800","FF8300","FF8C00","FF9500","FF9E00","FFA500","FFAD00","FFB400","FFBB00","FFC200","FFC900","FFCF00","FFD600","FFDD00","FFE400","FFEB00","FFF200","FFFA00","F7FE00","E5FB00","D5F800","C6F500","B7F200","A8F000","98ED00","87EA00","74E600","5DE100","41DB00","1DD300","00C618","00BB3F","00B358","00AC6B","00A67C","009E8E","028E9B","06799F","0969A2","0C5DA5","0E51A7","1047A9","133CAC","1531AE","1924B1","1F1AB2","2A17B1","3415B0","3C13AF","4512AE","4E10AE","560EAD","600CAC","6A0AAB","7608AA","8506A9","9702A7","AD009F","BC008D","C7007D","D0006E","D8005F","DF004F","E7003E","EF002A","F80012"];
const stop = [];
async function color () {
    forEachTimeout(colors, (color) => {
        client.guilds.forEach((guild) => {
                if (!stop.includes(guild.id)) {
                let role = guild.roles.find('name', 'Rainbow');
                if (role && role.editable) 
                    role.setColor(color);
            }  
        })
    }, 5000).then(color); //1500
}
client.on('ready', () => {
    console.log("Ready");
    client.user.setActivity("RainBow Role | rex+");
    color();
});
client.on('guildCreate', (guild) => {
    let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
    if (channels.size > 0) channels.first().send('Thanks for adding Rex-RainBow.');
});
client.on('message', (message) => {
    if (message.channel.type !== 'text') return;
    if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR') || message.member.id === message.guild.owner.id) {
        if (message.content === 'rex+stop') {stop.push(message.guild.id); return message.channel.send('Stoped');}
        if (message.content === 'rex+start') {stop.splice(stop.indexOf(message.guild.id),1); return message.channel.send('Started');}
        if (message.content === "rex+help"){
          message.channel.send(`Help:
          rex+start (Start the Rainbow Role)
          rex+stop (Stop the Rainbow Role)
          rex+setup (Sent you the Setup)
          rex+invite (Sent you the Invite)
          rex+support (Sent you the Invite to the Support Server)`)
        }
        if (message.content === "rex+setup"){
          message.channel.send(`Setup:
          Create a Role with the Name "Rainbow" and give the bot a Role above this Role. Now the Bot works. If the Bot dont works join the Support Server and ask for Help https://discord.gg/gCPFbBM`)
        }
        if (message.content === "rex+invite"){
          message.channel.send("Invite me here: https://discordapp.com/oauth2/authorize?client_id=658645614950612993&permissions=8&scope=bot")
        }
        if (message.content === "rex+support"){
          message.channel.send("Join my Support Server: https://discord.gg/gCPFbBM")
        }
    }
})
client.login(process.env.TOKEN);
