<script>
    import 'css-doodle';

    const doodlePayload = ":doodle {@grid: 1x20 / 100vmin;}@place-cell: center;width: @rand(60vmin, 100vmin);height: @rand(60vmin, 100vmin);transform: translate(@rand(-120%, 120%), @rand(-80%, 80%)) scale(@rand(.8, 2.8)) skew(@rand(45deg));clip-path: polygon(@r(0, 30%) @r(0, 50%),@r(30%, 60%) @r(0%, 30%),@r(60%, 100%) @r(0%, 50%),@r(60%, 100%) @r(50%, 100%),@r(30%, 60%) @r(60%, 100%),@r(0, 30%) @r(60%, 100%));background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf, #e136eb, #f57c23, #32ed39);opacity: @rand(.5, .9);position: relative;top: @rand(-80%, 80%);left: @rand(-80%, 80%);animation: colorChange @rand(6.1s, 26.1s) infinite @rand(-.5s, -2.5s) linear alternate;@keyframes colorChange {100% {left: 0;top: 0;filter: hue-rotate(360deg);}}";
    // TODO: 加个 3D 跟随效果，不然太单调了
</script>

<template lang="pug">
div.scroll-container(style="height: calc(2 * var(--body-height));")
    div.section
        .bg
            css-doodle {doodlePayload}
        .marquee-container
            article.wrapper
                .marquee
                    each aria in ['false', 'true']
                        - var n = 1;
                        .marquee__group(aria-hidden=aria)
                            while n <= 15
                                svg
                                    image(height="100%",width="100%",href="/img/awards/1/"+(n++)+".png")
                .marquee.marquee--reverse
                    each aria in ['false', 'true']
                        - var n = 1;
                        .marquee__group(aria-hidden=aria)
                            while n <= 12
                                svg
                                    image(height="100%",width="100%",href="/img/awards/2/"+(n++)+".png")
        p.title 团队荣誉


</template>

<style lang="scss">
.bg {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #fff;
    z-index: -1;
    css-doodle::after {
        content: "";
        position: absolute;
        top: -100%;
        left: -100%;
        right: -100%;
        bottom: -100%;
        backdrop-filter: blur(100px);
    }
}

.title {
    position: absolute;
    margin-left: 50%;
    transform: translateX(-50%);
    font-size: 120px;
    font-weight: bold;
    color: transparent;
    background: conic-gradient(
        #D9D7F1 12%, 
        #BAABDA 12%, #BAABDA 33%, 
        #E7FBBE 33%, #E7FBBE 55%, 
        #FFCBCB 55%, #FFCBCB 70%, 
        #B5DEFF 70%, #B5DEFF 87%, 
        #F7D1BA 87%);
    background-size: 50%;
    background-clip: text;
    animation: expand-rev 0.5s ease forwards;
    &:hover {
        animation: expand 0.5s ease forwards;
    }
    @keyframes expand {
        0% {
            background-size: 50%;
            background-position: 0 0;
        }
        20% {
            background-size: 55%;
            background-position: 0 1em;
        }
        100% {
            background-size: 325%;
            background-position: -10em -4em;
        }
    }
    
    @keyframes expand-rev {
        0% {
            background-size: 325%;
            background-position: -10em -4em;
        }
        20% {
            background-size: 55%;
            background-position: 0 1em;
        }
        100% {
            background-size: 50%;
            background-position: 0 0;
        }
    }
}

:root {
    --color-bg-accent: linear-gradient(135deg, #0092db 40%, #fff94c);
    --size: clamp(10rem, 1rem + 40vmin, 30rem);
    --gap: calc(var(--size) / 14);
    --duration: 60s;
    --scroll-start: 0;
    --scroll-end: calc(-100% - var(--gap));
}

@media (prefers-reduced-motion: reduce) {
    .marquee__group {
        animation-play-state: paused;
    }
}

.marquee-container {
    position: absolute;
    display: grid;
    align-content: center;
    overflow: hidden;
    gap: var(--gap);
    width: 100%;
    min-height: 100vh;
    font-size: 1rem;
    line-height: 1.5;
    .marquee {
        display: flex;
        overflow: hidden;
        user-select: none;
        gap: var(--gap);
        mask-image: linear-gradient(
            var(--mask-direction, to right),
            hsl(0 0% 0% / 0),
            hsl(0 0% 0% / 1) 20%,
            hsl(0 0% 0% / 1) 80%,
            hsl(0 0% 0% / 0)
        );
        .marquee__group {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: var(--gap);
            min-width: 100%;
            animation: scroll-x var(--duration) linear infinite;
        }
    }
    .marquee--reverse .marquee__group {
        animation-direction: reverse;
        animation-delay: -3s;
    }
    @keyframes scroll-x {
        from {
            transform: translateX(var(--scroll-start));
        }
        to {
            transform: translateX(var(--scroll-end));
        }
    }
    
    @keyframes scroll-y {
        from {
            transform: translateY(var(--scroll-start));
        }
        to {
            transform: translateY(var(--scroll-end));
        }
    }
}

/* Element styles */
.marquee svg {
    display: grid;
    place-items: center;
    width: var(--size);
    background: var(--color-bg-accent);
    aspect-ratio: 16/9;
    padding: calc(var(--size) / 14);
    border-radius: 0.5rem;
}

/* Parent wrapper */
.wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin: auto;
    max-width: 100vw;
}

@keyframes fade {
    to {
        opacity: 0;
        visibility: hidden;
    }
}
</style>
