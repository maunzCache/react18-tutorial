# react18-tutorial

As described by https://react.dev/learn/tutorial-tic-tac-toe (as long as this link works though).

## Rationale

I wanted to get to know React a little bit better as I have been working on a browser game that is going to be migrated from vanilla JS to React. There is no real reason for this migration other that it can be done I was interested in doing this.

However, what was learned years before utilizing jQuery and other former state-of-the art frameworks and tools, my ideas wouldn't work the way I expected them to work. Thus, my thought was to learn React by the tutorial and not by migrating code that I know.

## Setup

Instead of building in the NodeJS space, I was interested in using [deno](https://deno.com/) for the resolving dependencies and [esbuild](https://esbuild.github.io/) for transpiling and bundling.

In fact, it is an easy setup to get working with React using pure JavaScript (plus JSX obviously).

## Pitfalls

- I did not figure out how to import CSS files in `.jsx` for esbuild to recognize and bundle it.
- The `index.html` file is static and not created by using esbuild.
- Still using a `package.json` file while `deno.json` would be enough. Not sure if I want this project to not be used by another JS runtime.
 - `package.json` is very basic but could use more hints for the development environment.
- No testing. But that is okay for now.
