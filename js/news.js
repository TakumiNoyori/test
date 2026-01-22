async function loadNews(limit = null) {
    const res = await fetch("../json/news.json");
    const data = await res.json();

    // JSONの末尾が最新 → reverse()で最新が先頭に来る
    const reversed = data.slice().reverse();

    // limit があれば最新 limit 件だけ
    const newsItems = limit ? reversed.slice(0, limit) : reversed;

    const list = document.getElementById("news-list");
    list.innerHTML = "";

    newsItems.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="news-date">${item.date}</div>
            <div class="news-tag tag-${item.tag}">${item.tag}</div>
            <div class="news-content">${item.content}</div>
        `;

        list.appendChild(li);
    });
}


// ページによって読み込む件数を変える
document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById("news-list");

    if (list) {
        const limit = list.dataset.limit ? Number(list.dataset.limit) : null;
        loadNews(limit);
    }
});
