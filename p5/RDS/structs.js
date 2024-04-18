class Component {
      constructor(path = "") {
            this.path = path;
      }
      get path() {
            return this.path;
      }
}
let canvasHeight = 725;
let canvasWidth = 1425;
let myDistX = canvasWidth / 20;
let myDistY = canvasHeight / 20;

/** WBC1 */
class WBC1 {
      constructor(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            // connectionX1 and connectionY1 are the starting coords for this element
            // connectionX2 and connectionY2 are the ending coords for this element
            this.connectionX1 = this.x1 + myDistX;
            this.connectionY1 = this.y1;
            this.connectionX2 = this.x1;
            this.connectionY2 = this.y1;
      }
      draw() {
            line(this.x1, this.y1, this.x1 + myDistX, this.y1); // temp dist. and y2
      }
}

/**Seksjon */

class UAA1 {
      constructor(x1, y1, x2, y2, avEllerPå = 0) {
            // coords for the last line
            this.lastX1 = x1;
            this.lastX2 = x2;
            this.lastY1 = y1;
            this.lastY2 = y2;

            // slope, angle and length of the last line
            this.lastSlope = (y2 - y1) / (x2 - x1);
            this.angle = atan2(y2 - y1, x2 - x1);
            this.length = dist(x1, y1, x2, y2) / 6;

            // the desired angle of the upper line
            this.newAngle = this.angle + radians(-60);

            // calculated coords for the upper line
            this.upperX = this.lastX2 + cos(this.newAngle) * this.length;
            this.upperY = this.lastY2 + sin(this.newAngle) * this.length;

            // pytahgorean theorem to calculate the coords for the lower line
            this.mot = sin(radians(-60)) * this.length;
            this.hos = sqrt(this.length * this.length - this.mot * this.mot);
            this.lowerX1 = x2 + cos(this.angle) * this.hos;
            this.lowerY1 = y2 + sin(this.angle) * this.hos;
            this.lowerAngle = this.newAngle + radians(180); // angle flipped by 180 degrees for lower line
            this.lowerX2 = this.lowerX1 + cos(this.lowerAngle) * this.length;
            this.lowerY2 = this.lowerY1 + sin(this.lowerAngle) * this.length;

            // for skillebryter
            this.skillebryterOppX1 = this.lastX2;
            this.skillebryterOppY1 = this.lastY2;
            this.skillebryterOppX2 = this.lowerX1 + (2 * myDistX) / 5;

            // output coords for "last element", connection points essentially
            this.connectionX1 = this.skillebryterOppX2;
            this.connectionY1 = this.lowerY1;
            this.connectionX2 = this.lowerX2;
            this.connectionY2 = this.lowerY2;
      }

      draw() {
            // draw upper and lower line
            strokeWeight(1);
            line(
                  this.lastX2 + myDistX / 5,
                  this.lastY2,
                  this.upperX + myDistX / 5,
                  this.upperY
            );
            line(
                  this.lowerX1 + myDistX / 5,
                  this.lowerY1,
                  this.lowerX2 + myDistX / 5,
                  this.lowerY2
            );
            line(
                  this.skillebryterOppX1,
                  this.lastY2,
                  this.lastX2 + myDistX / 5,
                  this.lastY2
            );
            line(
                  this.skillebryterOppX2,
                  this.lowerY1,
                  this.lowerX1 + myDistX / 5,
                  this.lowerY1
            );
      }
}

