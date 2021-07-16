<div align="center">
  <p>
    <br />
    <a href="https://discord.gg/es2CtXymWP">
      <img src="https://img.shields.io/discord/858870341015306271?color=5865F2&logo=discord&logoColor=white" alt="Discord server" />
    </a>
    <a href="https://www.npmjs.com/package/prodige">
      <img src="https://img.shields.io/npm/v/prodige.svg?maxAge=3600" alt="NPM version" />
    </a>
    <a href="https://www.npmjs.com/package/prodige">
      <img src="https://img.shields.io/npm/dt/prodige.svg?maxAge=3600" alt="NPM downloads" />
    </a>
    <br />
    <a href="https://github.com/Expensiveee/prodige">
      <img src="https://img.shields.io/github/languages/top/Expensiveee/prodige" alt="Top language" />
    </a>
    <a href="https://github.com/Expensiveee/prodige">
      <img src="https://img.shields.io/github/last-commit/Expensiveee/prodige" alt="Last commit" />
    </a>
    <a href="https://github.com/Expensiveee/prodige">
      <img src="https://img.shields.io/github/languages/code-size/Expensiveee/prodige" alt="Code size" />
    </a>
    <a href="https://www.codefactor.io/repository/github/expensiveee/prodige">
        <img src="https://www.codefactor.io/repository/github/expensiveee/prodige/badge" alt="Codefactor" />
    </a>
    <a href="https://github.com/Expensiveee/prodige">
        <img src="https://tokei.rs/b1/github/Expensiveee/prodige?category=lines" alt="Lines of code count" />
    </a>
    <br />
    <a href='https://nodei.co/npm/prodige/' target='_blank'>
      <img src="https://nodei.co/npm/prodige.png" alt="NPM" />
    </a>
    <br />
  </p>
</div>

# Prodige

_**Prodige, get straight to it**_

Prodige is one of the most advanced command/event handler for Discord bots using discord.js . It has a lots of features that you can discover by reading the documentation. Prodige has an integrated argument handler system that allows you to be sure that your arguments will be as you expect them to be. Prodige also has precise and explicit error messages.

# 📂 | Installation

Node.js 14.0.0 or newer is required.

```
$ npm install prodige
```

# ✍ | Example usage

index.js

```js
const { Prodige } = require('prodige');
const { Intents } = require('discord.js');

const client = new Prodige({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
}).start({
  token: 'token',
  prefix: ['?', '!'],
});
```

# 👥 | Links

- [Discord Server](https://discord.gg/es2CtXymWP)
- [Documentation](https://theexpensiveee.gitbook.io/prodige)
- [Github](https://github.com/Expensiveee/prodige)
- [NPM](https://npmjs.com/package/prodige)

# 🦮 | Get help

Having troubles with the documentation? Join our [discord server](https://discord.gg/es2CtXymWP) to get help.
