import React, { Component } from 'react';
import Jimp from 'jimp';


class SliceViz extends Component {
  constructor(props){
    super(props);
    this.state = {
      src:'',
      err:null,
      dragStartX:0,
      dragStartY:0
    }
  }

  componentDidMount(){
    this.setWindow();
  }

  setWindow(l=127, w=256){
    /*threshold({max:val}
    .getBase64(Jimp.MIME_PNG, (err, src)=>{
      this.refs.image.src=src;
    });)*/
    const min = (l-(w/2));
    const max = (l+(w/2));
    const wl = max-min;
    let img = this.refs.image.src;
    Jimp.read(img)
    .then((image)=>{
      image.scan(0,0, image.bitmap.width, image.bitmap.height, (x, y, idx)=>{
        let val = (image.bitmap.data[idx+0] > max) ? max: image.bitmap.data[idx+0];
        val = (image.bitmap.data[idx+0]<min) ? min: image.bitmap.data[idx+0];
        val = Math.floor(((val-min)/wl) * 255)
        image.bitmap.data[idx+0] = val;
        image.bitmap.data[idx+1] = val;
        image.bitmap.data[idx+2] = val;
        image.bitmap.data[idx+3] =255;
        if(x===image.bitmap.width-1 && y===image.bitmap.height-1){
          image.getBase64(Jimp.MIME_PNG, (err, src)=>{
            this.refs.image.src=src;
          })
        }
      })
    })
  }

  onDrag(event){
    if(this.state.dragStart===0){
      this.setState({dragStartY:event.screenY});
      this.setState({dragStartX:event.screenX});
    }else{
      let deltaX = (event.screenX - this.state.dragStartX)/100;
      let deltaY = (event.screenY - this.state.dragStartY)/100;
      this.setWindow(127-deltaY, 256-deltaX);
    }

  }

  resetImg(){
    this.refs.image.src=this.props.slice;
  }
  render(){
      return(
        <div>
          <img
          onDragOver={(e)=>{this.onDrag(e)}}
          onDragEnd={(e)=>{this.resetImg(e)}}
          ref='image'
          alt="CT"
          src={this.props.slice}
          width={350}
          height={350} />
        </div>
      )
    }
  }


export default SliceViz;
