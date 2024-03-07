import { Helmet } from 'react-helmet-async'

export default function MapEkgis() {
  return (
    <>
    <Helmet>
      <script>
     {` var map = new maplibregl.Map({
      "container": 'map',
      "center": [105, 17],
      "zoom": 4
        });
      var mapOSMBright = new ekmapplf.VectorBaseMap(
        'OSM:Bright',
        'wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy'
      ).addTo(map);`}
    </script>
    </Helmet>
    <div id="map" className='h-auto'></div>
    </>
  )
}