/** Section insulator */
class UAA2 {
      constructor(x1, y1, x2, y2) {
            this.lastX1 = x1;
            this.lastX2 = x2;
            this.lastY1 = y1;
            this.lastY2 = y2;
            // Calculate the perpendicular line coordinates
            const angle = atan2(y2 - y1, x2 - x1);
            const length = 15; // Set your desired length here
            const parallelOffset = -10; // Set the desired offset for parallel lines

            // Calculate coordinates for both ends of the perpendicular line
            [this.upperX1, this.upperY1] = [
                  x2 + cos(angle + HALF_PI) * length,
                  y2 + sin(angle + HALF_PI) * length,
            ];
            [this.upperX2, this.upperY2] = [
                  x2 + cos(angle - HALF_PI) * length,
                  y2 + sin(angle - HALF_PI) * length,
            ];

            // Calculate coordinates for both ends of the parallel line
            const parallelLength = dist(
                  this.upperX1,
                  this.upperY1,
                  this.upperX2,
                  this.upperY2
            );
            const parallelAngle = angle + PI; // Opposite direction

            this.parallelX1 = this.upperX1 + cos(parallelAngle) * parallelOffset;
            this.parallelY1 = this.upperY1 + sin(parallelAngle) * parallelOffset;
            this.parallelX2 = this.upperX2 + cos(parallelAngle) * parallelOffset;
            this.parallelY2 = this.upperY2 + sin(parallelAngle) * parallelOffset;
            [this.lowerX1, this.lowerY1] = [x2, y2];
            [this.lowerX2, this.lowerY2] = [
                  x2 + cos(angle + PI) * length,
                  y2 + sin(angle + PI) * length,
            ];

            // find connection point, which is halfway on the right line
            this.connectionX1 = (this.parallelX1 + this.parallelX2) / 2;
            this.connectionY1 = (this.parallelY1 + this.parallelY2) / 2;
            this.connectionX2 = this.connectionX1;
            this.connectionY2 = this.connectionY1;
      }

      draw() {
            line(this.upperX1, this.upperY1, this.upperX2, this.upperY2);
            line(this.parallelX1, this.parallelY1, this.parallelX2, this.parallelY2);
            //line(this.lowerX1, this.lowerY1, this.lowerX2, this.lowerY2);
      }
}

/** Stasjon med 2 spor */
class JE2 {
      constructor(x, y) {
            this.x = x;
            this.y = y;

            this.length = 100;

            // Start and end points for the first line
            this.x1 = this.x;
            this.y1 = this.y;
            this.x2 = this.x + this.length;
            this.y2 = this.y;

            // Start and end points for the second line
            this.x3 = this.x1 + 5;
            this.x4 = this.x2 - 5;

            // top points of the second line
            this.y3 = this.y - 20;
            this.x5 = this.x3 + 10;
            this.x6 = this.x4 - 10;

            
      }

      draw() {
            // main line
            line(this.x1, this.y1, this.x2, this.y2);

            // second line
            line(this.x3, this.y1, this.x5, this.y3);
            line(this.x4, this.y1, this.x6, this.y3);
            line(this.x5, this.y3, this.x6, this.y3);
      }
}

/**
 * Stasjon med 3 spor
 */
class JE3 {
      constructor(x, y) {
            this.x = x;
            this.y = y;

            this.length = 100;

            // Start and end points for the first line
            this.x1 = this.x;
            this.y1 = this.y;
            this.x2 = this.x + this.length;
            this.y2 = this.y;

            // Start and end points for the second line
            this.x3 = this.x1 + 5;
            this.x4 = this.x2 - 5;

            // top points of the second line
            this.y3 = this.y - 20;
            this.x5 = this.x3 + 10;
            this.x6 = this.x4 - 10;

            // Bottom points of the third line
            this.y4 = this.y + 20;
      }

      draw() {
            // main line
            line(this.x1, this.y1, this.x2, this.y2);

            // second line
            line(this.x3, this.y1, this.x5, this.y3);
            line(this.x4, this.y1, this.x6, this.y3);
            line(this.x5, this.y3, this.x6, this.y3);

            // third line
            line(this.x3, this.y1, this.x5, this.y4);
            line(this.x4, this.y1, this.x6, this.y4);
            line(this.x5, this.y4, this.x6, this.y4);
      }
}

