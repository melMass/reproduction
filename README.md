# [Bug]: Unwanted lock file updates [#14485](https://github.com/astral-sh/uv/issues/14485)


## Tested on windows:

### Setup:

```sh
git clone https://github.com/melMass/reproduction
git checkout python/uv-add-updates-lock
uv sync --frozen
```


### Reproduce:

```sh
uv add --group setup pip
# this will update torch, torchaudio and torchvision
```
