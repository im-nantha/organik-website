$(document).ready(function() {
  if ($(".organic-banner").length) {
    initiateBannerSlick();
  }
  if ($(".organic-cards").length) {
    cardAnimation();
  }

  // slick functionallity
  function initiateBannerSlick() {
    $(".organic-banner").slick({
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      prevArrow: `<div class="arrows arrow-left"><p class="previous">&#8249;</p></div>`,
      nextArrow: `<div class="arrows arrow-right"><p class="next">&#8250;</p></div>`
    });
  }
  // Intersection observer functionality
  function cardAnimation() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
    const hiddenElements = document.querySelectorAll(
      ".oc-card-left, .oc-card-right, .ao-img, .ao-subtitle, .ao-title, .ao-text, .ao-button, .ao-paper-items, .of-boxes, .organic-product-list"
    );
    hiddenElements.forEach(el => observer.observe(el));
  }
  // load more functionality
  let contentItems = $(".organic-product-list");
  const loadMoreButton = $("#load-more-button");
  let initialCount = 4;
  let loadedCount = initialCount;

  // Show the initial set of cards
  contentItems.slice(0, initialCount).show();

  // Event listener for the Load More button
  loadMoreButton.on("click", function() {
    contentItems.slice(loadedCount, loadedCount + 4).show();
    loadedCount += 4;
    if (loadedCount >= contentItems.length) {
      loadMoreButton.addClass("d-none");
    }
    // Hide the button if all items are shown
    if (loadedCount >= contentItems.length) {
      loadMoreButton.hide();
    }
  });
  $(".explore-more").on("click", function() {
    $("html, body").animate(
      {
        scrollTop: $("#products").offset().top
      },
      600
    );
  });
  // mobile view hamburger
  if ($(window).width() < 768) {
    let menu = $(".organic-navbar-content");
    let $menuItems = $(".organic-nav-wrap");
    let hamburger = $(".hamburger");
    let closeIcon = $(".closeIcon");
    let menuIcon = $(".menuIcon");

    function toggleMenu() {
      if (menu.hasClass("showMenu")) {
        menu.removeClass("showMenu");
        closeIcon.hide();
        menuIcon.show();
        document.body.style.overflow = "auto";
      } else {
        menu.addClass("showMenu");
        closeIcon.show();
        menuIcon.hide();
        document.body.style.overflow = "hidden";
      }
    }
    hamburger.on("click", toggleMenu);
    $menuItems.each(function() {
      $(this).on("click", toggleMenu);
    });
  }
});