/** Skillebryter uten motor */
class QBA1 {
      /**
       *
       * @param {number} x1
       * @param {number} y1
       * @param {number} x2
       * @param {number} y2
       */
      constructor(x1, y1) {
            this.x1 = x1;
            this.x2 = x1 + 50;

            this.bottomPointY = y1;
            this.topPointY = y1 - 25;

            this.gapForSwitch1 = x1 + 15;
            this.gapForSwitch2 = x1 + 35;

            this.connectionX1 = this.x1 + 30;
            this.connectionY1 = this.y1;
            this.connectionX2 = this.x1;
            this.connectionY2 = this.y1;
      }

      draw() {
            // to paralelle linjer oppover
            line(this.x1, this.bottomPointY, this.x1, this.topPointY);
            line(this.x2, this.bottomPointY, this.x2, this.topPointY);

            // en honisontal linje øverst
            line(this.x1, this.topPointY, this.gapForSwitch1, this.topPointY);
            line(this.gapForSwitch2, this.topPointY, this.x2, this.topPointY);

            // Bryteren
            line(
                  this.gapForSwitch2,
                  this.topPointY + 5,
                  this.gapForSwitch2,
                  this.topPointY - 5
            );
            strokeWeight(2);
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch2,
                  this.topPointY
            );
            strokeWeight(1);
      }
}

/** Lastskillebryter uten motor */
class QBA2 {
      /**
       *
       * @param {number} x1
       * @param {number} y1
       * @param {number} x2
       * @param {number} y2
       */
      constructor(x1, y1) {
            this.x1 = x1;
            this.x2 = x1 + 50;

            this.bottomPointY = y1;
            this.topPointY = y1 - 25;

            this.gapForSwitch1 = x1 + 15;
            this.gapForSwitch2 = x1 + 35;

            this.cricleGap = x1 + 40;

            this.connectionX1 = this.x1 + 30;
            this.connectionY1 = this.y1;
            this.connectionX2 = this.x1;
            this.connectionY2 = this.y1;
      }

      draw() {
            // to paralelle linjer oppover
            line(this.x1, this.bottomPointY, this.x1, this.topPointY);
            line(this.x2, this.bottomPointY, this.x2, this.topPointY);

            // en honisontal linje øverst
            line(this.x1, this.topPointY, this.gapForSwitch1, this.topPointY);
            line(this.cricleGap, this.topPointY, this.x2, this.topPointY);

            // Bryteren
            circle((this.cricleGap + this.gapForSwitch2) / 2, this.topPointY, 5);
            line(
                  this.gapForSwitch2,
                  this.topPointY + 5,
                  this.gapForSwitch2,
                  this.topPointY - 5
            );
            strokeWeight(2);
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch2,
                  this.topPointY
            );
            strokeWeight(1);
      }
}
/** Sillebryter med motor */
class QBA3 {
      constructor(x1, y1) {
            this.x1 = x1;
            this.x2 = x1 + 50;

            this.bottomPointY = y1;
            this.topPointY = y1 - 25;

            this.gapForSwitch1 = x1 + 15;
            this.gapForSwitch2 = x1 + 35;

            this.motorLineTopPoint = this.topPointY - 15;

            this.connectionX1 = this.x1 + 30;
            this.connectionY1 = this.y1;
            this.connectionX2 = this.x1;
            this.connectionY2 = this.y1;
      }

      draw() {
            // to paralelle linjer oppover
            line(this.x1, this.bottomPointY, this.x1, this.topPointY);
            line(this.x2, this.bottomPointY, this.x2, this.topPointY);

            // en honisontal linje øverst
            line(this.x1, this.topPointY, this.gapForSwitch1, this.topPointY);
            line(this.gapForSwitch2, this.topPointY, this.x2, this.topPointY);

            //motoren
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch1,
                  this.motorLineTopPoint
            );
            circle(this.gapForSwitch1, this.motorLineTopPoint + 5, 10);

            textSize(8);
            text("M", this.gapForSwitch1 - 3, this.motorLineTopPoint + 8);
            // Bryteren
            line(
                  this.gapForSwitch2,
                  this.topPointY + 5,
                  this.gapForSwitch2,
                  this.topPointY - 5
            );
            strokeWeight(2);
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch2,
                  this.topPointY
            );
            strokeWeight(1);
      }
}

