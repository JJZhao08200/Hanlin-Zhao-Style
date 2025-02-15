<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hanlin Zhao - 个人网站</title>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="Style.css">
    <style>
        body {
            text-align: center;
            background-color: #f4f4f4;
            margin: 0;
            font-family: 'Noto Sans SC', sans-serif;
        }
        .profile {
            background: linear-gradient(to right, #333, #555);
            padding: 40px 0;
            color: white;
        }
        .profile-photo {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 4px solid white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
        .name {
            font-size: 2.5rem;
            margin: 10px 0;
        }
        nav ul {
            list-style: none;
            padding: 0;
            display: flex;
            justify-content: center;
            gap: 20px;
            background: #222;
            padding: 15px 0;
        }
        nav ul li a {
            color: #00bfff;
            text-decoration: none;
            font-size: 1.2rem;
            transition: color 0.3s;
        }
        nav ul li a:hover {
            color: #ffcc00;
        }
        .intro {
            margin: 40px 0;
            font-size: 1.5rem;
            color: #333;
        }
        .quote {
            font-size: 1.3rem;
            font-style: italic;
            color: #666;
            margin-top: 20px;
        }
        footer {
            background: #222;
            color: white;
            padding: 20px 0;
            margin-top: 40px;
        }
    </style>
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
