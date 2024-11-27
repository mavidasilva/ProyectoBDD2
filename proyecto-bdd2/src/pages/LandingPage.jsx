import ImageCarousel from "../components/Carousel";
import Content from "../components/Content";
import Team from "../components/Team";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <div className="mt-4">
        <ImageCarousel />
      </div>
      <Content
        title="Nosotros"
        text="Kentucky Fried Chicken, conocido mundialmente como KFC, es una cadena de restaurantes que se dedica a la preparación de pollo frito en todas sus presentaciones, hace parte del grupo Yum! Brands y sus siglas traducen pollo frito Kentucky y se ha ido expandiendo a lo largo por todo el mundo ya que cuenta con más de 18000 sucursales distribuidas en 180 países."
      />
      <Content
        title="Misión"
        text="Nuestra misión es satisfacer las necesidades del sector alimentario, mediante la elaboración y comercialización de productos y servicios de óptima calidad, que se ajusten a las necesidades de nuestros clientes, al generar economía, desarrollo y crecimiento para el sector productos, para empleados y accionistas."
      />
      <Content
        title="Visión"
        text="Ser la empresa líder en la comercialización, distribución de productos, la conservación y procesamiento de estos, que ofrece productos y servicios con calidad de punta, que generen valor agregado al cliente y se conviertan en alternativas para el desarrollo económico, social y cultural de clientes, empleados y accionistas."
      />
      <Team />
    </div>
  );
};

export default LandingPage;
