#  [Bug]: When starting with Rsdoctor, I still get the message "rspack-plugin" even though it has been installed. [#3358](https://github.com/web-infra-dev/rsbuild/issues/3358)


## Steps to reproduce:

```sh
pnpm install
pnpm run doctor
```
You should now see:
```error   `process.env.RSDOCTOR` enabled, but failed to load @rsdoctor/rspack-plugin module.```
<image src="https://github.com/user-attachments/assets/054e5a5a-6062-4e62-9a37-34a1a0e51dbc" width=512/>
