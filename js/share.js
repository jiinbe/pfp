async function shareCanvas() {
  const canvasElement = document.getElementById('canvas');
  const dataUrl = canvasElement.toDataURL();
  const blob = await (await fetch(dataUrl)).blob();
  const filesArray = [
    new File(
      [blob],
      'image.png',
      {
        type: blob.type,
        lastModified: new Date().getTime()
      }
    )
  ];
  const shareData = {
    files: filesArray,
    title: "Twibbon Aplikasi",
    text: "Learn web development on MDN!",
    url: "https://developer.mozilla.org",
  };
  navigator.share(shareData);
}
