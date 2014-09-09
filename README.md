# Esup Bootstrap EQ (Element Queries)

Media queries are great ! But it also shows some limitations... 
We decided to create a Twitter Bootstrap version that behave nicely if you need to adapt the style based on a block size in your page.

If you are not aware of what Element queries are you should read these two articles :
* [Element queries](http://www.xanthir.com/b4PR0)
* [2014 State of Element Queries](http://www.xanthir.com/b4VG0)

The project is buildt on top of :
* [GruntJS](http://gruntjs.com/)
* [Bower](http://bower.io/)

If you don't have these tools you can install them by running on your command line prompt

```
npm install -g grunt grunt-cli bower
```

## Generate a custom Twitter Bootstrap version

The process has been automate using GruntJS. Simply run grunt build task and check out the `dist` repository

Here is a [sample version](https://gist.github.com/mbelmok01/8803499) of this customized version.

## How to

_Be careful_

If you import Twitter Bootstrap JavaScript file twice in the same page it will break. To prevent this behavior you should import the JavaScript library this way:

```html
<script type="text/javascript">
    $().carousel || document.write('<script src="path/to/js/bootstrap.min.js"><\/script>')
</script>
```

This bootstrap fork relies wants to emulate element query behavior. You won't have to change your markup, only add some CSS class to a block that refers to a `widget` container and an extra JavaScript snippet to make it dynamic.

Here is a sample of what you need to include in your page.  

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
