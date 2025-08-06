import { Suspense } from "react";

import { destinations } from "@/data";
import { AirlineForm } from "@/components/home/AirlineForm";

const Home = () => (
  <Suspense fallback={<div>Loading form...</div>}>
    <AirlineForm {...{ destinations }} />
  </Suspense>
);

export default Home;
