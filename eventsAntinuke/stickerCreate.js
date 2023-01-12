module.exports = async (client) => {
    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("stickerCreate", async (sticker) => {

        try {
            const auditLogs = await sticker.guild.fetchAuditLogs({ limit: 1, type: "STICKER_CREATE" }),
                logs = auditLogs?.entries?.first();

            if (!logs) {
                return client.auditError.send(`${sticker.guild.name} Unable to fetch the audit log data`);
            };

            const { executor, target } = logs,
                embed = new MessageEmbed()
                    .setColor(client.color.cf)
                    .setAuthor({
                        name: "Security Update : Type Sticker Create",
                        iconURL: executor.displayAvatarURL({ dynamic: true })
                    })
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setThumbnail(sticker.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: "Sticker", value: `**Name :** ${sticker.name}\n**ID : **${sticker.id}` },
                        { name: "Created By", value: `**Tag : **${sticker.tag}\n**ID : **${sticker.id}` }
                    );

            const antinuke = quick.get(`${sticker.guild.id}_antinuke`);
            let trusted = await db.get(`${sticker.guild.id}_trusted.whitelisted`);

            if (executor.id === sticker.guild.ownerId) return;
            if (executor.id === client.user.id) return;

            if (antinuke !== true) return;
            if (target.id !== sticker.id) return;

            if (trusted !== null) {
                if (trusted.includes(executor.id)) { return; };
            };

            let whitelisted = await db.get(`${sticker.guild.id}_whitelisted.whitelisted`);

            if (whitelisted !== null) {
                if (whitelisted.includes(executor.id)) { return; };
            };

            try {
                await sticker.guild.members.ban(executor.id, {
                    reason: "SECURITY AUTOMOD - [ Creating Sticker ]"
                });
                embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
            } catch {
                embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
            };

            await sticker.delete({ reason: "Sticker created by non whitelisted user" }).catch(() => null);

            let owner = await sticker.guild.members.fetch(sticker.guild.ownerId).catch(() => null);
            return owner.send({ embeds: [embed] });

        } catch (err) {
            return client.antiNukeError.send(`\`\`\`js\n${sticker.guild.name}\n${err.stack}\`\`\``);
        };
    });
};