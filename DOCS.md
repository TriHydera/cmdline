# Cmdline Line Docs

## Commands

📖 For reference: ✅ means its included and ⭐ means it needs imported

| Command                                                                 | Help                                                        |                                                        Module
|----------------------------------------------------------------------|--------------------------------------------------------------|--------------------------------------------------------------|
help | help | ✅ `Core`
echo | echo [message] | ✅ `Core`
clear | clear | ✅ `Core`
mod | mod [add\|list\|deps] [module] | ✅ `Core`
set | set [key] [value] | ✅ `Core`
uuid | uuid | `Core`
rand | rand [min] [max] | ✅ `Core`
print | print [file] | ⭐ `@cmd/printer`
fact | fact [animal] | ⭐ `srapi`
spin | spin | ⭐ `@cmd/spin`

## Dev Help

### File Setup

```js
var meta = {
  name: "module-name", // name for display list (try to match file name)
  ver: "2", // version number (not used)
  deps: [] // array of used dependencies (only for display list)
}

function load() {} // run on import
```

### Codes

📖 Here is some help for the codes in a table:

📖 `instance` is the current session and `global` is saved the browser

| Code                                                                 | About                                                        |
|----------------------------------------------------------------------|--------------------------------------------------------------|
| `core.vars.set(key, value)`                                         | Sets instance storage value                                   |
| `core.vars.get(key)`                                               | Gets instance storage value                       {}            |
{| `}core.cmd.create(obj = { tag: "", help: "", category: "", run: (args) => {} })` | Creates a command                                           |
| `core.cmd.remove(cmd)`                                             | Removes command from system                                   |
| `core.cmd.run(tag, args)`                                          | Runs a command with args                                      |
| `core.action.echo(text, opts = { color: "white", asRaw: false })`| Prints a message to screen, use `asRaw` to show `var` names |
| `core.action.clickable(text, run = () => {})`                     | Prints a message to screen that is clickable, use `run` to set what happens |
| `core.action.prompt(prompt, callback = () => {})`                  | Prompts user for text input, get value using `callback`     |
| `core.action.clear()`                                              | Clears screen                                                |
| `core.action.prefetch(url)`                                        | Preloads and caches content from `url`                         |
| `core.module.add(module, callback = () => {})`                     | Imports module from system or external `url`                   |
| `core.module.list()`                                               | Returns list of imported modules                             |
| `core.module.listDeps()`                                           | Returns list of module dependencies                           |
| `core.storage.updateStats()`                                       | Updates instance `vars` with storage stats                   |
| `core.storage.setItem(key, value)`                                 | Sets global storage object                                    |
| `core.storage.getItem(key)`                                        | Gets global storage object                                    |
| `core.request.send(url)`                                           | Sends web request to the `url` to fetch `JSON` content      |

### Vars

📖 This only includes always avilable vars, to get value use `%` before and after the name like `%name%`

| Var Name                                                            | About                                                        |
|----------------------------------------------------------------------|--------------------------------------------------------------|
`storage_used` | Used LocalStorage space with KB
`storage_used_raw` | Like `storage_used` but raw size