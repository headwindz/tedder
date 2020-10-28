![Logo](https://pt-starimg.didistatic.com/static/starimg/img/WvVa5CjjR61603872342657.png)

> **Tedder - a scrum git branch manager**

[![Build Status](https://travis-ci.com/n0ruSh/tedder.svg?branch=master)](https://travis-ci.com/n0ruSh/tedder)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/n0ruSh/tedder/blob/master/LICENSE)
[![npm](https://img.shields.io/badge/version-1.0.7-orange.svg)](https://www.npmjs.com/package/tedder)
[![Downloads](https://img.shields.io/npm/dm/tedder.svg)](https://npmcharts.com/compare/tedder?minimal=true)

## Why

- Developers sometimes break the naming standard and create inconsistent branches.
- Developers hang around asking whether a scrum branch has been created.

# Getting started

```
npm install tedder
```

_Note: You can install and run tedder both locally and globally._

# Usage

## Options

### Base branch

Specify the base branch to branch off when creating the new scrum branch.

|    Default    |  CLI Override  | CLI shortcut Overide | Config Override |
| :-----------: | :------------: | :------------------: | :-------------: |
| origin/master | --base \<str\> |      -b \<str\>      |  base: \<str\>  |

### Git repo remote

Remote name

| Default |   CLI Override   | CLI shortcut Overide | Config Override |
| :-----: | :--------------: | :------------------: | :-------------: |
| origin  | --remote \<str\> |      -r \<str\>      | remote: \<str\> |

### Day

Specify which day of the week your scrum branch is targeting. The value should be one of: Mon, Tue, Wed, Thu, Fri, Sat, Sun

| Default | CLI Override  | CLI shortcut Overide | Config Override |
| :-----: | :-----------: | :------------------: | :-------------: |
|   Mon   | --day \<str\> |      -d \<str\>      |  day: \<str\>   |

### Scrum round

Specify the scrum round which is used to calculate the date.

| Default |  CLI Override  | CLI shortcut Overide | Config Override |
| :-----: | :------------: | :------------------: | :-------------: |
|    1    | --next \<num\> |      -n \<num\>      |  next: \<num\>  |

### tempalte

Specify the tempalte for computing branch name. **\[\]** is used as delimiter:

- \[yyyy\]: get full year
- \[yy\]: get year
- \[mm\]: get month
- \[dd\]: get day

E.g. if your scum is targeted for 16th/Aug/2018 and your template is `feature/[yyyy][mm][dd]` then tedder will create the branch `feature/2018/08/16` fro you.

|           Default            |    CLI Override    | CLI shortcut Overide |  Config Override  |
| :--------------------------: | :----------------: | :------------------: | :---------------: |
| feature/\[yyyy\]\[mm\]\[dd\] | --template \<str\> |      -t \<str\>      | template: \<str\> |

### checkOnly

Whether only check remote branch exists

| Default | CLI Override | CLI shortcut Overide | Config Override |
| :-----: | :----------: | :------------------: | :-------------: |
|  false  | --checkOnly  |          -c          | checkOnly: true |

## With the CLI

```
tedder [options]
```

## With npm script

```
"scripts": {
  "scrum": "tedder"
}
```

## Configuration File

Tedder uses [cosmiconfig](https://github.com/davidtheclark/cosmiconfig) for configuration file support. This means you can configure tedder via:

- A .tedderrc file, written in YAML or JSON, with optional extensions: .yaml/.yml/.json/.js.
- A .tedderrc.toml file, written in TOML (the .toml extension is required).
- A tedder.config.js file that exports an object.
- A "tedder" key in your package.json file.

The configuration file will be resolved starting from the location of the file being formatted, and searching up the file tree until a config file is (or isn't) found.

E.g. basic rc config:

```
{
    "day": "Thu",
    "template": "feat/[yyyy][mm][dd]"
}
```

## Mix CLI and configuration file

You can mix the usage of cli and configuration file. The options from cli take precendence over those from configuration file.

# Last but not least

There is a bonus which will trigger at a small chance while using the tool. Pls give me a shot if you're lucky :
