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

## How to use


After generating the custom Twitter Bootstrap, you will have to execute a little JavaScript snippet into your portlet.
This snippet will assign the right CSS class to the portlet container.


```
<script type="text/javascript">
    
    var $portletContainers;
 
$(document).ready(function() {

    // all portlets must have the CSS class .portlet-container
    
    $portletContainers = $(".portlet-container");
    
    // Resize event isn't fired on DOM Content Loaded, we launch the function manually
    onWindowResize();
  $(window).resize(onWindowResize);
});
 
function onWindowResize() {
    
    $portletContainers.each(function(index) {
        
        var $that = $(this);
        var portletWidth = $that.width()
        $that.removeClass("xs sm md lg");
        
        if(portletWidth < 768)
            $that.addClass("xs");
        if(portletWidth >= 768 && portletWidth < 992)
            $that.addClass("sm");
        if(portletWidth >= 992 && portletWidth < 1200)
            $that.addClass("md");
        if(portletWidth >= 1200)
            $that.addClass("lg");
    
    });
}
</script>

```
