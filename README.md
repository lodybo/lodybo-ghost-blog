# Lodybo's Ghost blog

This repo contains the source code of my Ghost blog instance + theme.
It uses a Heroku pre-configured instance of Ghost, obtainable from [this repo](https://github.com/lodybo/lodybo-ghost).

## Prerequisites
Ghost needs to be running during development. This can be done by using the Docker Toolbox, and mount a volume from Docker to the `dist/` folder.

## Development
`grunt serve` will watch when you develop any source files.

Also, `grunt test` will run all the tests and `grunt build` will build build everything and move it to the `dist/` folder where we can preview. This will create a theme package that you can upload to a Ghost server.