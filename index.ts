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
    p.noLoop()
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
      p.strokeWeight(200);
      p.line(this.p.x, this.p.y, this.q.x, this.q.y);
    }

    toStrings(): string {
      // DO NOT MODIFY

      return `${this.p.x}, ${this.p.y} -> ${this.q.x}, ${this.q.y}`
    }
  }

  class BruteCollinearPoints {
    points: Point[]
    countSegments: number
    collectionLineSegments: LineSegment[]
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
      return this.segments().length
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
      return this.sampleArray.length
    }

    segments(): LineSegment[] {
      const sortedPoints = this.mergeSort(this.points.slice());

      for (let i = 0; i < sortedPoints.length; i++) {
        const referencePoint = sortedPoints[i];
        const slopeArray: number[] = [];
        for (let j = i + 1; j < sortedPoints.length; j++) {
          const otherPoint = sortedPoints[j];
          if (referencePoint.x === otherPoint.x) continue;
          const slope = referencePoint.slopeTo(otherPoint);
          let isDuplicate = false;
          for (let k = 0; k < slopeArray.length; k++) {
            if (slopeArray[k] === slope) {
              isDuplicate = true;
              break;
            }
          }
          if (isDuplicate) {
            this.sampleArray.push(new LineSegment(referencePoint, otherPoint));
          } else {
            slopeArray.push(slope);
          }
        }
      }
      return this.sampleArray;

    }

    mergeSort(arr: Point[]): Point[] {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = this.mergeSort(arr.slice(0, mid));
      const right = this.mergeSort(arr.slice(mid));

      return this.merge(left, right);
    }


    merge(left: Point[], right: Point[]): Point[] {
      let result: Point[] = [];
      let leftIndex = 0;
      let rightIndex = 0;

      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex].x <= right[rightIndex].x) {
          result.push(left[leftIndex++]);
        } else {
          result.push(right[rightIndex++]);
        }
      }
      result.push(...left.slice(leftIndex));
      result.push(...right.slice(rightIndex));
      return result;
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
    new Point(14000, 10000)
  ];

  p.draw = function () {
    p.translate(padding, height - padding);
    p.scale(1 / 100, -1 / 100);

    // Call your draw and drawTo here.

    // point.draw();
    // point2.draw();
    // point.drawTo(point2);

    for (const point of points) {
      point.draw();
    }

    const brute = new BruteCollinearPoints(points)

    //   for (const segment of brute.segments()) {
    //     console.log(`Number of line segments: ${brute.numberOfSegments()}`)
    //     console.log(segment.toStrings());
    //     segment.draw();
    //   }
    // };

    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(`Number of line segments: ${collinear.numberOfSegments()}`)
      console.log(segment.toStrings());
      segment.draw();
    }
  }
}
new p5(sketch);
