# Lodybo's Ghost blog

This repo contains the source code of my Ghost blog instance + theme.
It uses a Heroku pre-configured instance of Ghost, obtainable from [this repo](https://github.com/lodybo/lodybo-ghost).

## First time setup
After checking out this project and doing `npm install`, we'll need to locally fetch the source from the pre-configured Ghost instance. 
Grunt will do this for us, via the `grunt setup-ghost` command. You can even specify if you want Ghost to be running immediately by passing the `run` parameter: `grunt setup-ghost:run`. 
Ghost will be downloaded into the `assets/` directory. It will also be copied to the `dist/` folder, which we'll use for serving the theme.
**Warning:** Ghost runs on NodeJS versions 0.10.0, 0.12.0, and 4.2.0 - 5.0.0.

## Development
Ghost needs to run while developing, that can be done with the `grunt shell:run-ghost` command. Visit your fresh Ghost install on `localhost:2368`. 
After that, `grunt serve` will watch when you develop any source files.

Alternatively, you can run `grunt` or `grunt start` and it will run the two tasks defined above.

Also, `grunt test` will run all the tests and `grunt build` will build build everything and move it to the `dist/` folder where we can preview.