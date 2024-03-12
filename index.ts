import { connect } from "http2";
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
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          if (points[i] !== null || this.points[i].x === this.points[j].x && 
            this.points[i].y === this.points[j].y) {
            this.collectionLineSegments = []
            this.countSegments = 0
          }
        }
      }
  }

    numberOfSegments(): number {
      let count = 0
      for (let i = 0; i < this.collectionLineSegments.length; i++) {
        count++
      }
      return count
    }

    segments(): LineSegment[] {
      const segments: LineSegment[] = [];
      for (let p = 0; p < this.points.length; p++) {
        for (let q = p + 1; q < this.points.length; q++) {
          for (let r = q + 1; r < this.points.length; r++) {
            for (let s = r + 1; s < this.points.length; s++) {
              let slope1 = (this.points[p].y - this.points[q].y) / (this.points[p].x - this.points[q].x)
              let slope2 = (this.points[p].y - this.points[r].y) / (this.points[p].x - this.points[r].x)
              let slope3 = (this.points[p].y - this.points[s].y) / (this.points[p].x - this.points[s].x)

              if (Math.abs(slope1 - slope2) > 0 && Math.abs(slope2 - slope3) > 0) {
                let connect = new LineSegment(this.points[p], this.points[s])
                if (!segments.includes(connect)) {
                  segments.push(connect)
                }
              }
            }
          }
        }
      }
    return segments
    }
  }

 class FastCollinearPoints {
    points: Point[];
    sampleArray: LineSegment[];

    constructor(points: Point[]) {
      for (let i = 0; i < points.length; i++) {
        if (points === null) {
          throw Error('Error detected.')
        } else {
        this.points = points;
        this.sampleArray = [];
        this.segments();
        }
      }
    }

    numberOfSegments(): number {
      let count = 0
      for (let i = 0; i < this.sampleArray.length; i++) {
        count++
      }
      return count
    }

    segments(): LineSegment[] {
      const n = this.points.length;
      const slopes = new Map<number, Point[]>();
      this.points.sort((p, q) => p.slopeTo(this.points[0]) - q.slopeTo(this.points[0]));

      for (let p = 0; p < n - 3; p++) {
        const slope = this.points[p].slopeTo(this.points[0]);
        const group = slopes.get(slope) || [];
        group.push(this.points[p]);
        slopes.set(slope, group);

        for (let q = p + 1; q < n - 2; q++) {
          const slope2 = this.points[q].slopeTo(this.points[0]);
          if (slope === slope2) {
            let min = p;
            let max = q;
            for (let r = q + 1; r < n; r++) {
              const slope3 = this.points[r].slopeTo(this.points[0]);
              if (slope === slope3) {
                min = Math.min(min, r);
                max = Math.max(max, r);
              }
            }
            if (min < max) {
              this.sampleArray.push(new LineSegment(this.points[min], this.points[max]));
            }
          }
        }
      }
      return this.sampleArray
    }
  }//thellll change it na 2 methods siya kay say ni chad need gid 2 methods para sa mergesort, refactor galing and mang bug testing ta
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

    const brute = new BruteCollinearPoints(points)

    for (const segment of brute.segments()) {
      console.log(segment.toString());
      segment.draw();
    }
  };

    // const collinear = new FastCollinearPoints(points);
    // for (const segment of collinear.segments()) {
    //   console.log(segment.toString());
    //   segment.draw();
    // }
  };
new p5(sketch);
