# Bootstrap for uPortal

## Tools you will need

+ [NodeJS](http://nodejs.org/)
+ [Grunt](http://gruntjs.com/)
+ [Bower](http://bower.io/)

## How to

After cloning this repo you will need to download all the project dependencies, simply run : 

```
npm install
bower install
```

## GruntJS tasks

`default` this is currently the only task, it will copy bootstrap file into the dist folder and start the customization process, after that it will beautify the CSS output in bootstrap.css file and minify the CSS output in bootstrap.min.css

In order to do this, type this at the root of your project :
```
grunt
```
And now just check the `dist/` folder

## Example

Here is a [sample version](https://gist.github.com/mbelmok01/8803499) of our customized bootstrap