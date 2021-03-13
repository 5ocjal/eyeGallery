window.saveDataAcrossSessions = true;
let image = getNewImage();
let nextImage = getNewImage(true);

let startLookingTime = Number.POSITIVE_INFINITY;
const delay = 800;
let lookDirection = null;
const leftSwipe = window.innerWidth / 4;
const rightSwipe = window.innerWidth - window.innerWidth / 4;

webgazer
  .setGazeListener((data, timestamp) => {
    if (!data || lookDirection === 'none') return;
    if (
      data.x < leftSwipe &&
      lookDirection !== 'left' &&
      lookDirection !== 'reset'
    ) {
      lookDirection = 'left';
      startLookingTime = timestamp;
    } else if (
      data.x > rightSwipe &&
      lookDirection !== 'right' &&
      lookDirection !== 'reset'
    ) {
      lookDirection = 'right';
      startLookingTime = timestamp;
    } else if (data.x >= leftSwipe && data.x <= rightSwipe) {
      lookDirection = null;
      startLookingTime = Number.POSITIVE_INFINITY;
    }

    if (startLookingTime + delay < timestamp) {
      if (lookDirection === 'left') {
        image.classList.add('left');
      }
      if (lookDirection === 'right') {
        image.classList.add('right');
      }

      startLookingTime = Number.POSITIVE_INFINITY;
      lookDirection = 'none';

      setTimeout(() => {
        image.remove();
        nextImage.classList.remove('hidden');
        image = nextImage;
        nextImage = getNewImage(true);
        lookDirection = 'reset';
      }, 1000);
    }
  })
  .begin();

  webgazer.showVideoPreview(false).showPredictionPoints(false);

function getNewImage(hidden = false) {
  const picture = document.createElement('img');
  picture.src = 'https://picsum.photos/1000?' + Math.random();

  hidden ? picture.classList.add('hidden') : null;
  document.body.append(picture);
  return picture;
}
