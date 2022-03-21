<div align="center">
<h1>guilded-shield</h1>
<p>Generate SVG badges for your Guilded server</p>
<p>
    <a><img src="https://guilded.nico.engineer/shields/i/pB1KPnek?style=flat" alt="Guilded Server"></a>
    <img src="https://github.com/zaida04/guilded-shields/actions/workflows/ci.yml/badge.svg" alt="Lint and build">
    <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a><br>
</p>
</div>

## 📝 Installation

### Docker-Compose

```
git clone https://github.com/zaida04/guilded-shields.git
cd guilded-shields
docker-compose up -d --build
```

### Node

```
git clone https://github.com/zaida04/guilded-shields.git
cd guilded-shields
npm install
npm run build
node dist/index.js
```

## Usage

### `GET /badges/:inviteType/:inviteId`

| Query Param | Optional |                                                                                                  description                                                                                                   |
| :---------: | :------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|    color    |    ✔️    | The color you'd like the message field to be (where it says XX members). <br>Must be a color from [here](https://github.com/zaida04/guilded-shields/blob/main/src/colors.ts#L6) or [here](https://shields.io/) |
|    style    |    ✔️    |                                                      Style you'd like the button to be in (`plastic`, `flat`, `flat-square`, `for-the-badge` or `social`)                                                      |

This route will return an SVG containing the amount of members in your Guilded server. Results are cached for 15 minutes.

What your invite type should be is dependent on what kind of invite link you have. If you have one that follows the `/i/:code` schema, you should be appending that same thing after `/shields`. **If you are using a vanity invite link, you must append use `/vanity/:code` instead of providing no invite type.** Examples below:

`https://www.guilded.gg/i/ENZog7nE` ➜ `https://guilded.nico.engineer/shields/i/ENZog7nE`
`https://www.guilded.gg/r/zzQR46qKZE` ➜ `https://guilded.nico.engineer/shields/r/zzQR46qKZE`
`https://www.guilded.gg/guilded-api` ➜ `https://guilded.nico.engineer/shields/vanity/guilded-api`

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure any and all commits pass our linting and build steps.

## ⚖️ LICENSING

Licensed under the [MIT License](https://github.com/zaida04/guilded-shield/blob/main/LICENSE)
