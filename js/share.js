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
    text: "Twibbon adalah cara sederhana untuk mengekspresikan dukungan dan partisipasi kita dalam suatu acara atau gerakan.",
    url: "https://badut.pages.dev/",
  };
  navigator.share(shareData);
}
