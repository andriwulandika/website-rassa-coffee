import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Process />
      <Products />
    </main>
  );
}
