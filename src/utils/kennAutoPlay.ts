// utils/keenAutoplay.ts
export const Autoplay = (interval = 3000) => {
  let timeout: ReturnType<typeof setTimeout>;
  let mouseOver = false;

  const clearNextTimeout = () => clearTimeout(timeout);

  const nextTimeout = (slider: any) => {
    clearTimeout(timeout);
    if (mouseOver) return;
    timeout = setTimeout(() => {
      slider.next();
    }, interval);
  };

  return (slider: any) => {
    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false;
        nextTimeout(slider);
      });
      nextTimeout(slider);
    });

    slider.on("dragStarted", clearNextTimeout);
    slider.on("animationEnded", () => nextTimeout(slider));
    slider.on("updated", () => nextTimeout(slider));
  };
};