/** Lastskillebryter med motor */
class QBA4 {
      /**
       *
       * @param {number} x1
       * @param {number} y1
       * @param {number} x2
       * @param {number} y2
       */
      constructor(x1, y1) {
            this.x1 = x1;
            this.x2 = x1 + 50;

            this.bottomPointY = y1;
            this.topPointY = y1 - 25;

            this.gapForSwitch1 = x1 + 15;
            this.gapForSwitch2 = x1 + 35;

            this.motorLineTopPoint = this.topPointY - 15;

            this.cricleGap = x1 + 40;

            this.connectionX1 = this.x1 + 30;
            this.connectionY1 = this.y1;
            this.connectionX2 = this.x1;
            this.connectionY2 = this.y1;
      }

      draw() {
            // to paralelle linjer oppover
            line(this.x1, this.bottomPointY, this.x1, this.topPointY);
            line(this.x2, this.bottomPointY, this.x2, this.topPointY);

            // en honisontal linje øverst
            line(this.x1, this.topPointY, this.gapForSwitch1, this.topPointY);
            line(this.cricleGap, this.topPointY, this.x2, this.topPointY);

            //motoren
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch1,
                  this.motorLineTopPoint
            );
            circle(this.gapForSwitch1, this.motorLineTopPoint + 5, 10);

            textSize(8);
            text("M", this.gapForSwitch1 - 3, this.motorLineTopPoint + 8);

            // Bryteren
            circle((this.cricleGap + this.gapForSwitch2) / 2, this.topPointY, 5);
            line(
                  this.gapForSwitch2,
                  this.topPointY + 5,
                  this.gapForSwitch2,
                  this.topPointY - 5
            );
            strokeWeight(2);
            line(
                  this.gapForSwitch1,
                  this.topPointY,
                  this.gapForSwitch2,
                  this.topPointY
            );
            strokeWeight(1);
      }
}

class Trafo {
      constructor(x1, y1, x2, y2) {
            // coords for the last line
            this.x = x2;
            this.y = y2;
            this.d = 50;
      }

      draw() {
            noFill();
            circle(this.x, this.y - 25, this.d);
            circle(this.x, this.y - 50, this.d);
      }
}

class Sikring {
      constructor(x1, y1, x2, y2) {
            this.x = x2;
            this.y = y2;
            this.d = 5;
      }

      draw() {
            fill("black");
            circle(this.x, this.y, this.d);
      }
}

class Trafosamling {
      constructor(x1, y1, x2, y2) {
            this.x = x2;
            this.y = y2;
            this.d = 5;
            this.d2 = 30;
            this.connectionX1 = this.x + this.d;
            this.connectionY1 = this.y;

            //endepunkt for linje
            this.endepunktY = this.y + myDistX - 65;
      }

      draw() {
            fill("black");
            circle(this.x, this.y, this.d);
            line(this.x, this.y, this.x, this.endepunktY + myDistX - 35);
            noFill();
            circle(this.x, this.y + myDistX * 1.5 - 25, this.d2);
            circle(this.x, this.y + myDistX * 1.5 - 50, this.d2);

            stroke("black");
      }
}


const componentToPath = {
      "UAA1": UAA1,
      "UAA2": UAA2,
      "QBA1": QBA1,
      "QBA2": QBA2,
      "QBA3": QBA3,
      "JE2": JE2,
      "JE3": JE3,
      "TAA": Trafo,
      "WBC1": WBC1,
      "FCA": Sikring,
      "XBA": Trafosamling,
      // TODO: MAKE THESE CLASSES
};

/**
* a class for storing the state of a component

*/
class ComponentState {
      /**
       *
       * @param {number} x
       * @param {number} y
       * @param {number} id
       * @param {string} type
       */
      constructor(x, y, id, type = "component") {
            this.x = x;
            this.y = y;
            this.id = id;
            this.type = type;
      }
}