import { Outlet } from "react-router-dom";
import { Container } from "./styles";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Footer } from "../../components/Footer";

export function App() {
  return (
    <Container>
      <Header />

      <article>
        <section className="sideBar">
          <SideBar />
        </section>
        
        <Outlet /> {/* main */}
      </article>

      <Footer />
    </Container>
  );
}
