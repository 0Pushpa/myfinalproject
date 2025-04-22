import React from "react";
import { FaChalkboardTeacher, FaEraser, FaRedo } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Eraserr from "../../../../../assets/paint/eraser.png";
import Pen from "../../../../../assets/paint/pen.png";
import LZW from "./compress-data";
import { AddDataService } from "../../../../../services/DataStatServices";


import prettyBytes from "pretty-bytes";




const styles = {
  maindiv: {
    width: "100%",
  },

  button: {
    border: "0px",
    margin: "1px",
    height: "50px",
    minWidth: "50px",
  },

  colorSwatches: {
    red: { backgroundColor: "red" },
    orange: { backgroundColor: "orange" },
    yellow: { backgroundColor: "yellow" },
    green: { backgroundColor: "green" },
    blue: { backgroundColor: "blue" },
    purple: { backgroundColor: "purple" },
    black: { backgroundColor: "black" },
  },
};

//simple draw component made in react
class DrawApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseIcon: Pen,
      canvasWidth: "",
      canvasHeight: "",
      colors: ["red", "orange", "yellow", "green", "blue", "purple", "black"],
    };
    this.socket = this.props.context.socket;
    this.socket.on("reflect-drawing", (data) => {
      var image = new Image();
      var canvas = document.querySelector("#mycanvas");
      var ctx = canvas.getContext("2d");
      image.onload = function () {
        ctx.drawImage(image, 0, 0);
      };
      var decomp = LZW.decompress(data);
      console.log("Decompress"+ decomp)
      image.src = decomp;
      // var beforeCompressionbyte = prettyBytes(data);
      // var afterCompressionbytes = prettyBytes(decomp);
      // console.log(beforeCompressionbyte +"compression"+ afterCompressionbytes)


    });
  }

  componentDidMount() {
    this.reset();
    const parentWidth = document.querySelector("#call__interface");
    this.setState({
      canvasWidth: parentWidth.offsetWidth,
      canvasHeight: parentWidth.offsetHeight,
    });
  }

  draw(e) {
    //response to Draw button click
    this.setState({
      mode: "draw",
      mouseIcon: Pen,
    });
  }

  erase() {
    //response to Erase button click
    this.setState({
      mode: "erase",
      mouseIcon: Eraserr,
    });
  }

  drawing(e) {
    //if the pen is down in the canvas, draw/erase

    if (this.state.pen === "down") {
      this.ctx.beginPath();
      this.ctx.lineWidth = this.state.lineWidth;
      this.ctx.lineCap = "round";

      if (this.state.mode === "draw") {
        this.ctx.strokeStyle = this.state.penColor;
      }

      if (this.state.mode === "erase") {
        this.ctx.strokeStyle = "#ffffff";
      }

      this.ctx.moveTo(this.state.penCoords[0], this.state.penCoords[1]); //move to old position
      this.ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); //draw to new position
      this.ctx.stroke();

      if (this.timeout !== undefined) clearTimeout(this.timeout);
      var canvas = document.getElementById("mycanvas");

      this.timeout = setTimeout(() => {
        var base64ImageData = canvas.toDataURL("image/png");
        var comp = LZW.compress(base64ImageData);
      console.log("Compress"+ comp)

        this.socket.emit("drawing", comp);
        var beforeCompressionsize =base64ImageData.length;
      var afterCompressionsize = comp.length;
      console.log(beforeCompressionsize+"compression"+ afterCompressionsize)
      var data = {
        before:beforeCompressionsize ,
        after: afterCompressionsize,
        group_id : this.props.context.groupId
      }
      AddDataService(data);//This can be made asynchronous

        // this.socket.emit("drawing", base64ImageData);
      }, 100);
    }

    this.setState({
      //save new position
      penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
    });
  }

  penDown(e) {
    //mouse is down on the canvas
    this.setState({
      pen: "down",
      penCoords: [e.nativeEvent.offsetX, e.nativeEvent.offsetY],
    });
  }

  penUp() {
    //mouse is up on the canvas

    this.setState({
      pen: "up",
    });
  }

  penSizeUp() {
    //increase pen size button clicked
    this.setState({
      lineWidth: (this.state.lineWidth += 5),
    });
  }

  penSizeDown() {
    //decrease pen size button clicked
    this.setState({
      lineWidth: (this.state.lineWidth -= 5),
    });
  }

  setColor(c) {
    //a color button was clicked
    this.setState({
      penColor: c,
    });
  }

  reset() {
    //clears it to all white, resets state to original
    this.setState({
      mode: "draw",
      pen: "up",
      lineWidth: 10,
      penColor: "black",
    });

    this.ctx = this.refs.canvas.getContext("2d");
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.state.canvasWidth, this.state.canvasHeight);
    this.ctx.lineWidth = 10;
  }

  render() {
    return (
      <div style={styles.maindiv}>
        <div className="collections">
          <div className="tool-list">
            <button
              className={this.state.mode === "draw" ? "active" : ""}
              onClick={(e) => this.draw(e)}
              style={(styles.btn, styles.button)}
            >
              <FaChalkboardTeacher />
            </button>
            <button
              className={this.state.mode === "erase" ? "active" : ""}
              onClick={(e) => this.erase(e)}
              style={(styles.btn, styles.button)}
            >
              <FaEraser />
            </button>
            <button
              onClick={(e) => this.penSizeUp()}
              style={(styles.btn, styles.button)}
            >
              <AiOutlinePlus />
            </button>
            <button
              onClick={(e) => this.penSizeDown()}
              style={(styles.btn, styles.button)}
            >
              <AiOutlineMinus />
            </button>
            <button
              onClick={() => this.reset()}
              style={(styles.btn, styles.button)}
            >
              <FaRedo />
            </button>
          </div>
          <div className="color-list">
            {this.state.colors.map((color) => {
              return (
                <button
                  className={this.state.penColor === color ? "active" : ""}
                  style={Object.assign(
                    {},
                    styles.colorSwatches[color],
                    styles.button
                  )}
                  onClick={() => this.setColor(color)}
                ></button>
              );
            })}
          </div>
        </div>
        <canvas
          ref="canvas"
          id="mycanvas"
          width={this.state.canvasWidth + "px"}
          height={this.state.canvasHeight + "px"}
          onMouseMove={(e) => this.drawing(e)}
          onMouseDown={(e) => this.penDown(e)}
          onMouseUp={(e) => this.penUp(e)}
          style={{ cursor: `url(${this.state.mouseIcon}),auto` }}
        ></canvas>
      </div>
    );
  }
}

export default DrawApp;
