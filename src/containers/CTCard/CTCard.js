import React, { Component } from 'react';
import SliceViz from '../SliceViz/SliceViz'
import 'tachyons';

class CTCard extends Component {
  constructor(props){
    super(props);
    this.state = {
      total_slices:'',
      current_image: 15,
      img_format:'.png',
      img_url: '',
      loading_img:'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
      x_offset: 0,
      y_offset:0,
      loaded:false,
      }
  }

  componentDidMount(){
    fetch('http://127.0.0.1:3001/randomscan')
    .then(resp => resp.json())
    .then((resp)=> {
          this.setState({
            total_slices:resp.amnt,
            img_url:resp.url,
            img_format:resp.imgFormat,
            loaded:true
          })})
          .catch((err) =>console.log(err));
  }


  wheel(event){
    const dir = event.deltaY;
    if(dir < 0){
      let new_slide = this.state.current_image + 1;
      new_slide = (new_slide>=this.state.total_slices-1) ? new_slide=this.state.total_slices-1 : new_slide
      this.setState({current_image: new_slide})
    }else if(dir > 0){
      let new_slide = this.state.current_image - 1;
      new_slide = (new_slide<0) ? 0 : new_slide;
      this.setState({current_image: new_slide} );
    }else{
      console.log("UNKNOWN");
    }
  }

  onDragStart(event){
    console.log(event.screenX);
  }

  onDragEnd(event){
    console.log(event.screenX);
  }
  onDrag(event){
    console.log(event.screenX);
  }

  click(event){
    console.log("click");
  }
  render () {
    if(this.state.loaded){
      return (
        <div onClick={(e) => this.click(e)}
             onWheel={(e) => this.wheel(e)}>
          {/*<img width={250} height={250} alt="CT Slice" src={this.state.slice_list[this.state.current_image]} /> */}
          <SliceViz slice={this.state.img_url+this.state.current_image+this.state.img_format} />
        </div>
      )
    }else {
      return (
        <div>
          <img alt="CT Slice" src={this.state.loading_img} />
        </div>
      )
    }

  }
}

export default CTCard;
