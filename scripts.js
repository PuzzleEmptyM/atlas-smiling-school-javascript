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

  function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function dropdownItems(items, dropId, click) {
    let dropdownMenu = $('#' + dropId);
    dropdownMenu.empty();
    items.forEach(function(item) {
      let itemText = item.replace('_', ' ');
      itemText = capFirst(itemText);
      let dropdownItem = $('<a class="dropdown-item" href="#" data-value="' + itemText + '">' + itemText + '</a>');

      dropdownItem.click(function() {
          click(itemText)
      });

      dropdownMenu.append(dropdownItem);
    });
  }

  function dropTopicGenerate(dropId) {
    let dropdownMenu = $('#' + dropId);
    let firstText = dropdownMenu.find('.dropdown-item').first().text();
    $('#topic_dropdown').append('<span id="topicSpan">' + firstText + '</span>');
  }

  function dropSortGenerate(dropId) {
    let dropdownMenu = $('#' + dropId);
    let firstText = dropdownMenu.find('.dropdown-item').first().text();
    $('#sortBy_dropdown').append('<span id="sortSpan">' + firstText + '</span>');
  }

  function dropTopicClick(itemText, videos) {
    $('#topic_dropdown span').text(itemText);
    appendVideos();
  }

  function dropSortClick(itemText, videos) {
    $('#sortBy_dropdown span').text(itemText);
    appendVideos();
  }
``
  $('.search-text-area').on('keypress', function(event) {
  if (event.which === 13 || event.keyCode === 13) {
    appendVideos();
  }
  });

  function filterVideos(videos, keyWords) {
    if (!keyWords) {
      return videos;
    } else {
      return videos.filter(function(video) {
        if (Array.isArray(video.keyWords)) {
          return video.keyWords.join(' ').toLowerCase().includes(keyWords.toLowerCase());
        }
        return false;
      });
    }
  }

  function appendVideos(video) {
    coursesVideos.empty();
    var keyWordVal = $('.search-text-area').val().toLowerCase();
    var filteredVideos = filterVideos(video, keyWordVal);

    $.each(filteredVideos, function(idx, data) {
      var videoInfo = data.video;
      var videoCard = `
        <div class="col-sm-12 col-md-6 col-lg-3 d-sm-flex justify-content-md-start justify-content-lg-center justify-content-sm-center ml-5 ml-sm-0">
        <div class="card">
          <img
            src="${videoInfo.thumb_url}"
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
            <h5 class="card-title font-weight-bold">${videoInfo.title}</h5>
            <p class="card-text text-muted">
            ${videoInfo['sub-title']}
            </p>
            <div class="creator d-flex align-items-center">
              <img
                src="${videoInfo.author_pic_url}"
                alt="Creator of
                Video"
                width="30px"
                class="rounded-circle"
              />
              <h6 class="pl-3 m-0 main-color">${videoInfo.author}</h6>
            </div>
            <div class="info pt-3 d-flex justify-content-between">
              <div class="rating">${ratingCount(videoInfo.star)}</div>
              <span class="main-color">${videoInfo.duration}</span>
            </div>
          </div>
        </div>
      </div>
      `;
      coursesVideos.append(videoCard);
    });

    if (filteredVideos.length > 1) {
      $('.video_count').text(`${filteredVideos.length} videos`);
    } else {
      $('.video_count').text(`${filteredVideos.length} video`);
    }
  }


  function getCoursesAPI() {
    var keyWordVal = $('.search-text-area').val().toLowerCase();
    var topicVal = $('#topic_dropdown span').text().toLowerCase();
    var sortVal = $('#sortBy_dropdown span').text().toLowerCase();
    $.ajax({
      url: 'https://smileschool-api.hbtn.info/courses',
      method: 'GET',
      dataType: 'json',
      data: {
        q: keyWordVal,
        topic: topicVal,
        sort: sortVal
      },
      success: function(data) {
        loader.hide();
        coursesVideos.show();
        if (data && data.topics && data.sorts) {
          dropdownItems(data.topics, 'topicDropdownMenu', function(itemText) {
              dropTopicClick(itemText, videos);
          });
          dropdownItems(data.sorts, 'sortDropdownMenu', function(itemText) {
              dropSortClick(itemText, videos);
          });

          dropTopicGenerate('topicDropdownMenu');
          dropSortGenerate('sortDropdownMenu');
        }

        $('.search-text-area').val(data.q);
        var vidsToShow = [];
          data.courses.forEach(function(idx, item) {
            vidsToShow.push({
              video: item,
              views: item.views,
              published_at: new Date(item.published_at),
              topic: item.topic,
              keywords: item.keywords
            });
          });
          appendVideos(vidsToShow);
      },
    error: function() {
      console.log('something went wrong while filtering the JSON data');
    }
    });

  }

  var currentPage = window.location.pathname;

  if (currentPage.includes('homepage.html')) {
    getCommentsAPI();
    getVideosAPI();
    getLatestVideosAPI();
  } else if (currentPage.includes('pricing.html')) {
    getCommentsAPI();
  } else if (currentPage.includes('courses.html')) {
    getCoursesAPI();
  }
});
