<!-- https://codepen.io/creativeocean/pen/YzvoMRg 移植过来没有怎么 debug，很可能不稳定 -->

<script>
    import gsap from "gsap";
    import { onMount } from "svelte";

    export let field;
    export let imgs;

    imgs = imgs.map(i => `/img/fields/${field}/${i}`)

    let id = `field-${field}`;

    onMount(() => {
        const imgFg = document.querySelector(`#${id}-imgFg`);
        const imgBg = document.querySelector(`#${id}-imgBg`);
        const svg   = document.querySelector(`#${id}-svg`);
        const pos = { x: svg.clientWidth / 2, y: svg.clientHeight / 2 };
        for (let i = 0; i < imgs.length; i++) {
            const img = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "image"
            );
            imgBg.appendChild(img);
            gsap.set(img, {
                attr: {
                    x: "-5%",
                    y: "-5%",
                    width: "110%",
                    height: "110%",
                    href: imgs[i],
                    preserveAspectRatio: "xMidYMid slice",
                },
            });
        }

        window.addEventListener("resize", () => {
            pos.x = svg.clientWidth / 2;
            pos.y = svg.clientHeight / 2;
            gsap.set(`.${id}-circle`, { duration: 0.3, attr: { cx: pos.x, cy: pos.y } });
        });

        svg.addEventListener("mouseenter", (e) => {
            loop.pause();
            svg.addEventListener("mousemove", mouseFollow);
            mouseClickOn();
        });

        svg.addEventListener("mouseleave", (e) => {
            mouseClickOff();
            svg.removeEventListener("mousemove", mouseFollow);
            pos.x = svg.clientWidth / 2;
            pos.y = svg.clientHeight / 2;
            gsap.to(`.${id}-circle`, {
                attr: { cx: pos.x, cy: pos.y },
                ease: "power2.inOut",
            });
            gsap.to(imgFg.children[0], { attr: { x: "-5%", y: "-5%" } });
            loop.play(0);
        });

        function mouseClickOn() {
            svg.addEventListener("mousedown", maskConstrict);
            svg.addEventListener("mouseup", nextImg);
        }

        function mouseClickOff() {
            svg.removeEventListener("mousedown", maskConstrict);
            svg.removeEventListener("mouseup", nextImg);
        }

        function mouseFollow(e) {
            pos.x = e.offsetX;
            pos.y = e.offsetY;
            gsap.to(`.${id}-circle`, { duration: 0.3, attr: { cx: pos.x, cy: pos.y } });
            gsap.to(imgFg.children[0], {
                attr: {
                    x: gsap.utils.interpolate("0%", "-10%", pos.x / svg.clientWidth),
                    y: gsap.utils.interpolate("0%", "-10%", pos.y / svg.clientHeight),
                },
            });
        }

        function maskConstrict(e) {
            gsap.to(`.${id}-circle`, { duration: 0.3, attr: { r: (i) => [30, 50][i] } });
        }

        function nextImg() {
            mouseClickOff();
            gsap
                .timeline()
                .to(`.${id}-circle`, {
                    duration: 0.4,
                    attr: { r: svg.clientWidth },
                    ease: "power3.in",
                    stagger: -0.1,
                })
                .add(() => {
                    imgFg.append(imgBg.children[imgBg.children.length - 1]);
                    imgBg.prepend(imgFg.children[0]);
                    gsap.set(`.${id}-circle`, { attr: { r: 0 } });
                })
                .fromTo(
                    `.${id}-circle`,
                    { attr: { r: 0, cx: pos.x, cy: pos.y } },
                    {
                        attr: { r: (i) => [35, 45][i] },
                        ease: "power2.inOut",
                        stagger: -0.1,
                    },
                    0.5
                )
                .add(mouseClickOn);
        }

        imgFg.append(imgBg.children[imgBg.children.length - 1]);
        gsap.fromTo(
            `.${id}-circle`,
            { attr: { cx: pos.x, cy: pos.y } },
            { attr: { r: (i) => [35, 45][i] }, ease: "power2.inOut" }
        );

        const loop = gsap
            .timeline({ repeatRefresh: true, repeat: -1 })
            .add(maskConstrict, 3)
            .add(nextImg, 3.15);
    });
</script>

<template lang="pug">
div.field-content-container(id="{id}")
    svg(width="100%",height="100%",id="{`${id}-svg`}")
        mask(id="{`${id}-m`}")
            circle(id="{`${id}-c1`}",class="{`${id}-circle`}",cx="40",cy="40",r="0",fill="#fff")
            circle(id="{`${id}-c0`}",class="{`${id}-circle`}",cx="40",cy="40",r="0",fill="#fff",opacity="0.5")
        g(id="{`${id}-imgFg`}")
        g(id="{`${id}-imgBg`}",mask="url(#{`${id}-m`})")
</template>

<style lang="scss">
.field-content-container {
    width: calc(100% - 96px);
    height: calc(100% - 48px);
    border-radius: 48px;
    overflow: hidden;
    margin: 24px 48px 48px;
    transform: scale(var(--scale-rate));
    box-shadow: 0 16px 24px rgba(255, 255, 255, 0.6);
}
</style>
