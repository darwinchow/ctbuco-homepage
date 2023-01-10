/**
 * 插值
 * @param   {Number}        scrollY `window.scrollY`
 * @param   {Array<Number>} active  `[begin, stop]` 当 `scrollY` 在此之中才会用 `easing` 函数计算返回值
 * @param   {Array<Number>} range   `[start, end]` 返回值的变化范围
 * @param   {Function}      easing  缓动函数，默认为线性函数
 * @returns {Number}
 */
export const interp = function interpolation(scrollY, active, range, easing=(x => x)) {
    const begin = active[0],
          stop  = active[1],
          start = range[0],
          end   = range[1],
          wind  = stop - begin, // 要进行变化的“窗口”
          rang  = end - start;  // 变化的范围
    if(scrollY <= begin) {
        return start;
    }
    if(scrollY >= stop) {
        return end;
    }
    return start + rang * easing(scrollY / wind);
};

/**
 * 计算元素距离其父元素顶部的距离
 * @param   {HTMLElement} element 
 * @returns {Number}
 */
export const parentTop = function distanceToParent(element) {
    return element ? element.offsetTop - element.parentElement.offsetTop : 0;
};

export default {
    interp,
    parentTop
};
