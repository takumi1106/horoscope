const rankList = ['1位', '2位', '3位', '4位', '5位', '6位', '7位', '8位', '9位', '10位', '11位', '12位'];

const messageList = [
    '今月は自信が運を引き寄せる月。注目度が高まり、思い切った行動が吉。プレゼンや告白、勝負事に星が味方します。あなたらしさを堂々と示すと、応援者も増え、良い流れに乗れるでしょう。',
    '好奇心が幸運を呼ぶ月。新しい挑戦や普段なら選ばない道にこそチャンスあり。旅行や学び、遠方の人との縁もあるかも。前向きに動くほど未来が広がります。',
    '会話が幸運の鍵となる月。ちょっとした会話や情報交換から、嬉しいチャンスや新しい縁が生まれそうです。積極的にコミュニケーションを取りましょう。',
    '独自の発想が光る月。ひらめきを形にすると評価が上がりそう。SNSやネットでの交流が新しいチャンスにつながります。自由な発想を信じて行動して吉。',
    'これまでの努力が形になりやすい月。責任ある役割を任される可能性もありますが、その分成長のチャンス。地道に積み重ねることで確実に成果が出ます。',
    '直感と行動力が武器の月。迷ったら最初のひらめきを信じて前に進んで吉。新しい出会いやチャンスをつかみやすく、勢いに乗るほど運気がアップします。',
    '周囲との調和が取りやすく、人間関係が円滑に進む月。優しさや美意識が評価されます。ただし遠慮しすぎず、必要なときはしっかり主張することもポイントです。',
    '集中力が高まり、目標に近づく一歩を踏み出せる月。こっそり準備してきたことが形になりやすく、少しずつ前進できそう。自分のペースを大切に。',
    '安定を求める気持ちが強くなる月。マイペースを守ることが運気回復につながります。頑固になりすぎず、柔軟さを意識すると吉。心地よい時間を大切に。',
    '感情の波が少し大きめ。家族や仲間との時間を大切にすると心が安定し運も上向き。無理に明るく振る舞う必要はありません。休息を意識して。',
    '細かいことが気になりやすい月。完璧を求めすぎず、適度に力を抜くことがポイント。ゆっくり整理整頓や計画を見直すと運気も整います。',
    '優しさが空回りしやすい月。無理に合わせず自分の気持ちを守ることが大切。芸術や音楽で癒されると心が安定し、運気も徐々に回復します。'
];

const btns = document.querySelectorAll('.Btn button');
const result = document.querySelector('#result');
const sky = document.getElementById('sky');

const shuffleFortunes = function () {
    const indices = [...Array(rankList.length).keys()];
    //i = indices.length - 1というのはi = 11
    // 条件：i > 0 の間続ける
    //i = 1 まで実行／i = 0 になったら終了（0は最後に残された1つの場所なのでシャッフル不要）
    //i--はiが１つずつ減る
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }//for文の最後には；は要らない
    return indices.map(i => ({
        rank: rankList[i],
        message: messageList[i]
    }));
};

const fortunes = shuffleFortunes();

const showResult = function () {
    result.classList.remove('show');
    void result.offsetWidth;
    result.classList.add('show');
};

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', () => {
        const { rank, message } = fortunes[i];
        result.innerHTML = `
      <h2>12月の運勢は${rank}です。</h2>
      <p>運勢：${message}</p>
    `;
        showResult();
    });
};

/* --- 通常の星を生成 --- */
const createStars = (count = 150) => {
    for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'star';

        s.style.left = Math.random() * 100 + '%';
        s.style.top = Math.random() * 100 + '%';
        s.style.animationDuration = (Math.random() * 2 + 1) + 's';

        sky.appendChild(s);
    }
};

/* --- 流れ星を生成 --- */
const createShootingStar = function () {
    const star = document.createElement('div');
    star.className = 'shooting-star';

    const tail = document.createElement('div');
    tail.className = 'shooting-tail';
    star.appendChild(tail);

    const startY = Math.random() * 60;
    const startX = -10;
    const endX = 240;

    star.style.top = startY + 'vh';
    star.style.left = startX + 'vw';

    sky.appendChild(star);

    setTimeout(() => {
        const duration = 1.5 + Math.random() * 3; // 1.5〜4.5秒
        star.style.transition = `transform ${duration}s linear, opacity ${duration - 0.5}s`;
        star.style.transform = `translate(${endX}vw, 70vh)`;
        star.style.opacity = '0';
    }, 50);

    setTimeout(() => {
        // DOMから消す（存在チェックを入れて安全に）
        if (star.parentNode === sky) sky.removeChild(star);
    }, 1500);
};

/* --- 流れ星を複数ランダムで流す --- */
const loopShootingStars = function () {
    // 濃くしたいなら回数を増やす（例：3〜8）
    createShootingStar();

    setTimeout(loopShootingStars, Math.random() * 1500 + 500);
};

// 初期実行（※ loopShootingStars は1回だけにする）
createStars();
loopShootingStars();