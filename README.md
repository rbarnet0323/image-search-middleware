# image-search-middleware
Appstem Code Challenge (Node.js Middleware)
# front-end architecture overview
1. Robert Armstrong requested a simple and responsive image search front-end with paginated infinite scrolling and modal overlays implemented using React.js.
2. Before developing anything, I did some research and confirmed that there are existing official React.js components for infinite scrolling and modal overlays.  This appeared to be the simplest possible solution and future-proofing this application is not a concern since this is a job application and this React.js web application need not be hosted and kept up to date for an exceedingly long time.  If future-proofing this application was a concern, I would have implemented the modal overlay myself as installing it without --force resulted in an asymptomatic version compatability warning (apparently this component has not been updated recently).
3. Additionally, I did some research into which image search API would be best to use.  First, I looked into the effort required to set up an image search API with Getty Images as it was first in the list of image search API providers.  Unfortunately, Getty Images proved to be exceedingly difficult to set up and I encountered tutorials with entirely different instructions.  I ultimately did manage to set up an image search API with Getty images, but this was after I already set up an image search API with Unsplash and tested it using Postman.  Unsplash had everything that I needed.  The Unsplash API is well documented, paginated by nature, and returns urls for thumbnails as well as the large hd images that I wanted to use in the modal overlays.  The only drawback of the Unsplash API is that until I apply for production I am limited to 50 requests per hour; however, there was nothing in the description that required this API to be immune to DDOS attacks or prepared to handle a large number of legitimate requests.  Ultimately, I decided to proceed with Unsplash.
4. The project description recommended the use of Typescript, but it did not require the use of Typescript.  Although I think Typescript is particularly useful for troubleshooting because JavaScript is not inherently strongly typed and I much prefer troubleshooting strongly typed languages such as Java and C, I believe that this example application is too simple to justify configuring Typescript with React.js.  If I was working on a production application, I would have expressed this opinion and listened carefully to the feedback of my teammates as I understand that unilaterally disregarding recommendations would not make me a team player or a good developer.
5. Now it was time for me to actually design the look and feel of this web application.  I wanted all components to be centered and I wanted the results to be in a grid of width 3.  Additionally, I decided to round the corners of the search box and the search button and include a subtle shadow effect.  I kept the color scheme as black on white as it would be simple to make this color scheme look professional.  Keeping everything simple, centered, and on its own row would help me quickly prototype a responsive web application.
7. After researching each component and finalizing my design, I set up four state variables (keyword->the current value in the text box, images->the loaded search results to display, page->the current page, and hasMore->this is a boolean variable that is true until the returned images from a search/scroll have less entries than the hardcoded per_page value of 21 images).
8. I would require a method to update the keyword state variable on text entry, a method to handle clicking the search button, and a method to get the next images on scroll.  I implemented those methods as simply as possible along with conditionally rendering the components necessary to test those methods and implementing my design using CSS.  While prototyping the front-end, I was connecting directly to the Unsplash API knowing that I would have to move this functionality to Node.js middleware later.
9. I realized that I had some additional error checking to do.  In its current form, if I searched for one keyword and then another keyword the results of the second search would be appended to the original results instead of replacing them.  I quickly remedied this by setting the images state variable to an empty array everytime keyword is changed.  Although I wanted to test the cases where the image results were exhausted mid scroll, the 50 requests per hour limited my ability to test those cases.  Lastly, I ensured that if keyword is equal to the empty string this React.js web application would not make an API request with no search term which appeared to throw an error when I originally attempted it.
10. At this point, I had to connect it to the middleware described in the section below.  At first, I was running both applications locally which required me to put a proxy variable in package.json in order to avoid a CORS violation; however, once I had the middleware hosted on heroku I deleted that proxy variable and updated the API request to my middleware accordingly.
11. I was able to host the React.js web application on heroku without any errors.
# middleware architecture overview
1. Robert Armstrong requested paginated Node.js middleware that obscured interaction with the Unsplash image search API.  He insisted that I do not use a library or SDK that abstracts away the details of interacting with this API; therefore, I used axios which I have a lot of familiarity with.  Additionally, I used express to set up this Node.js application as a server with endpoints.
2. I only required one endpoint and I decided to use GET protocol since none of the data being passed to this endpoint needed to be hidden in the body of a POST request and the other protocols would not apply.  I set up the search endpoint and returned the results of the axios request to Unsplash back to the entity that originally made the request.  I tested my new minimalistic server using Postman.
3. When deploying to heroku, I encountered one error and I had to access the heroku logs using my terminal.  It appeared that I needed to include process.env.PORT in the line app.listen(process.env.PORT || 8080); in order to comply with heroku's deployment and I also needed to include "start": "node index.js" in the "scripts" section of the file package.json such that npm start would execute the correct command.  Once I hosted the middleware on heroku successfully I again tested it with Postman before integrating the front-end with the middleware.
