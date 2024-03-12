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
    points: Point[];
    countSegments: number;
    collectionLineSegments: LineSegment[];
  
    constructor(points: Point[]) {
      this.points = points;
      this.countSegments = 0;
      this.collectionLineSegments = [];
      this.findLineSegments();
    }
  
     findLineSegments() {
      for (let p = 0; p < this.points.length; p++) {
        for (let q = p + 1; q < this.points.length; q++) {
          for (let r = q + 1; r < this.points.length; r++) {
            for (let s = r + 1; s < this.points.length; s++) {
              let slope1 = this.calculateSlope(this.points[p], this.points[q]);
              let slope2 = this.calculateSlope(this.points[p], this.points[r]);
              let slope3 = this.calculateSlope(this.points[p], this.points[s]);
  
              if (this.areDistinctSlopes(slope1, slope2, slope3)) {
                let segment = new LineSegment(this.points[p], this.points[s]);
                if (!this.isSegmentAlreadyAdded(segment)) {
                  this.collectionLineSegments.push(segment);
                }
              }
            }
          }
        }
      }
      this.countSegments = this.collectionLineSegments.length;
    }
  
     calculateSlope(point1: Point, point2: Point): number {
      return (point2.y - point1.y) / (point2.x - point1.x);
    }
  
     areDistinctSlopes(slope1: number, slope2: number, slope3: number): boolean {
      return Math.abs(slope1 - slope2) > 0 && Math.abs(slope2 - slope3) > 0;
    }
  
     isSegmentAlreadyAdded(newSegment: LineSegment): boolean {
      for (const segment of this.collectionLineSegments) {
        if (
          (segment.p.x === newSegment.p.x && segment.p.y === newSegment.p.y &&
           segment.q.x === newSegment.q.x && segment.q.y === newSegment.q.y) ||
          (segment.p.x === newSegment.q.x && segment.p.y === newSegment.q.y &&
           segment.q.x === newSegment.p.x && segment.q.y === newSegment.p.y)
        ) {
          return true;
        }
      }
      return false;
    }
  
    numberOfSegments(): number {
      return this.countSegments;
    }
  
    segments(): LineSegment[] {
      const uniqueSegments: LineSegment[] = [];
      for (const segment of this.collectionLineSegments) {
        let isDuplicate = false;
        for (const uniqueSegment of uniqueSegments) {
          if ((uniqueSegment.p.x === segment.p.x && uniqueSegment.p.y === segment.p.y &&
               uniqueSegment.q.x === segment.q.x && uniqueSegment.q.y === segment.q.y) ||
              (uniqueSegment.p.x === segment.q.x && uniqueSegment.p.y === segment.q.y &&
               uniqueSegment.q.x === segment.p.x && uniqueSegment.q.y === segment.p.y)) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          uniqueSegments.push(segment);
        }
      }
      return uniqueSegments;
    }
  }
  
  class FastCollinearPoints {
    points: Point[];
    collectionLineSegments: LineSegment[];

    constructor(points: Point[]) {
      for (let i = 0; i < points.length; i++) {
        if (points === null) {
          throw Error('Error detected.')
        } else {
          this.points = points;
          this.collectionLineSegments = [];
          this.segments();
        }
      }
    }

    numberOfSegments(): number {
      return this.collectionLineSegments.length
    }

    segments(): LineSegment[] {
      const sortedPoints = this.mergeSort(this.points.slice());
      for (let i = 0; i < sortedPoints.length; i++) {
         let referencePoint = sortedPoints[i];
         let slopeArray: number[] = [];
         let collinearPoints: Point[] = [];
     
         for (let j = i + 1; j < sortedPoints.length; j++) {
           let otherPoint = sortedPoints[j];
           if (referencePoint.x === otherPoint.x) continue;
           let slope = referencePoint.slopeTo(otherPoint);
     
           if (slopeArray.includes(slope)) {
             collinearPoints.push(otherPoint);
           } else {
             slopeArray.push(slope);
             collinearPoints = [referencePoint, otherPoint];
           }
         }
         if (collinearPoints.length >= 3) {
           for (let k = 0; k < collinearPoints.length - 1; k++) {
             let segment = new LineSegment(collinearPoints[k], collinearPoints[k + 1]);
             if (!this.isSegmentAlreadyAdded(segment)) {
               this.collectionLineSegments.push(segment);
             }
           }
         }
      }
      return this.collectionLineSegments;
     }
     
    mergeSort(arr: Point[]): Point[] {
      if (arr.length <= 1) return arr;
      let mid = Math.floor(arr.length / 2);
      let left = this.mergeSort(arr.slice(0, mid));
      let right = this.mergeSort(arr.slice(mid));

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
  
     isSegmentAlreadyAdded(newSegment: LineSegment): boolean {
      for (const segment of this.collectionLineSegments) {
        if (
          (segment.p.x === newSegment.p.x && segment.p.y === newSegment.p.y &&
           segment.q.x === newSegment.q.x && segment.q.y === newSegment.q.y) ||
          (segment.p.x === newSegment.q.x && segment.p.y === newSegment.q.y &&
           segment.q.x === newSegment.p.x && segment.q.y === newSegment.p.y)
        ) {
          return true;
        }
      }
      return false;
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

    // const brute = new BruteCollinearPoints(points)

    //   for (const segment of brute.segments()) {
    //     console.log(`Number of line segments: ${brute.numberOfSegments()}`)
    //     console.log(segment.toStrings());
    //     segment.draw();
    //   }

    const collinear = new FastCollinearPoints(points);
    for (const segment of collinear.segments()) {
      console.log(`Number of line segments: ${collinear.numberOfSegments()}`)
      console.log(segment.toStrings());
      segment.draw();
    }
  }
}
new p5(sketch);
