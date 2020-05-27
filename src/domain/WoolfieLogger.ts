import {GuildMember, MessageEmbed, TextChannel, User} from "discord.js";
import {client} from "../main";

interface WoolfieLoggerData {
    type: string
    actionType: string
    guildID: string;
    producer?: User | null;
    description?: string
    footer?: string
    channel?: TextChannel | null;
    punished?: GuildMember | null;
}

class WoolfieLogger {

    readonly type: string;
    readonly actionType: string;
    readonly guildID: string;
    readonly producer?: User| null;
    readonly description?: string;
    readonly footer?: string;
    readonly channel?: TextChannel | null;
    readonly punished?: GuildMember | null;

    constructor(data: WoolfieLoggerData) {
        this.type = data.type;

        this.actionType = data.actionType;

        this.guildID = data.guildID;

        this.producer = data.producer ? data.producer : null;

        this.description = data.description ? data.description : "";

        this.footer = data.footer ? data.footer : "";

        this.channel = data.channel ? data.channel : null;

        this.punished = data.punished ? data.punished : null;
    }

    public async Logger() {
        switch (this.type) {
            case "notify":
                let embed: MessageEmbed = new MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("📢 " + this.actionType)
                    .setDescription(this.description)
                    .setTimestamp()
                if(this.producer) {
                    embed.addField('Автор', `**${this.producer.username} (<@${this.producer.id}>)**`, true)
                }
                if(this.footer) {
                    embed.setFooter(this.footer);
                }
                if(this.channel) {
                    embed.addField('Канал', `**${this.channel.name} (<#${this.channel.id}>)**`, true)
                }
                let guild = await client.provider.getGuild(this.guildID);
                let loggingChannel: string | null = guild.loggingChannel;
                if(loggingChannel) {
                    let channel: TextChannel = <TextChannel>await client.guilds.cache.get(this.guildID)?.channels.cache.get(loggingChannel);
                    await channel.send(embed);
                }
                break;
            case "warning":
                let embed1: MessageEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle("⚠ " + this.actionType)
                    .setDescription(this.description)
                    .setTimestamp()
                if(this.producer) {
                    embed1.addField('Автор', `**${this.producer.username} (<@${this.producer.id}>)**`, true)
                }
                if(this.footer) {
                    embed1.setFooter(this.footer);
                }
                if(this.channel) {
                    embed1.addField('Канал', `**${this.channel.name} (<#${this.channel.id}>)**`, true)
                }
                let guild1 = await client.provider.getGuild(this.guildID);
                let loggingChannel1: string | null = guild1.loggingChannel;
                if(loggingChannel1) {
                    let channel: TextChannel = <TextChannel>await client.guilds.cache.get(this.guildID)?.channels.cache.get(loggingChannel1);
                    await channel.send(embed1);
                }
                break;
            case "moderation":
                let embed2: MessageEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setTitle("<:monkaTOS:710886743502618755> " + this.actionType)
                    .setDescription(this.description)
                    .setTimestamp()
                if(this.footer) {
                    embed2.setFooter(this.footer);
                }
                if(this.producer) {
                    embed2.addField('Модератор', `**${this.producer.username} (<@${this.producer.id}>)**`, true)
                }
                if(this.punished) {
                    embed2.addField('Наказуемый', `**${this.punished.user.username} (<@${this.punished.id}>)**`, true)
                }
                let guild2 = await client.provider.getGuild(this.guildID);
                let loggingChannel2: string | null = guild2.loggingChannel;
                if(loggingChannel2) {
                    let channel: TextChannel = <TextChannel>await client.guilds.cache.get(this.guildID)?.channels.cache.get(loggingChannel2);
                    await channel.send(embed2);
                }
                break;
            case "srvupd":
                let embed3: MessageEmbed = new MessageEmbed()
                    .setColor("YELLOW")
                    .setTitle("📤 " + this.actionType)
                    .setDescription(this.description)
                    .setTimestamp()
                if(this.footer) {
                    embed3.setFooter(this.footer);
                }
                if(this.producer) {
                    embed3.addField('Исполнитель', `**${this.producer.username} (<@${this.producer.id}>)**`, true)
                }
                if(this.channel) {
                    embed3.addField('Канал', `**${this.channel.name} (<#${this.channel.id}>)**`, true)
                }
                let guild3 = await client.provider.getGuild(this.guildID);
                let loggingChannel3: string | null = guild3.loggingChannel;
                if(loggingChannel3) {
                    let channel: TextChannel = <TextChannel>await client.guilds.cache.get(this.guildID)?.channels.cache.get(loggingChannel3);
                    await channel.send(embed3);
                }
                break;
            default:
                console.log("Произошла ошибка при логировании действия.")
                break;
        }
    }

}

export = WoolfieLogger;