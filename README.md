<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hanlin Zhao - 个人网站</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Style.css">
</head>
<body>
    <header>
        <div class="profile">
            <img src="hanlin_black_white.jpg" alt="Hanlin Zhao" class="profile-photo">
            <h1 class="name">赵翰林</h1>
        </div>
        <nav>
            <ul>
                <li><a href="index.html">首页</a></li>
                <li><a href="about.html">关于我</a></li>
                <li><a href="projects.html">项目</a></li>
                <li><a href="life-hobbies.html">生活与兴趣</a></li>
                <li><a href="contact.html">联系</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="intro">
            <h2>「探索数据之美，感受生活之诗。」</h2>
            <p>数据分析师 | 设计师 | 诗人 | 登山者</p>
        </section>
        <section class="quote">
            <p id="dynamic-quote">人生如登山，每一步都是风景。</p>
        </section>
    </main>
    <footer>
        <p>© 2025 Hanlin Zhao. All rights reserved.</p>
    </footer>
    <script>
        const quotes = [
            "人生如登山，每一步都是风景。",
            "数据是冰冷的，洞察才有温度。",
            "越过险峰，才能见到最美的日出。",
            "代码如诗，简洁才是美。"
        ];
        function changeQuote() {
            const quoteElement = document.getElementById("dynamic-quote");
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteElement.textContent = quotes[randomIndex];
        }
        setInterval(changeQuote, 5000);
    </script>
</body>
</html>
