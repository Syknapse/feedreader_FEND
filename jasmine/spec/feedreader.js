/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('each feed URL is defined', function() {
            allFeeds.forEach( feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            })
        });
        
        
        /* A test that loops through each feed
        * in the allFeeds object and ensures it has a name defined
        * and that the name is not empty.
        */
       it('each feed name is defined', function() {
           allFeeds.forEach( feed => {
               expect(feed.name).toBeDefined();
               expect(feed.name.length).not.toBe(0);
           })
       });
    });


    /* Menu test suite */
    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const body = document.querySelector('body');
        const menu = document.querySelector('.menu-icon-link');

        it('is hidden on load', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    
         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         // Trying a different approach from the 'is hidden on load' above
         it('toggles visibility on click', function(){
             menu.click();
             expect(body.classList).not.toContain('menu-hidden');

             menu.click();
             expect(body.classList).toContain('menu-hidden');
         })

    });


    /* Entries test suite */
    describe('Initial Entries', function() {
        /* A test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach( function(done) {
            loadFeed(0, done);
         });

         it('contain at least one entry', function(done) {
             const entries = document.querySelectorAll('[data-select=entries]')
             expect(entries.length).toBeGreaterThan(0);
             done();
         })

    });


    /* New Feed Selection suite */
    describe('New Feed Selection', function() {
        let firstFeed, secondFeed

        // Run loadFeed twice
        beforeEach( function(done) {
            loadFeed(0, function() {
                firstFeed = document.querySelector('[data-select=feed]').innerHTML;
                loadFeed(1, function() {
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('is different from previous selection', function(done) {
            secondFeed = document.querySelector('[data-select=feed]').innerHTML;
            expect(firstFeed).not.toBe(secondFeed);
            done();
        });
    });

}());
