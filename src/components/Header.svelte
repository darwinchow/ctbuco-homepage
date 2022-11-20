<script>
    import { slide } from 'svelte/transition';

    let scrollPos;
</script>

<svelte:window bind:scrollY={scrollPos}/>

<header>
    <div class="container flex justify-between p-2 pb-0">
        <div class="nav-brand">
            <a href="/">
                <h1 class="text-4xl font-bold flex flex-row items-center">
                    <img src="/co.png" alt="logo" class="inline h-12 w-12 mr-2">
                    CO
                </h1>
            </a>
            {#if scrollPos < 50}
                <p transition:slide class="mb-2">重庆工商大学CO科创团队</p>
            {/if}
        </div>

        <div class="social-buttons flex flex-col items-end">
            <p class="text-xl font-bold">关注我们</p>
            <div class="flex justify-end">
                <a class="social-logo" href="https://space.bilibili.com/1929514785" target="_blank" rel="noreferrer"><img src="https://bilibili.com/favicon.ico" alt="bilibili-logo"></a>
                <a class="social-logo" href="http://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0ODcxNTYxNA==" target="_blank" rel="noreferrer"><img src="https://mp.weixin.qq.com/favicon.ico" alt="wechat-logo"></a>
                <a class="social-logo" href="https://qm.qq.com/cgi-bin/qm/qr?k=5DVOVkXVaRk2n1I30-QAxHCq9kKXVSb-&jump_from=webapi&authKey=utg0koZNImL1bnOyQsRmL+/4+KtCCGCOlddUuYqYkkr2yy4Zff25z/fNStler7Qg" target="_blank" rel="noreferrer"><img src="https://connect.qq.com/favicon.ico" alt="qq-logo"></a>
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
  background-color: white;
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
