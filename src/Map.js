import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export default function Map({options}) {
    const divMap = useRef()
    const [map, setMap] = useState(null)
    const createMap = useCallback(async () => {
        const load = await loadSdk()
        if(!load) return;
        const {naver} = window;
        const controlPosition = (position) => {
        switch(position) {
            case 'TOP_RIGHT':
                return naver.maps.Position.TOP_RIGHT;
            case 'TOP_LEFT':
                return naver.maps.Position.TOP_LEFT;
            case 'BOTTOM_RIGHT':
                return naver.maps.Position.BOTTOM_RIGHT;
            default:
                return naver.maps.Position.BOTTOM_LEFT
        }
        }
        const mapOptions = {
            ...options,
            center: new naver.maps.LatLng(options.center[0], options.center[1]),
            zoomControlOptions: { //줌 컨트롤의 옵션
                position: controlPosition(options.zoomControlOptions)
            }
        }
        const mapContainer = new naver.maps.Map(divMap.current, mapOptions)
        setMap(mapContainer)
    },[options])
    const loadSdk = () => {
        return new Promise(resolve => {
            const js = document.createElement("script");

            js.id = "naver-sdk";
            js.src = `//openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_CLIENT_KEY}&amp;submodules=panorama`;
            js.onload = resolve;

            document.body.append(js);
            }
        );
    }
    const showStreetMap = () => {
        const streetLayer = new window.naver.maps.StreetLayer();
        window.naver.maps.Event.once(map, 'init', function() {
            streetLayer.setMap(map);
        });
    }
    useLayoutEffect(() => {
        createMap()
    },[createMap])
    return (
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,display:'flex'}}>
            <div ref={divMap} style={{width:'100%',height:'100%'}}></div>
            <div className="buttons">
                <div class="map_type" id="maptype">
                    <button onClick={showStreetMap} id="maptype_NORMAL">일반</button>
                    <button onClick={showStreetMap} id="maptype_SATELLITE">위성</button>
                </div>
                <button id="street" onClick={showStreetMap}>거리뷰</button>
                <button id="current" onClick={showStreetMap}>현재위치표시</button>
            </div>
        </div>
    )
}
