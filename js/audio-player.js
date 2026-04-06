class AudioPlayer {
  constructor(container) {
    this.container = container;
    this.src = container.dataset.src;
    this.playBtn = container.querySelector(".audio-btn-play");
    this.progressContainer = container.querySelector(".audio-progress");
    this.progressFill = container.querySelector(".audio-progress-fill");
    this.durationEl = container.querySelector(".audio-time-duration");
    this.volumeSlider = container.querySelector(".audio-volume-slider");
    this.speedBtn = container.querySelector(".audio-speed-btn");
    this.speedPopover = container.querySelector(".audio-speed-popover");
    this.speedOptions = container.querySelectorAll(".audio-speed-option");

    this.isPlaying = false;
    this.currentSpeed = 1;
    this.animationId = null;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.howl = new Howl({
      src: [this.src],
      html5: true,
      preload: true,
      rate: 1,
      volume: 1,
      onload: () => this.onLoad(),
      onplay: () => this.onPlay(),
      onpause: () => this.onPause(),
      onend: () => this.onEnded(),
    });

    this.playBtn.addEventListener("click", () => this.togglePlay());
    this.progressContainer.addEventListener("click", (e) => this.seek(e));
    this.progressContainer.addEventListener("mousedown", () =>
      this.startDrag(),
    );
    this.progressContainer.addEventListener("mouseup", () => this.endDrag());
    this.progressContainer.addEventListener("mouseleave", () => this.endDrag());
    this.progressContainer.addEventListener("mousemove", (e) => this.onDrag(e));
    this.volumeSlider.addEventListener("input", (e) => this.setVolume(e));
    this.speedBtn.addEventListener("click", (e) => this.toggleSpeedPopover(e));
    this.speedOptions.forEach((option) => {
      option.addEventListener("click", (e) => this.setSpeed(e));
    });

    this.updateVolumeBackground();

    document.addEventListener("click", (e) => {
      if (
        !this.speedPopover.contains(e.target) &&
        !this.speedBtn.contains(e.target)
      ) {
        this.speedPopover.classList.remove("open");
      }
    });
  }

  onLoad() {
    this.durationEl.textContent = this.formatTime(this.howl.duration());
  }

  onPlay() {
    this.isPlaying = true;
    this.updatePlayButton();
    this.startProgressAnimation();
  }

  onPause() {
    this.isPlaying = false;
    this.updatePlayButton();
    this.stopProgressAnimation();
  }

  onEnded() {
    this.isPlaying = false;
    this.progressFill.style.width = "0%";
    this.durationEl.textContent = this.formatTime(this.howl.duration());
    this.updatePlayButton();
    this.stopProgressAnimation();
  }

  startDrag() {
    this.isDragging = true;
    this.progressContainer.classList.add("dragging");
  }

  endDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      this.progressContainer.classList.remove("dragging");
    }
  }

  onDrag(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    this.seek(e);
  }

  startProgressAnimation() {
    const update = () => {
      if (!this.isPlaying) return;

      const seek = this.howl.seek();
      const duration = this.howl.duration();
      const percent = (seek / duration) * 100;

      this.progressFill.style.width = `${percent}%`;
      this.durationEl.textContent = this.formatTime(seek);

      this.animationId = requestAnimationFrame(update);
    };

    this.animationId = requestAnimationFrame(update);
  }

  stopProgressAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  togglePlay() {
    if (this.isPlaying) {
      this.howl.pause();
    } else {
      this.howl.play();
    }
  }

  updatePlayButton() {
    const svg = this.playBtn.querySelector("svg");
    if (this.isPlaying) {
      svg.innerHTML =
        '<path d="M0 3.5V14.5H4.5V3.5H0ZM9.5 3.5V14.5H14V3.5H9.5Z" fill="currentColor"/>';
    } else {
      svg.innerHTML =
        '<path d="M0 17.5V0L13.75 8.75L0 17.5ZM2.5 12.9375L9.0625 8.75L2.5 4.5625V12.9375Z" fill="currentColor"/>';
    }
  }

  seek(e) {
    const rect = this.progressContainer.getBoundingClientRect();
    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width),
    );
    const seekTime = percent * this.howl.duration();
    this.howl.seek(seekTime);

    this.progressFill.style.width = `${percent * 100}%`;
    this.durationEl.textContent = this.formatTime(seekTime);
  }

  setVolume(e) {
    const volume = parseFloat(e.target.value);
    this.howl.volume(volume);
    this.updateVolumeBackground();
  }

  updateVolumeBackground() {
    const percent = this.volumeSlider.value * 100;
    this.volumeSlider.style.background = `linear-gradient(to right, var(--color-slate-850) ${percent}%, var(--color-gray-200) ${percent}%)`;
  }

  toggleSpeedPopover(e) {
    e.stopPropagation();
    this.speedPopover.classList.toggle("open");
  }

  setSpeed(e) {
    const speed = parseFloat(e.target.dataset.speed);
    this.howl.rate(speed);
    this.currentSpeed = speed;

    this.speedOptions.forEach((opt) => {
      opt.classList.toggle("active", parseFloat(opt.dataset.speed) === speed);
    });

    this.speedPopover.classList.remove("open");
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const players = document.querySelectorAll(".audio-player");
  players.forEach((container) => {
    new AudioPlayer(container);
  });
});
