import Image from 'next/image'

import Page from "../components/Page"
import Container from '../components/Container'
import AppNav from '../components/AppNav'

export default function MainApp() {
  return (
    <Page>
      <Container>
        <AppNav />
      </Container>
    </Page>
  )
}