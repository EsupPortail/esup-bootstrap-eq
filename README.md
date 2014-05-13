# Bootstrap for uPortal

To use this project you will need : [NodeJS](http://nodejs.org/), [GruntJS](http://gruntjs.com/), [Bower](http://bower.io/)

## Generate a custom Twitter Bootstrap version

We've automate the all process, Grunt will do it for you, just run `grunt build` at the root of this project and then simply take the files from the `dist/` folder

Here is a [sample version](https://gist.github.com/mbelmok01/8803499) of our customized bootstrap

## How to use

_Be careful_
Double importation of Twitter Bootstrap JavaScript on the same page will break. 
In order to prevent this issue to happen you should import Twitter Bootstrap JavaScript this way

```html
<script type="text/javascript">
    $().carousel || document.write('<script src="path/to/js/bootstrap.min.js"><\/script>')
</script>
```

After generating the custom Twitter Bootstrap, you will have to execute a little JavaScript snippet into your portlet.
This snippet will assign the right CSS class to the portlet container.


```html
<script type="text/javascript">
    
    (function($){

        var $portletContainers;
        
        $(document).ready(function() {
            $portletContainers = $('.pc');
            $(window).resize(onWindowResize);
            onWindowResize();
        });

        function onWindowResize() {

            $portletContainers.each(function(index) {       
                var $that = $(this);
                var portletWidth = $that.width();
                
                $that.removeClass("xs sm md lg");
                if(portletWidth < 768) { 
                    $that.addClass("xs"); 
                }
                if(portletWidth >= 768 && portletWidth < 992) { 
                    $that.addClass("sm"); 
                }
                if(portletWidth >= 992 && portletWidth < 1200) { 
                    $that.addClass("md"); 
                }
                if(portletWidth >= 1200) { 
                    $that.addClass("lg"); 
                }   
            });
        }

    })(jQuery);

</script>

<div class="pc sm">
    <!-- Your portlet content goes here -->
</div>
```
