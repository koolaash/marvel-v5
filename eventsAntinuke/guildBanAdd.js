module.exports = async (client) => {

    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("guildBanAdd", async (member) => {

        setTimeout(async () => {
            try {
                const auditLogs = await member.guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" }),
                    logs = auditLogs?.entries?.first();

                if (!logs) {
                    return client.auditError.send(`${member.guild.name} Unable to fetch the audit log data`);
                };

                const { executor, target } = logs,
                    embed = new MessageEmbed()
                        .setColor(client.color.cf)
                        .setAuthor({
                            name: "Security Update : Type Ban",
                            iconURL: executor.displayAvatarURL({ dynamic: true })
                        })
                        .setFooter({
                            text: client.user.tag,
                            iconURL: client.user.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setThumbnail(member.guild.iconURL({ dynamic: true }))
                        .addFields(
                            { name: "User Banned", value: `${target.tag}` },
                            { name: "Banned By", value: `**Tag : **${executor.tag}\n**ID : **${executor.id}` }
                        );

                const antinuke = quick.get(`${member.guild.id}_antinuke`);
                const trusted = await db.get(`${member.guild.id}_trusted`);
                let wluser = await db.get(`${member.guild.id}_whiteised`);

                if (executor.id === member.guild.ownerId) return;
                if (executor.id === client.user.id) return;

                if (antinuke !== true) return;
                if (trusted) {
                    if (trusted.includes(executor.id)) return;
                };

                if (wluser) { } else { wluser = ["1"] };
                if (!wluser.includes(executor.id)) {
                    try {
                        await member.guild.members.ban(executor.id, {
                            reason: "SECURITY AUTOMOD - [ Banning Members ]"
                        });
                        embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
                    } catch {
                        embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
                    };
                };

                await member.guild.members.unban(target.id).catch(() => null);

                let owner = await member.guild.members.fetch(member.guild.ownerId).catch(() => null);
                return owner.send({ embeds: [embed] });

            } catch (err) {
                return client.antiNukeError.send(`\`\`\`js\n${err.stack}\`\`\``);
            };
        }, 300);
    });
};