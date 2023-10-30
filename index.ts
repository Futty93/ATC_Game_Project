// Define constants for canvas dimensions
const CANVAS_WIDTH: number = 1000;
const CANVAS_HEIGHT: number = 1000;
const REFRESH_RATE: number = 30; //画面の更新頻度(fps)

import { Airplane } from "./airplaneClass";

// Define a class to encapsulate the game
class RadarGame {
  private canvas: HTMLCanvasElement[]; //ダブルバッファで画面を切り替えてアニメーションを実現するために配列で定義
  private ctx: CanvasRenderingContext2D[];
  private clickedPosition: { x: number; y: number} | null; //クリックされた座標を取得
  private inGame: boolean; //シミュレーションゲーム中かどうかを判断する
  private bg: number; //ダブルバッファの背景と表示を切り替えるためのインデックスを管理
  private controlledAirplane: Airplane[] = [];

  constructor() {
    //初期変数を初期化する
    this.canvas = [this.createCanvas("radar"), this.createCanvas("radar2")];
    this.ctx = this.canvas.map((c) =>
      c.getContext("2d") as CanvasRenderingContext2D
    );
    this.clickedPosition = null;
    this.inGame = false;
    this.bg = 0;
    this.canvas[0].addEventListener("click", (e) => this.handleClick(e));
    this.canvas[1].addEventListener("click", (e) => this.handleClick(e));

    //とりあえず10機の航空機を生成する
    for (let i = 1; i <= 10; i++) {
      const airplane = new Airplane();
      this.controlledAirplane.push(airplane);
    }
  }

  private createCanvas(id: string): HTMLCanvasElement {
    //HTMLからキャンバスを取得してきて、もし取得できなければエラーを出力
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with id "${id}" not found.`);
    }
    return canvas;
  }

  private clearCanvas(index: number): void {
    //ダブルバッファで新しい画面を描画する前に一旦消す
    this.ctx[index].fillStyle = "black";
    this.ctx[index].fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  private updatePosition(airplane: Airplane): void {
    //航空機の速度に合わせてポジションを更新する
    airplane.updateLocation();
  }

  private handleClick(event: MouseEvent): void {
    // Get the clicked position relative to the canvas
    const canvas = event.target as HTMLCanvasElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Store the clicked position
    this.clickedPosition = { x, y };

    // Iterate through the aircraft to check if they are near the clicked position
    for (const airplane of this.controlledAirplane) {
      const position = airplane.currentPosition();
      const aircraftRadius = 50; // Adjust the radius as needed
      
      // Check if the clicked position is near the aircraft's position
      if (
        x >= position.currentX - aircraftRadius &&
        x <= position.currentX + aircraftRadius &&
        y >= position.currentY - aircraftRadius &&
        y <= position.currentY + aircraftRadius
      ) {
        // Log the aircraft information to the console
        console.log("Clicked Aircraft Info:");
        console.log(airplane.getAirplaneInfo());
      }
    }
  }

  private drawRect(index: number, airplane: Airplane): void {
    
    const position = airplane.currentPosition();
    const airplaneInfo = airplane.getAirplaneInfo();
    const labelX = airplaneInfo.labelX;
    const labelY = airplaneInfo.labelY;

    //航空機のポジションに描画する
    this.ctx[index].beginPath();
    this.ctx[index].rect(position.currentX-5, position.currentY-5, 10, 10); //左上が原点となっているため、航空機の中心に描画できるようにオフセットする
    this.ctx[index].fillStyle = "white";
    this.ctx[index].fill();

    // ラベルと航空機を線で結ぶ
    this.ctx[index].beginPath();
    this.ctx[index].moveTo((position.currentX * 8 + labelX * 2) / 10, (position.currentY * 8 + labelY * 2) / 10); // 航空機から少し離れたところから始める
    this.ctx[index].lineTo(labelX - 5, labelY + 15); // 高度のあたりに終点が来るようにする
    this.ctx[index].strokeStyle = "white";
    this.ctx[index].stroke();

    // Display aircraft information at labelLocation
    this.ctx[index].fillStyle = "white";
    this.ctx[index].font = "12px Arial";
    this.ctx[index].textAlign = "left";

    // Display callsign on the first line
    this.ctx[index].fillText(airplaneInfo.callsign, labelX, labelY);

    // Display altitude on the second line
    this.ctx[index].fillText(airplaneInfo.altitude, labelX, labelY + 15);

    // Display heading and speed on the third line
    this.ctx[index].fillText(airplaneInfo.speed, labelX, labelY + 30);
    this.ctx[index].fillText(airplaneInfo.destination, labelX + 40, labelY + 30);
  }

  private toggleCanvasDisplay(): void {
    //ダブルバッファの表示するキャンバスを切り替える
    this.canvas[1 - this.bg].style.display = "none";
    this.canvas[this.bg].style.display = "block";
    this.bg = 1 - this.bg;
  }

  private update(): void {
    //画面全体を更新する
    this.clearCanvas(this.bg);
    for (let i = 0; i < this.controlledAirplane.length; i++) {
      this.updatePosition(this.controlledAirplane[i]);
      this.drawRect(this.bg, this.controlledAirplane[i]);
    }
    this.toggleCanvasDisplay();
  }

  public start(): void {
    if (!this.ctx[0] || !this.ctx[1]) {
      console.error("Failed to get 2D context");
      return;
    }

    setInterval(() => {
      this.update();
    }, 1000 / REFRESH_RATE);
  }
}

// Initialize and start the game
const radarGame = new RadarGame();
radarGame.start();