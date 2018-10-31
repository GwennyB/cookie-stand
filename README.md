# cookie-stand

DAY 1
  User Stories (MVP)
    As a user, I want a webpage that displays individual store data for my Salmon Cookie Shops, so that I can be informed about how to run my business
    As a developer, I want to represent the store data in a list format on the webpage, so my client can view the information
    As a developer, I want to use object-oriented programming to build this site, so that the site will be more effective and the code will be easier to read and understand
  Technical Requirements
    New repository properly set up with a license and README, and cloned to local machine
    Working on a non-master branch, with regular commit history
    Good use of Object Literals (no constructors allowed today); one for each store model; properties/values and methods are correctly constructed and given meaningful names
    Main page meets requirements of the problem domain
    Use template literals in your JS logic to render the stores as lists on the sales page


DAY 2
  User Stories (MVP)
    As a developer, I want to implement a constructor function, so that I can reuse code and eliminate much of the duplication in my JavaScript
    As a user, I want cookie sales data represented in tables rather than lists
  Technical Requirements
    Good use of a constructor function; style and syntax are correctly implemented
    Each cookie stand location should have a separate render() method that creates and appends its row to the table
    The header row and footer row are each created in their own stand-alone function
    Duplicate code has been removed and DRY principles are evident
    Working on a non-master branch for the day, with regular commit history. Basically, every time you get something to work, you should do a commit. But you only need to push every couple of hours or so, tops.


DAY 3
User Stories (MVP)
  Today you will be adding a form to your existing cookie stand project so that you can add new locations to the table by simply inputting their information with the form.
  Also, Pat has decided that he would like a footer row after all. Add the necessary HTML to create the input form.
Technical Requirements
  Don't forget <fieldset>!
  Use the constructor function as your guide to determine what input fields your form needs (hint: also consider what is passed in when creating instances!)
  Your JS will need an event listener and and event handler, and you may also want a variable to facilitate DOM access to the form.
  As we saw in class, the event handler should use the take the data from the input field, pass it into the constructor function, and create a new instance of a cookie stand that then appends to the table.
  Are you going to do any error correction on input? You probably should. Look at what kind of input validation is built in to HTML5.
  Write a stand-alone function to generate a footer row which will display the total number of cookies sold per hour for all locations. When a new store is added using your form, the totals in the footer row should update to include these new sales numbers.
  Build incrementally. Test frequently.
  Be attentive to overall code structure.
  This is a good point to refactor your code into smaller functions/methods if you have some huge functions going on. Remember that each function should do one thing, and then you can compose more complex behavior out of functions.
  Anywhere you have repeated chunks of code, maybe you can start to apply some DRY principles. Generally, once some chunk of code is appearing for a 3rd time or so, that's when you want to consider refactoring.
  When making code more DRY, look for repeated behaviors that act on different pieces of data. Put the behavior into a function that is declared with parameters to receive the unique data, and then replace the repeated code with the function called with the unique data in arguments.


