# **[not tracked]** `uv add` updates the lock 

## Tested on windows:

### Setup:

```sh
git clone https://github.com/melMass/reproduction
git checkout python/uv-add-updates-lock
uv sync --frozen
```


### Reproduce:

```sh
uv add--group setup pip
# this will update torch, torchaudio and torchvision
```
