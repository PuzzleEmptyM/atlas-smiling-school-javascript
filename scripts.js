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

      // Once data is fetched successfully, hide the loader and show navigation arrows
      loader.hide();
      backArrow.show();
      nextArrow.show();

      // Iterate over each item in fetched data
      data.forEach(function(element, idx) {
        // Determine if current item should be active item in carousel
        var activeStatus = (idx == 0) ? "active" : ""; // First item is 'active', others are not

        // Construct carousel item's HTML structure
        var carouselItem = `
        <div class="carousel-item ${activeStatus}">
          <div class="row mx-auto align-items-center">
            <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
              <img
                src="${element.pic_url}"
                class="d-block align-self-center"
                alt="Carousel Pic 1"
              />
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
    },
    error: function(error) {
      console.log("Error fetching API");
    }
  })
});
