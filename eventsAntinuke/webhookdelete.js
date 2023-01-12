module.exports = async (client) => {

    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("webhookdelete", async (webhook) => {

        try {
            const auditLogs = await webhook.guild.fetchAuditLogs({ limit: 1, type: "WEBHOOK_CREATE" }),
                logs = auditLogs?.entries?.first();

            if (!logs) {
                return client.auditError.send(`${webhook.guild.name} Unable to fetch the audit log data`);
            };

            const { executor, target } = logs,
                embed = new MessageEmbed()
                    .setColor(client.color.cf)
                    .setAuthor({
                        name: "Security Update : Type Webhook Delete",
                        iconURL: executor.displayAvatarURL({ dynamic: true })
                    })
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setThumbnail(webhook.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: "Webhook", value: `**Name :** ${webhook.name}\n**ID : **${webhook.id}` },
                        { name: "Deleted By", value: `**Tag : **${executor.tag}\n**ID : **${executor.id}` }
                    );

            const antinuke = quick.get(`${webhook.guild.id}_antinuke`);
            let trusted = await db.get(`${webhook.guild.id}_trusted.whitelisted`);
            let wluser = await db.get(`${webhook.guild.id}_whiteised.whitelisted`);

            if (executor.id === webhook.guild.ownerId) return;
            if (executor.id === webhook.user.id) return;

            if (antinuke !== true) return;
            if (target.id !== webhook.id) return;

            if (trusted) { } else { trusted = ["1"] };
            if (trusted) {
                if (trusted.includes(executor.id)) return;
            };

            if (wluser) { } else { wluser = ["1"] };
            if (wluser) {
                if (wluser.includes(executor.id)) return;
            };

            try {
                await webhook.guild.members.ban(executor.id, {
                    reason: "SECURITY AUTOMOD - [ Deleting Webhook ]"
                });
                embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
            } catch {
                embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
            };

            let owner = await webhook.guild.members.fetch(webhook.guild.ownerId).catch(() => null);
            return owner.send({ embeds: [embed] });

        } catch (err) {
            return client.antiNukeError.send(`\`\`\`js\n${webhook.guild.name}\n${err.stack}\`\`\``);
        };
    });
};