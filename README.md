<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hanlin Zhao - 个人网站</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Style.css">
    <style>
        .profile {
            background: linear-gradient(to bottom, #333, #111);
            padding: 40px 0;
            color: white;
            text-align: center;
            position: relative;
        }
        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
            display: block;
            margin: auto;
            animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        nav ul li a:hover {
            color: #ffcc00;
            transition: color 0.3s ease-in-out;
        }
        #dynamic-quote {
            opacity: 1;
            transition: opacity 0.5s ease-in-out;
        }
    </style>
</head>
<body>
    <header>
        <h1 class="site-title">Hanlin Zhao</h1>
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
            quoteElement.style.opacity = 0;
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                quoteElement.textContent = quotes[randomIndex];
                quoteElement.style.opacity = 1;
            }, 500);
        }
        setInterval(changeQuote, 5000);
    </script>
</body>
</html>
