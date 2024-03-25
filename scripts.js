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
      // Delay execution of the following code by 3 seconds (3000 milliseconds)
      setTimeout(function() {
        // Hide the loader after the delay
        loader.hide();
        // Show the navigation arrows
        backArrow.show();
        nextArrow.show();
    
        // Iterate over each item in the fetched data
        data.forEach(function(element, idx) {
          var activeStatus = (idx == 0) ? "active" : ""; // First item is 'active'
    
          // Construct the carousel item's HTML structure
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
    
          // Append the constructed carousel item to the carousel container
          carouselContainer.append(carouselItem);
        });
      }, 1500); // End of setTimeout
    },

    error: function(error) {
      console.log("Error fetching API");
    }
  })
});
