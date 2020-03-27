import { Message, MessageEmbed } from "discord.js";
import { Command } from "../../domain/Command";
import sequelize from "../../models/sequelize";
import { client } from "../../main";

class Leaders extends Command {
    constructor(){
        super({
            name: "leaders",
            usage: ">leaders",
            description: "Команда позволяющая увидеть топ самых активных пользователей сервера!",
            category: "fun",
            aliases: ["top","lead"]
        });
    }
    async run(message: Message, args: Array<string>) {
        var top = await sequelize.models.profiles.findAll({where:{guildID:message.guild!.id} ,order:[['lvl','DESC']], limit: 10})
        var string = "";    
        for (let index = 0; index < top.length; index++) {
            const element = top[index];
            if(index === 0){
                string += `🌟 #1. ${element.userDisplayName}\n**Уровень:** ${element.lvl} | **Опыт:** ${element.xp} | 🍖 ${element.reputation} | 💰 ${element.coins}\n`
            }else{
                if (index <= 2){
                    string += `⭐ #${index + 1}. ${element.userDisplayName}\n**Уровень:** ${element.lvl} | **Опыт:** ${element.xp} | 🍖 ${element.reputation} | 💰 ${element.coins}\n`  
                }else{
                    string += `#${index + 1}. ${element.userDisplayName}\n**Уровень:** ${element.lvl} | **Опыт:** ${element.xp} | 🍖 ${element.reputation} | 💰 ${element.coins}\n`
                }
            }  
        }
        const embed = new MessageEmbed()
            .setTitle(`🏆 Топ рейтинга участников ${message.guild?.name}`)
            .setDescription(string)
            .setTimestamp()
            .setThumbnail((message.guild?.iconURL({format: 'png'}) as any))
            .setFooter(`Woolfie 2020 Все права загавканы.`,(client.user?.avatarURL({format: 'png'}) as any))
        message.channel.send(embed)
    }
}

export = Leaders;