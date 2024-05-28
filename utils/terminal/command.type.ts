export interface Command {
    name: string
    options: { [key: string]: string | boolean }
    args: string[]
}
