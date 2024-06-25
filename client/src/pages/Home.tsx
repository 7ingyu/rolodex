import App from '../App'
import { Navigation } from "../components"

const Home = () => {
  return (
    <>
      <Navigation />
      <main className="container">
        <h1>Home</h1>
      </main>
    </>
  )
}

export default () => <App><Home /></App>