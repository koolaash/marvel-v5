module.exports = async (client) => {

    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("channelDelete", async (channel) => {

        try {
            const auditLogs = await channel.guild.fetchAuditLogs({ limit: 1, type: "CHANNEL_DELETE" }),
                logs = auditLogs?.entries?.first();

            if (!logs) {
                return client.auditError.send(`${channel.guild.name} Unable to fetch the audit log data`);
            };

            const { executor, target } = logs,
                embed = new MessageEmbed()
                    .setColor(client.color.cf)
                    .setAuthor({
                        name: "Security Update : Type Channel Delete",
                        iconURL: executor.displayAvatarURL({ dynamic: true })
                    })
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setThumbnail(channel.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: "Channel", value: `**Name :** ${channel.name}\n**ID : **${channel.id}` },
                        { name: "Deleted By", value: `**Tag : **${executor.tag}\n**ID : **${executor.id}` }
                    );

            const antinuke = quick.get(`${channel.guild.id}_antinuke`);
            let trusted = await db.get(`${channel.guild.id}_trusted.whitelisted`);
            let wluser = await db.get(`${channel.guild.id}_whiteised.whitelisted`);

            if (executor.id === channel.guild.ownerId) return;
            if (executor.id === client.user.id) return;

            if (antinuke !== true) return;
            if (target.id !== channel.id) return;

            if (trusted) { } else { trusted = ["1"] };
            if (trusted) {
                if (trusted.includes(executor.id)) return;
            };

            if (wluser) { } else { wluser = ["1"] };
            if (wluser) {
                if (wluser.includes(executor.id)) return;
            };

            try {
                await channel.guild.members.ban(executor.id, {
                    reason: "SECURITY AUTOMOD - [ Deleting Channel ]"
                });
                embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
            } catch {
                embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
            };

            // await channel.delete().catch(() => null);

            let owner = await channel.guild.members.fetch(channel.guild.ownerId).catch(() => null);
            return owner.send({ embeds: [embed] });

        } catch (err) {
            return client.antiNukeError.send(`\`\`\`js\n${channel.guild.name}\n${err.stack}\`\`\``);
        };
    });
};