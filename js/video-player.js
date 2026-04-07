class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.videoId = container.dataset.videoId;

    this.init();
  }

  init() {
    if (!this.videoId) {
      console.error("VideoPlayer: data-video-id is required");
      return;
    }

    this.container.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${this.videoId}?enablejsapi=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const players = document.querySelectorAll(".video-player");
  players.forEach((container) => {
    new VideoPlayer(container);
  });
});