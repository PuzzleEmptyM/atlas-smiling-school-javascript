$(document).ready(function() {
  var loader = $('.loader');
  var carouselCommentsContainer = $('#comments-inner');
  var nextArrow = $('.carousel-control-next');
  var backArrow = $('.carousel-control-prev');
  var coursesVideos = $('#coursesVideos');
  backArrow.hide();
  nextArrow.hide()
  function getCommentsAPI() {
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/quotes',
        success: function(data) {
          loader.hide();
          backArrow.show();
          nextArrow.show();
          data.forEach(function(element, idx) {
            var activeStatus = (idx == 0) ? "active" : "" 
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
            </div>`
          carouselCommentsContainer.append(carouselItem);
          });
        },
        error: function(error) {
          console.log("Could not fetch API");
        }
      })
    }, 1500);
  }

  function getVideosAPI() {
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/popular-tutorials',
        success: function(data) {
          loader.hide();
          data.forEach(function(video) {
            var videoCard = `
            <div class="col-sm-12 col-md-6 col-lg-3 d-sm-flex justify-content-md-start justify-content-lg-center justify-content-sm-center ml-5 ml-sm-0">
              <div class="card">
                <img
                  src="${video.thumb_url}"
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
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">
                  ${video['sub-title']}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src="${video.author_pic_url}"
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">${ratingCount(video.star)}</div>
                    <span class="main-color">${video.duration}</span>
                  </div>
                </div>
              </div>
            </div>`
            $('#video_carousel').append(videoCard);
          })
          $('.carousel-slick').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 860,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 580,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          })
        },
        error: function() {
          console.log("Couldn't get API");
        }
      })
    }, 1500);
  }

  function ratingCount(stars) {
    var starON = `<img src="images/star_on.png" alt="star on" width="15px"/>`
    var starOFF = `<img src="images/star_off.png" alt="star off" width="15px"/>`
    var finalRating = '';
    var i = 0
    for (i; i < stars; i++) {
      finalRating += starON;
    }
    for (i; i < 5; i++) {
      finalRating += starOFF
    }
    return finalRating;
  }

  function getLatestVideosAPI() {
    setTimeout(() => {
      $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/latest-videos',
        success: function(data) {
          loader.hide();
          data.forEach(function(video) {
            var videoCard = `
            <div class="col-sm-12 col-md-6 col-lg-3 d-sm-flex justify-content-md-start justify-content-lg-center justify-content-sm-center ml-5 ml-sm-0">
              <div class="card">
                <img
                  src="${video.thumb_url}"
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
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">
                  ${video['sub-title']}
                  </p>
                  <div class="creator d-flex align-items-center">
                    <img
                      src="${video.author_pic_url}"
                      alt="Creator of
                      Video"
                      width="30px"
                      class="rounded-circle"
                    />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">${ratingCount(video.star)}</div>
                    <span class="main-color">${video.duration}</span>
                  </div>
                </div>
              </div>
            </div>`
            $('#latest_video_carousel').append(videoCard);
          })
          $('.carousel-slick').slick({
            infinite: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  infinite: true,
                }
              },
              {
                breakpoint: 860,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint: 580,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              }
            ]
          })
        },
        error: function() {
          console.log("Couldn't get API");
        }
      })
    }, 1500);
  }


  var currentPage = window.location.pathname;

  if (currentPage.includes('homepage.html')) {
    getCommentsAPI();
    getVideosAPI();
    getLatestVideosAPI();
  }
});
