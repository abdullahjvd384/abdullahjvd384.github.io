document.addEventListener('DOMContentLoaded', function () {
    const playlistId = 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w';
    const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API v3 key
    const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&key=${apiKey}&maxResults=20`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videoList = document.querySelector('#video-list ul');
            data.items.forEach(item => {
                const videoId = item.snippet.resourceId.videoId;
                const videoTitle = item.snippet.title;
                const videoThumbnail = item.snippet.thumbnails.default.url;

                const li = document.createElement('li');
                li.innerHTML = `
                    <img src="${videoThumbnail}" alt="${videoTitle}">
                    <p>${videoTitle}</p>
                `;
                li.addEventListener('click', () => {
                    document.querySelector('#ytplayer').src = `https://www.youtube.com/embed/${videoId}`;
                });

                videoList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching the playlist data:', error));
});
