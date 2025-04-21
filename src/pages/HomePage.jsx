import React from 'react'
import Banner from '../components/Home/Banner/Banner'
import LatestCollection from '../components/Home/LatestCollection/LatestCollection'
import BestSeller from '../components/Home/BestSeller/BestSeller'
import OurPolicy from '../components/Home/OurPolicy/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox/NewsLetterBox'

export default function HomePage() {
  return (
    <div>
        <Banner />
        <LatestCollection />
        <BestSeller />
        <OurPolicy />
        <NewsLetterBox />
    </div>
  )
}
