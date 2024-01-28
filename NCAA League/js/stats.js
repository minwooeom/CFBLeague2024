function loadStats() {
    fetch('../json/stats.json')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => b.yds - a.yds);
            const statsBody = document.querySelector('.stats tbody');
            let statsHtml = '';
            for (let qb of data) {
                const completionPercent = (qb.comp / qb.att * 100).toFixed(2); // Calculate completion percentage
                statsHtml += `
                <tr>
                <td><img src="${qb.image}" alt="${qb.name}" class="qb-image"> ${qb.name}</td>
                <td>${qb.comp}</td>
                <td>${qb.att}</td>
                <td>${qb.yds}</td>
                <td>${qb.td}</td>
                <td>${qb.int}</td>
                <td>${completionPercent}%</td>
            </tr>
                `;
            }
            statsBody.innerHTML = statsHtml;
        })
        .catch(error => console.error('Error loading stats:', error));
}

document.addEventListener('DOMContentLoaded', loadStats);
