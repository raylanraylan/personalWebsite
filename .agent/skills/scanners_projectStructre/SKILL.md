---
name: scanners_projectStructre
description: When files are added or removed from the project, update the project structure.
---

# Project Structure

## Overview

Progressive reference system for Vue 3 projects. Load only files relevant to current task to minimize context usage (~250 tokens base, 500-1500 per sub-file).

## When to Use

- creates or removes files

## Reference

- [Vue 3 Project Structure](https://vuejs.org/guide/scaling-up/project-structure.html)
- [scripts/reference.md](../scripts/reference.md)

<!-- 創建流程 -->

## Create project structure

1. check if the file exists
2. if the file exists, skip it. if the file does not exist, create the file:

```
doc/projectStructure.md
```

3. read the file and update the project structure
