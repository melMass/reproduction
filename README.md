# [bug]: performing action automatically changes mode to Insert mode [#347](https://github.com/stevearc/overseer.nvim/issues/347)

## Steps to reproduce:
```sh
cd ~/.config
git clone https://github.com/melMass/reproduction nvim-overseer-bug
cd nvim-overseer-bug
git checkout "nvim/overseer-insert-issue"
cd
NVIM_APPNAME=nvim-overseer-bug nvim
```
