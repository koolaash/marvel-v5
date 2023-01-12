const { readdirSync } = require("fs");

module.exports = client => {
    const data = [];
    readdirSync("./SlashCommands").forEach((dir) => {

        try {
            const slashCommandFile = readdirSync(`./SlashCommands/${dir}/`).filter((files) => files.endsWith(".js"));

            for (const file of slashCommandFile) {
                const slashCommand = require(`../SlashCommands/${dir}/${file}`);

                if (!slashCommand.name) {
                    return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);
                };

                if (!slashCommand.description) {
                    return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);
                };

                client.slashCommands.set(slashCommand.name, slashCommand);
                console.log(` :: ⬜️ Loaded Slash : ${slashCommand.name}.js `.bgCyan);
                data.push(slashCommand);
            };
        } catch (e) {
            return console.log(e.stack);
        };
    });

    client.on("ready", async () => {
        await client.application.commands.set(data).then(() =>
            console.log(`[Loaded] => All Slash Commands `.bgCyan)).catch((e) => console.log(e));
    });
};