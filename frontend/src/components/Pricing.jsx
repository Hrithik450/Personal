import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import { LeftLine, RightLine } from "./design/Pricing";

const Pricing = ({ togglePayment }) => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <Heading
          tag="Get started with CodeEaseX"
          title="save your valuable time"
        />

        <div className="relative">
          <PricingList togglePayment={togglePayment} />
          <LeftLine />
          <RightLine />
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
