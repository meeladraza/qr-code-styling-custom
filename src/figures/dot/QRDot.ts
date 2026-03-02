import dotTypes from "../../constants/dotTypes";
import { DotType, GetNeighbor, DrawArgs, BasicFigureDrawArgs, RotateFigureArgs, Window } from "../../types";

export default class QRDot {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: DotType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: DotType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, getNeighbor: GetNeighbor): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case dotTypes.dots:
        drawFunction = this._drawDot;
        break;
      case dotTypes.classy:
        drawFunction = this._drawClassy;
        break;
      case dotTypes.classyRounded:
        drawFunction = this._drawClassyRounded;
        break;
      case dotTypes.rounded:
        drawFunction = this._drawRounded;
        break;
      case dotTypes.extraRounded:
        drawFunction = this._drawExtraRounded;
        break;
      case dotTypes.star:
        drawFunction = this._drawStar;
        break;
      case dotTypes.diamond:
        drawFunction = this._drawDiamond;
        break;
      case dotTypes.heart:
        drawFunction = this._drawHeart;
        break;
      case dotTypes.plus:
        drawFunction = this._drawPlus;
        break;
      // case dotTypes.roundedPlus:
      //   drawFunction = this._drawRoundedPlus;
      //   break;
      case dotTypes.cross:
        drawFunction = this._drawCross;
        break;
      case dotTypes.verticalBar:
        drawFunction = this._drawVerticalBar;
        break;
      case dotTypes.verticalSquareBar:
        drawFunction = this._drawVerticalSquareBar;
        break;
      case dotTypes.horizontalBar:
        drawFunction = this._drawHorizontalBar;
        break;
      case dotTypes.horizontalGridBar:
        drawFunction = this._drawHorizontalGridBar;
        break;
      case dotTypes.concaveSquare:
        drawFunction = this._drawConcaveSquare;
        break;
      case dotTypes.smallRounded:
        drawFunction = this._drawSmallRounded;
        break;
      case dotTypes.squareBar:
        drawFunction = this._drawSquareBar;
        break;
      case dotTypes.classyDot:
        drawFunction = this._drawClassyDot;
        break;
      case dotTypes.diamondRounded:
        drawFunction = this._drawDiamondRounded;
        break;
      case dotTypes.classySquare:
        drawFunction = this._drawClassySquare;
        break;
      case dotTypes.cube:
        drawFunction = this._drawCube;
        break;
      case dotTypes.square:
      default:
        drawFunction = this._drawSquare;
    }

    drawFunction.call(this, { x, y, size, getNeighbor });
  }

  _rotateFigure({ x, y, size, rotation = 0, draw }: RotateFigureArgs): void {
    const cx = x + size / 2;
    const cy = y + size / 2;

    draw();
    this._element?.setAttribute("transform", `rotate(${(180 * rotation) / Math.PI},${cx},${cy})`);
  }

  _basicDot(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._element.setAttribute("cx", String(x + size / 2));
        this._element.setAttribute("cy", String(y + size / 2));
        this._element.setAttribute("r", String(size / 2));
      }
    });
  }

  _basicSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this._element.setAttribute("x", String(x));
        this._element.setAttribute("y", String(y));
        this._element.setAttribute("width", String(size));
        this._element.setAttribute("height", String(size));
      }
    });
  }

  //if rotation === 0 - right side is rounded
  _basicSideRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size / 2}` + //draw line to left bottom corner + half of size right
            `a ${size / 2} ${size / 2}, 0, 0, 0, 0 ${-size}` // draw rounded corner
        );
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size}` + //draw line to right bottom corner
            `v ${-size / 2}` + //draw line to right bottom corner + half of size top
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${-size / 2} ${-size / 2}` // draw rounded corner
        );
      }
    });
  }

  //if rotation === 0 - top right corner is rounded
  _basicCornerExtraRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to top left position
            `v ${size}` + //draw line to left bottom corner
            `h ${size}` + //draw line to right bottom corner
            `a ${size} ${size}, 0, 0, 0, ${-size} ${-size}` // draw rounded top right corner
        );
      }
    });
  }

  //if rotation === 0 - top right corner is cut diagonally at 45°
  _basicCornerDiagonal(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
            `v ${size}` +
            `h ${size}` +
            `v ${-size / 2}` +
            `l ${-size / 2} ${-size / 2}` +
            `Z`
        );
      }
    });
  }

  //if rotation === 0 - bottom-left and top-right corners are cut diagonally at 45°
  _basicCornersDiagonal(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
            `v ${size / 2}` +
            `l ${size / 2} ${size / 2}` +
            `h ${size / 2}` +
            `v ${-size / 2}` +
            `l ${-size / 2} ${-size / 2}` +
            `Z`
        );
      }
    });
  }

  //if rotation === 0 - left bottom and right top corners are rounded
  _basicCornersRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` + //go to left top position
            `v ${size / 2}` + //draw line to left top corner + half of size bottom
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${size / 2} ${size / 2}` + // draw rounded left bottom corner
            `h ${size / 2}` + //draw line to right bottom corner
            `v ${-size / 2}` + //draw line to right bottom corner + half of size top
            `a ${size / 2} ${size / 2}, 0, 0, 0, ${-size / 2} ${-size / 2}` // draw rounded right top corner
        );
      }
    });
  }

  _basicStar(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    const outerRadius = size / 2;
    const innerRadius = outerRadius / 1.7; // Fatter inner radius — bolder bigger-looking star
    const points = 5; // 5-pointed star

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        let path = "";
        for (let i = 0; i <= points * 2; i++) {
          const angle = (i * Math.PI) / points - Math.PI / 2;
          const radius = i % 2 === 0 ? outerRadius : innerRadius;
          const xPos = centerX + radius * Math.cos(angle);
          const yPos = centerY + radius * Math.sin(angle);

          if (i === 0) {
            path += `M ${xPos} ${yPos}`;
          } else {
            path += ` L ${xPos} ${yPos}`;
          }
        }
        path += " Z"; // Close the path

        this._element.setAttribute("d", path);
      }
    });
  }

  _basicDiamond(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const halfSize = size / 2;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        this._element.setAttribute(
          "points",
          `${x + halfSize},${y} ` + // Top center
            `${x + size},${y + halfSize} ` + // Right middle
            `${x + halfSize},${y + size} ` + // Bottom center
            `${x},${y + halfSize}` // Left middle
        );
      }
    });
  }

  _basicHeart(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const cx = x + size / 2;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Heart fully contained within [x, x+size] × [y, y+size]
        const path =
          `M ${cx} ${y + size * 0.95}` +
          // Left side up to top-left bump
          ` C ${x + size * 0.05} ${y + size * 0.65}` +
          ` ${x + size * 0.02} ${y + size * 0.27}` +
          ` ${x + size * 0.25} ${y + size * 0.12}` +
          // Left bump over top to center dip
          ` C ${x + size * 0.42} ${y + size * 0.02}` +
          ` ${cx} ${y + size * 0.15}` +
          ` ${cx} ${y + size * 0.28}` +
          // Right bump from center dip over top
          ` C ${cx} ${y + size * 0.15}` +
          ` ${x + size * 0.58} ${y + size * 0.02}` +
          ` ${x + size * 0.75} ${y + size * 0.12}` +
          // Right side down to bottom tip
          ` C ${x + size * 0.98} ${y + size * 0.27}` +
          ` ${x + size * 0.95} ${y + size * 0.65}` +
          ` ${cx} ${y + size * 0.95}` +
          ` Z`;

        this._element.setAttribute("d", path);
      }
    });
  }

  _basicPlus(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const thickness = size * 0.4; // 40% thickness — bolder plus arms
    const center = size / 2;

    this._rotateFigure({
      ...args,
      rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Single continuous path for perfect intersection
        const path = `
                M ${x},${y + center - thickness / 2}
                H ${x + size}
                V ${y + center + thickness / 2}
                H ${x + center + thickness / 2}
                V ${y + size}
                H ${x + center - thickness / 2}
                V ${y + center + thickness / 2}
                H ${x}
                V ${y + center - thickness / 2}
                H ${x + center - thickness / 2}
                V ${y}
                H ${x + center + thickness / 2}
                V ${y + center - thickness / 2}
                Z
            `;

        this._element.setAttribute("d", path.replace(/\s+/g, " ").trim());
      }
    });
  }

  // _basicRoundedPlus(args: BasicFigureDrawArgs): void {
  //   const { size, x, y } = args;
  //   const thickness = size * 0.1; // 20% thickness
  //   const radius = thickness / 2; // Corner radius
  //   const center = size / 2;

  //   this._rotateFigure({
  //     ...args,
  //     rotation: 0,
  //     draw: () => {
  //       this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

  //       // Rounded plus path with perfect corners
  //       const path = `
  //             M ${x + radius},${y + center - thickness / 2}
  //             H ${x + size - radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + size},${y + center - thickness / 2 + radius}
  //             V ${y + center + thickness / 2 - radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + size - radius},${y + center + thickness / 2}
  //             H ${x + center + thickness / 2 + radius}
  //             V ${y + size - radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + center + thickness / 2},${y + size}
  //             H ${x + center - thickness / 2}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + center - thickness / 2 - radius},${y + size - radius}
  //             V ${y + center + thickness / 2 + radius}
  //             H ${x + radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x},${y + center + thickness / 2 - radius}
  //             V ${y + center - thickness / 2 + radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + radius},${y + center - thickness / 2}
  //             H ${x + center - thickness / 2 - radius}
  //             V ${y + radius}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + center - thickness / 2},${y}
  //             H ${x + center + thickness / 2}
  //             A ${radius} ${radius}, 0, 0, 1, ${x + center + thickness / 2 + radius},${y + radius}
  //             V ${y + center - thickness / 2 - radius}
  //             Z
  //         `;

  //       this._element.setAttribute("d", path.replace(/\s+/g, " ").trim());
  //       this._element.setAttribute("stroke-linejoin", "round");
  //     }
  //   });
  // }

  _basicVerticalBar(args: BasicFigureDrawArgs): void {
    // Full vertical pill (capsule): rounded top and bottom semicircles
    const { size, x, y } = args;
    const barWidth = size * 0.72;
    const r = barWidth / 2;
    const cx = x + size / 2;
    const bx = cx - r; // left edge of bar
    const ex = cx + r; // right edge of bar

    this._rotateFigure({
      ...args,
      rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        // Top semicircle: from left tangent to right tangent going over the top (CCW, sweep=0)
        // Bottom semicircle: from right tangent to left tangent going under the bottom (CW, sweep=1)
        this._element.setAttribute(
          "d",
          `M ${bx} ${y + r}` +
          ` A ${r} ${r} 0 0 1 ${ex} ${y + r}` +
          ` L ${ex} ${y + size - r}` +
          ` A ${r} ${r} 0 0 1 ${bx} ${y + size - r}` +
          ` Z`
        );
      }
    });
  }

  _basicHorizontalBar(args: BasicFigureDrawArgs): void {
    // Full horizontal pill (capsule): rounded left and right semicircles
    const { size, x, y } = args;
    const barHeight = size * 0.72;
    const r = barHeight / 2;
    const cy = y + size / 2;
    const by = cy - r; // top edge of bar
    const ey = cy + r; // bottom edge of bar

    this._rotateFigure({
      ...args,
      rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        // Left semicircle: from top tangent to bottom tangent going left (CCW, sweep=0)
        // Right semicircle: from bottom tangent to top tangent going right (CW, sweep=1)
        this._element.setAttribute(
          "d",
          `M ${x + r} ${by}` +
          ` A ${r} ${r} 0 0 0 ${x + r} ${ey}` +
          ` L ${x + size - r} ${ey}` +
          ` A ${r} ${r} 0 0 0 ${x + size - r} ${by}` +
          ` Z`
        );
      }
    });
  }

  _basicCross(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    // Draw a plus shape and rotate 45° — this produces a crisp × (cross/X) shape
    const thickness = size * 0.3; // slightly less bold than plus (0.4)
    const center = size / 2;

    this._rotateFigure({
      ...args,
      rotation: Math.PI / 4, // 45° turns + into ×
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        const path =
          `M ${x},${y + center - thickness / 2}` +
          ` H ${x + size}` +
          ` V ${y + center + thickness / 2}` +
          ` H ${x + center + thickness / 2}` +
          ` V ${y + size}` +
          ` H ${x + center - thickness / 2}` +
          ` V ${y + center + thickness / 2}` +
          ` H ${x}` +
          ` V ${y + center - thickness / 2}` +
          ` H ${x + center - thickness / 2}` +
          ` V ${y}` +
          ` H ${x + center + thickness / 2}` +
          ` V ${y + center - thickness / 2}` +
          ` Z`;
        this._element.setAttribute("d", path);
      }
    });
  }

  // Full-size square with very slight corner rounding (radius = size * 0.1)
  _basicSmallRoundedSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const r = size * 0.1;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x + r} ${y}` +
          ` H ${x + size - r}` +
          ` A ${r} ${r} 0 0 1 ${x + size} ${y + r}` +
          ` V ${y + size - r}` +
          ` A ${r} ${r} 0 0 1 ${x + size - r} ${y + size}` +
          ` H ${x + r}` +
          ` A ${r} ${r} 0 0 1 ${x} ${y + size - r}` +
          ` V ${y + r}` +
          ` A ${r} ${r} 0 0 1 ${x + r} ${y}` +
          ` Z`
        );
      }
    });
  }

  // Like _basicCornerRounded but with a tiny radius (size * 0.12) — matches Pattern3 SVG corners
  _basicTinyCornerRounded(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const r = size * 0.12;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        // rotation=0: tiny convex arc at top-right corner; same structure as _basicCornerRounded
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
          `v ${size}` +
          `h ${size}` +
          `v ${-(size - r)}` +
          `a ${r} ${r}, 0, 0, 0, ${-r} ${-r}` +
          ` Z`
        );
      }
    });
  }

  _basicConcaveSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    const spacingRatio = 0.25;
    const adjustedSize = size * (1 - spacingRatio);
    const offset = (size - adjustedSize) / 2;

    const spikeLength = adjustedSize * 0.2; // how far the corners flare out
    const posX = x + offset - spikeLength / 2;
    const posY = y + offset - spikeLength / 2;
    const cx = posX + adjustedSize / 2;
    const cy = posY + adjustedSize / 2;

    const top = posY;
    const bottom = posY + adjustedSize;
    const left = posX;
    const right = posX + adjustedSize;

    this._rotateFigure({
      ...args,
      x: posX,
      y: posY,
      size: adjustedSize,
      rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        const path = `
          M ${cx}, ${top - spikeLength}                       
          L ${right - spikeLength}, ${top + spikeLength}
          L ${right + spikeLength}, ${cy}
          L ${right - spikeLength}, ${bottom - spikeLength}
          L ${cx}, ${bottom + spikeLength}
          L ${left + spikeLength}, ${bottom - spikeLength}
          L ${left - spikeLength}, ${cy}
          L ${left + spikeLength}, ${top + spikeLength}
          Z
        `;

        this._element.setAttribute("d", path.replace(/\s+/g, " ").trim());
      }
    });
  }

  // Concave-sided square — all 4 sides bow inward (like square-grid/EyeBall1 style)
  _basicCube(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;
    const bow = size * 0.15; // control point inward offset
    const cx = x + size / 2;
    const cy = y + size / 2;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y}` +
          // Top side bows downward (inward)
          ` C ${cx - bow} ${y + bow} ${cx + bow} ${y + bow} ${x + size} ${y}` +
          // Right side bows leftward (inward)
          ` C ${x + size - bow} ${cy - bow} ${x + size - bow} ${cy + bow} ${x + size} ${y + size}` +
          // Bottom side bows upward (inward)
          ` C ${cx + bow} ${y + size - bow} ${cx - bow} ${y + size - bow} ${x} ${y + size}` +
          // Left side bows rightward (inward)
          ` C ${x + bow} ${cy + bow} ${x + bow} ${cy - bow} ${x} ${y}` +
          ` Z`
        );
      }
    });
  }

  _drawDot({ x, y, size }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation: 0 });
  }

  _drawSquare({ x, y, size }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      this._basicSquare({ x, y, size, rotation: 0 });
      return;
    }

    if (neighborsCount === 2) {
      let rotation = 0;

      if (leftNeighbor && topNeighbor) {
        rotation = Math.PI / 2;
      } else if (topNeighbor && rightNeighbor) {
        rotation = Math.PI;
      } else if (rightNeighbor && bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicCornerRounded({ x, y, size, rotation });
      return;
    }

    if (neighborsCount === 1) {
      let rotation = 0;

      if (topNeighbor) {
        rotation = Math.PI / 2;
      } else if (rightNeighbor) {
        rotation = Math.PI;
      } else if (bottomNeighbor) {
        rotation = -Math.PI / 2;
      }

      this._basicSideRounded({ x, y, size, rotation });
      return;
    }
  }

  _drawExtraRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;
    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    const cx = x + size / 2;
    const cy = y + size / 2;

    if (neighborsCount === 0) {
      // Isolated dot: diamond (points at cell edge midpoints)
      this._rotateFigure({
        x, y, size, rotation: 0,
        draw: () => {
          this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
          this._element.setAttribute("d",
            `M ${cx} ${y} L ${x + size} ${cy} L ${cx} ${y + size} L ${x} ${cy} Z`
          );
        }
      });
      return;
    }

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d: string;

        const isCorner = neighborsCount === 2 &&
          !((leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor));

        if (neighborsCount === 1) {
          // Triangular arrowhead pointing AWAY from the single neighbor
          if (leftNeighbor) {
            // left neighbor → tip points RIGHT
            d = `M ${x} ${y} L ${cx} ${y} L ${x + size} ${cy} L ${cx} ${y + size} L ${x} ${y + size} Z`;
          } else if (rightNeighbor) {
            // right neighbor → tip points LEFT
            d = `M ${x + size} ${y} L ${cx} ${y} L ${x} ${cy} L ${cx} ${y + size} L ${x + size} ${y + size} Z`;
          } else if (topNeighbor) {
            // top neighbor → tip points DOWN
            d = `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${cy} L ${cx} ${y + size} L ${x} ${cy} Z`;
          } else {
            // bottom neighbor → tip points UP
            d = `M ${x} ${y + size} L ${x + size} ${y + size} L ${x + size} ${cy} L ${cx} ${y} L ${x} ${cy} Z`;
          }
        } else if (isCorner) {
          // Two perpendicular neighbors: full square with the one exposed outer corner chamfered
          const c = size * 0.4;
          if (!topNeighbor && !leftNeighbor) {
            // top-left free → chamfer top-left
            d = `M ${x + c} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${y + size} L ${x} ${y + c} Z`;
          } else if (!topNeighbor && !rightNeighbor) {
            // top-right free → chamfer top-right
            d = `M ${x} ${y} L ${x + size - c} ${y} L ${x + size} ${y + c} L ${x + size} ${y + size} L ${x} ${y + size} Z`;
          } else if (!bottomNeighbor && !rightNeighbor) {
            // bottom-right free → chamfer bottom-right
            d = `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size - c} L ${x + size - c} ${y + size} L ${x} ${y + size} Z`;
          } else {
            // bottom-left free → chamfer bottom-left
            d = `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x + c} ${y + size} L ${x} ${y + size - c} Z`;
          }
        } else {
          // Straight-through (opposite neighbors) or 3+ neighbors: full square
          d = `M ${x} ${y} L ${x + size} ${y} L ${x + size} ${y + size} L ${x} ${y + size} Z`;
        }

        this._element.setAttribute("d", d);
      }
    });
  }

  _drawClassy({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersDiagonal({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerDiagonal({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerDiagonal({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawClassyRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicCornersRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerExtraRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  _drawStar({ x, y, size }: DrawArgs): void {
    this._basicStar({ x, y, size, rotation: 0 });
  }

  _drawDiamond({ x, y, size }: DrawArgs): void {
    this._basicDiamond({ x, y, size, rotation: 0 });
  }

  _drawHeart({ x, y, size }: DrawArgs): void {
    this._basicHeart({ x, y, size, rotation: 0 });
  }

  _drawPlus({ x, y, size }: DrawArgs): void {
    this._basicPlus({ x, y, size, rotation: 0 });
  }

  // _drawRoundedPlus({ x, y, size }: DrawArgs): void {
  //   this._basicRoundedPlus({ x, y, size, rotation: 0 });
  // }

  _drawCross({ x, y, size }: DrawArgs): void {
    this._basicCross({ x, y, size, rotation: 0 });
  }

  _drawVerticalBar({ x, y, size, getNeighbor }: DrawArgs): void {
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    // No vertical neighbors: draw isolated circle
    if (!topNeighbor && !bottomNeighbor) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    const barWidth = size * 0.72;
    const r = barWidth / 2;
    const cx = x + size / 2;
    const bx = cx - r;
    const ex = cx + r;

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d: string;

        if (!topNeighbor) {
          // Top end-cap: rounded top, flat bottom (connects to cell below)
          d = `M ${bx} ${y + r}` +
              ` A ${r} ${r} 0 0 1 ${ex} ${y + r}` +
              ` L ${ex} ${y + size}` +
              ` L ${bx} ${y + size}` +
              ` Z`;
        } else if (!bottomNeighbor) {
          // Bottom end-cap: flat top (connects to cell above), rounded bottom
          d = `M ${bx} ${y}` +
              ` L ${ex} ${y}` +
              ` L ${ex} ${y + size - r}` +
              ` A ${r} ${r} 0 0 1 ${bx} ${y + size - r}` +
              ` Z`;
        } else {
          // Middle connector: plain rectangle (seamless between two neighbors)
          d = `M ${bx} ${y}` +
              ` L ${ex} ${y}` +
              ` L ${ex} ${y + size}` +
              ` L ${bx} ${y + size}` +
              ` Z`;
        }

        this._element.setAttribute("d", d);
      }
    });
  }

  _drawVerticalSquareBar({ x, y, size, getNeighbor }: DrawArgs): void {
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const barWidth = size * 0.85;
    const bx = x + (size - barWidth) / 2;

    if (!topNeighbor && !bottomNeighbor) {
      // Isolated: centered square of barWidth × barWidth (not a circle)
      const offset = (size - barWidth) / 2;
      this._rotateFigure({
        x, y, size, rotation: 0,
        draw: () => {
          this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
          this._element.setAttribute("x", String(x + offset));
          this._element.setAttribute("y", String(y + offset));
          this._element.setAttribute("width", String(barWidth));
          this._element.setAttribute("height", String(barWidth));
        }
      });
      return;
    }

    // Connected: full-height flat rectangle — square ends, no rounding
    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this._element.setAttribute("x", String(bx));
        this._element.setAttribute("y", String(y));
        this._element.setAttribute("width", String(barWidth));
        this._element.setAttribute("height", String(size));
      }
    });
  }

  _drawHorizontalBar({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;

    // No horizontal neighbors: draw isolated circle
    if (!leftNeighbor && !rightNeighbor) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    const barHeight = size * 0.72;
    const r = barHeight / 2;
    const cy = y + size / 2;
    const by = cy - r;
    const ey = cy + r;

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d: string;

        if (!leftNeighbor) {
          // Left end-cap: rounded left, flat right (connects to cell on right)
          d = `M ${x + r} ${by}` +
              ` A ${r} ${r} 0 0 0 ${x + r} ${ey}` +
              ` L ${x + size} ${ey}` +
              ` L ${x + size} ${by}` +
              ` Z`;
        } else if (!rightNeighbor) {
          // Right end-cap: flat left (connects to cell on left), rounded right
          d = `M ${x} ${by}` +
              ` L ${x + size - r} ${by}` +
              ` A ${r} ${r} 0 0 1 ${x + size - r} ${ey}` +
              ` L ${x} ${ey}` +
              ` Z`;
        } else {
          // Middle connector: plain rectangle (seamless between two neighbors)
          d = `M ${x} ${by}` +
              ` L ${x + size} ${by}` +
              ` L ${x + size} ${ey}` +
              ` L ${x} ${ey}` +
              ` Z`;
        }

        this._element.setAttribute("d", d);
      }
    });
  }
  _drawHorizontalGridBar({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;

    if (!leftNeighbor && !rightNeighbor) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    const barHeight = size * 0.85;
    const r = barHeight / 2;
    const cy = y + size / 2;
    const by = cy - r;
    const ey = cy + r;
    const gap = size * 0.07; // thin gap on left side of each section = visible divider

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d: string;

        if (!leftNeighbor) {
          // Left end-cap: rounded left end, flat right (connects to right neighbor)
          d = `M ${x + r} ${by}` +
              ` A ${r} ${r} 0 0 0 ${x + r} ${ey}` +
              ` L ${x + size} ${ey}` +
              ` L ${x + size} ${by}` +
              ` Z`;
        } else if (!rightNeighbor) {
          // Right end-cap: gap on left (divider), rounded right end
          d = `M ${x + gap} ${by}` +
              ` L ${x + size - r} ${by}` +
              ` A ${r} ${r} 0 0 1 ${x + size - r} ${ey}` +
              ` L ${x + gap} ${ey}` +
              ` Z`;
        } else {
          // Middle section: gap on left (divider), flat rectangle to right
          d = `M ${x + gap} ${by}` +
              ` L ${x + size} ${by}` +
              ` L ${x + size} ${ey}` +
              ` L ${x + gap} ${ey}` +
              ` Z`;
        }

        this._element.setAttribute("d", d);
      }
    });
  }

  _drawConcaveSquare({ x, y, size }: DrawArgs): void {
    this._basicConcaveSquare({ x, y, size, rotation: 0 });
  }

  // Pattern3: selectively rounds each of the 4 corners that are "free" (no neighbor in that direction).
  // Connected cells join seamlessly (flat edges), while outer corners of shapes get a slight ~20% radius arc.
  _drawSmallRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const r = size * 0.25; // visible but subtle corner rounding

    // A corner is free when there is NO neighbor in either of its two adjacent directions
    const tlFree = !leftNeighbor && !topNeighbor;    // top-left
    const trFree = !rightNeighbor && !topNeighbor;   // top-right
    const brFree = !rightNeighbor && !bottomNeighbor; // bottom-right
    const blFree = !leftNeighbor && !bottomNeighbor;  // bottom-left

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Build path: start at top edge (after top-left corner), go clockwise
        let d = `M ${x + (tlFree ? r : 0)} ${y}`;

        // → top-right corner
        d += ` H ${x + size - (trFree ? r : 0)}`;
        if (trFree) d += ` A ${r} ${r} 0 0 1 ${x + size} ${y + r}`;

        // → bottom-right corner
        d += ` V ${y + size - (brFree ? r : 0)}`;
        if (brFree) d += ` A ${r} ${r} 0 0 1 ${x + size - r} ${y + size}`;

        // → bottom-left corner
        d += ` H ${x + (blFree ? r : 0)}`;
        if (blFree) d += ` A ${r} ${r} 0 0 1 ${x} ${y + size - r}`;

        // → top-left corner
        d += ` V ${y + (tlFree ? r : 0)}`;
        if (tlFree) d += ` A ${r} ${r} 0 0 1 ${x + r} ${y}`;

        d += ' Z';
        this._element.setAttribute("d", d);
      }
    });
  }

  // Pattern9: full-cell bars with rounded outer corners at exposed ends only
  _drawSquareBar({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const r = size * 0.32;

    // Round a corner only when BOTH adjacent sides are exposed (no neighbor)
    const tlRound = !leftNeighbor && !topNeighbor;
    const trRound = !rightNeighbor && !topNeighbor;
    const brRound = !rightNeighbor && !bottomNeighbor;
    const blRound = !leftNeighbor && !bottomNeighbor;

    this._rotateFigure({
      x, y, size, rotation: 0,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        let d = `M ${x + (tlRound ? r : 0)} ${y}`;

        d += ` H ${x + size - (trRound ? r : 0)}`;
        if (trRound) d += ` A ${r} ${r} 0 0 1 ${x + size} ${y + r}`;

        d += ` V ${y + size - (brRound ? r : 0)}`;
        if (brRound) d += ` A ${r} ${r} 0 0 1 ${x + size - r} ${y + size}`;

        d += ` H ${x + (blRound ? r : 0)}`;
        if (blRound) d += ` A ${r} ${r} 0 0 1 ${x} ${y + size - r}`;

        d += ` V ${y + (tlRound ? r : 0)}`;
        if (tlRound) d += ` A ${r} ${r} 0 0 1 ${x + r} ${y}`;

        d += ' Z';
        this._element.setAttribute("d", d);
      }
    });
  }

  // Pattern11: like "classy" but isolated dots are circles instead of Z-shapes
  _drawClassyDot({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicDot({ x, y, size, rotation: 0 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }

  // Pattern6: full-width bold bars, V-notch bookmark end-caps, isolated dots are squares
  // Free ends: two outer corner "horns" with a V-indent between them (bookmark ribbon style)
  // Isolated / middle / corner / junction: plain square
  _drawDiamondRounded({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    const cx = x + size / 2;
    const cy = y + size / 2;
    // Notch depth ≈ 50% of cell size (matches Pattern6 SVG proportions)
    const notch = size * 0.5;

    // 0 neighbors: plain square
    if (neighborsCount === 0) {
      this._basicSquare({ x, y, size, rotation: 0 });
      return;
    }

    // Exactly 1 neighbor: end-cap with V-notch bookmark at the free end
    if (neighborsCount === 1) {
      this._rotateFigure({ x, y, size, rotation: 0, draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d: string;

        if (bottomNeighbor) {
          // Free end at TOP — two top-corner horns, V-tip dips DOWN
          d = `M ${x} ${y}` +
              ` L ${cx} ${y + notch}` +
              ` L ${x + size} ${y}` +
              ` L ${x + size} ${y + size}` +
              ` L ${x} ${y + size}` +
              ` Z`;
        } else if (topNeighbor) {
          // Free end at BOTTOM — two bottom-corner horns, V-tip dips UP
          d = `M ${x} ${y}` +
              ` L ${x + size} ${y}` +
              ` L ${x + size} ${y + size}` +
              ` L ${cx} ${y + size - notch}` +
              ` L ${x} ${y + size}` +
              ` Z`;
        } else if (rightNeighbor) {
          // Free end at LEFT — two left-corner horns, V-tip points RIGHT
          d = `M ${x} ${y}` +
              ` L ${x + notch} ${cy}` +
              ` L ${x} ${y + size}` +
              ` L ${x + size} ${y + size}` +
              ` L ${x + size} ${y}` +
              ` Z`;
        } else {
          // Free end at RIGHT (leftNeighbor) — two right-corner horns, V-tip points LEFT
          d = `M ${x} ${y}` +
              ` L ${x} ${y + size}` +
              ` L ${x + size} ${y + size}` +
              ` L ${x + size - notch} ${cy}` +
              ` L ${x + size} ${y}` +
              ` Z`;
        }

        this._element.setAttribute("d", d);
      }});
      return;
    }

    // All other cases (middle, corner, junction): plain square
    this._basicSquare({ x, y, size, rotation: 0 });
  }

  // Pattern8: isometric cube face — every dot is a hexagon regardless of neighbors
  _drawCube({ x, y, size }: DrawArgs): void {
    this._basicCube({ x, y, size, rotation: 0 });
  }

  // Pattern13: like "classy" but isolated dots are small rounded squares instead of Z-shapes
  _drawClassySquare({ x, y, size, getNeighbor }: DrawArgs): void {
    const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
    const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
    const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
    const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

    const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

    if (neighborsCount === 0) {
      this._basicSmallRoundedSquare({ x, y, size, rotation: 0 });
      return;
    }

    if (!leftNeighbor && !topNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: -Math.PI / 2 });
      return;
    }

    if (!rightNeighbor && !bottomNeighbor) {
      this._basicCornerRounded({ x, y, size, rotation: Math.PI / 2 });
      return;
    }

    this._basicSquare({ x, y, size, rotation: 0 });
  }
}
