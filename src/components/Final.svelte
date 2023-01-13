<script>
    import 'css-doodle';
</script>

<template lang="pug">
div.scroll-container(style="height: calc(2 * var(--body-height));")
    div.section
        .bg
            css-doodle(use="var(--rule)")
        .content
            p CO
            p 始于所好，乐在与共

</template>

<style lang="scss">
.bg {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(-135deg, #379aea, #32166a);
    css-doodle {
        --color: @p(#51eaea, #fffde1, #ff9d76, #FB3569);
        --rule: (:doodle { @grid: 30x1 / 18vmin; --deg: @p(-180deg, 180deg); } :container { perspective: 100vmin; } :after, :before { content: ''; background: var(--color); @place-cell: @r(100%) @r(100%); @size: @r(6px); @shape: hypocycloid @r(20); } @place-cell: center; @size: 100%; border-radius: @r(40%, 50%); box-shadow: @m2(0 0 50px var(--color)); background: @m100(radial-gradient(var(--color) 50%, transparent 0) @r(-20%, 120%) @r(-20%, 100%) / 1px 1px no-repeat); will-change: transform, opacity; animation: scale-up 120s linear infinite; animation-delay: calc(-120s / @I * @i); @keyframes scale-up { 0%, 95.01%, 100% { transform: translateZ(0) rotate(0); opacity: 0; } 10% { opacity: 1; } 95% { transform: translateZ(90vmin) rotateZ(@var(--deg)); } });
    }
}
.content {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    :nth-child(1) {
        color: #fff;
        font-size: 96px;
        font-weight: bolder;
    }
    :nth-child(2) {
        color: #fff;
        font-size: 48px;
        font-weight: bolder;
    }
}
</style>
