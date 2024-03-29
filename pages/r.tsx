import React from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/base/Meta'

function PageR() {
  const router = useRouter()

  React.useEffect(() => {
    router.push('https://youtu.be/hvL1339luv0')
  })

  return (
    <>
      <Meta
        title="Ma base Enshrouded !"
        src="https://cdn.discordapp.com/attachments/828388340466057247/1202358881762951269/image.png?ex=65cd2af8&is=65bab5f8&hm=4cc833e212eb7545d26333ed4feb7be8c12340f0aed4570e2567ce3f525d3434&"
        description="Petit tour en vidéo de ma magnifique base sur le jeu Enshrouded, en coopération avec mon ami Fauchette qui a fait toute la déco intérieure et extérieure !"
      />
    </>
  )
}

export default PageR
