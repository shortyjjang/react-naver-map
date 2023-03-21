import { useEffect, Component, createRef } from 'react';

class App extends Component {
  async componentDidMount() {
    const {map} = this.state
    const loadSdk = () => {
      return new Promise(resolve => {
        const js = document.createElement("script");
  
        js.id = "naver-sdk";
        js.src = `//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_KEY}&amp;submodules=panorama`;
        js.onload = resolve;
  
        document.body.append(js);
      });
    }
    await loadSdk();
    const {naver} = window
    this.divRef = createRef();
    if(!naver || !this.divRef.current)  return;

    const center = new naver.maps.LatLng(37.4950926, 126.8622169)
    const mapOption = naver.maps.MapOptions = {
      center: center,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    }
    this.setState({map: new naver.maps.Map(this.divRef.current, mapOption)});
    const marker = new naver.maps.Marker({
      position: center,
      map,
    });
  }
  render(){
    return (
      <div id="map" ref={this.divRef}></div>
    );
  }
}

App.defaultProps = {
  name: '이름없음',
  map: null
};

export default App;

