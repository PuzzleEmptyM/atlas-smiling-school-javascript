// Ensure DOM is fully loaded before executing script
$(document).ready(function() {

  // Select loader, carousel container, and navigation arrows elements
  var loader = $('.loader');
  var carouselContainer = $('#inner');
  var nextArrow = $('.carousel-control-next');
  var backArrow = $('.carousel-control-prev');

  // Initially hide navigation arrows
  backArrow.hide();
  nextArrow.hide();

  // Perform AJAX request to fetch carousel data
  $.ajax({
    type: 'GET', // Specify the request method
    url: 'https://smileschool-api.hbtn.info/quotes', // API endpoint URL
    success: function(data) {
      // Delay execution of following code by 3 seconds (3000 milliseconds)
      setTimeout(function() {
        // Hide loader after the delay
        loader.hide();
        // Show navigation arrows
        backArrow.show();
        nextArrow.show();
    
        // Iterate over each item in fetched data
        data.forEach(function(element, idx) {
          var activeStatus = (idx == 0) ? "active" : ""; // First item is 'active'
    
          // Construct carousel item's HTML structure
          var carouselItem = `
          <div class="carousel-item ${activeStatus}">
            <div class="row mx-auto align-items-center">
              <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                <img src="${element.pic_url}" class="d-block align-self-center" alt="Carousel Pic 1" />
              </div>
              <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                <div class="quote-text">
                  <p class="text-white">${element.text}</p>
                  <h4 class="text-white font-weight-bold">${element.name}</h4>
                  <span class="text-white">${element.title}</span>
                </div>
              </div>
            </div>
          </div>`;
    
          // Append constructed carousel item to carousel container
          carouselContainer.append(carouselItem);
        });
      }, 1500); // End of setTimeout
    },

    error: function(error) {
      console.log("Error fetching API");
    }
  })

function ratingCount(stars) {
  var star = `<img src="images/star_on.png" alt="star on" width="15px"/>`
  var noStar = `<img src="images/star_off.png" alt="star off" width="15px"/>`
  var rating = '';
  var i = 0
  for (i; i < stars; i++) {
    rating += star;
  }
  for (i; i < 5; i++) {
    rating += noStar
  }
  return rating;
}

var carouselVideoContainer = $('#video_inner');
setTimeout(() => {
  $.ajax({
    type: 'GET',
    url: 'https://smileschool-api.hbtn.info/popular-tutorials',
    success: function(data) {
      console.log("Data received:", data);
      
      data.forEach(function(element, idx) {
        // Each card is now its own carousel item
        var carouselItem = $('<div class="carousel-item"></div>');
        if (idx === 0) carouselItem.addClass('active'); // First item should be active
        
        // Create the individual video item
        var videoItem = `
        <div class="col-md-3">
          <div class="card">
            <img
                src="${element.thumb_url}"
                class="card-img-top"
                alt="Video thumbnail"
              />
            <div class="card-img-overlay text-center">
              <img
                src="images/play.png"
                alt="Play"
                width="64px"
                class="align-self-center play-overlay"
              />
            </div>
            <div class="card-body">
              <h5 class="card-title font-weight-bold">${element.title}</h5>
              <p class="card-text text-muted">${element['sub-title']}</p>
              <div class="creator d-flex align-items-center">
                <img
                  src="${element.author_pic_url}"
                  alt="Creator of
                  Video"
                  width="30px"
                  class="rounded-circle"
                />
                <h6 class="pl-3 m-0 main-color">${element.author}</h6>
              </div>
              <div class="info pt-3 d-flex justify-content-between">
                <div class="rating">
                  ${ratingCount(element.star)}
              </div>
              <span class="main-color">${element.duration}</span>
            </div>
          </div>
        </div>`;
        // Append the video item to the carousel item
        carouselItem.html(videoItem);
        // Append the carousel item to the carousel container
        carouselVideoContainer.append(carouselItem);
      });

      // After adding items, reinitialize the carousel to work with dynamic content
      $('#carouselExampleControls2').carousel({
        interval: false
      });
    },
    error: function(error) {
      console.log("Could not fetch API");
    }
  });
}, 1500);
});
