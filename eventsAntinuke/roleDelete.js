module.exports = async (client) => {

    const db = client.qdb,
        quick = require('quick.db'),
        { MessageEmbed } = require('discord.js');

    client.on("roleDelete", async (role) => {

        try {
            const auditLogs = await role.guild.fetchAuditLogs({ limit: 1, type: "ROLE_DELETE" }),
                logs = auditLogs?.entries?.first();

            if (!logs) {
                return client.auditError.send(`${role.guild.name} Unable to fetch the audit log data`);
            };

            const { executor, target } = logs,
                embed = new MessageEmbed()
                    .setColor(client.color.cf)
                    .setAuthor({
                        name: "Security Update : Type Role Delete",
                        iconURL: executor.displayAvatarURL({ dynamic: true })
                    })
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setThumbnail(role.guild.iconURL({ dynamic: true }))
                    .addFields(
                        { name: "Role", value: `**Name :** ${role.name}\n**ID : **${role.id}` },
                        { name: "Deleted By", value: `**Tag : **${executor.tag}\n**ID : **${executor.id}` }
                    );

            const antinuke = quick.get(`${role.guild.id}_antinuke`);
            let trusted = await db.get(`${role.guild.id}_trusted.whitelisted`);
            let wluser = await db.get(`${role.guild.id}_whiteised.whitelisted`);

            if (executor.id === role.guild.ownerId) return;
            if (executor.id === client.user.id) return;

            if (antinuke !== true) return;
            if (target.id !== role.id) return;

            if (trusted) { } else { trusted = ["1"] };
            if (trusted) {
                if (trusted.includes(executor.id)) return;
            };

            if (wluser) { } else { wluser = ["1"] };
            if (wluser) {
                if (wluser.includes(executor.id)) return;
            };

            try {
                await role.guild.members.ban(executor.id, {
                    reason: "SECURITY AUTOMOD - [ Deleting Role ]"
                });
                embed.addFields({ name: `Banned`, vlaue: "Yep Banned The Imposter" });
            } catch {
                embed.addFields({ name: `Banned`, value: "Nope - `Unable To Ban This User`" });
            };

            let owner = await role.guild.members.fetch(role.guild.ownerId).catch(() => null);
            return owner.send({ embeds: [embed] });

        } catch (err) {
            return client.antiNukeError.send(`\`\`\`js\n${role.guild.name}\n${err.stack}\`\`\``);
        };
    });
};