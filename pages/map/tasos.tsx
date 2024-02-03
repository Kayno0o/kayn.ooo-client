import React from 'react'
import 'leaflet/dist/leaflet.css'
import Meta from '../../components/base/Meta'
import Container from '../../components/base/Container'
import { grassSpheres, iceSpheres, lavaSpheres, mudSpheres } from '../../utils/map/tasos'

function TasosPage() {
  const [hasMap, setHasMap] = React.useState(false)

  React.useEffect(() => {
    if (hasMap)
      return

    let map: L.Map

    import('leaflet').then((L) => {
      const container: any = L.DomUtil.get('map')
      if (container != null)
        container._leaflet_id = null

      const poses: Array<string> = JSON.parse(localStorage.getItem('poses') || '[]')

      const [w, h] = [2400, 2400]

      function p(x: [number, number] | number, y?: number): L.LatLng {
        if (Array.isArray(x))
          [x, y] = x

        if (y === undefined)
          return L.latLng(0, 0)

        return L.latLng(h - y, x)
      }

      function marker(nb: string, pos: [number, number], url: string): L.Marker {
        const marker = L.marker(p(pos), {
          icon: L.icon({
            iconUrl: url,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
          title: nb,
          opacity: poses.includes(nb) ? 0.5 : 1,
        })
        marker.bindTooltip(nb)

        marker.addTo(map)

        marker.addEventListener('click', () => {
          if (poses.includes(nb)) {
            const index = poses.indexOf(nb)
            if (index !== -1) {
              marker.setOpacity(1)
              poses.splice(index, 1)
              localStorage.setItem('poses', JSON.stringify(poses))
            }
          }
          else {
            marker.setOpacity(0.5)
            poses.push(nb)
            localStorage.setItem('poses', JSON.stringify(poses))
          }
        })

        return marker
      }

      const bounds = L.latLngBounds([0, 0], [w, h])
      map = L.map('map', {
        crs: L.CRS.Simple,
        center: [w / 2, h / 2],
        zoom: -1,
        maxBounds: L.latLngBounds([-200, -200], [w + 200, h + 200]),
        minZoom: -2,
        maxZoom: 1,
      })

      setHasMap(true)

      const overlay = L.imageOverlay('/map/tasos/map.png', bounds, {
        interactive: true,
        opacity: 1,
      })
      overlay.addTo(map)

      Object.entries(grassSpheres).forEach(([nb, pos]) => {
        marker(nb, pos, '/map/tasos/assets/grassSphereIcon.png')
      })

      Object.entries(mudSpheres).forEach(([nb, pos]) => {
        marker(nb, pos, '/map/tasos/assets/mudSphereIcon.png')
      })

      Object.entries(lavaSpheres).forEach(([nb, pos]) => {
        marker(nb, pos, '/map/tasos/assets/lavaSphereIcon.png')
      })

      Object.entries(iceSpheres).forEach(([nb, pos]) => {
        marker(nb, pos, '/map/tasos/assets/iceSphereIcon.png')
      })
    })

    return () => {
      if (map)
        map.remove()
    }
  })

  return (
    <>
      <Meta title="Tasos map" />

      <Container>
        <div className="flex items-center justify-center h-full">
          <div id="map" className="lg:max-w-3xl max-w-3xl w-full h-full aspect-square" />
        </div>
      </Container>
    </>
  )
}

export default TasosPage
