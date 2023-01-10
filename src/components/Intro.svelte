<script>
    import { parentTop } from '../utils';

    let scrollPos, section, height;

    $:pTop = scrollPos ? parentTop(section) : 0; // 这里要用 scrollPos 来把 pTop 标记为脏数据来让 svelte 更新，相当于加了一个滚动的监听事件
</script>

<svelte:window bind:scrollY={scrollPos} bind:innerHeight={height}/>

<template lang="pug">
div.scroll-container.w-full(style="height: calc(2 * var(--body-height));")
    div.intro.section(bind:this="{section}")
        div.main.grid.place-content-center
            p.container.text-xl.text-center(class!="{pTop > 0 ? 'show' : ''}")
                each char in '重庆工商大学CO科创团队于2016年10月11日成立，由重庆工商大学在校大学生组成。团队研究方向涉及测控技术、机械设计、自动化控制、单片机设计、PCB制作、APP制作、UI设计、PC上位机设计、服务器搭建、3D建模、网络安全等方面。自成立以来，共参加了挑战杯、中国服务外包大赛、全国大学生数学建模竞赛、中国大学生计算机设计大赛、恩智浦杯全国大学生智能车竞赛、全国大学生信息安全竞赛等赛事，共计获得国家级竞赛奖项18项、省部级竞赛奖项25项、校级竞赛奖项24项、校级以上荣誉150余项、重庆工商大学校长荣誉奖，并成功申请专利两项。CO全称为Challenger Organisation，寓意不断挑战自我，这也是团队精神所在。'
                    span(data-text=char)= char
        div.footer
            div.bubbles
                - for (var i = 0; i < 128; i++) //Small numbers looks nice too
                    div.bubble(style=`--size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s;`)
            div.content
                div.grid.place-content-center
                    p.text-9xl 关于我们
        svg
            defs
                filter#blob
                    feGaussianBlur(in="SourceGraphic" stdDeviation="10" result="blur")
                    feColorMatrix(in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob")
</template>

<style lang="scss">
.intro {
    display: grid;
    grid-template-rows: 1fr 10rem auto;
    grid-template-areas: "main" "." "footer";
    overflow-x: hidden;
    .main {
        p {
            position: relative;
            padding-bottom: 1rem;
            font-size: 22px;
            line-height: 1.5;
            overflow: hidden;
            z-index: 2;
        }
        p span {
            position: relative;
            display: inline-block;
            opacity: 0;
            transform: translateY(15px) translateZ(0);
            transition-property: transform, opacity;
            transition-duration: .3s, .2s;
            transition-timing-function: cubic-bezier(.23,1,.32,1), linear;
        }
        p.show span {
            opacity: 1;
            color: #000;
            transform: translateY(0) translateZ(0);
            transition-property: transform, opacity;
            transition-duration: 1s, .2s;
            transition-timing-function: cubic-bezier(.23,1,.32,1), linear;
        }
        p span:after,
        p span:before {
            position: absolute;
            content: attr(data-text);
            top: 0;
            left: 0;
            z-index: 1;
            transform: translateZ(0);
            will-change: opacity;
        }
        p span:after {
            color: #0092db;
            transition-property: opacity;
            transition-duration: .01s;
            transition-timing-function: cubic-bezier(.23,1,.32,1);
        }
        p.show span:after {
            opacity: 0;
            transition-property: opacity;
            transition-duration: .04s;
            transition-timing-function: cubic-bezier(.23,1,.32,1);
        }
        @for $i from 1 to 313 {
            p span:nth-child(#{$i}) {
                transition-delay: #{$i * 0.04}s;
                &::after {
                    transition-delay: #{$i * 0.04 + 0.04}s;
                }
            }
        }
    }
    .footer {
        z-index: 1;
        --footer-background: #0092db;
        display: grid;
        position: relative;
        grid-area: footer;
        .bubbles {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 1rem;
            background: var(--footer-background);
            filter: url("#blob");
            .bubble {
                position: absolute;
                left: var(--position, 50%);
                background: var(--footer-background);
                border-radius: 100%;
                animation: bubble-size var(--time, 4s) ease-in infinite var(--delay, 0s),
                    bubble-move var(--time, 4s) ease-in infinite var(--delay, 0s);
                transform: translate(-50%, 100%);
            }
        }
        .content {
            z-index: 2;
            padding: 2rem;
            background: var(--footer-background);
            p {
                color: #F5F7FA;
            }
        }
    }
}

@keyframes bubble-size {
    0%, 75% {
        width:var(--size, 4rem);
        height:var(--size, 4rem);
    }
    100% {
        width:0rem;
        height:0rem;
    }
}
@keyframes bubble-move {
    0% {
        bottom:-4rem;
    }
    100% {
        bottom:var(--distance, 10rem);
    }
}

</style>
