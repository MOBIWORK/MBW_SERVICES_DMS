import { Helmet } from 'react-helmet-async'

export default function MapEkgis({id ="map-ek"}:{id: string}) {
  return (
    <>
    <Helmet>
      <script>
     {` var map = new maplibregl.Map({
      "container": ${id},
      "center": [105, 17],
      "zoom": 4
        });
      var mapOSMBright = new ekmapplf.VectorBaseMap(
        'OSM:Bright',
        'wtpM0U1ZmE2s87LEZNSHf63Osc1a2sboaozCQNsy'
      ).addTo(map);`}
    </script>
    </Helmet>
    <div id={id} className='h-full w-full'></div>
    </>
  )
}