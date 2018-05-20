// Gallery Card
document.addEventListener("DOMContentLoaded", function() {
  let galleryCardTitle = document.querySelector('.header__gallery-title');
  let gallery_cards = document.querySelectorAll('.gallery-card');
  if (gallery_cards.length > 0) {
    gallery_cards.forEach((card) => {
      console.log(card);
      card.addEventListener('mouseenter', function(e) {
        let _this = this;
        let galleryTitle = _this.dataset.postTitle;
        galleryCardTitle.innerHTML = `<h2>${galleryTitle}</h2>`;
      });

      card.addEventListener('mouseleave', function() {
        let _this = this;
        galleryCardTitle.innerHTML = '';
      });
    });
  }
});
