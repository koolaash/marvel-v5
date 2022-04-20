const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js"),
    db = require("quick.db"),
    discord = require("discord.js");

module.exports = function (client, options) {
    const description = {
        name: "ticketing",
        filename: "ticketing.js",
        version: "2.1",
    };
    console.log(
        ` :: ⬜️ Loaded : ${description.name} from ("${description.filename}")`.blue
    );

    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        let button = interaction
        if (button.message.author.id !== client.user.id) return;
        try {
            if (button.customId === "marvel_gen") {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"` permissions first', ephemeral: true })
                }
                let tch = db.get("tch" + button.user.id),
                    tchc = button.guild.channels.cache.get(tch),
                    target = button.guild.members.cache.get(button.user.id);

                if (!target || target === undefined) {
                    target = await button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (tchc) {
                    button.reply({
                        content: `<@${button.user.id}> You already have a ticket created\nEither ask any admin if there is a problem`,
                        ephemeral: true
                    });
                } else if (!tchc) {
                    let tcs = db.get(`ticket-no${button.channel.id}`),
                        modrole = db.get(`ticketRole${button.guild.id}`),
                        mods = false;
                    if (modrole !== undefined) {
                        if (modrole !== null) {
                            mods = button.guild.roles.cache.get(modrole);
                        }
                    }
                    button.guild.channels
                        .create(`${button.channel.name}-${tcs}`, {
                            reason: `Ticket Created By : ${target.user.tag}`,
                        })
                        .then((Channel) => {
                            Channel.permissionOverwrites.edit(Channel.guild.roles.everyone, {
                                VIEW_CHANNEL: false,
                            }) &&
                                Channel.permissionOverwrites.edit(
                                    button.guild.members.cache.get(button.user.id),
                                    {
                                        SEND_MESSAGES: true,
                                        VIEW_CHANNEL: true,
                                        ATTACH_FILES: true,
                                    }
                                ) &&
                                db.set(`tch${button.user.id}`, Channel.id) &&
                                db.add(`ticket-no${button.channel.id}`, 1) &&
                                db.set(`tow${Channel.id}`, target.id);
                            if (mods !== false) {
                                Channel.permissionOverwrites.edit(mods, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                    ATTACH_FILES: true,
                                });
                            }
                            const close = new MessageButton()
                                .setStyle("DANGER")
                                .setLabel("Close")
                                .setEmoji("🔒")
                                .setCustomId("marvel_close")
                                .setDisabled(false),
                                embed = new MessageEmbed()
                                    .setDescription(
                                        `Support will be with you shortly.\nTo close this ticket click the lock button.\n${target.user}`
                                    )
                                    .setColor(client.embed.cm)
                                    .setFooter({
                                        text: "Marvel - Ticketing Without Clutter",
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTitle("Ticket"),
                                row = new MessageActionRow()
                                    .addComponents(close);

                            button.reply({
                                content: `Created ticket for you <#${Channel.id}>`,
                                ephemeral: true
                            })
                            Channel.send({
                                content: `<@${target.id}>`, embeds: [embed], components: [row]
                            }).then((msg) => msg.pin())
                        });
                }
            } else if (button.customId === "marvel_close") {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"` permissions first', ephemeral: true })
                }
                let tow = db.get("tow" + button.channel.id),
                    duser = button.guild.members.cache.get(tow);

                if (!duser) {
                    await button.guild.members.fetch(tow).catch(() => null)
                }

                if (!duser) {
                    const left = new discord.MessageEmbed({
                        color: client.embed.cr,
                        description:
                            "User created this ticket left the guild\nYou can manually delete this channel",
                    })
                        .setFooter({
                            text: "Marvel - Ticketing Without Clutter",
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTitle("Tickets"),
                        del = new MessageButton()
                            .setStyle("DANGER")
                            .setLabel("Delete")
                            .setCustomId("marvel_del")
                            .setEmoji("⛔")
                            .setDisabled(false),
                        row = new MessageActionRow()
                            .addComponents(del);

                    button.message.delete()
                    return button.channel.send({
                        components: [row],
                        embeds: [left]
                    });
                }
                let Channel = button.guild.channels.cache.get(button.channel.id);
                Channel.permissionOverwrites.edit(duser, {
                    SEND_MESSAGES: false,
                    VIEW_CHANNEL: false,
                    ATTACH_FILES: false,
                }).catch(() => null) && button.message.delete();

                const del = new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Delete")
                    .setCustomId("marvel_del")
                    .setEmoji("⛔")
                    .setDisabled(false),
                    reopen = new MessageButton()
                        .setStyle("SUCCESS")
                        .setLabel("Reopen")
                        .setEmoji("🔓")
                        .setCustomId("marvel_open")
                        .setDisabled(false),
                    row = new MessageActionRow()
                        .addComponents(reopen, del),
                    embed = new discord.MessageEmbed()
                        .setDescription(
                            "Ticket is now closed.\nClosed By : <@" + button.user.id + ">"
                        )
                        .setColor(client.color.cm)
                        .setFooter({
                            text: "Marvel - Ticketing Without Clutter",
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTitle("Tickets");

                button.channel
                    .send({ embeds: [embed], components: [row] })
                    .then((msg) => msg.pin());
            } else if (button.customId === "marvel_open") {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"` permissions first', ephemeral: true })
                }
                let tow = db.get("tow" + button.channel.id),
                    duser = button.guild.members.cache.get(tow),
                    Channel = button.guild.channels.cache.get(button.channel.id);

                if (!duser) {
                    duser = await button.guild.members.fetch(tow).catch(() => null)
                }
                if (!duser) {
                    button.reply({
                        content: `This user left the server!`,
                        ephemeral: true
                    })
                }
                Channel.permissionOverwrites.edit(duser, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    ATTACH_FILES: true,
                });

                const close = new MessageButton()
                    .setStyle("DANGER")
                    .setLabel("Close")
                    .setEmoji("🔒")
                    .setCustomId("marvel_close")
                    .setDisabled(false),
                    embed = new MessageEmbed()
                        .setDescription("Ticket has been opened again")
                        .setColor(client.embed.cm)
                        .setFooter({
                            text: "Marvel - Ticketing Without Clutter",
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTitle("Tickets"),
                    row = new MessageActionRow().addComponents(close);
                button.message.delete();
                return Channel.send({ content: "<@" + duser.id + ">", embeds: [embed], components: [row] }).then((msg) => msg.pin());
            } else if (button.customId === "marvel_del") {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES", "MANAGE_CHANNELS", "EMBED_LINKS"` permissions first', ephemeral: true })
                }
                let user = db.get("tow" + button.channel.id);
                button.reply({
                    content: "Ticket will be deleted in 5 Seconds",
                    ephemeral: true
                });
                setTimeout(function () {
                    button.channel.delete().catch(() => null) &&
                        db.delete("tch" + user) &&
                        db.delete("tow" + user);
                }, 5000);

                // here starts the self roles 
                // buttons
            } else if (button.customId === 'selfrole1') {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES"` permissions first', ephemeral: true })
                }
                let rol = db.get(`selfroles1_${button.guild.id}${button.message.id}`),
                    role = button.guild.roles.cache.get(rol),
                    member = button.guild.members.cache.get(button.user.id);
                if (!role) {
                    button.guild.roles.fetch(rol).catch(() => null);
                }
                if (!member) {
                    member = button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (!member) {
                    return button.reply({ content: `Unable to find the user who clicked thi button!`, ephemeral: true })
                }
                if (!role) {
                    return button.reply({ content: `Unable to find the role assciated with this self role menu!`, ephemeral: true })
                }
                if (role.position > button.guild.me.roles.highest.position) {
                    return button.reply({ content: `My role isnt high enogh to sive this role to you!`, ephemeral: true })
                }
                if (!member.roles.cache.has(role.id)) {
                    member.roles.add(role)
                    return button.reply({ content: `Gave you the ${role} role!`, ephemeral: true })
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role)
                    return button.reply({ content: `Took ${role} role from you!`, ephemeral: true })
                }
            } else if (button.customId === 'selfrole2') {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES"` permissions first', ephemeral: true })
                }
                let rol = db.get(`selfroles2_${button.guild.id}${button.message.id}`),
                    role = button.guild.roles.cache.get(rol),
                    member = button.guild.members.cache.get(button.user.id);
                if (!role) {
                    button.guild.roles.fetch(rol).catch(() => null);
                }
                if (!member) {
                    member = button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (!member) {
                    return button.reply({ content: `Unable to find the user who clicked thi button!`, ephemeral: true })
                }
                if (!role) {
                    return button.reply({ content: `Unable to find the role assciated with this self role menu!`, ephemeral: true })
                }
                if (role.position > button.guild.me.roles.highest.position) {
                    return button.reply({ content: `My role isnt high enogh to sive this role to you!`, ephemeral: true })
                }
                if (!member.roles.cache.has(role.id)) {
                    member.roles.add(role)
                    return button.reply({ content: `Gave you the ${role} role!`, ephemeral: true })
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role)
                    return button.reply({ content: `Took ${role} role from you!`, ephemeral: true })
                }
            } else if (button.customId === 'selfrole3') {
                if (!button.guild.me.permissionsIn(button.channel).has(["MANAGE_ROLES"])) {
                    return button.reply({ content: 'I need `"MANAGE_ROLES"` permissions first', ephemeral: true })
                }
                let rol = db.get(`selfroles3_${button.guild.id}${button.message.id}`),
                    role = button.guild.roles.cache.get(rol),
                    member = button.guild.members.cache.get(button.user.id);
                if (!role) {
                    button.guild.roles.fetch(rol).catch(() => null);
                }
                if (!member) {
                    member = button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (!member) {
                    return button.reply({ content: `Unable to find the user who clicked thi button!`, ephemeral: true })
                }
                if (!role) {
                    return button.reply({ content: `Unable to find the role assciated with this self role menu!`, ephemeral: true })
                }
                if (role.position > button.guild.me.roles.highest.position) {
                    return button.reply({ content: `My role isnt high enogh to sive this role to you!`, ephemeral: true })
                }
                if (!member.roles.cache.has(role.id)) {
                    member.roles.add(role)
                    return button.reply({ content: `Gave you the ${role} role!`, ephemeral: true })
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role)
                    return button.reply({ content: `Took ${role} role from you!`, ephemeral: true })
                }
            } else if (button.customId === 'selfrole4') {
                if (!role) {
                    button.guild.roles.fetch(rol).catch(() => null);
                }
                if (!member) {
                    member = button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (!member) {
                    return button.reply({ content: `Unable to find the user who clicked thi button!`, ephemeral: true })
                }
                if (!role) {
                    return button.reply({ content: `Unable to find the role assciated with this self role menu!`, ephemeral: true })
                }
                if (role.position > button.guild.me.roles.highest.position) {
                    return button.reply({ content: `My role isnt high enogh to sive this role to you!`, ephemeral: true })
                }
                if (!member.roles.cache.has(role.id)) {
                    member.roles.add(role)
                    return button.reply({ content: `Gave you the ${role} role!`, ephemeral: true })
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role)
                    return button.reply({ content: `Took ${role} role from you!`, ephemeral: true })
                }
            } else if (button.customId === 'selfrole5') {
                if (!role) {
                    button.guild.roles.fetch(rol).catch(() => null);
                }
                if (!member) {
                    member = button.guild.members.fetch(button.user.id).catch(() => null);
                }
                if (!member) {
                    return button.reply({ content: `Unable to find the user who clicked thi button!`, ephemeral: true })
                }
                if (!role) {
                    return button.reply({ content: `Unable to find the role assciated with this self role menu!`, ephemeral: true })
                }
                if (role.position > button.guild.me.roles.highest.position) {
                    return button.reply({ content: `My role isnt high enogh to sive this role to you!`, ephemeral: true })
                }
                if (!member.roles.cache.has(role.id)) {
                    member.roles.add(role)
                    return button.reply({ content: `Gave you the ${role} role!`, ephemeral: true });
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role)
                    return button.reply({ content: `Took ${role} role from you!`, ephemeral: true });
                }
            }
        } catch (e) {
            return client.errweb.send(`\`\`\`js\nFILE : ${description.name}\n${e.stack}\n\`\`\``);
        }
    });
};
