<div align="center">
<h1>guilded-shields</h1>
<p>Generate SVG badges for your Guilded server</p>
<p>
    <a href="https://www.guilded.gg/i/2MJ57MQk"><img src="https://shields.yoki-labs.xyz/shields/i/2MJ57MQk?style=flat" alt="Guilded Server"></a>
    <img src="https://github.com/yoki-labs/guilded-shields/actions/workflows/ci.yml/badge.svg" alt="Lint and build">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
</p>
</div>

## Usage

### `GET /shields/:inviteType/:inviteId`

| Query Param | Optional |                                                                                                  description                                                                                                   |
| :---------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    color    |    ✔️    | The color you'd like the message field to be (where it says XX members). <br>Must be a color from [here](https://github.com/yoki-labs/guilded-shields/blob/main/src/colors.ts#L6) or [here](https://shields.io/) |
|    style    |    ✔️    |                                                      Style you'd like the button to be in (`plastic`, `flat`, `flat-square`, `for-the-badge` or `social`)                                                      |

This route will return an SVG badge containing the amount of members in your Guilded server. Results are cached for 15 minutes.

What your invite type should be is dependent on what kind of invite link you have. If you have one that follows the `/i/:code` schema, you should be appending that same thing after `/shields`. **If you are using a vanity invite link, you must append use `/vanity/:code` instead of providing no invite type.** Examples below:

`https://www.guilded.gg/i/ENZog7nE` ➜ `https://shields.yoki-labs.xyz/shields/i/ENZog7nE`  
`https://www.guilded.gg/r/zzQR46qKZE` ➜ `https://shields.yoki-labs.xyz/shields/r/zzQR46qKZE`  
`https://www.guilded.gg/guilded-api` ➜ `https://shields.yoki-labs.xyz/shields/vanity/guilded-api`  

## 📝 Installation

### Docker-Compose

```
git clone https://github.com/yoki-labs/guilded-shields.git
cd guilded-shields
docker-compose up -d --build
```

### Node

```
git clone https://github.com/yoki-labs/guilded-shields.git
cd guilded-shields
npm install
npm run build
node dist/index.js
```

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure any and all commits pass our linting and build steps.

## ⚖️ LICENSING

Licensed under the [MIT License](https://github.com/yoki-labs/guilded-shield/blob/main/LICENSE)
