# vs-wzx README

"vs_wzx"是个人写的插件，用于一些小快速开发。

## Features
个人的一些习惯，大部分从Emacs而来

- `wzx jump out`

    在符号内的时候快速跳出到括号外，支持的符号有：``, '', "", {}, [], <>, ()
    ![](https://media.giphy.com/media/l0HlFPNndZgxEHV6w/source.gif)




## Commands

要使用快捷键进行操作，请增加如下内容： `keybindings.json` (`File` -> `Preferences` -> `Keyboard Shortcuts`):

    {
        "key": "alt+enter",
        "command": "extension.wzx.jumpOut"
    }

或者直接通过F1命令执行 ``wzx jump out``


## Release Notes

### 1.0.0

初始化开发
