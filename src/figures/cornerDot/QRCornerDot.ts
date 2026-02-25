import cornerDotTypes from "../../constants/cornerDotTypes";
import { CornerDotType, RotateFigureArgs, BasicFigureDrawArgs, DrawArgs, Window } from "../../types";

export default class QRCornerDot {
  _element?: SVGElement;
  _svg: SVGElement;
  _type: CornerDotType;
  _window: Window;

  constructor({ svg, type, window }: { svg: SVGElement; type: CornerDotType; window: Window }) {
    this._svg = svg;
    this._type = type;
    this._window = window;
  }

  draw(x: number, y: number, size: number, rotation: number): void {
    const type = this._type;
    let drawFunction;

    switch (type) {
      case cornerDotTypes.square:
        drawFunction = this._drawSquare;
        break;
      case cornerDotTypes.squareRounded:
        drawFunction = this._drawSquareRounded;
        break;
      case cornerDotTypes.rightBottomSquare:
        drawFunction = this._drawSquareRoundedRightBottomEdge;
        break;
      case cornerDotTypes.squareGrid:
        drawFunction = this._drawSquareGrid;
        break;
      case cornerDotTypes.leftTopCircle:
        drawFunction = this._drawCircleLeftTopEdge;
        break;
      case cornerDotTypes.rightBottomCircle:
        drawFunction = this._drawCircleRightBottomEdge;
        break;
      case cornerDotTypes.diamond:
        drawFunction = this._drawDiamond;
        break;
      case cornerDotTypes.star:
        drawFunction = this._drawStar;
        break;
      case cornerDotTypes.plus:
        drawFunction = this._drawPlus;
        break;
      case cornerDotTypes.cross:
        drawFunction = this._drawCross;
        break;
      case cornerDotTypes.leaf:
        drawFunction = this._drawSquareTopLeftExtended;
        break;
      case cornerDotTypes.dot:
      default:
        drawFunction = this._drawDot;
    }

    drawFunction.call(this, { x, y, size, rotation });
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

  _basicRoundedSquare(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this._element.setAttribute("x", String(x));
        this._element.setAttribute("y", String(y));
        this._element.setAttribute("width", String(size));
        this._element.setAttribute("height", String(size));

        // Set rounded corners
        const cornerRadius = size / 4; // Adjust this value to control the roundness
        this._element.setAttribute("rx", String(cornerRadius));
        this._element.setAttribute("ry", String(cornerRadius));
      }
    });
  }

  _basicSquareGrid(args: BasicFigureDrawArgs): void {
    // 2×2 grid of curved quadrant shapes matching EyeBall1 (viewBox 0 0 34 33).
    const { size, x, y } = args;
    const sx = size / 34;
    const sy = size / 33;
    // Helper: scale + translate a coordinate pair into "X Y" string
    const p = (vx: number, vy: number) => `${x + vx * sx} ${y + vy * sy}`;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        // Bottom-left quadrant
        const q1 =
          `M ${p(0.9739, 16.9095)} L ${p(-0.0014, 16.7699)} L ${p(0.1132, 17.4431)}` +
          `C ${p(0.9109, 22.1275)} ${p(0.9356, 26.911)} ${p(0.1863, 31.6033)}` +
          `L ${p(0.8487, 31.4497)}` +
          `C ${p(5.5092, 30.3687)} ${p(10.354, 30.3571)} ${p(15.0197, 31.4157)}` +
          `C ${p(13.8358, 26.8769)} ${p(13.7057, 22.1274)} ${p(14.6394, 17.5305)}` +
          `L ${p(14.832, 16.5823)}` +
          `C ${p(10.2626, 17.4579)} ${p(5.5795, 17.5684)} ${p(0.9739, 16.9095)} Z`;
        // Top-left quadrant
        const q2 =
          `M ${p(0.5451, 14.1468)} L ${p(0.4124, 15.123)} L ${p(1.0847, 15.0037)}` +
          `C ${p(5.7634, 14.1733)} ${p(10.5466, 14.1152)} ${p(15.2441, 14.8318)}` +
          `L ${p(15.0858, 14.1704)}` +
          `C ${p(13.9723, 9.5175)} ${p(13.9268, 4.6729)} ${p(14.9528, 0)}` +
          `C ${p(10.4224, 1.2156)} ${p(5.6739, 1.3789)} ${p(1.0707, 0.4772)}` +
          `L ${p(0.1211, 0.2913)}` +
          `C ${p(1.0286, 4.8544)} ${p(1.1718, 9.5367)} ${p(0.5451, 14.1468)} Z`;
        // Bottom-right quadrant
        const q3 =
          `M ${p(19.052, 18.3059)} L ${p(18.0767, 18.1664)} L ${p(18.1914, 18.8396)}` +
          `C ${p(18.9891, 23.524)} ${p(19.0137, 28.3074)} ${p(18.2644, 32.9998)}` +
          `L ${p(18.9269, 32.8462)}` +
          `C ${p(23.5874, 31.7652)} ${p(28.4322, 31.7536)} ${p(33.0978, 32.8122)}` +
          `C ${p(31.9139, 28.2733)} ${p(31.7838, 23.5238)} ${p(32.7175, 18.927)}` +
          `L ${p(32.9102, 17.9788)}` +
          `C ${p(28.3407, 18.8543)} ${p(23.6576, 18.9649)} ${p(19.052, 18.3059)} Z`;
        // Top-right quadrant
        const q4 =
          `M ${p(18.6232, 15.5433)} L ${p(18.4905, 16.5195)} L ${p(19.1628, 16.4002)}` +
          `C ${p(23.8415, 15.5698)} ${p(28.6247, 15.5117)} ${p(33.3222, 16.2282)}` +
          `L ${p(33.1639, 15.5669)}` +
          `C ${p(32.0504, 10.914)} ${p(32.005, 6.0694)} ${p(33.031, 1.3965)}` +
          `C ${p(28.5005, 2.6121)} ${p(23.752, 2.7753)} ${p(19.1488, 1.8737)}` +
          `L ${p(18.1992, 1.6877)}` +
          `C ${p(19.1067, 6.2509)} ${p(19.25, 10.9332)} ${p(18.6232, 15.5433)} Z`;
        this._element.setAttribute("d", q1 + q2 + q3 + q4);
      }
    });
  }

  _basicRoundedSquareRightBottomEdge(args: BasicFigureDrawArgs): void {
    // TL, TR, BL rounded — BR square. Matches EyeBall11 (viewBox 0 0 28 28, radius≈10).
    // M0 10 C0 4.477 4.477 0 10 0 H18 C23.523 0 28 4.477 28 10 V28 H10 C4.477 28 0 23.523 0 18 V10 Z
    const { size, x, y } = args;
    const s = size / 28; // scale factor

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x} ${y + 10 * s}` +
          `C ${x} ${y + 4.477 * s} ${x + 4.477 * s} ${y} ${x + 10 * s} ${y}` +
          `H ${x + 18 * s}` +
          `C ${x + 23.523 * s} ${y} ${x + 28 * s} ${y + 4.477 * s} ${x + 28 * s} ${y + 10 * s}` +
          `V ${y + 28 * s}` +
          `H ${x + 10 * s}` +
          `C ${x + 4.477 * s} ${y + 28 * s} ${x} ${y + 23.523 * s} ${x} ${y + 18 * s}` +
          `V ${y + 10 * s} Z`
        );
      }
    });
  }

  _basicCircleLeftTopEdge(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Define radius of the circle
        const radius = size / 2;

        // Create a path string for the circle with a square corner at the top-left
        const pathData = `
          M ${x + radius} ${y} 
          A ${radius} ${radius} 0 1 1 ${x + radius} ${y + size} 
          A ${radius} ${radius} 0 1 1 ${x + radius} ${y} 
          L ${x - radius} ${y + size} 
          L ${x} ${y} 
          Z
        `;
        // Set the path data and create the element
        this._element.setAttribute("d", pathData);
      }
    });
  }

  _basicCircleRightBottomEdge(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Define radius of the circle
        const radius = size / 2;

        // Create a path string for the circle with a square corner at the bottom-right
        const pathData = `
          M ${x + radius} ${y} 
          A ${radius} ${radius} 0 1 1 ${x + radius} ${y + size} 
          L ${x + size} ${y + size} 
          L ${x + size} ${y + size - radius} 
          A ${radius} ${radius} 0 1 1 ${x + radius} ${y} 
          Z
        `;
        // Set the path data and create the element
        this._element.setAttribute("d", pathData);
      }
    });
  }

  _basicDiamond(args: BasicFigureDrawArgs): void {
    const { size, x, y } = args;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");

        // Create a path string for the diamond shape
        const pathData = `
          M ${x + size / 2} ${y} 
          L ${x + size} ${y + size / 2} 
          L ${x + size / 2} ${y + size} 
          L ${x} ${y + size / 2} 
          Z
        `;
        // Set the path data and create the element
        this._element.setAttribute("d", pathData);
      }
    });
  }

  _basicStar(args: BasicFigureDrawArgs): void {
    // EyeBall8 — viewBox 0 0 32 31. Direct path translation.
    const { size, x, y } = args;
    const sx = size / 32;
    const sy = size / 31;
    const p = (vx: number, vy: number) => `${x + vx * sx} ${y + vy * sy}`;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("d",
          `M ${p(9.80469, 8.87894)}` +
          `L ${p(0.789895, 10.8413)}` +
          `C ${p(0.0875305, 10.9942)} ${p(-0.228937, 11.8161)} ${p(0.189494, 12.4006)}` +
          `L ${p(5.30469, 19.5456)}` +
          `L ${p(5.30469, 29.4481)}` +
          `C ${p(5.30469, 30.1685)} ${p(6.04337, 30.6526)} ${p(6.70387, 30.365)}` +
          `L ${p(15.8047, 26.4028)}` +
          `L ${p(24.1302, 30.3063)}` +
          `C ${p(24.7933, 30.6172)} ${p(25.5547, 30.1333)} ${p(25.5547, 29.4009)}` +
          `L ${p(25.5547, 19.5456)}` +
          `L ${p(31.2738, 12.4447)}` +
          `C ${p(31.7439, 11.8609)} ${p(31.4285, 10.9866)} ${p(30.6941, 10.8374)}` +
          `L ${p(21.0547, 8.87894)}` +
          `L ${p(15.968, 0.481882)}` +
          `C ${p(15.5657, -0.182307)} ${p(14.5928, -0.154449)} ${p(14.2291, 0.531675)}` +
          `L ${p(9.80469, 8.87894)} Z`
        );
      }
    });
  }

  _basicPlus(args: BasicFigureDrawArgs): void {
    // EyeBall10 — viewBox 0 0 27 27. Two overlapping rounded rectangles forming a plus.
    // Vertical arm: x≈8.05–18.68, full height. Horizontal arm: full width, y≈8.18–18.97.
    // Corner radius ≈ 0.818/27 × size (very slight).
    const { size, x, y } = args;
    const s = size / 27;
    const p = (vx: number, vy: number) => `${x + vx * s} ${y + vy * s}`;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        // Vertical arm (H/V replaced with L for scale-translate simplicity)
        const vArm =
          `M ${p(8.05293, 0.818181)}` +
          `C ${p(8.05293, 0.366312)} ${p(8.41893, 0)} ${p(8.87042, 0)}` +
          `L ${p(17.8628, 0)}` +
          `C ${p(18.3143, 0)} ${p(18.6803, 0.366313)} ${p(18.6803, 0.818182)}` +
          `L ${p(18.6803, 26.1818)}` +
          `C ${p(18.6803, 26.6337)} ${p(18.3143, 27)} ${p(17.8628, 27)}` +
          `L ${p(8.87042, 27)}` +
          `C ${p(8.41893, 27)} ${p(8.05293, 26.6337)} ${p(8.05293, 26.1818)}` +
          `L ${p(8.05293, 0.818181)} Z`;
        // Horizontal arm
        const hArm =
          `M ${p(0.842358, 18.9719)}` +
          `C ${p(0.39087, 18.9731)} ${p(0.0239488, 18.6077)} ${p(0.0228146, 18.1558)}` +
          `L ${p(0, 9.06779)}` +
          `C ${p(0, 8.61592)} ${p(0.363952, 8.24869)} ${p(0.815439, 8.24756)}` +
          `L ${p(26.1576, 8.18384)}` +
          `C ${p(26.6091, 8.1827)} ${p(26.9761, 8.54809)} ${p(26.9772, 8.99996)}` +
          `L ${p(27, 18.088)}` +
          `C ${p(27, 18.5398)} ${p(26.636, 18.9071)} ${p(26.1846, 18.9082)}` +
          `L ${p(0.842358, 18.9719)} Z`;
        this._element.setAttribute("d", vArm + hArm);
      }
    });
  }

  _basicCross(args: BasicFigureDrawArgs): void {
    // EyeBall9 — viewBox 0 0 28 28. Two overlapping rounded blobs forming an X.
    const { size, x, y } = args;
    const s = size / 28;
    const p = (vx: number, vy: number) => `${x + vx * s} ${y + vy * s}`;

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute("d",
          `M ${p(2.41032, 12.2756)}` +
          `L ${p(3.36972, 13.246)}` +
          `L ${p(1.83773, 14.9676)}` +
          `C ${p(-0.5341, 17.6331)} ${p(-0.621582, 21.6257)} ${p(1.63123, 24.3925)}` +
          `C ${p(4.2753, 27.6398)} ${p(9.10879, 27.9883)} ${p(12.1914, 25.1539)}` +
          `L ${p(13.4089, 24.0345)}` +
          `L ${p(15.4243, 25.6024)}` +
          `C ${p(18.7481, 28.1884)} ${p(23.5661, 27.4237)} ${p(25.9258, 23.9355)}` +
          `C ${p(28.0654, 20.7727)} ${p(27.3981, 16.4943)} ${p(24.3968, 14.1333)}` +
          `L ${p(24.0756, 13.8806)}` +
          `L ${p(25.7924, 11.5654)}` +
          `C ${p(28.0158, 8.567)} ${p(27.5768, 4.36614)} ${p(24.7814, 1.89226)}` +
          `C ${p(21.9214, -0.638777)} ${p(17.5822, -0.494197)} ${p(14.8971, 2.2216)}` +
          `L ${p(14.0364, 3.09215)}` +
          `L ${p(11.8919, 1.46545)}` +
          `C ${p(8.86355, -0.831768)} ${p(4.57174, -0.382439)} ${p(2.08483, 2.4922)}` +
          `C ${p(-0.377355, 5.33825)} ${p(-0.235588, 9.59953)} ${p(2.41032, 12.2756)} Z`
        );
      }
    });
  }

  _basicSquareTopLeftExtended(args: BasicFigureDrawArgs): void {
    // Leaf shape matching EyeBall5 icon (viewBox 0 0 30 27).
    // Diagonal parallelogram-like with rounded corners at TR and BR, curved TL and BL.
    const { size, x, y } = args;
    const sx = size / 30; // x scale
    const sy = size / 27; // y scale

    this._rotateFigure({
      ...args,
      draw: () => {
        this._element = this._window.document.createElementNS("http://www.w3.org/2000/svg", "path");
        this._element.setAttribute(
          "d",
          `M ${x + 0.0565 * sx} ${y + 2.4667 * sy}` +
          `C ${x - 0.2724 * sx} ${y + 1.0942 * sy} ${x + 0.8854 * sx} ${y - 0.1781 * sy} ${x + 2.2828 * sx} ${y + 0.0205 * sy}` +
          `L ${x + 27.6525 * sx} ${y + 3.6257 * sy}` +
          `C ${x + 28.6384 * sx} ${y + 3.7658 * sy} ${x + 29.3711 * sx} ${y + 4.6099 * sy} ${x + 29.3711 * sx} ${y + 5.6058 * sy}` +
          `V ${y + 24.6067 * sy}` +
          `C ${x + 29.3711 * sx} ${y + 25.7113 * sy} ${x + 28.4757 * sx} ${y + 26.6067 * sy} ${x + 27.3711 * sx} ${y + 26.6067 * sy}` +
          `H ${x + 7.4190 * sx}` +
          `C ${x + 6.4940 * sx} ${y + 26.6067 * sy} ${x + 5.6897 * sx} ${y + 25.9724 * sy} ${x + 5.4741 * sx} ${y + 25.0729 * sy}` +
          `L ${x + 0.0565 * sx} ${y + 2.4667 * sy}` +
          `Z`
        );
      }
    });
  }


  _drawDot({ x, y, size, rotation }: DrawArgs): void {
    this._basicDot({ x, y, size, rotation });
  }

  _drawSquare({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquare({ x, y, size, rotation });
  }
  _drawSquareRounded({ x, y, size, rotation }: DrawArgs): void {
    this._basicRoundedSquare({ x, y, size, rotation });
  }
  _drawSquareGrid({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquareGrid({ x, y, size, rotation });
  }
  _drawSquareRoundedRightBottomEdge({ x, y, size, rotation }: DrawArgs): void {
    this._basicRoundedSquareRightBottomEdge({ x, y, size, rotation });
  }
  _drawCircleLeftTopEdge({ x, y, size, rotation }: DrawArgs): void {
    this._basicCircleLeftTopEdge({ x, y, size, rotation });
  }
  _drawCircleRightBottomEdge({ x, y, size, rotation }: DrawArgs): void {
    this._basicCircleRightBottomEdge({ x, y, size, rotation });
  }
  _drawDiamond({ x, y, size, rotation }: DrawArgs): void {
    this._basicDiamond({ x, y, size, rotation });
  }
  _drawStar({ x, y, size, rotation }: DrawArgs): void {
    this._basicStar({ x, y, size, rotation });
  }
  _drawPlus({ x, y, size, rotation }: DrawArgs): void {
    this._basicPlus({ x, y, size, rotation });
  }
  _drawCross({ x, y, size, rotation }: DrawArgs): void {
    this._basicCross({ x, y, size, rotation });
  }
  _drawSquareTopLeftExtended({ x, y, size, rotation }: DrawArgs): void {
    this._basicSquareTopLeftExtended({ x, y, size, rotation });
  }
}
