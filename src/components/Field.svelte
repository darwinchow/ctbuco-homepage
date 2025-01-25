<script>
    import { parentTop, interp } from '../utils';
    import FieldContent from './FieldContent.svelte';
    
    let section, scrollPos, height, width;

    $: bodyHeight    = height - 96;
    $: range         = bodyHeight / 4;
    $: lightProgress = interp(scrollPos, [3 * bodyHeight, 4 * bodyHeight], [bodyHeight, 0]);
    $: titleOpacity  = interp(scrollPos, [4 * bodyHeight - 184, 4 * bodyHeight - 24], [0, 1]);

    const fieldOpacity = (i) => {
        const start = (4 + i) * bodyHeight - range;
        const end   = (5 + i) * bodyHeight;
        if(scrollPos <= start || scrollPos >= end) {
            return 0;
        }
        if(scrollPos >= start + range && scrollPos <= end - range) {
            return 1;
        }
        const progress = (start + range > scrollPos ? scrollPos - start :  scrollPos - end) / range;
        return Math.abs(progress);
    };
    const scaleRate = (scroll) => {
        const scrollLocal = scroll % bodyHeight;
        return scrollLocal > bodyHeight - range ? interp((scrollLocal - bodyHeight + range) / range, [0, 1], [0, 1], x => Math.abs(1 - 2 * x)) : 1;
    };
    const fieldContentTop = (scroll) => {
        if(typeof(scroll) !== 'number' || scrollPos < 4 * bodyHeight - .5 * range)
            return bodyHeight;
        const page        = Math.floor(scroll / bodyHeight);
        const scrollLocal = scroll % bodyHeight;
        return -((scrollLocal > bodyHeight - range ? interp((scrollLocal - bodyHeight + range) / range, [0, 1], [0, 1]) * bodyHeight : 0) + (page - 4) * bodyHeight);
    };
</script>

<svelte:window bind:scrollY={scrollPos} bind:innerHeight={height} bind:innerWidth={width}/>

<template lang="pug">
div.scroll-container(style="height: calc(8 * var(--body-height));--left: {interp(scrollPos, [9 * bodyHeight, 10 * bodyHeight], [500, width])}px;--light-progress: {lightProgress}px;--title-opacity: {titleOpacity}")
    div.wrap.section
        p.title(style="margin-top: {interp(scrollPos, [10 * bodyHeight, 11 * bodyHeight], [0, bodyHeight])}px;") 方向
        div.field-container
            each field, i in ['web', 'app', '嵌入式', 'ai', 'ctf']
                p.word(style="opacity: {scrollPos ? fieldOpacity(" + i + ") : 0};filter: blur({(1 - (scrollPos ? fieldOpacity(" + i + ") : 0)) * 20}px);")= field.toUpperCase()
        div.field-contents(style="margin-top: {fieldContentTop(scrollPos)}px;--scale-rate: {scaleRate(scrollPos)};")
            each f in [['web',"['covid.jpg','dms.jpg']"],['app',"['fireproof.jpg','meeting.jpg']"],['嵌入式',"['retirement-home.jpg','agriculture.jpg']"],['ai',"['auto-aim.jpg','driver.jpg']"],['ctf',"['lvmeng-award.jpg','lvmeng-coattack.jpg']"]]
                FieldContent(field=f[0],imgs="{" + f[1] + "}")
        div.light-shadow
</template>

<style lang="scss">
.wrap {
    margin: auto;
    width: 100%;
    height: var(--body-height);
    background:
        conic-gradient(
            from 180deg at var(--left) var(--light-progress),
            hsla(170deg, 100%, 70%, .7),
            transparent 50%,
            hsla(219deg, 90%, 80%, .5) 100%),
            linear-gradient(180deg, #0092db, #002268);
    overflow: hidden;
    .light-shadow {
        margin-top: var(--light-progress);
        margin-left: var(--left);
        width: 400px;
        height: calc(100vh - 96px);
        background: #000;
        clip-path: polygon(0 -100%, -200% -100%, -200% 200%, 0 200%);
        box-shadow: 
            0px 0 .5px hsla(170deg, 95%, 80%, 1),
            0px 0 1px hsla(170deg, 91%, 80%, .95),
            0px 0 2px hsla(171deg, 91%, 80%, .95),
            0px 0 3px hsla(171deg, 91%, 80%, .95),
            0px 0 4px hsla(171deg, 91%, 82%, .9),
            0px 0 5px hsla(172deg, 91%, 82%, .9),
            0px 0 10px hsla(173deg, 91%, 84%, .9),
            0px 0 20px hsla(174deg, 91%, 86%, .85),
            0px 0 40px hsla(175deg, 91%, 86%, .85),
            0px 0 60px hsla(175deg, 91%, 86%, .85);
        mix-blend-mode: hard-light;
    }
    .title {
        position: absolute;
        width: var(--left);
        opacity: var(--title-opacity);
        text-align: center;
        margin-top: 24px;
        font-size: 160px;
        color: #fff;
        filter: brightness(110%);
        text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #0092db, 0 0 35px #0092db, 0 0 40px #0092db, 0 0 50px #0092db, 0 0 75px #0092db;
        animation: pink 1.5s ease-in-out infinite alternate;
    }
    .field-container {
        position: absolute;
        width: 500px;
        height: 100%;
        bottom: 0;
        color: #fff;
        font-size: 96px;
        filter: contrast(15);
        .word {
            font-weight: bolder;
            position: absolute;
            top: 50%;
            width: 100%;
            transform: translate(0, -50%);
            text-align: center;
            // glare 效果
            color: transparent;
            clip-path: inset(0 0 0 100%);
            transition: clip-path .25s .25s;
            background: linear-gradient(55deg, transparent 33%, #f8f9fa, transparent 66%) 0 0 / 200% 100%, hsl(210 17% 98% / 0.25);
            -webkit-background-clip: text;
            clip-path: inset(0 0 0 0);
            animation: glare calc(4 * .25s) infinite linear;
        }
    }
    .field-contents {
        position: absolute;
        height: 100%;
        width: calc(100% - 500px);
        margin-left: 500px;
    }
}

@keyframes glare {
	0% {
		background-position: 0 0, 0 0;
	}
	100% {
		background-position: 200% 0, 0 0;
	}
}

@keyframes title {
  to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #0092db, 0 0 70px #0092db, 0 0 80px #0092db, 0 0 100px #0092db, 0 0 150px #0092db;
  }
}

</style>
