import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import randomInt from 'random-int';

const MyConfetti = ({ dropRate }) => {
    // function snowflake(ctx) {
    //     const numPoints = this.numPoints || randomInt(3, 4) * 2;
    //     this.numPoints = numPoints;
    //     const innerRadius = this.radius * 0.2;
    //     const outerRadius = this.radius * 0.8;
    //     ctx.beginPath();
    //     ctx.moveTo(0, 0 - outerRadius);

    //     for (let n = 1; n < numPoints * 2; n++) {
    //         const radius = n % 2 === 0 ? outerRadius : innerRadius;
    //         const x = radius * Math.sin((n * Math.PI) / numPoints);
    //         const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
    //         ctx.lineTo(x, y);
    //     }
    //     ctx.fill();
    //     ctx.stroke();
    //     ctx.closePath();
    // }

    function star(ctx) {
        const numPoints = this.numPoints || randomInt(4, 6);
        this.numPoints = numPoints;
        const outerRadius = this.w;
        const innerRadius = outerRadius / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0 - outerRadius);

        for (let n = 1; n < numPoints * 2; n++) {
            const radius = n % 2 === 0 ? outerRadius : innerRadius;
            const x = radius * Math.sin((n * Math.PI) / numPoints);
            const y = -1 * radius * Math.cos((n * Math.PI) / numPoints);
            ctx.lineTo(x, y);
        }
        ctx.fill();
        ctx.closePath();
    }

    const { width, height } = useWindowSize();
    return <Confetti numberOfPieces={dropRate} width={width} height={height} drawShape={star} />;
};

export default MyConfetti;
