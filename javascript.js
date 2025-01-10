/**
 * 從 YouTube URL 中提取影片 ID
 * @param {string} url - YouTube 影片的 URL
 * @returns {string|null} - 影片 ID 或 null
 */
function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

/**
 * 生成 YouTube 影片縮圖的 URL
 * @param {string} youtubeUrl - YouTube 影片的 URL
 * @returns {string|null} - 縮圖的 URL 或 null
 */
function getYoutubeThumbnailUrl(youtubeUrl) {
    const videoId = extractVideoId(youtubeUrl);
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
}

document.getElementById('youtube-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const youtubeUrl = document.getElementById('youtube-url').value;
    const thumbnailUrl = getYoutubeThumbnailUrl(youtubeUrl);
    const resultDiv = document.getElementById('result');
    if (thumbnailUrl) {
        resultDiv.innerHTML = `<img src="${thumbnailUrl}" alt="YouTube 縮圖">`;
    } else {
        resultDiv.textContent = '無法生成縮圖，請檢查 URL 是否正確。';
    }
});