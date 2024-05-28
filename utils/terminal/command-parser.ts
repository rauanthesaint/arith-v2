import { Command } from './command.type'

export function parse(argv: string[]): Command {
    // const commands: Command[] = []
    let currentCommand: Command = { name: '', options: {}, args: [] }

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]

        if (arg.startsWith('--')) {
            const [key, value] = arg.slice(2).split('=')
            if (currentCommand) {
                currentCommand.options[key] = value || true
            }
        } else if (arg.startsWith('-')) {
            const key = arg.slice(1)
            if (currentCommand) {
                currentCommand.options[key] = true
            }
        } else {
            if (currentCommand && !currentCommand.name) {
                currentCommand.name = arg
            } else if (currentCommand && currentCommand.name) {
                currentCommand.args.push(arg)
            } else {
                currentCommand = {
                    name: arg,
                    options: {},
                    args: [],
                }
                // commands.push(currentCommand)
            }
        }
    }
    return currentCommand
}
