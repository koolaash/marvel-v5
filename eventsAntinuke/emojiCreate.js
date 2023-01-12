module.exports = async (client) => {
    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("emojiCreate", async (emoji) => {

        try {
            const auditLogs = await emoji.guild.fetchAuditLogs({ limit: 1, type: "EMOJI_CREATE" }),
                logs = auditLogs?.entries?.first();

            if (!logs) {
                return client.auditError.send(`${emoji.guild.name} Unable to fetch the audit log data`);
            };

            const { executor, target } = logs,
                embed = new MessageEmbed()
                    .setColor(client.color.cf)
                    .setAuthor({
                        name: "Security Update : Type Emoji Delete",
                        iconURL: executor.displayAvatarURL({ dynamic: true })
                    })
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setThumbnail(emoji.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: "Emoji", value: `**Name :** ${emoji.name}\n**ID : **${emoji.id}` },
                        { name: "Deleted By", value: `**Tag : **${emoji.tag}\n**ID : **${emoji.id}` }
                    );

            const antinuke = quick.get(`${emoji.guild.id}_antinuke`);
            let trusted = await db.get(`${emoji.guild.id}_trusted.whitelisted`);

            if (executor.id === emoji.guild.ownerId) return;
            if (executor.id === client.user.id) return;

            if (antinuke !== true) return;
            if (target.id !== emoji.id) return;

            if (trusted !== null) {
                if (trusted.includes(executor.id)) { return; };
            };

            let whitelisted = await db.get(`${emoji.guild.id}_whitelisted.whitelisted`);

            if (whitelisted !== null) {
                if (whitelisted.includes(executor.id)) { return; };
            };

            try {
                await emoji.guild.members.ban(executor.id, {
                    reason: "SECURITY AUTOMOD - [ Deleting Emoji ]"
                });
                embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
            } catch {
                embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
            };

            await emoji.delete({ reason: "Emoji created by non whitelisted user" }).catch(() => null);

            let owner = await emoji.guild.members.fetch(emoji.guild.ownerId).catch(() => null);
            return owner.send({ embeds: [embed] });

        } catch (err) {
            return client.antiNukeError.send(`\`\`\`js\n${emoji.guild.name}\n${err.stack}\`\`\``);
        };
    });
};