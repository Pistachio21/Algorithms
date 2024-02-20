import p5 from "p5";

const width: number = 800;
const height: number = 500;
const padding: number = 50;

let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(3);
    p.stroke("blue");

    // x and y axes
    p.line(padding, padding, padding, height - padding);
    p.line(padding, height - padding, width - padding, height - padding);

    // y-axis arrow head
    p.line(padding, padding, padding - 5, padding + 5);
    p.line(padding, padding, padding + 5, padding + 5);

    // x-axis arrow head
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding + 5
    );
    p.line(
      width - padding,
      height - padding,
      width - padding - 5,
      height - padding - 5
    );

    p.strokeWeight(0);
    p.text("(0, 0)", padding + 10, height - 30);
  };

  class Point {
    x: number;
    y: number;
    p;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(800);
      p.point(this.x, this.y);
    }

    drawTo(that: Point) {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(200);
      p.line(this.x, this.y, that.x, that.y);
    }

    slopeTo(that: Point): number {
      return (that.y - this.y) / (that.x - this.x)
    }
  }

  class LineSegment {
    p: Point;
    q: Point;

    constructor(p: Point, q: Point) {
      // DO NOT MODIFY

      this.p = p;
      this.q = q;
    }

    draw(): void {
      // DO NOT MODIFY

      p.stroke("black");
      p.strokeWeight(2);
      p.line(this.p.x, this.p.y, this.q.x, this.q.y);
    }

    toString(): string {
      // DO NOT MODIFY

      return `${this.p} -> ${this.q}`
    }
  }

  class BruteCollinearPoints {
    points: Point[]
    countSegments : number
    collectionLineSegments : LineSegment[]
    constructor(points: Point[]) {
      this.points = points
      this.collectionLineSegments = []
    }

    numberOfSegments(): number {
      let count = 0
      for (let i = 0; i < this.collectionLineSegments.length; i++) {
        count++
      }
      return count
    }

    segments(): LineSegment[] {
      for (let p = 0; p < points.length; p++) {
        for (let q = p + 1; q < points.length; q++) {
          for (let r = q + 1; r < points.length; r++) {
            for (let s = r + 1; s < points.length; s++) {
              let slope1 = (points[p].y - points[q].y) / (points[p].x - points[q].x)
              let slope2 = (points[p].y - points[r].y) / (points[p].x - points[r].x)
              let slope3 = (points[p].y - points[s].y) / (points[p].x - points[s].x)

              if (slope1 === slope2 && slope2 === slope3) {
                let connect = new LineSegment(points[p], points[s])
                if ()
                this.collectionLineSegments.push(connect)
              }//refactor the code from phind
            }
          }
        }
      }
    
    }
  }

  class FastCollinearPoints {
    constructor(points: Point[]) {
      // YOUR CODE HERE
    }

    numberOfSegments(): number {
      // YOUR CODE HERE
    }

    segments(): LineSegment[] {
      // YOUR CODE HERE
    }
  }

  // Declare your point objects here~
  // const point = new Point(19000, 10000);
  // const point2 = new Point(10000, 10000);

  // from input6.txt
  const points: Point[] = [
    new Point(19000, 10000),
    new Point(18000, 10000),
    new Point(32000, 10000),
    new Point(21000, 10000),
    new Point(1234, 5678),
    new Point(14000, 10000),
  ];

  p.draw = function () {
    p.translate(padding, height - padding);
    p.scale(1/100, -1/100);

    // Call your draw and drawTo here.

    // point.draw();
    // point2.draw();
    // point.drawTo(point2);

    for (const point of points) {
      point.draw();
    }

    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };
};

new p5(sketch);
