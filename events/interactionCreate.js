const { Permissions } = require('discord.js');

module.exports.run = async (client, interaction) => {
    if (interaction.isCommand() || interaction.isContextMenu()) {
        const SlashCommands = client.slashCommands.get(interaction.commandName);

        if (!SlashCommands) return;

        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.SEND_MESSAGES)) {
            return await interaction.user.dmChannel.send({
                content: `I don't have **\`SEND_interactionS\`** permission in <#${interaction.channelId}> to execute this **\`${SlashCommands.name}\`** command.`,
            });
        };

        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.VIEW_CHANNEL)) return;

        if (!interaction.guild.me.permissionsIn(interaction.channel).has(Permissions.FLAGS.EMBED_LINKS)) {
            return await interaction.reply({
                content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${SlashCommands.name}\`** command.`,
                ephemeral: true,
            });
        };

        if (!interaction.member.permissionsIn(interaction.channel).has(SlashCommands.botPrams || [])) {
            return await interaction.reply({
                content: `I Need Permission to Work this \`${SlashCommands.botPrams.join(', ')}\``,
                ephemeral: true,
            });
        };

        if (!interaction.guild.me.permissionsIn(interaction.channel).has(SlashCommands.userPrams || [])) {
            return await interaction.reply({
                content: `You Need this \`${SlashCommands.userPrams.join(', ')}\` Permission to Work this command!`,
                ephemeral: true,
            });
        };

        const args = {};
        for (const option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args[option.name] = true;
                option.options?.forEach((x) => {
                    args[x.name] = x.value;
                });
            } else if (option.value) {
                args[option.name] = option.value;
            };
        };

        try {
            await SlashCommands.run(client, interaction, args);
        } catch (error) {
            return client.slashError.send(`\`\`\`js\n${error.stack}\`\`\``) &&
                interaction.reply({ content: `\`\`\`js\n${error.stack}\`\`\``, ephemeral: true });
        };
    };
};
