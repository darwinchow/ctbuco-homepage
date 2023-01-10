<script>
    import { interp } from '../utils';
    let scrollPos, width, height;

    let coLogo;
    let coText;

    const easeOutCirc = (x) => Math.sqrt(1 - Math.pow(x - 1, 2));

    // 下面这些变量不能直接写成值，因为很多标签都是在改变的，这也就导致 `offsetLeft` 一类变量会一直更新，
    // 但是由于没有明显的出现赋值语句，svelte 不会更新，所以需要在 `scrollY` 更改的时候通过后面的 style 调用函数来获取
    const coLogoW = () => interp(scrollPos, [0, height - 96], [144, 48], easeOutCirc),
          coLogoH = () => coLogoW(),
          coLogoL = () => coLogo ? coLogo.offsetLeft : 0,
          coLogoT = () => coLogo ? coLogo.offsetTop : 0,
          coTextL = () => coLogoL() + coLogoW(); // 由于第一次计算的时候 logo 的宽度还没有改变，所以用来计算的值不是预期的 offsetLeft，这里通过 logo 的数据推算出 text 的 offsetLeft

    $: backgroundStyle = `
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url("/img/team.jpg");
        background-repeat:no-repeat;
        background-attachment:fixed;
        background-position:center;
        background-size: cover;
        filter: opacity(${interp(scrollPos, [0, height - 96], [.6, 0], (x => x === 0 ? 0 : Math.pow(2, 10 * x - 10)))}) blur(2px);
        z-index: -1;`;
    $: coLogoStyle = `
        width: ${coLogoW()}px;
        height: ${coLogoH()}px;
        transform: 
            translateX(${interp(scrollPos, [0, height - 96], [(width / 2) - coLogoL() - (coLogoW() / 2), 0], easeOutCirc)}px)
            translateY(${interp(scrollPos, [0, height - 96], [(height / 2) - coLogoT() - (coLogoH() / 2), 0], easeOutCirc)}px);`;
    $: coTextStyle = `
        font-size: ${interp(scrollPos, [0, height - 96], [80, 40])}px;
        transform:
            translateX(${interp(scrollPos, [0, height - 96], [width / 2 - coTextL() - 48, 0], easeOutCirc)}px)
            translateY(${interp(scrollPos, [0, height - 96], [height / 2 + 16, 0], easeOutCirc)}px);`;
</script>

<svelte:window bind:scrollY={scrollPos} bind:innerWidth={width} bind:innerHeight={height}/>

<header style="height: {height - scrollPos > 96 ? height - scrollPos : 96}px;">
    <div style={backgroundStyle}></div>
    <div class="container flex justify-between p-2 pb-0">
        <div class="nav-brand">
            <a href="/">
                <h1 class="text-4xl font-bold flex flex-row items-center">
                    <img bind:this={coLogo} src="/img/co.png" alt="logo" class="inline mr-2" style={coLogoStyle}>
                    <span bind:this={coText} style={coTextStyle}>CO</span>
                </h1>
            </a>
        </div>

        <div class="social-buttons flex flex-col items-end" style="min-width: 120px;margin: auto 0;">
            <p class="font-bold" style="font-size: 24px;">关注我们</p>
            <div class="flex justify-end" style="font-size: 24px;">
                <a class="social-logo" href="https://space.bilibili.com/1929514785" target="_blank" rel="noreferrer"><img src="/img/bilibili.svg" alt="bilibili-logo"></a>
                <a class="social-logo" href="http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0ODcxNTYxNA==" target="_blank" rel="noreferrer"><img src="/img/wechat.svg" alt="wechat-logo"></a>
                <a class="social-logo" href="https://qm.qq.com/cgi-bin/qm/qr?k=5DVOVkXVaRk2n1I30-QAxHCq9kKXVSb-&jump_from=webapi&authKey=utg0koZNImL1bnOyQsRmL+/4+KtCCGCOlddUuYqYkkr2yy4Zff25z/fNStler7Qg" target="_blank" rel="noreferrer"><img src="/img/qq.svg" alt="qq-logo"></a>
            </div>
        </div>
    </div>
</header>

<style>
/* Header */
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  border-bottom: 4px solid #D3D3D3;
  /* 背景颗粒效果 */
  background: radial-gradient(transparent, rgba(255, 255, 255, 1) 2px);
  background-size: 4px 4px;
  backdrop-filter: blur(10px);
}

header > .container {
  margin: 0 auto;
  padding-top: 1rem;
}

/* Social meida logo */
.social-logo {
    margin-left: 8px;
}
.social-logo > img {
    width: 32px;
    height: 32px;
}
</style>
