# omni-echo
Fork of the hugely popular echo.js that adds responsive image loading

#Reason behind the creation of this changes

This project was born out of the necessity to make the American Idol (2014) website to load faster.

##Lazy loading on the X axis

Americanidol.com had many carousels in place that made imperative to find a way to lazy load images not only in the y axis but also in the x axis. This wasn't the case back then of what was implemented in echojs.

##Responsive images
As it was required the serve optimized images for mobile devices, that were the most of the visitors of the site, so I added a simple way to load different renditions for each image depending on the viewport size.

##Performance wins

There were huge performance wins by using this code in tandem with conditional gets, 304 headers.
The site went from 10 megabytes initial download down to 1M on desktop, and from 10 megabytes in mobile to 300 kb. These numbers include the whole page load, not only images.

##Production tested

This code was served to millions of visitors of high profile sites inside FOX Broadcasting Corporation.