function loadNews() {
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = urlParams.get('news');

    fetch('../json/news.json')
        .then(response => response.json())
        .then(allNewsData => {
            const newsData = allNewsData[newsId];
            document.getElementById('newsTitle').textContent = newsData.newsTitle;
            document.getElementById('newsImg').src = newsData.newsImg;
            document.getElementById('newsCaption').textContent = newsData.newsCaption;
            const articleText = newsData.articleText.split('\n').map(para => `<p>${para}</p>`).join('');
            document.getElementById('articleText').innerHTML = articleText;
        })
        .catch(error => console.error('Error loading news data:', error));

}

document.addEventListener('DOMContentLoaded', loadNews);
