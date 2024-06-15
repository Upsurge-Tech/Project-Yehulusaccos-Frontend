export const getVideoId = (link: string): string | null => {
  try {
    if (!link.includes("https://www.youtube.com/watch?v")) {
      return null;
    }
    const url = new URL(link);
    const params = new URLSearchParams(url.search);
    const videoId = params.get("v");
    return videoId || null;
  } catch (e) {
    // console.log(e);
    return null;
  }
};
